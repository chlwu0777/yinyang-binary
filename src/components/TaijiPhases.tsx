'use client';

import React, { useState, useEffect } from 'react';
import Taiji from './Taiji';
import Line from './Line';
import LinesSection from './LinesSection';
import { layout } from '@/lib/theme';
import { t } from '@/lib/i18n';
import { useAppTheme, useLang } from '@/contexts/AppProviders';
import { trigramInfo, fourImages } from '@/data/trigrams';
import { getHexInfo } from '@/lib/hexUtils';

export default function TaijiPhases() {
  const theme = useAppTheme();
  const lang = useLang();
  const i = t(lang);

  const [homePhase, setHomePhase] = useState(0);
  const [currentTrigram, setCurrentTrigram] = useState<number[]>([]);
  const [lowerTrigram, setLowerTrigram] = useState<string | null>(null);
  const [upperTrigram, setUpperTrigram] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [separationProgress, setSeparationProgress] = useState(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setRotation((r) => r + 0.15), 16);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    if (isAnimating && separationProgress < 1) {
      const tm = setTimeout(() => setSeparationProgress((p) => Math.min(p + 0.02, 1)), 16);
      return () => clearTimeout(tm);
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
      <div style={layout.center}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ ...layout.title(theme), fontSize: 42 }}>{i.home.title}</h1>
          <p style={{ fontSize: 15, color: theme.sub }}>{i.home.subtitle}</p>
        </div>
        <div style={{ ...layout.card(theme), display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 40 }}>
          <p style={{ fontSize: 12, color: theme.sub, marginBottom: 20 }}>{'PRE-BINARY · ' + i.home.preBinary}</p>
          <Taiji size={140} rotation={rotation} onClick={handleTaijiClick} interactive={true} />
          <p style={{ fontSize: 26, fontWeight: 300, marginTop: 28, color: theme.text }}>{i.home.taiji}</p>
          <p style={{ fontSize: 14, color: theme.sub }}>{i.home.taijiSub}</p>
        </div>
        <p style={{ fontSize: 13, color: theme.sub, marginTop: 40 }}>{i.home.clickStart}</p>
      </div>
    );
  }

  if (isAnimating) {
    const sp = separationProgress * 120;
    return (
      <div style={layout.center}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: 26, fontWeight: 300, color: theme.text }}>{i.home.analogDigital}</h2>
        </div>
        <div style={{ position: 'relative', width: 320, height: 200 }}>
          <div style={{ position: 'absolute', left: `calc(50% - ${sp}px - 45px)`, top: '50%', transform: 'translateY(-50%)', opacity: separationProgress }}>
            <div style={{ width: 90, height: 14, background: theme.placeholderLine, borderRadius: 7 }} />
          </div>
          <div style={{ position: 'absolute', left: `calc(50% + ${sp}px - 45px)`, top: '50%', transform: 'translateY(-50%)', opacity: separationProgress, display: 'flex', gap: 14 }}>
            <div style={{ width: 36, height: 14, background: theme.placeholderLine, borderRadius: 7 }} />
            <div style={{ width: 36, height: 14, background: theme.placeholderLine, borderRadius: 7 }} />
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
      <div style={layout.center}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h2 style={{ fontSize: 26, fontWeight: 300, marginBottom: 8, color: theme.text }}>{i.home.layer1}</h2>
          <p style={{ fontSize: 14, color: theme.sub }}>Yang = 1, Yin = 0</p>
        </div>
        <div style={{ display: 'flex', gap: 32, marginBottom: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button type="button" onMouseDown={(e) => { e.preventDefault(); setHomePhase(2); }} style={{ ...layout.card(theme), cursor: 'pointer', border: 'none', minWidth: 140 }}>
            <div style={{ width: 80, height: 14, background: theme.placeholderLine, borderRadius: 7, margin: '0 auto' }} />
            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <p style={{ fontSize: 22, color: theme.text }}>{i.home.yang}</p>
              <p style={{ fontSize: 36, fontFamily: 'monospace', fontWeight: 'bold', opacity: 0.6, color: theme.text }}>1</p>
            </div>
          </button>
          <button type="button" onMouseDown={(e) => { e.preventDefault(); setHomePhase(2); }} style={{ ...layout.card(theme), cursor: 'pointer', border: 'none', minWidth: 140 }}>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
              <div style={{ width: 32, height: 14, background: theme.placeholderLine, borderRadius: 7 }} />
              <div style={{ width: 32, height: 14, background: theme.placeholderLine, borderRadius: 7 }} />
            </div>
            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <p style={{ fontSize: 22, color: theme.text }}>{i.home.yin}</p>
              <p style={{ fontSize: 36, fontFamily: 'monospace', fontWeight: 'bold', opacity: 0.6, color: theme.text }}>0</p>
            </div>
          </button>
        </div>
        <div style={{ ...layout.card(theme), padding: 20 }}>
          <p style={{ fontSize: 12, textAlign: 'center', marginBottom: 16, color: theme.sub }}>{i.home.fourImages + ' · 2-bit'}</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            {Object.entries(fourImages).map(([c, info]) => (
              <div key={c} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 14px', borderRadius: 12, background: info.flip ? theme.subtleBg : 'transparent' }}>
                <span style={{ fontFamily: 'monospace', fontSize: 15, color: theme.sub }}>{c}</span>
                <span style={{ fontSize: 13, color: theme.sub, marginTop: 4 }}>{info.name} · {info.nameEn}</span>
                {info.flip && <span style={{ fontSize: 11, color: theme.sub, marginTop: 2 }}>{info.t}</span>}
              </div>
            ))}
          </div>
        </div>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); resetAll(); }} style={{ marginTop: 28, background: 'none', border: 'none', fontSize: 13, color: theme.sub, cursor: 'pointer' }}>{i.common.restart}</button>
      </div>
    );
  }

  if (homePhase === 2) {
    return (
      <div style={layout.center}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <h2 style={{ fontSize: 26, fontWeight: 300, marginBottom: 8, color: theme.text }}>{i.home.layer2}</h2>
          <p style={{ fontSize: 14, color: theme.sub }}>{i.home.builtBottomUp}</p>
        </div>
        <div style={{ ...layout.card(theme), minWidth: 280, maxWidth: 320, marginBottom: 24 }}>
          <div style={{ minHeight: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {currentTrigram.length === 0 ? (
              <p style={{ color: theme.sub }}>{i.home.selectLines}</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 10 }}>
                {currentTrigram.map((v, idx) => <Line key={idx} isYang={v === 1} w={80} h={12} />)}
              </div>
            )}
          </div>
          {currentTrigram.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: 20, paddingTop: 20, borderTop: `1px solid ${theme.border}` }}>
              <p style={{ fontFamily: 'monospace', fontSize: 22, letterSpacing: 6, color: theme.sub }}>{currentTrigram.join('')}</p>
              {trigramKey && trigramInfo[trigramKey] && (
                <div style={{ marginTop: 16 }}>
                  <p style={{ fontSize: 40, color: theme.text }}>{trigramInfo[trigramKey].symbol}</p>
                  <p style={{ fontSize: 22, marginTop: 8, color: theme.text }}>{trigramInfo[trigramKey].name} · {trigramInfo[trigramKey].element} {trigramInfo[trigramKey].elementEn}</p>
                </div>
              )}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
          <button type="button" onMouseDown={(e) => { e.preventDefault(); currentTrigram.length < 3 && addLine(1); }} disabled={currentTrigram.length >= 3} style={{ ...layout.card(theme), padding: 18, cursor: currentTrigram.length >= 3 ? 'default' : 'pointer', opacity: currentTrigram.length >= 3 ? 0.3 : 1, border: 'none' }}>
            <div style={{ width: 56, height: 10, background: theme.placeholderLine, borderRadius: 5, margin: '0 auto' }} />
            <span style={{ display: 'block', fontSize: 14, marginTop: 10, color: theme.sub }}>{i.home.yang + ' (1)'}</span>
          </button>
          <button type="button" onMouseDown={(e) => { e.preventDefault(); currentTrigram.length < 3 && addLine(0); }} disabled={currentTrigram.length >= 3} style={{ ...layout.card(theme), padding: 18, cursor: currentTrigram.length >= 3 ? 'default' : 'pointer', opacity: currentTrigram.length >= 3 ? 0.3 : 1, border: 'none' }}>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <div style={{ width: 22, height: 10, background: theme.placeholderLine, borderRadius: 5 }} />
              <div style={{ width: 22, height: 10, background: theme.placeholderLine, borderRadius: 5 }} />
            </div>
            <span style={{ display: 'block', fontSize: 14, marginTop: 10, color: theme.sub }}>{i.home.yin + ' (0)'}</span>
          </button>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button type="button" onMouseDown={(e) => { e.preventDefault(); setCurrentTrigram([]); }} style={{ padding: '10px 20px', background: 'none', border: 'none', fontSize: 14, color: theme.sub, cursor: 'pointer' }}>{i.common.reset}</button>
          {currentTrigram.length === 3 && <button type="button" onMouseDown={(e) => { e.preventDefault(); setAsLower(); }} style={{ ...layout.btn, background: theme.text, color: theme.bg }}>{i.home.setAsLower}</button>}
        </div>
        <div style={{ marginTop: 36, maxWidth: 380 }}>
          <p style={{ fontSize: 12, textAlign: 'center', marginBottom: 14, color: theme.sub }}>{i.home.eightTrigrams + ' · 3-bit'}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {Object.entries(trigramInfo).map(([c, info]) => (
              <div key={c} style={{ ...layout.card(theme), padding: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: 24, color: theme.text }}>{info.symbol}</span>
                <span style={{ fontSize: 14, marginTop: 4, color: theme.text }}>{info.name}</span>
                <span style={{ fontSize: 11, fontFamily: 'monospace', color: theme.sub }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); setHomePhase(1); }} style={{ marginTop: 28, background: 'none', border: 'none', fontSize: 13, color: theme.sub, cursor: 'pointer' }}>{i.common.back}</button>
      </div>
    );
  }

  if (homePhase === 3) {
    return (
      <div style={layout.center}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <h2 style={{ fontSize: 26, fontWeight: 300, marginBottom: 8, color: theme.text }}>{i.home.layer3}</h2>
          <p style={{ fontSize: 14, color: theme.sub }}>{i.home.lowerUpper}</p>
        </div>
        <div style={{ ...layout.card(theme), minWidth: 300, maxWidth: 360, marginBottom: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {upperTrigram ? (
              <div style={{ marginBottom: 12 }}>
                <p style={{ fontSize: 12, textAlign: 'center', marginBottom: 10, color: theme.sub }}>{i.home.upper} · {trigramInfo[upperTrigram]?.name}</p>
                <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 8 }}>
                  {upperTrigram.split('').map((b, idx) => <Line key={`u-${idx}`} isYang={b === '1'} w={70} h={10} />)}
                </div>
              </div>
            ) : (
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 14, marginBottom: 14, color: theme.sub }}>{i.home.buildUpper}</p>
                {currentTrigram.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 8, marginBottom: 14 }}>
                    {currentTrigram.map((v, idx) => <Line key={idx} isYang={v === 1} w={70} h={10} />)}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
                  <button type="button" onMouseDown={(e) => { e.preventDefault(); currentTrigram.length < 3 && addLine(1); }} disabled={currentTrigram.length >= 3} style={{ padding: 10, borderRadius: 10, background: theme.subtleBg, border: 'none', cursor: currentTrigram.length >= 3 ? 'default' : 'pointer', opacity: currentTrigram.length >= 3 ? 0.3 : 1 }}>
                    <div style={{ width: 44, height: 8, background: theme.placeholderLine, borderRadius: 4 }} />
                  </button>
                  <button type="button" onMouseDown={(e) => { e.preventDefault(); currentTrigram.length < 3 && addLine(0); }} disabled={currentTrigram.length >= 3} style={{ padding: 10, borderRadius: 10, background: theme.subtleBg, border: 'none', cursor: currentTrigram.length >= 3 ? 'default' : 'pointer', opacity: currentTrigram.length >= 3 ? 0.3 : 1 }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <div style={{ width: 18, height: 8, background: theme.text, borderRadius: 4 }} />
                      <div style={{ width: 18, height: 8, background: theme.text, borderRadius: 4 }} />
                    </div>
                  </button>
                </div>
                {currentTrigram.length === 3 && (
                  <button type="button" onMouseDown={(e) => { e.preventDefault(); setAsUpper(); }} style={{ marginTop: 14, padding: '6px 18px', borderRadius: 50, fontSize: 13, background: theme.accent, color: theme.bg, border: 'none', cursor: 'pointer' }}>{i.home.confirmUpper}</button>
                )}
              </div>
            )}
            {upperTrigram && lowerTrigram && <div style={{ width: '100%', borderTop: `1px solid ${theme.border}`, margin: '14px 0' }} />}
            <div style={{ marginTop: 12 }}>
              <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 8 }}>
                {lowerTrigram!.split('').map((b, idx) => <Line key={`l-${idx}`} isYang={b === '1'} w={70} h={10} />)}
              </div>
              <p style={{ fontSize: 12, textAlign: 'center', marginTop: 10, color: theme.sub }}>{i.home.lower} · {trigramInfo[lowerTrigram!]?.name}</p>
            </div>
            {fullHex && (
              <div style={{ marginTop: 28, paddingTop: 20, textAlign: 'center', width: '100%', borderTop: `1px solid ${theme.border}` }}>
                <p style={{ fontFamily: 'monospace', fontSize: 20, letterSpacing: 6, color: theme.accent }}>{fullHex}</p>
                <p style={{ fontSize: 12, color: theme.sub, marginTop: 4 }}>{i.home.decimal}: {parseInt(fullHex, 2)}</p>
                {hexData && (
                  <>
                    <p style={{ fontSize: 32, marginTop: 12, color: theme.text }}>{i.home.hexagram} {hexData.num} · {hexData.name}</p>
                    <p style={{ fontSize: 18, color: theme.sub }}>{hexData.nameEn} · {hexData.meaning}</p>
                    <div style={{ marginTop: 18, padding: 14, borderRadius: 12, background: 'rgba(202,138,4,0.06)' }}>
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
          <button type="button" onMouseDown={(e) => { e.preventDefault(); resetAll(); }} style={{ padding: '12px 22px', borderRadius: 50, fontSize: 14, color: theme.sub, background: 'transparent', border: `1px solid ${theme.border}`, cursor: 'pointer' }}>{i.common.restart}</button>
          <button type="button" onMouseDown={(e) => { e.preventDefault(); setUpperTrigram(null); setCurrentTrigram([]); }} style={{ ...layout.btn, background: theme.accent, color: theme.bg }}>{i.home.changeUpper}</button>
        </div>
      </div>
    );
  }

  return null;
}
