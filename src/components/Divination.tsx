'use client';

import React, { useState, useEffect } from 'react';
import { useAppTheme, useLang } from '@/contexts/AppProviders';
import { layout } from '@/lib/theme';
import { t } from '@/lib/i18n';
import { divineOneYao, getYaoLabel, type YaoResult, type ChangeStep } from '@/data/divination';
import { getHexInfo } from '@/lib/hexUtils';
import LinesSection from './LinesSection';
import Taiji from './Taiji';
import YarrowSticks from './YarrowSticks';

type Phase = 'focus' | 'divining' | 'result';

/**
 * Divining sub-steps within each "change" (变):
 * ready → split → hung → count-left → count-right → gathered
 * After 3 changes → yao-done → next yao or result
 */
type DivineStep = 'ready' | 'split' | 'hung' | 'count-left' | 'count-right' | 'gathered' | 'yao-done';

export default function Divination({ onClose }: { onClose: () => void }) {
  const theme = useAppTheme();
  const lang = useLang();
  const i = t(lang);
  const cn = lang === 'cn';

  const [phase, setPhase] = useState<Phase>('focus');
  const [question, setQuestion] = useState('');
  const [rotation, setRotation] = useState(0);

  // Divining state
  const [currentYao, setCurrentYao] = useState(0);
  const [currentChange, setCurrentChange] = useState(0);
  const [divineStep, setDivineStep] = useState<DivineStep>('ready');
  const [stickTotal, setStickTotal] = useState(49);
  const [currentYaoResult, setCurrentYaoResult] = useState<YaoResult | null>(null);
  const [currentStep, setCurrentStep] = useState<ChangeStep | null>(null);
  const [completedYaos, setCompletedYaos] = useState<YaoResult[]>([]);

  // Result
  const [resultYaos, setResultYaos] = useState<YaoResult[]>([]);

  // Taiji rotation
  useEffect(() => {
    if (phase === 'focus') {
      const iv = setInterval(() => setRotation(r => r + 0.1), 16);
      return () => clearInterval(iv);
    }
  }, [phase]);

  // Pre-compute the yao result when starting a new yao
  const startNewYao = () => {
    const result = divineOneYao();
    setCurrentYaoResult(result);
    setCurrentChange(0);
    setStickTotal(49);
    setCurrentStep(result.changes[0]);
    setDivineStep('ready');
  };

  // Begin divination
  const handleBegin = () => {
    setPhase('divining');
    setCurrentYao(0);
    setCompletedYaos([]);
    const result = divineOneYao();
    setCurrentYaoResult(result);
    setCurrentChange(0);
    setStickTotal(49);
    setCurrentStep(result.changes[0]);
    setDivineStep('ready');
  };

  // User clicks to advance to next step
  const handleNextStep = () => {
    if (!currentYaoResult || !currentStep) return;

    switch (divineStep) {
      case 'ready':
        setDivineStep('split');
        break;

      case 'split':
        setDivineStep('hung');
        break;

      case 'hung':
        setDivineStep('count-left');
        break;

      case 'count-left':
        setDivineStep('count-right');
        break;

      case 'count-right':
        setDivineStep('gathered');
        setStickTotal(currentStep.remaining);
        break;

      case 'gathered':
        // Move to next change or finish yao
        if (currentChange < 2) {
          const nextChange = currentChange + 1;
          setCurrentChange(nextChange);
          setCurrentStep(currentYaoResult.changes[nextChange]);
          setDivineStep('ready');
        } else {
          // Yao complete
          setDivineStep('yao-done');
        }
        break;

      case 'yao-done': {
        // Record this yao and move to next
        const newCompleted = [...completedYaos, currentYaoResult];
        setCompletedYaos(newCompleted);

        if (currentYao < 5) {
          // Next yao
          setCurrentYao(currentYao + 1);
          const result = divineOneYao();
          setCurrentYaoResult(result);
          setCurrentChange(0);
          setStickTotal(49);
          setCurrentStep(result.changes[0]);
          setDivineStep('ready');
        } else {
          // All done → result
          setResultYaos(newCompleted);
          setPhase('result');
        }
        break;
      }
    }
  };

  // Get status text and button text for current step
  const getStepInfo = (): { status: string; button: string; hint: string } => {
    const yaoNum = currentYao + 1;
    const changeNum = currentChange + 1;

    switch (divineStep) {
      case 'ready':
        return {
          status: cn ? `第${yaoNum}爻 · 第${changeNum}变` : `Line ${yaoNum} · Change ${changeNum}`,
          button: cn ? '分二 — 将蓍草分为两堆' : 'Split — Divide stalks into two piles',
          hint: cn ? '心中默念问题，将四十九根蓍草随意分为左右两堆' : 'Focus on your question, divide the 49 stalks into two piles',
        };
      case 'split':
        return {
          status: cn ? `左 ${currentStep?.left} · 右 ${currentStep?.right}` : `Left ${currentStep?.left} · Right ${currentStep?.right}`,
          button: cn ? '挂一 — 取出一根' : 'Hang One — Set one aside',
          hint: cn ? '从右手堆中取出一根，挂于指间' : 'Take one stalk from the right pile, hang it between your fingers',
        };
      case 'hung':
        return {
          status: cn ? '已挂一根于指间' : 'One stalk hung aside',
          button: cn ? '揲四 — 左手四四数之' : 'Count by Fours — Count left pile',
          hint: cn ? '将左手蓍草每四根一数，看余数几何' : 'Count the left pile by fours, note the remainder',
        };
      case 'count-left':
        return {
          status: cn ? `左堆余 ${currentStep?.leftRemainder}` : `Left remainder: ${currentStep?.leftRemainder}`,
          button: cn ? '揲四 — 右手四四数之' : 'Count by Fours — Count right pile',
          hint: cn ? '将右手蓍草每四根一数，看余数几何' : 'Count the right pile by fours, note the remainder',
        };
      case 'count-right':
        return {
          status: cn ? `右堆余 ${currentStep?.rightRemainder}` : `Right remainder: ${currentStep?.rightRemainder}`,
          button: cn ? `归奇 — 将 ${currentStep?.aside} 根归于一旁` : `Gather — Set ${currentStep?.aside} aside`,
          hint: cn ? '将挂一与两堆余数共同归旁，余者继续下一变' : 'Set the hung stalk and both remainders aside',
        };
      case 'gathered':
        return {
          status: cn ? `余 ${currentStep?.remaining} 根` : `${currentStep?.remaining} stalks remain`,
          button: currentChange < 2
            ? (cn ? `继续第${changeNum + 1}变` : `Continue to Change ${changeNum + 1}`)
            : (cn ? '三变已成，观其爻象' : 'Three changes complete — reveal the line'),
          hint: currentChange < 2
            ? (cn ? '以余下蓍草重复分二、挂一、揲四、归奇' : 'Repeat the process with remaining stalks')
            : (cn ? `${currentStep?.remaining} ÷ 4 = ${currentStep ? currentStep.remaining / 4 : '?'}，此为爻数` : `${currentStep?.remaining} ÷ 4 = ${currentStep ? currentStep.remaining / 4 : '?'}, this is the line value`),
        };
      case 'yao-done': {
        const label = currentYaoResult ? getYaoLabel(currentYaoResult.value) : null;
        return {
          status: cn ? `得 ${label?.cn || ''}` : `Got ${label?.en || ''}`,
          button: currentYao < 5
            ? (cn ? `继续第${yaoNum + 1}爻` : `Continue to Line ${yaoNum + 1}`)
            : (cn ? '六爻已成，观卦象' : 'All six lines complete — reveal hexagram'),
          hint: currentYaoResult?.isChanging
            ? (cn ? '此为变爻！变卦时此爻阴阳互换' : 'This is a changing line! It transforms in the changing hexagram')
            : (cn ? '此爻不变' : 'This line does not change'),
        };
      }
      default:
        return { status: '', button: '', hint: '' };
    }
  };

  // Map divineStep to YarrowSticks phase
  const getStickPhase = () => {
    switch (divineStep) {
      case 'ready': return 'idle' as const;
      case 'split': return 'splitting' as const;
      case 'hung': return 'hanging' as const;
      case 'count-left': return 'counting-left' as const;
      case 'count-right': return 'counting-right' as const;
      case 'gathered': return 'gathering' as const;
      case 'yao-done': return 'done' as const;
      default: return 'idle' as const;
    }
  };

  // Build result data
  const binary = resultYaos.map(y => y.isYang ? '1' : '0').join('');
  const hexInfo = binary.length === 6 ? getHexInfo(binary) : null;
  const hasChanging = resultYaos.some(y => y.isChanging);
  const changingBinary = hasChanging
    ? resultYaos.map(y => { if (y.value === 9) return '0'; if (y.value === 6) return '1'; return y.isYang ? '1' : '0'; }).join('')
    : null;
  const changingHexInfo = changingBinary ? getHexInfo(changingBinary) : null;

  const stepInfo = getStepInfo();

  const actionBtnStyle: React.CSSProperties = {
    marginTop: 20, padding: '14px 32px', borderRadius: 10,
    background: theme.accent, color: theme.bg,
    fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer',
    fontFamily: 'inherit', transition: 'all 0.2s',
    maxWidth: 400, width: '100%',
  };

  // ── Phase 1: Focus ──
  if (phase === 'focus') {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: theme.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <button type="button" onClick={onClose} style={{ position: 'absolute', top: 20, right: 24, background: 'none', border: 'none', fontSize: 18, color: theme.sub, cursor: 'pointer' }}>✕</button>
        <Taiji size={100} rotation={rotation} />
        <h2 style={{ ...layout.title(theme), fontSize: 28, marginTop: 32 }}>{cn ? '蓍草占卜' : 'Yarrow Stalk Divination'}</h2>
        <p style={{ fontSize: 14, color: theme.sub, marginTop: 8, fontStyle: 'italic' }}>{cn ? '大衍之数五十，其用四十有九' : 'The great expansion number is 50; use 49'}</p>
        <p style={{ fontSize: 15, color: theme.sub, marginTop: 40 }}>{cn ? '诚心默念你的问题...' : 'Focus your mind on your question...'}</p>
        <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder={cn ? '输入你的问题（可选）' : 'Enter your question (optional)'} style={{ marginTop: 20, padding: '12px 20px', borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.card, color: theme.text, fontSize: 15, width: '100%', maxWidth: 400, outline: 'none', textAlign: 'center', fontFamily: 'inherit' }} />
        <button type="button" onClick={handleBegin} style={actionBtnStyle}>{cn ? '开始占筮' : 'Begin Divination'}</button>
      </div>
    );
  }

  // ── Phase 2: Divining (Interactive) ──
  if (phase === 'divining') {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: theme.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 16px', overflow: 'auto' }}>
        {/* Progress bar */}
        <div style={{ width: '100%', maxWidth: 400, height: 4, borderRadius: 2, background: theme.subtleBg, marginBottom: 16 }}>
          <div style={{ height: '100%', borderRadius: 2, background: theme.accent, transition: 'width 0.5s', width: `${((currentYao * 3 + currentChange + (divineStep === 'yao-done' ? 3 : 0)) / 18) * 100}%` }} />
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <h3 style={{ fontSize: 18, color: theme.text, fontWeight: 500 }}>
            {cn ? `第 ${currentYao + 1} 爻` : `Line ${currentYao + 1}`}
            {divineStep !== 'yao-done' && (
              <span style={{ fontSize: 13, color: theme.sub, marginLeft: 12 }}>
                {cn ? `第 ${currentChange + 1} 变` : `Change ${currentChange + 1}`}
              </span>
            )}
          </h3>
        </div>

        {/* Status */}
        <p style={{ fontSize: 16, color: theme.accent, marginTop: 4, fontWeight: 500, minHeight: 24, transition: 'all 0.3s' }}>
          {stepInfo.status}
        </p>

        {/* Yarrow sticks */}
        <YarrowSticks
          total={stickTotal}
          phase={getStickPhase()}
          leftCount={currentStep?.left}
          rightCount={currentStep?.right}
          leftRemainder={currentStep?.leftRemainder}
          rightRemainder={currentStep?.rightRemainder}
        />

        {/* Stalk count */}
        <p style={{ fontSize: 12, color: theme.sub, marginTop: 4 }}>
          {cn ? `蓍草 ${stickTotal} 根` : `${stickTotal} stalks`}
        </p>

        {/* Hint text */}
        <p style={{ fontSize: 13, color: theme.sub, marginTop: 12, textAlign: 'center', maxWidth: 360, lineHeight: 1.6, fontStyle: 'italic' }}>
          {stepInfo.hint}
        </p>

        {/* Interactive action button */}
        <button type="button" onClick={handleNextStep} style={actionBtnStyle}>
          {stepInfo.button}
        </button>

        {/* Completed yao lines */}
        {completedYaos.length > 0 && (
          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column-reverse', gap: 6, alignItems: 'center' }}>
            {completedYaos.map((yao, idx) => {
              const label = getYaoLabel(yao.value);
              return (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12, animation: `fadeIn 0.5s ease both` }}>
                  {yao.isYang ? (
                    <div style={{ width: 50, height: 7, borderRadius: 4, background: yao.isChanging ? theme.accent : theme.yangLine }} />
                  ) : (
                    <div style={{ display: 'flex', gap: 5 }}>
                      <div style={{ width: 22, height: 7, borderRadius: 4, background: yao.isChanging ? theme.accent : theme.yinLine }} />
                      <div style={{ width: 22, height: 7, borderRadius: 4, background: yao.isChanging ? theme.accent : theme.yinLine }} />
                    </div>
                  )}
                  <span style={{ fontSize: 10, color: yao.isChanging ? theme.accent : theme.sub, fontFamily: "'JetBrains Mono', monospace" }}>
                    {yao.value}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Yao-done: show current yao result */}
        {divineStep === 'yao-done' && currentYaoResult && (
          <div style={{ marginTop: 16, padding: '10px 20px', borderRadius: 8, background: theme.subtleBg, textAlign: 'center', animation: 'fadeIn 0.5s ease both' }}>
            {currentYaoResult.isYang ? (
              <div style={{ width: 60, height: 8, borderRadius: 4, background: currentYaoResult.isChanging ? theme.accent : theme.yangLine, margin: '0 auto', boxShadow: currentYaoResult.isChanging ? theme.glowShadow : 'none' }} />
            ) : (
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                <div style={{ width: 26, height: 8, borderRadius: 4, background: currentYaoResult.isChanging ? theme.accent : theme.yinLine }} />
                <div style={{ width: 26, height: 8, borderRadius: 4, background: currentYaoResult.isChanging ? theme.accent : theme.yinLine }} />
              </div>
            )}
            <p style={{ fontSize: 13, color: currentYaoResult.isChanging ? theme.accent : theme.text, marginTop: 8, fontWeight: 500 }}>
              {cn ? getYaoLabel(currentYaoResult.value).cn : getYaoLabel(currentYaoResult.value).en}
            </p>
          </div>
        )}

        {question && (
          <p style={{ fontSize: 11, color: theme.sub, marginTop: 16, fontStyle: 'italic', opacity: 0.5 }}>{question}</p>
        )}
      </div>
    );
  }

  // ── Phase 3: Result ──
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: theme.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 16px', overflow: 'auto' }}>
      <button type="button" onClick={onClose} style={{ position: 'absolute', top: 20, right: 24, background: 'none', border: 'none', fontSize: 18, color: theme.sub, cursor: 'pointer' }}>✕</button>

      {question && <p style={{ fontSize: 13, color: theme.sub, fontStyle: 'italic', marginBottom: 16 }}>{question}</p>}

      <h2 style={{ ...layout.title(theme), fontSize: 24 }}>{cn ? '得卦' : 'Hexagram Obtained'}</h2>

      {hexInfo && (
        <div style={{ textAlign: 'center', marginTop: 20 }}>
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
                <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: yao.isChanging ? theme.accent : theme.sub, minWidth: 16 }}>{yao.value}</span>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 48, color: theme.text, fontWeight: 300 }}>{cn ? hexInfo.name : hexInfo.nameEn}</p>
          <p style={{ fontSize: 18, color: theme.sub }}>{cn ? hexInfo.nameEn : hexInfo.name} · {cn ? hexInfo.meaning : hexInfo.meaningEn}</p>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, color: theme.accent, marginTop: 8, letterSpacing: 4 }}>{binary}</p>

          <div style={{ marginTop: 16, padding: '12px 20px', borderRadius: 8, background: theme.subtleBg, display: 'inline-block' }}>
            <p style={{ fontSize: 14, fontFamily: "'JetBrains Mono', monospace", color: theme.text }}>{hexInfo.state}</p>
            <p style={{ fontSize: 13, color: theme.sub, marginTop: 4 }}>{cn ? hexInfo.desc : hexInfo.descEn}</p>
          </div>

          {changingHexInfo && (
            <div style={{ marginTop: 28, paddingTop: 20, borderTop: `1px solid ${theme.divider}` }}>
              <p style={{ fontSize: 12, color: theme.accent, marginBottom: 8 }}>{cn ? '变卦 →' : 'Changes to →'}</p>
              <p style={{ fontSize: 32, color: theme.text }}>{cn ? changingHexInfo.name : changingHexInfo.nameEn}</p>
              <p style={{ fontSize: 14, color: theme.sub }}>{cn ? changingHexInfo.nameEn : changingHexInfo.name} · {cn ? changingHexInfo.meaning : changingHexInfo.meaningEn}</p>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: theme.accent, marginTop: 4, letterSpacing: 4 }}>{changingBinary}</p>
            </div>
          )}

          <div style={{ marginTop: 24, textAlign: 'left', maxWidth: 500 }}>
            <LinesSection hex={hexInfo} />
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 16, marginTop: 32, marginBottom: 40 }}>
        <button type="button" onClick={() => { setPhase('focus'); setCompletedYaos([]); setResultYaos([]); setStickTotal(49); setCurrentYao(0); setCurrentChange(0); }} style={{ padding: '12px 24px', borderRadius: 8, border: `1px solid ${theme.border}`, background: 'transparent', color: theme.text, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>{cn ? '重新占卜' : 'Divine Again'}</button>
        <button type="button" onClick={onClose} style={{ padding: '12px 24px', borderRadius: 8, background: theme.accent, color: theme.bg, fontSize: 14, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>{cn ? '返回' : 'Back'}</button>
      </div>
    </div>
  );
}
