'use client';

import React, { useState, useCallback } from 'react';
import GameBitLine from '@/components/GameBitLine';
import Hexagram from '@/components/Hexagram';
import LinesSection from '@/components/LinesSection';
import { hexagramsData } from '@/data/hexagrams';
import { trigramInfo } from '@/data/trigrams';
import { puzzles } from '@/data/puzzles';
import { getBit, toBinary, hammingDist, getHexInfo } from '@/lib/hexUtils';
import { layout } from '@/lib/theme';
import { t } from '@/lib/i18n';
import { useAppTheme, useLang } from '@/contexts/AppProviders';

export default function GamePage() {
  const theme = useAppTheme();
  const lang = useLang();
  const i = t(lang);
  const [gameMode, setGameMode] = useState<'menu' | 'sandbox' | 'puzzle' | 'explorer'>('menu');
  const [gameState, setGameState] = useState(0);
  const [targetState, setTargetState] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [maxMoves, setMaxMoves] = useState<number | null>(null);
  const [level, setLevel] = useState(1);
  const [animatingBit, setAnimatingBit] = useState<number | null>(null);
  const [showEpiphany, setShowEpiphany] = useState(false);
  const [explorerSelected, setExplorerSelected] = useState<number | null>(null);

  const flipBit = useCallback((p: number) => {
    setAnimatingBit(p);
    setTimeout(() => setAnimatingBit(null), 300);
    const n = gameState ^ (1 << p);
    setGameState(n);
    setMoves((m) => m + 1);
    if (targetState !== null && n === targetState && level >= 3 && !showEpiphany) {
      setTimeout(() => setShowEpiphany(true), 500);
    }
  }, [gameState, targetState, level, showEpiphany]);

  const resetGame = (mode: typeof gameMode, lvl = 1) => {
    setGameMode(mode);
    if (mode === 'puzzle') {
      const p = puzzles[lvl - 1];
      setLevel(lvl);
      setGameState(p.start);
      setTargetState(p.target);
      setMaxMoves(p.max);
    } else {
      setGameState(0);
      setTargetState(null);
      setMaxMoves(null);
    }
    setMoves(0);
    setShowEpiphany(false);
  };

  if (gameMode === 'menu') {
    return (
      <div style={{ ...layout.center, padding: 16 }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h1 style={{ fontSize: 52, fontWeight: 300, letterSpacing: 6, marginBottom: 18, color: theme.text }}>{i.game.title}</h1>
          <p style={{ fontSize: 19, color: theme.sub, marginBottom: 10 }}>{i.game.subtitle}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, width: '100%', maxWidth: 340 }}>
          <button type="button" onMouseDown={(e) => { e.preventDefault(); resetGame('sandbox'); }} style={{ padding: '20px 32px', borderRadius: 16, textAlign: 'left' as const, cursor: 'pointer', background: theme.card, border: `1px solid ${theme.border}` }}>
            <p style={{ fontSize: 20, color: theme.text, marginBottom: 6 }}>{i.game.sandbox}</p>
            <p style={{ fontSize: 13, color: theme.sub }}>{i.game.sandboxDesc}</p>
          </button>
          <button type="button" onMouseDown={(e) => { e.preventDefault(); resetGame('puzzle', 1); }} style={{ padding: '20px 32px', borderRadius: 16, textAlign: 'left' as const, cursor: 'pointer', background: theme.card, border: `1px solid ${theme.border}` }}>
            <p style={{ fontSize: 20, color: theme.text, marginBottom: 6 }}>{i.game.puzzle}</p>
            <p style={{ fontSize: 13, color: theme.sub }}>{i.game.puzzleDesc}</p>
          </button>
          <button type="button" onMouseDown={(e) => { e.preventDefault(); setGameMode('explorer'); }} style={{ padding: '20px 32px', borderRadius: 16, textAlign: 'left' as const, cursor: 'pointer', background: theme.card, border: `1px solid ${theme.border}` }}>
            <p style={{ fontSize: 20, color: theme.text, marginBottom: 6 }}>{i.game.explorer}</p>
            <p style={{ fontSize: 13, color: theme.sub }}>{i.game.explorerDesc}</p>
          </button>
        </div>
        <p style={{ position: 'absolute', bottom: 36, fontSize: 13, color: theme.sub, textAlign: 'center' }}>{i.game.footer}</p>
      </div>
    );
  }

  if (gameMode === 'sandbox') {
    const info = getHexInfo(gameState);
    const lower = gameState & 7;
    const upper = (gameState >> 3) & 7;
    return (
      <div style={{ ...layout.center, padding: 16 }}>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); setGameMode('menu'); }} style={{ position: 'absolute', top: 88, left: 20, background: 'none', border: 'none', color: theme.sub, cursor: 'pointer', fontSize: 14 }}>{i.common.back}</button>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <h2 style={{ fontSize: 26, fontWeight: 300, marginBottom: 10, color: theme.text }}>{i.game.sandbox}</h2>
          <p style={{ fontSize: 14, color: theme.sub }}>{i.game.flipHint}</p>
        </div>
        <div style={{ display: 'flex', gap: 36, alignItems: 'flex-start', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ ...layout.card(theme), padding: 28 }}>
            <p style={{ fontSize: 12, color: theme.sub, marginBottom: 10, textAlign: 'center' }}>{lang === 'cn' ? '上卦' : 'Upper'} · {trigramInfo[toBinary(upper, 3)]?.name}</p>
            <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 14, marginBottom: 18 }}>
              {[3, 4, 5].map((p) => (
                <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ fontSize: 12, color: theme.sub, width: 26 }}>{p + 1}</span>
                  <GameBitLine value={getBit(gameState, p)} position={p} canFlip={true} isAnimating={animatingBit === p} onFlip={flipBit} />
                </div>
              ))}
            </div>
            <div style={{ borderTop: `1px solid ${theme.divider}`, margin: '18px 0' }} />
            <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 14 }}>
              {[0, 1, 2].map((p) => (
                <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ fontSize: 12, color: theme.sub, width: 26 }}>{p + 1}</span>
                  <GameBitLine value={getBit(gameState, p)} position={p} canFlip={true} isAnimating={animatingBit === p} onFlip={flipBit} />
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: theme.sub, marginTop: 10, textAlign: 'center' }}>{lang === 'cn' ? '下卦' : 'Lower'} · {trigramInfo[toBinary(lower, 3)]?.name}</p>
          </div>
          <div style={{ ...layout.card(theme), padding: 28, minWidth: 220 }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 32, letterSpacing: 6, color: theme.text, marginBottom: 10, textAlign: 'center' }}>{toBinary(gameState)}</p>
            <p style={{ fontSize: 13, color: theme.sub, textAlign: 'center', marginBottom: 20 }}>{lang === 'cn' ? '十进制' : 'Decimal'}: {gameState}</p>
            {info && (
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 48, marginBottom: 6 }}>{lang === 'cn' ? info.name : info.nameEn}</p>
                <p style={{ fontSize: 20, color: theme.sub, marginBottom: 6 }}>{lang === 'cn' ? info.nameEn : info.name}</p>
                <p style={{ fontSize: 14, color: theme.sub, marginBottom: 16 }}>#{info.num}</p>
                <div style={{ padding: '14px 18px', borderRadius: 12, background: theme.subtleBg, border: `1px solid ${theme.border}` }}>
                  <p style={{ fontSize: 15, fontFamily: "'JetBrains Mono', monospace", color: theme.text }}>{info.state}</p>
                  <p style={{ fontSize: 13, color: theme.sub, marginTop: 6 }}>{lang === 'cn' ? info.desc : info.descEn} · {lang === 'cn' ? info.descEn : info.desc}</p>
                </div>
                <div style={{ marginTop: 16, textAlign: 'left' }}>
                  <LinesSection hex={info} compact={true} />
                </div>
              </div>
            )}
            <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${theme.divider}` }}>
              <p style={{ fontSize: 13, color: theme.sub }}>{i.game.moves}: {moves}</p>
              <button type="button" onMouseDown={(e) => { e.preventDefault(); setGameState(0); setMoves(0); }} style={{ marginTop: 10, background: 'none', border: 'none', fontSize: 13, color: theme.sub, cursor: 'pointer' }}>{i.common.reset}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameMode === 'puzzle') {
    const puzzle = puzzles[level - 1];
    const info = getHexInfo(gameState);
    const targetInfo = getHexInfo(targetState!);
    const distance = hammingDist(gameState, targetState!);
    const isWin = gameState === targetState;
    const isLose = !!(maxMoves && moves >= maxMoves && !isWin);

    return (
      <div style={{ ...layout.center, padding: 16, position: 'relative' }}>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); setGameMode('menu'); }} style={{ position: 'absolute', top: 88, left: 20, background: 'none', border: 'none', color: theme.sub, cursor: 'pointer', fontSize: 14 }}>{i.common.back}</button>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <h2 style={{ fontSize: 26, fontWeight: 300, marginBottom: 10, color: theme.text }}>{i.game.level} {level}</h2>
          <p style={{ fontSize: 14, color: theme.sub }}>{lang === 'cn' ? puzzle?.hint : puzzle?.hintEn} · {lang === 'cn' ? puzzle?.hintEn : puzzle?.hint}</p>
        </div>
        {(isWin || isLose) && (
          <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, background: 'rgba(0,0,0,0.85)' }}>
            <div style={{ textAlign: 'center', padding: 36, borderRadius: 20, background: 'rgba(20,20,30,0.95)', border: isWin ? '2px solid #fff' : '2px solid #888' }}>
              {isWin ? (
                <>
                  <p style={{ fontSize: 48, marginBottom: 18 }}>&#x1F389;</p>
                  <p style={{ fontSize: 26, color: '#fff', marginBottom: 10 }}>{i.game.goalReached}</p>
                  <p style={{ fontSize: 15, color: '#ccc', marginBottom: 20 }}>{lang === 'cn' ? `用时 ${moves} 步` : `Completed in ${moves} moves`}</p>
                  {level < puzzles.length ? (
                    <button type="button" onMouseDown={(e) => { e.preventDefault(); resetGame('puzzle', level + 1); }} style={{ padding: '10px 28px', borderRadius: 10, background: '#fff', color: '#050508', border: 'none', cursor: 'pointer', fontSize: 15 }}>{i.game.next}</button>
                  ) : (
                    <p style={{ color: '#fff', fontSize: 16 }}>{i.game.allComplete}</p>
                  )}
                </>
              ) : (
                <>
                  <p style={{ fontSize: 48, marginBottom: 18 }}>&#x1F480;</p>
                  <p style={{ fontSize: 26, color: '#ccc', marginBottom: 10 }}>{i.game.outOfMoves}</p>
                  <button type="button" onMouseDown={(e) => { e.preventDefault(); resetGame('puzzle', level); }} style={{ padding: '10px 28px', borderRadius: 10, background: '#666', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 15 }}>{i.game.tryAgain}</button>
                </>
              )}
            </div>
          </div>
        )}
        <div style={{ display: 'flex', gap: 36, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ ...layout.card(theme), padding: 28 }}>
            <p style={{ fontSize: 13, color: theme.sub, marginBottom: 18, textAlign: 'center' }}>{i.game.current}</p>
            <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 10, marginBottom: 18 }}>
              {[0, 1, 2, 3, 4, 5].map((p) => <GameBitLine key={p} value={getBit(gameState, p)} position={p} canFlip={!isWin && !isLose} isAnimating={animatingBit === p} onFlip={flipBit} />)}
            </div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, color: theme.text, textAlign: 'center' }}>{toBinary(gameState)}</p>
            <p style={{ fontSize: 20, textAlign: 'center', marginTop: 10 }}>{lang === 'cn' ? info?.name : info?.nameEn}</p>
            {info && <div style={{ marginTop: 14 }}><LinesSection hex={info} compact={true} /></div>}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ fontSize: 32, color: theme.sub }}>→</p>
            <p style={{ fontSize: 13, color: theme.sub, marginTop: 10 }}>{i.game.distance}: {distance}</p>
          </div>
          <div style={{ ...layout.card(theme), padding: 28, borderColor: theme.border }}>
            <p style={{ fontSize: 13, color: theme.sub, marginBottom: 18, textAlign: 'center' }}>{i.game.target}</p>
            <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 10, marginBottom: 18 }}>
              {[0, 1, 2, 3, 4, 5].map((p) => <GameBitLine key={p} value={getBit(targetState!, p)} position={p} canFlip={false} isAnimating={false} />)}
            </div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, color: theme.sub, textAlign: 'center' }}>{toBinary(targetState!)}</p>
            <p style={{ fontSize: 20, textAlign: 'center', marginTop: 10 }}>{lang === 'cn' ? targetInfo?.name : targetInfo?.nameEn}</p>
          </div>
        </div>
        <div style={{ marginTop: 36, display: 'flex', gap: 36, textAlign: 'center' }}>
          <div><p style={{ fontSize: 28, fontFamily: "'JetBrains Mono', monospace", color: theme.text }}>{moves}</p><p style={{ fontSize: 13, color: theme.sub }}>{i.game.used}</p></div>
          <div><p style={{ fontSize: 28, fontFamily: "'JetBrains Mono', monospace", color: theme.text }}>{maxMoves}</p><p style={{ fontSize: 13, color: theme.sub }}>{i.game.max}</p></div>
          <div><p style={{ fontSize: 28, fontFamily: "'JetBrains Mono', monospace", color: maxMoves! - moves >= distance ? theme.text : theme.sub }}>{maxMoves! - moves}</p><p style={{ fontSize: 13, color: theme.sub }}>{i.game.left}</p></div>
        </div>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); resetGame('puzzle', level); }} style={{ marginTop: 20, background: 'none', border: 'none', fontSize: 13, color: theme.sub, cursor: 'pointer' }}>{i.game.resetLevel}</button>
      </div>
    );
  }

  if (gameMode === 'explorer') {
    return (
      <div style={{ padding: 16 }}>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); setGameMode('menu'); }} style={{ position: 'absolute', top: 88, left: 20, background: 'none', border: 'none', color: theme.sub, cursor: 'pointer', fontSize: 14 }}>{i.common.back}</button>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <h2 style={{ fontSize: 26, fontWeight: 300, marginBottom: 10, color: theme.text }}>{i.game.explorer} · 64-State</h2>
          <p style={{ fontSize: 14, color: theme.sub }}>{i.game.clickExplore}</p>
        </div>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 6 }}>
            {hexagramsData.map((h) => {
              const v = parseInt(h.binary, 2);
              return (
                <button type="button" key={h.num} onMouseDown={(e) => { e.preventDefault(); setExplorerSelected(v); }} style={{ aspectRatio: '1', padding: 6, borderRadius: 10, cursor: 'pointer', background: explorerSelected === v ? theme.subtleBg : theme.card, border: explorerSelected === v ? `2px solid ${theme.accent}` : `1px solid ${theme.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <p style={{ fontSize: 20, color: theme.text }}>{lang === 'cn' ? h.name : h.nameEn}</p>
                  <p style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: theme.sub }}>{v}</p>
                </button>
              );
            })}
          </div>
          {explorerSelected !== null && (
            <div style={{ marginTop: 28, padding: 28, borderRadius: 20, background: theme.card, border: `1px solid ${theme.border}` }}>
              <div style={{ display: 'flex', gap: 36, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Hexagram binary={toBinary(explorerSelected)} size="normal" glow={true} />
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", color: theme.text, marginTop: 12, fontSize: 18 }}>{toBinary(explorerSelected)}</p>
                  <p style={{ fontSize: 15, color: theme.text, marginTop: 6 }}>{lang === 'cn' ? getHexInfo(explorerSelected)?.name : getHexInfo(explorerSelected)?.nameEn} · {lang === 'cn' ? getHexInfo(explorerSelected)?.nameEn : getHexInfo(explorerSelected)?.name}</p>
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontSize: 14, color: theme.sub, marginBottom: 18 }}>{i.game.adjacent}:</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {[0, 1, 2, 3, 4, 5].map((bit) => {
                      const adj = explorerSelected ^ (1 << bit);
                      const adjInfo = getHexInfo(adj);
                      return (
                        <button type="button" key={bit} onMouseDown={(e) => { e.preventDefault(); setExplorerSelected(adj); }} style={{ padding: '6px 14px', borderRadius: 10, fontSize: 14, background: theme.subtleBg, border: `1px solid ${theme.border}`, cursor: 'pointer' }}>
                          <span style={{ color: theme.text }}>{lang === 'cn' ? adjInfo?.name : adjInfo?.nameEn}</span>
                          <span style={{ fontSize: 12, color: theme.sub, marginLeft: 6 }}>({adj})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div style={{ width: '100%', marginTop: 20 }}>
                  <LinesSection hex={getHexInfo(explorerSelected) ?? null} compact={true} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
