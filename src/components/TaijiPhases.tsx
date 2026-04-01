'use client';

import React, { useState, useEffect } from 'react';
import Taiji from './Taiji';
import Line from './Line';
import Hexagram from './Hexagram';
import LinesSection from './LinesSection';
import GlassCard from './ui/GlassCard';
import GlassButton from './ui/GlassButton';
import { theme, s } from '@/lib/theme';
import { trigramInfo, fourImages } from '@/data/trigrams';
import { getHexInfo } from '@/lib/hexUtils';

export default function TaijiPhases() {
  const [homePhase, setHomePhase] = useState(0);
  const [currentTrigram, setCurrentTrigram] = useState<number[]>([]);
  const [lowerTrigram, setLowerTrigram] = useState<string | null>(null);
  const [upperTrigram, setUpperTrigram] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [separationProgress, setSeparationProgress] = useState(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const i = setInterval(() => setRotation((r) => r + 0.15), 16);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    if (isAnimating && separationProgress < 1) {
      const t = setTimeout(() => setSeparationProgress((p) => Math.min(p + 0.02, 1)), 16);
      return () => clearTimeout(t);
    }
    if (separationProgress >= 1 && isAnimating) {
      setIsAnimating(false);
      setHomePhase(1);
    }
  }, [isAnimating, separationProgress]);

  const handleTaijiClick = () => { setIsAnimating(true); setSeparationProgress(0); };
  const addLine = (v: number) => currentTrigram.length < 3 && setCurrentTrigram([...currentTrigram, v]);
  const setAsLower = () => { if (currentTrigram.length === 3) { setLowerTrigram(currentTrigram.join('')); setCurrentTrigram([]); setHomePhase(3); } };
  const setAsUpper = () => { if (currentTrigram.length === 3) { setUpperTrigram(currentTrigram.join('')); setCurrentTrigram([]); } };
  const resetAll = () => { setHomePhase(0); setCurrentTrigram([]); setLowerTrigram(null); setUpperTrigram(null); setSeparationProgress(0); setIsAnimating(false); };
  const trigramKey = currentTrigram.length === 3 ? currentTrigram.join('') : null;
  const fullHex = lowerTrigram && upperTrigram ? lowerTrigram + upperTrigram : null;
  const hexData = fullHex ? getHexInfo(fullHex) : null;

  if (homePhase === 0 && !isAnimating) {
    return (
      <div style={s.center}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ ...s.title, fontSize: 42 }}>二进制之道 · Tao of Binary</h1>
          <p style={{ fontSize: 15, color: theme.sub }}>易经是古老的状态迁移系统 / I Ching: an ancient state-transition system</p>
        </div>
        <GlassCard padding="40px">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ fontSize: 12, color: '#999', marginBottom: 20 }}>PRE-BINARY · 尚未离散化 Not yet discretized</p>
            <Taiji size={140} rotation={rotation} onClick={handleTaijiClick} interactive={true} />
            <p style={{ fontSize: 26, fontWeight: 300, marginTop: 28 }}>太极 Taiji</p>
            <p style={{ fontSize: 14, color: theme.sub }}>Taiji · The Undifferentiated</p>
          </div>
        </GlassCard>
        <p style={{ fontSize: 13, color: '#aaa', marginTop: 40 }}>点击开始离散化 Click to start discretization →</p>
      </div>
    );
  }

  if (isAnimating) {
    const sp = separationProgress * 120;
    return (
      <div style={s.center}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: 26, fontWeight: 300 }}>模拟 → 数字 Analog → Digital</h2>
        </div>
        <div style={{ position: 'relative', width: 320, height: 200 }}>
          <div style={{ position: 'absolute', left: `calc(50% - ${sp}px - 45px)`, top: '50%', transform: 'translateY(-50%)', opacity: separationProgress }}>
            <div style={{ width: 90, height: 14, background: '#a0a0b8', borderRadius: 7 }} />
          </div>
          <div style={{ position: 'absolute', left: `calc(50% + ${sp}px - 45px)`, top: '50%', transform: 'translateY(-50%)', opacity: separationProgress, display: 'flex', gap: 14 }}>
            <div style={{ width: 36, height: 14, background: '#a0a0b8', borderRadius: 7 }} />
            <div style={{ width: 36, height: 14, background: '#a0a0b8', borderRadius: 7 }} />
          </div>
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', opacity: 1 - separationProgress }}>
            <Taiji size={120} rotation={rotation} />
          </div>
        </div>
      </div>
    );
  }

  if (homePhase === 1) {
    return (
      <div style={s.center}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h2 style={{ fontSize: 26, fontWeight: 300, marginBottom: 8 }}>第一层：二进制逻辑 Layer 1: Binary Logic</h2>
          <p style={{ fontSize: 14, color: theme.sub }}>Yang = 1, Yin = 0</p>
        </div>
        <div style={{ display: 'flex', gap: 32, marginBottom: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
          <GlassCard padding="24px" onClick={() => setHomePhase(2)} cornerRadius={16}>
            <div style={{ minWidth: 120 }}>
              <div style={{ width: 80, height: 14, background: '#c0c0d0', borderRadius: 7, margin: '0 auto' }} />
              <div style={{ textAlign: 'center', marginTop: 20 }}>
                <p style={{ fontSize: 22 }}>阳 Yang</p>
                <p style={{ fontSize: 36, fontFamily: 'monospace', fontWeight: 'bold', opacity: 0.6 }}>1</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard padding="24px" onClick={() => setHomePhase(2)} cornerRadius={16}>
            <div style={{ minWidth: 120 }}>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
                <div style={{ width: 32, height: 14, background: '#c0c0d0', borderRadius: 7 }} />
                <div style={{ width: 32, height: 14, background: '#c0c0d0', borderRadius: 7 }} />
              </div>
              <div style={{ textAlign: 'center', marginTop: 20 }}>
                <p style={{ fontSize: 22 }}>阴 Yin</p>
                <p style={{ fontSize: 36, fontFamily: 'monospace', fontWeight: 'bold', opacity: 0.6 }}>0</p>
              </div>
            </div>
          </GlassCard>
        </div>
        <div style={{ ...s.card, padding: 20 }}>
          <p style={{ fontSize: 12, textAlign: 'center', marginBottom: 16, color: theme.sub }}>四象 Four Images · 2-bit</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            {Object.entries(fourImages).map(([c, info]) => (
              <div key={c} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 14px', borderRadius: 12, background: info.flip ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)' }}>
                <span style={{ fontFamily: 'monospace', fontSize: 15, color: theme.sub }}>{c}</span>
                <span style={{ fontSize: 13, color: theme.sub, marginTop: 4 }}>{info.name} · {info.nameEn}</span>
                {info.flip && <span style={{ fontSize: 11, color: '#aaa', marginTop: 2 }}>{info.t}</span>}
              </div>
            ))}
          </div>
        </div>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); resetAll(); }} style={{ marginTop: 28, background: 'none', border: 'none', fontSize: 13, color: '#999', cursor: 'pointer' }}>← 重新开始 Restart</button>
      </div>
    );
  }

  if (homePhase === 2) {
    return (
      <div style={s.center}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <h2 style={{ fontSize: 26, fontWeight: 300, marginBottom: 8 }}>第二层：八卦 (3-bit) Layer 2: Eight Trigrams</h2>
          <p style={{ fontSize: 14, color: theme.sub }}>自下而上构建 Built bottom-up</p>
        </div>
        <div style={{ ...s.card, minWidth: 280, maxWidth: 320, marginBottom: 24 }}>
          <div style={{ minHeight: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {currentTrigram.length === 0 ? (
              <p style={{ color: '#bbb' }}>选择爻线 Select lines</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 10 }}>
                {currentTrigram.map((v, i) => <Line key={i} isYang={v === 1} w={80} h={12} />)}
              </div>
            )}
          </div>
          {currentTrigram.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: 20, paddingTop: 20, borderTop: `1px solid ${theme.border}` }}>
              <p style={{ fontFamily: 'monospace', fontSize: 22, letterSpacing: 6, color: theme.sub }}>{currentTrigram.join('')}</p>
              {trigramKey && trigramInfo[trigramKey] && (
                <div style={{ marginTop: 16 }}>
                  <p style={{ fontSize: 40 }}>{trigramInfo[trigramKey].symbol}</p>
                  <p style={{ fontSize: 22, marginTop: 8 }}>{trigramInfo[trigramKey].name} · {trigramInfo[trigramKey].element} {trigramInfo[trigramKey].elementEn}</p>
                </div>
              )}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
          <button type="button" onMouseDown={(e) => { e.preventDefault(); currentTrigram.length < 3 && addLine(1); }} disabled={currentTrigram.length >= 3} style={{ ...s.card, padding: 18, cursor: currentTrigram.length >= 3 ? 'default' : 'pointer', opacity: currentTrigram.length >= 3 ? 0.3 : 1, border: 'none' }}>
            <div style={{ width: 56, height: 10, background: '#a0a0b8', borderRadius: 5, margin: '0 auto' }} />
            <span style={{ display: 'block', fontSize: 14, marginTop: 10, color: theme.sub }}>阳 Yang (1)</span>
          </button>
          <button type="button" onMouseDown={(e) => { e.preventDefault(); currentTrigram.length < 3 && addLine(0); }} disabled={currentTrigram.length >= 3} style={{ ...s.card, padding: 18, cursor: currentTrigram.length >= 3 ? 'default' : 'pointer', opacity: currentTrigram.length >= 3 ? 0.3 : 1, border: 'none' }}>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <div style={{ width: 22, height: 10, background: '#a0a0b8', borderRadius: 5 }} />
              <div style={{ width: 22, height: 10, background: '#a0a0b8', borderRadius: 5 }} />
            </div>
            <span style={{ display: 'block', fontSize: 14, marginTop: 10, color: theme.sub }}>阴 Yin (0)</span>
          </button>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button type="button" onMouseDown={(e) => { e.preventDefault(); setCurrentTrigram([]); }} style={{ padding: '10px 20px', background: 'none', border: 'none', fontSize: 14, color: theme.sub, cursor: 'pointer' }}>重置 Reset</button>
          {currentTrigram.length === 3 && <button type="button" onMouseDown={(e) => { e.preventDefault(); setAsLower(); }} style={{ ...s.btn, background: 'rgba(96,165,250,0.3)', color: '#fff' }}>设为下卦 Set as Lower →</button>}
        </div>
        <div style={{ marginTop: 36, maxWidth: 380 }}>
          <p style={{ fontSize: 12, textAlign: 'center', marginBottom: 14, color: '#999' }}>八卦 Eight Trigrams · 3-bit</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {Object.entries(trigramInfo).map(([c, info]) => (
              <div key={c} style={{ ...s.card, padding: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: 24 }}>{info.symbol}</span>
                <span style={{ fontSize: 14, marginTop: 4 }}>{info.name}</span>
                <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#888' }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); setHomePhase(1); }} style={{ marginTop: 28, background: 'none', border: 'none', fontSize: 13, color: '#999', cursor: 'pointer' }}>← 返回 Back</button>
      </div>
    );
  }

  if (homePhase === 3) {
    return (
      <div style={s.center}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <h2 style={{ fontSize: 26, fontWeight: 300, marginBottom: 8 }}>第三层：六十四卦 (6-bit) Layer 3: 64 Hexagrams</h2>
          <p style={{ fontSize: 14, color: theme.sub }}>下卦 + 上卦 Lower + Upper</p>
        </div>
        <div style={{ ...s.card, minWidth: 300, maxWidth: 360, marginBottom: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {upperTrigram ? (
              <div style={{ marginBottom: 12 }}>
                <p style={{ fontSize: 12, textAlign: 'center', marginBottom: 10, color: theme.sub }}>上卦 Upper · {trigramInfo[upperTrigram]?.name}</p>
                <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 8 }}>
                  {upperTrigram.split('').map((b, i) => <Line key={`u-${i}`} isYang={b === '1'} w={70} h={10} />)}
                </div>
              </div>
            ) : (
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 14, marginBottom: 14, color: theme.sub }}>构建上卦 Build Upper Trigram</p>
                {currentTrigram.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 8, marginBottom: 14 }}>
                    {currentTrigram.map((v, i) => <Line key={i} isYang={v === 1} w={70} h={10} />)}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
                  <button type="button" onMouseDown={(e) => { e.preventDefault(); currentTrigram.length < 3 && addLine(1); }} disabled={currentTrigram.length >= 3} style={{ padding: 10, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: 'none', cursor: currentTrigram.length >= 3 ? 'default' : 'pointer', opacity: currentTrigram.length >= 3 ? 0.3 : 1 }}>
                    <div style={{ width: 44, height: 8, background: '#a0a0b8', borderRadius: 4 }} />
                  </button>
                  <button type="button" onMouseDown={(e) => { e.preventDefault(); currentTrigram.length < 3 && addLine(0); }} disabled={currentTrigram.length >= 3} style={{ padding: 10, borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: 'none', cursor: currentTrigram.length >= 3 ? 'default' : 'pointer', opacity: currentTrigram.length >= 3 ? 0.3 : 1 }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <div style={{ width: 18, height: 8, background: '#1a1a1a', borderRadius: 4 }} />
                      <div style={{ width: 18, height: 8, background: '#1a1a1a', borderRadius: 4 }} />
                    </div>
                  </button>
                </div>
                {currentTrigram.length === 3 && (
                  <button type="button" onMouseDown={(e) => { e.preventDefault(); setAsUpper(); }} style={{ marginTop: 14, padding: '6px 18px', borderRadius: 50, fontSize: 13, background: 'rgba(96,165,250,0.3)', color: '#fff', border: 'none', cursor: 'pointer' }}>确认上卦 Confirm Upper</button>
                )}
              </div>
            )}
            {upperTrigram && lowerTrigram && <div style={{ width: '100%', borderTop: `1px solid ${theme.border}`, margin: '14px 0' }} />}
            <div style={{ marginTop: 12 }}>
              <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 8 }}>
                {lowerTrigram!.split('').map((b, i) => <Line key={`l-${i}`} isYang={b === '1'} w={70} h={10} />)}
              </div>
              <p style={{ fontSize: 12, textAlign: 'center', marginTop: 10, color: theme.sub }}>下卦 Lower · {trigramInfo[lowerTrigram!]?.name}</p>
            </div>
            {fullHex && (
              <div style={{ marginTop: 28, paddingTop: 20, textAlign: 'center', width: '100%', borderTop: `1px solid ${theme.border}` }}>
                <p style={{ fontFamily: 'monospace', fontSize: 20, letterSpacing: 6, color: theme.accent }}>{fullHex}</p>
                <p style={{ fontSize: 12, color: '#aaa', marginTop: 4 }}>十进制 Decimal: {parseInt(fullHex, 2)}</p>
                {hexData && (
                  <>
                    <p style={{ fontSize: 32, marginTop: 12 }}>第 {hexData.num} 卦 Hexagram {hexData.num} · {hexData.name}</p>
                    <p style={{ fontSize: 18, color: theme.sub }}>{hexData.nameEn} · {hexData.meaning}</p>
                    <div style={{ marginTop: 18, padding: 14, borderRadius: 12, background: 'rgba(96,165,250,0.1)' }}>
                      <p style={{ fontSize: 14, fontFamily: 'monospace', color: theme.accent }}>{hexData.state}</p>
                      <p style={{ fontSize: 14, color: theme.sub, marginTop: 4 }}>{hexData.desc} · {hexData.descEn}</p>
                    </div>
                    <div style={{ marginTop: 20, textAlign: 'left' }}>
                      <LinesSection hex={hexData} compact={true} />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 14 }}>
          <button type="button" onMouseDown={(e) => { e.preventDefault(); resetAll(); }} style={{ padding: '12px 22px', borderRadius: 50, fontSize: 14, color: theme.sub, background: 'transparent', border: `1px solid ${theme.border}`, cursor: 'pointer' }}>重新开始 Restart</button>
          <button type="button" onMouseDown={(e) => { e.preventDefault(); setUpperTrigram(null); setCurrentTrigram([]); }} style={{ ...s.btn, background: 'rgba(96,165,250,0.3)', color: '#fff' }}>换上卦 Change Upper</button>
        </div>
      </div>
    );
  }

  return null;
}
