'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useAppTheme, useLang } from '@/contexts/AppProviders';
import { layout } from '@/lib/theme';
import { t } from '@/lib/i18n';
import { divineOneYao, getYaoLabel, type YaoResult, type ChangeStep } from '@/data/divination';
import { getHexInfo } from '@/lib/hexUtils';
import { hexagramsData } from '@/data/hexagrams';
import LinesSection from './LinesSection';
import Taiji from './Taiji';
import YarrowSticks from './YarrowSticks';

type Phase = 'focus' | 'divining' | 'result';
type StickPhase = 'idle' | 'splitting' | 'hanging' | 'counting-left' | 'counting-right' | 'gathering' | 'done';

export default function Divination({ onClose }: { onClose: () => void }) {
  const theme = useAppTheme();
  const lang = useLang();
  const i = t(lang);

  const [phase, setPhase] = useState<Phase>('focus');
  const [question, setQuestion] = useState('');
  const [rotation, setRotation] = useState(0);

  // Divining state
  const [currentYao, setCurrentYao] = useState(0); // 0-5
  const [currentChange, setCurrentChange] = useState(0); // 0-2
  const [stickPhase, setStickPhase] = useState<StickPhase>('idle');
  const [stickTotal, setStickTotal] = useState(49);
  const [currentStep, setCurrentStep] = useState<ChangeStep | null>(null);
  const [completedYaos, setCompletedYaos] = useState<YaoResult[]>([]);
  const [statusText, setStatusText] = useState('');
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  // Result state
  const [resultYaos, setResultYaos] = useState<YaoResult[]>([]);

  // Taiji rotation
  useEffect(() => {
    if (phase === 'focus') {
      const iv = setInterval(() => setRotation(r => r + 0.1), 16);
      return () => clearInterval(iv);
    }
  }, [phase]);

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  // Run one complete change with animation
  const animateOneChange = useCallback(async (yaoResult: YaoResult, changeIdx: number) => {
    const step = yaoResult.changes[changeIdx];

    // Phase 1: Split
    setCurrentStep(step);
    setStickPhase('splitting');
    setStatusText(lang === 'cn' ? `第${currentYao + 1}爻 · 第${changeIdx + 1}变 · 分二` : `Line ${currentYao + 1} · Change ${changeIdx + 1} · Splitting`);
    await sleep(900);

    // Phase 2: Hang one
    setStickPhase('hanging');
    setStatusText(lang === 'cn' ? '挂一' : 'Hanging one');
    await sleep(700);

    // Phase 3: Count left by fours
    setStickPhase('counting-left');
    setStatusText(lang === 'cn' ? `揲四（左 余${step.leftRemainder}）` : `Counting fours (left rem. ${step.leftRemainder})`);
    await sleep(700);

    // Phase 4: Count right by fours
    setStickPhase('counting-right');
    setStatusText(lang === 'cn' ? `揲四（右 余${step.rightRemainder}）` : `Counting fours (right rem. ${step.rightRemainder})`);
    await sleep(700);

    // Phase 5: Gather remainders
    setStickPhase('gathering');
    setStatusText(lang === 'cn' ? `归奇 ${step.aside}根` : `Gathering ${step.aside} aside`);
    await sleep(800);

    setStickTotal(step.remaining);
  }, [currentYao, lang]);

  // Run the full divination
  const startDivination = useCallback(async () => {
    setPhase('divining');
    setIsAutoPlaying(true);
    const yaos: YaoResult[] = [];

    for (let yaoIdx = 0; yaoIdx < 6; yaoIdx++) {
      setCurrentYao(yaoIdx);
      setStickTotal(49);
      setStickPhase('idle');
      await sleep(500);

      const yaoResult = divineOneYao();

      for (let changeIdx = 0; changeIdx < 3; changeIdx++) {
        setCurrentChange(changeIdx);
        const step = yaoResult.changes[changeIdx];
        setCurrentStep(step);

        // Split
        setStickPhase('splitting');
        setStatusText(lang === 'cn' ? `第${yaoIdx + 1}爻 · 第${changeIdx + 1}变 · 分二` : `Line ${yaoIdx + 1} · Change ${changeIdx + 1} · Split`);
        await sleep(800);

        // Hang
        setStickPhase('hanging');
        setStatusText(lang === 'cn' ? '挂一' : 'Hang one');
        await sleep(600);

        // Count left
        setStickPhase('counting-left');
        setStatusText(lang === 'cn' ? `揲四（左 余${step.leftRemainder}）` : `Count fours (L rem. ${step.leftRemainder})`);
        await sleep(600);

        // Count right
        setStickPhase('counting-right');
        setStatusText(lang === 'cn' ? `揲四（右 余${step.rightRemainder}）` : `Count fours (R rem. ${step.rightRemainder})`);
        await sleep(600);

        // Gather
        setStickPhase('gathering');
        setStatusText(lang === 'cn' ? `归奇 ${step.aside}` : `Aside ${step.aside}`);
        await sleep(600);

        setStickTotal(step.remaining);
      }

      // Yao complete
      const label = getYaoLabel(yaoResult.value);
      setStatusText(lang === 'cn' ? `得 ${label.cn}` : `Got ${label.en}`);
      yaos.push(yaoResult);
      setCompletedYaos([...yaos]);
      await sleep(1000);
    }

    // All 6 yaos done → show result
    setResultYaos(yaos);
    setIsAutoPlaying(false);
    setPhase('result');
  }, [lang]);

  // Build result data
  const binary = resultYaos.map(y => y.isYang ? '1' : '0').join('');
  const hexInfo = binary.length === 6 ? getHexInfo(binary) : null;
  const hasChanging = resultYaos.some(y => y.isChanging);
  const changingBinary = hasChanging
    ? resultYaos.map(y => {
        if (y.value === 9) return '0';
        if (y.value === 6) return '1';
        return y.isYang ? '1' : '0';
      }).join('')
    : null;
  const changingHexInfo = changingBinary ? getHexInfo(changingBinary) : null;

  // ── Phase 1: Focus ──
  if (phase === 'focus') {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: theme.bg,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}>
        <button
          type="button"
          onClick={onClose}
          style={{ position: 'absolute', top: 20, right: 24, background: 'none', border: 'none', fontSize: 18, color: theme.sub, cursor: 'pointer' }}
        >
          ✕
        </button>

        <Taiji size={100} rotation={rotation} />

        <h2 style={{ ...layout.title(theme), fontSize: 28, marginTop: 32 }}>
          {lang === 'cn' ? '蓍草占卜' : 'Yarrow Stalk Divination'}
        </h2>
        <p style={{ fontSize: 14, color: theme.sub, marginTop: 8, fontStyle: 'italic' }}>
          {lang === 'cn' ? '大衍之数五十，其用四十有九' : 'The great expansion number is 50; use 49'}
        </p>

        <p style={{ fontSize: 15, color: theme.sub, marginTop: 40 }}>
          {lang === 'cn' ? '诚心默念你的问题...' : 'Focus your mind on your question...'}
        </p>

        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={lang === 'cn' ? '输入你的问题（可选）' : 'Enter your question (optional)'}
          style={{
            marginTop: 20, padding: '12px 20px', borderRadius: 8,
            border: `1px solid ${theme.border}`, background: theme.card,
            color: theme.text, fontSize: 15, width: '100%', maxWidth: 400,
            outline: 'none', textAlign: 'center',
            fontFamily: 'inherit',
          }}
        />

        <button
          type="button"
          onClick={startDivination}
          style={{
            marginTop: 36, padding: '14px 36px', borderRadius: 8,
            background: theme.accent, color: theme.bg,
            fontSize: 16, fontWeight: 600, border: 'none', cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          {lang === 'cn' ? '开始占筮' : 'Begin Divination'}
        </button>
      </div>
    );
  }

  // ── Phase 2: Divining ──
  if (phase === 'divining') {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: theme.bg,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '24px 16px',
        overflow: 'auto',
      }}>
        {/* Header */}
        <h3 style={{ fontSize: 18, color: theme.text, fontWeight: 500 }}>
          {lang === 'cn' ? `第 ${currentYao + 1} 爻` : `Line ${currentYao + 1}`}
          <span style={{ fontSize: 13, color: theme.sub, marginLeft: 12 }}>
            {lang === 'cn' ? `第 ${currentChange + 1} 变` : `Change ${currentChange + 1}`}
          </span>
        </h3>

        {/* Status */}
        <p style={{ fontSize: 14, color: theme.accent, marginTop: 12, minHeight: 20, transition: 'all 0.3s' }}>
          {statusText}
        </p>

        {/* Yarrow sticks visualization */}
        <YarrowSticks
          total={stickTotal}
          phase={stickPhase}
          leftCount={currentStep?.left}
          rightCount={currentStep?.right}
          leftRemainder={currentStep?.leftRemainder}
          rightRemainder={currentStep?.rightRemainder}
        />

        {/* Remaining count */}
        <p style={{ fontSize: 13, color: theme.sub, marginTop: 8 }}>
          {lang === 'cn' ? `蓍草 ${stickTotal} 根` : `${stickTotal} stalks`}
        </p>

        {/* Completed yao lines (building from bottom) */}
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column-reverse', gap: 6, alignItems: 'center' }}>
          {completedYaos.map((yao, idx) => {
            const label = getYaoLabel(yao.value);
            return (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12, opacity: 1, transition: 'all 0.5s' }}>
                {/* Yao line */}
                {yao.isYang ? (
                  <div style={{ width: 60, height: 8, borderRadius: 4, background: yao.isChanging ? theme.accent : theme.yangLine }} />
                ) : (
                  <div style={{ display: 'flex', gap: 6 }}>
                    <div style={{ width: 26, height: 8, borderRadius: 4, background: yao.isChanging ? theme.accent : theme.yinLine }} />
                    <div style={{ width: 26, height: 8, borderRadius: 4, background: yao.isChanging ? theme.accent : theme.yinLine }} />
                  </div>
                )}
                <span style={{ fontSize: 11, color: yao.isChanging ? theme.accent : theme.sub, fontFamily: "'JetBrains Mono', monospace" }}>
                  {yao.value} {lang === 'cn' ? label.cn : label.en}
                </span>
              </div>
            );
          })}
        </div>

        {question && (
          <p style={{ fontSize: 12, color: theme.sub, marginTop: 20, fontStyle: 'italic', opacity: 0.6 }}>
            {question}
          </p>
        )}
      </div>
    );
  }

  // ── Phase 3: Result ──
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: theme.bg,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '24px 16px',
      overflow: 'auto',
    }}>
      <button
        type="button"
        onClick={onClose}
        style={{ position: 'absolute', top: 20, right: 24, background: 'none', border: 'none', fontSize: 18, color: theme.sub, cursor: 'pointer' }}
      >
        ✕
      </button>

      {question && (
        <p style={{ fontSize: 13, color: theme.sub, fontStyle: 'italic', marginBottom: 16 }}>
          {question}
        </p>
      )}

      <h2 style={{ ...layout.title(theme), fontSize: 24 }}>
        {lang === 'cn' ? '得卦' : 'Hexagram Obtained'}
      </h2>

      {/* Main hexagram */}
      {hexInfo && (
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          {/* Animated yao lines */}
          <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 8, alignItems: 'center', marginBottom: 20 }}>
            {resultYaos.map((yao, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, animation: `fadeIn 0.5s ease ${idx * 0.15}s both` }}>
                {yao.isYang ? (
                  <div style={{ width: 70, height: 10, borderRadius: 5, background: yao.isChanging ? theme.accent : theme.yangLine, boxShadow: yao.isChanging ? theme.glowShadow : 'none' }} />
                ) : (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <div style={{ width: 30, height: 10, borderRadius: 5, background: yao.isChanging ? theme.accent : theme.yinLine }} />
                    <div style={{ width: 30, height: 10, borderRadius: 5, background: yao.isChanging ? theme.accent : theme.yinLine }} />
                  </div>
                )}
                <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: yao.isChanging ? theme.accent : theme.sub, minWidth: 16 }}>
                  {yao.value}
                </span>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 48, color: theme.text, fontWeight: 300 }}>
            {lang === 'cn' ? hexInfo.name : hexInfo.nameEn}
          </p>
          <p style={{ fontSize: 18, color: theme.sub }}>
            {lang === 'cn' ? hexInfo.nameEn : hexInfo.name} · {lang === 'cn' ? hexInfo.meaning : hexInfo.meaningEn}
          </p>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, color: theme.accent, marginTop: 8, letterSpacing: 4 }}>
            {binary}
          </p>

          {/* State */}
          <div style={{ marginTop: 16, padding: '12px 20px', borderRadius: 8, background: theme.subtleBg, display: 'inline-block' }}>
            <p style={{ fontSize: 14, fontFamily: "'JetBrains Mono', monospace", color: theme.text }}>{hexInfo.state}</p>
            <p style={{ fontSize: 13, color: theme.sub, marginTop: 4 }}>{lang === 'cn' ? hexInfo.desc : hexInfo.descEn}</p>
          </div>

          {/* Changing hexagram */}
          {changingHexInfo && (
            <div style={{ marginTop: 28, paddingTop: 20, borderTop: `1px solid ${theme.divider}` }}>
              <p style={{ fontSize: 12, color: theme.accent, marginBottom: 8 }}>
                {lang === 'cn' ? '变卦 →' : 'Changes to →'}
              </p>
              <p style={{ fontSize: 32, color: theme.text }}>
                {lang === 'cn' ? changingHexInfo.name : changingHexInfo.nameEn}
              </p>
              <p style={{ fontSize: 14, color: theme.sub }}>
                {lang === 'cn' ? changingHexInfo.nameEn : changingHexInfo.name} · {lang === 'cn' ? changingHexInfo.meaning : changingHexInfo.meaningEn}
              </p>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: theme.accent, marginTop: 4, letterSpacing: 4 }}>
                {changingBinary}
              </p>
            </div>
          )}

          {/* Lines section */}
          <div style={{ marginTop: 24, textAlign: 'left', maxWidth: 500 }}>
            <LinesSection hex={hexInfo} />
          </div>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: 16, marginTop: 32, marginBottom: 40 }}>
        <button
          type="button"
          onClick={() => {
            setPhase('focus');
            setCompletedYaos([]);
            setResultYaos([]);
            setStickTotal(49);
            setCurrentYao(0);
            setCurrentChange(0);
          }}
          style={{ padding: '12px 24px', borderRadius: 8, border: `1px solid ${theme.border}`, background: 'transparent', color: theme.text, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}
        >
          {lang === 'cn' ? '重新占卜' : 'Divine Again'}
        </button>
        <button
          type="button"
          onClick={onClose}
          style={{ padding: '12px 24px', borderRadius: 8, background: theme.accent, color: theme.bg, fontSize: 14, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          {lang === 'cn' ? '返回' : 'Back'}
        </button>
      </div>
    </div>
  );
}
