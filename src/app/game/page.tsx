'use client';

import React, { useState, useCallback } from 'react';
import GameBitLine from '@/components/GameBitLine';
import Hexagram from '@/components/Hexagram';
import LinesSection from '@/components/LinesSection';
import GlassCard from '@/components/ui/GlassCard';
import { hexagramsData } from '@/data/hexagrams';
import { trigramInfo } from '@/data/trigrams';
import { puzzles } from '@/data/puzzles';
import { getBit, toBinary, hammingDist, getHexInfo } from '@/lib/hexUtils';
import { theme, s } from '@/lib/theme';

export default function GamePage() {
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
      <div style={{ ...s.center, padding: 16 }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h1 style={{ fontSize: 52, fontWeight: 300, letterSpacing: 6, marginBottom: 18, color: theme.text }}>状态机 State Machine</h1>
          <p style={{ fontSize: 19, color: theme.sub, marginBottom: 10 }}>翻转比特，见证意义涌现 Flip bits, witness meaning emerge</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, width: '100%', maxWidth: 340 }}>
          <GlassCard cornerRadius={16} padding="20px 32px" onClick={() => resetGame('sandbox')}>
            <div style={{ cursor: 'pointer', textAlign: 'left' }}>
              <p style={{ fontSize: 20, color: theme.text, marginBottom: 6 }}>沙盒模式 · Sandbox</p>
              <p style={{ fontSize: 13, color: theme.sub }}>自由探索64态 Free exploration of 64 states</p>
            </div>
          </GlassCard>
          <GlassCard cornerRadius={16} padding="20px 32px" onClick={() => resetGame('puzzle', 1)}>
            <div style={{ cursor: 'pointer', textAlign: 'left' }}>
              <p style={{ fontSize: 20, color: theme.text, marginBottom: 6 }}>解谜模式 · Puzzle</p>
              <p style={{ fontSize: 13, color: theme.sub }}>状态迁移挑战 State transition challenge</p>
            </div>
          </GlassCard>
          <GlassCard cornerRadius={16} padding="20px 32px" onClick={() => setGameMode('explorer')}>
            <div style={{ cursor: 'pointer', textAlign: 'left' }}>
              <p style={{ fontSize: 20, color: theme.text, marginBottom: 6 }}>状态空间 · Explorer</p>
              <p style={{ fontSize: 13, color: theme.sub }}>64态可视化地图 64-state visual map</p>
            </div>
          </GlassCard>
        </div>
        <p style={{ position: 'absolute', bottom: 36, fontSize: 13, color: theme.sub, textAlign: 'center' }}>此状态机在三千多年前即被描述。 This state machine was described over 3000 years ago.</p>
      </div>
    );
  }

  if (gameMode === 'sandbox') {
    const info = getHexInfo(gameState);
    const lower = gameState & 7;
    const upper = (gameState >> 3) & 7;
    return (
      <div style={{ ...s.center, padding: 16 }}>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); setGameMode('menu'); }} style={{ position: 'absolute', top: 88, left: 20, background: 'none', border: 'none', color: theme.sub, cursor: 'pointer', fontSize: 14 }}>← 返回 Back</button>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <h2 style={{ fontSize: 26, fontWeight: 300, marginBottom: 10, color: theme.text }}>沙盒模式 Sandbox</h2>
          <p style={{ fontSize: 14, color: '#888' }}>点击比特翻转 Click to flip bits</p>
        </div>
        <div style={{ display: 'flex', gap: 36, alignItems: 'flex-start', flexWrap: 'wrap', justifyContent: 'center' }}>
          <GlassCard padding="28px">
            <p style={{ fontSize: 12, color: '#888', marginBottom: 10, textAlign: 'center' }}>上卦 Upper · {trigramInfo[toBinary(upper, 3)]?.name}</p>
            <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 14, marginBottom: 18 }}>
              {[3, 4, 5].map((p) => (
                <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ fontSize: 12, color: '#666', width: 26 }}>{p + 1}</span>
                  <GameBitLine value={getBit(gameState, p)} position={p} canFlip={true} isAnimating={animatingBit === p} onFlip={flipBit} />
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '18px 0' }} />
            <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 14 }}>
              {[0, 1, 2].map((p) => (
                <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ fontSize: 12, color: '#666', width: 26 }}>{p + 1}</span>
                  <GameBitLine value={getBit(gameState, p)} position={p} canFlip={true} isAnimating={animatingBit === p} onFlip={flipBit} />
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: '#888', marginTop: 10, textAlign: 'center' }}>下卦 Lower · {trigramInfo[toBinary(lower, 3)]?.name}</p>
          </GlassCard>
          <GlassCard padding="28px" style={{ minWidth: 220 }}>
            <p style={{ fontFamily: 'monospace', fontSize: 32, letterSpacing: 6, color: theme.text, marginBottom: 10, textAlign: 'center' }}>{toBinary(gameState)}</p>
            <p style={{ fontSize: 13, color: theme.sub, textAlign: 'center', marginBottom: 20 }}>十进制 Decimal: {gameState}</p>
            {info && (
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 48, marginBottom: 6 }}>{info.name}</p>
                <p style={{ fontSize: 20, color: theme.sub, marginBottom: 6 }}>{info.nameEn}</p>
                <p style={{ fontSize: 14, color: theme.sub, marginBottom: 16 }}>#{info.num}</p>
                <div style={{ padding: '14px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: `1px solid ${theme.border}` }}>
                  <p style={{ fontSize: 15, fontFamily: 'monospace', color: theme.text }}>{info.state}</p>
                  <p style={{ fontSize: 13, color: theme.sub, marginTop: 6 }}>{info.desc} · {info.descEn}</p>
                </div>
                <div style={{ marginTop: 16, textAlign: 'left' }}>
                  <LinesSection hex={info} compact={true} />
                </div>
              </div>
            )}
            <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <p style={{ fontSize: 13, color: '#888' }}>步数 Moves: {moves}</p>
              <button type="button" onMouseDown={(e) => { e.preventDefault(); setGameState(0); setMoves(0); }} style={{ marginTop: 10, background: 'none', border: 'none', fontSize: 13, color: '#aaa', cursor: 'pointer' }}>重置 Reset</button>
            </div>
          </GlassCard>
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
      <div style={{ ...s.center, padding: 16, position: 'relative' }}>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); setGameMode('menu'); }} style={{ position: 'absolute', top: 88, left: 20, background: 'none', border: 'none', color: theme.sub, cursor: 'pointer', fontSize: 14 }}>← 返回 Back</button>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <h2 style={{ fontSize: 26, fontWeight: 300, marginBottom: 10, color: theme.text }}>第 {level} 关 Level {level}</h2>
          <p style={{ fontSize: 14, color: '#888' }}>{puzzle?.hint} · {puzzle?.hintEn}</p>
        </div>
        {(isWin || isLose) && (
          <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, background: 'rgba(0,0,0,0.85)' }}>
            <div style={{ textAlign: 'center', padding: 36, borderRadius: 20, background: 'rgba(20,20,30,0.95)', border: isWin ? '2px solid #fff' : '2px solid #888' }}>
              {isWin ? (
                <>
                  <p style={{ fontSize: 48, marginBottom: 18 }}>&#x1F389;</p>
                  <p style={{ fontSize: 26, color: '#fff', marginBottom: 10 }}>达成目标！ Goal Reached!</p>
                  <p style={{ fontSize: 15, color: '#ccc', marginBottom: 20 }}>用时 {moves} 步 Completed in {moves} moves</p>
                  {level < puzzles.length ? (
                    <button type="button" onMouseDown={(e) => { e.preventDefault(); resetGame('puzzle', level + 1); }} style={{ padding: '10px 28px', borderRadius: 10, background: '#fff', color: '#0a0a12', border: 'none', cursor: 'pointer', fontSize: 15 }}>下一关 Next →</button>
                  ) : (
                    <p style={{ color: '#fff', fontSize: 16 }}>全部通关！ All Complete!</p>
                  )}
                </>
              ) : (
                <>
                  <p style={{ fontSize: 48, marginBottom: 18 }}>&#x1F480;</p>
                  <p style={{ fontSize: 26, color: '#ccc', marginBottom: 10 }}>步数用尽 Out of Moves</p>
                  <button type="button" onMouseDown={(e) => { e.preventDefault(); resetGame('puzzle', level); }} style={{ padding: '10px 28px', borderRadius: 10, background: '#666', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 15 }}>再试一次 Try Again</button>
                </>
              )}
            </div>
          </div>
        )}
        <div style={{ display: 'flex', gap: 36, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          <GlassCard padding="28px">
            <p style={{ fontSize: 13, color: '#888', marginBottom: 18, textAlign: 'center' }}>当前 Current</p>
            <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 10, marginBottom: 18 }}>
              {[0, 1, 2, 3, 4, 5].map((p) => <GameBitLine key={p} value={getBit(gameState, p)} position={p} canFlip={!isWin && !isLose} isAnimating={animatingBit === p} onFlip={flipBit} />)}
            </div>
            <p style={{ fontFamily: 'monospace', fontSize: 22, color: theme.text, textAlign: 'center' }}>{toBinary(gameState)}</p>
            <p style={{ fontSize: 20, textAlign: 'center', marginTop: 10 }}>{info?.name}</p>
            {info && <div style={{ marginTop: 14 }}><LinesSection hex={info} compact={true} /></div>}
          </GlassCard>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ fontSize: 32, color: theme.sub }}>→</p>
            <p style={{ fontSize: 13, color: theme.sub, marginTop: 10 }}>距离 Distance: {distance}</p>
          </div>
          <GlassCard padding="28px">
            <p style={{ fontSize: 13, color: theme.sub, marginBottom: 18, textAlign: 'center' }}>目标 Target</p>
            <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 10, marginBottom: 18 }}>
              {[0, 1, 2, 3, 4, 5].map((p) => <GameBitLine key={p} value={getBit(targetState!, p)} position={p} canFlip={false} isAnimating={false} />)}
            </div>
            <p style={{ fontFamily: 'monospace', fontSize: 22, color: theme.sub, textAlign: 'center' }}>{toBinary(targetState!)}</p>
            <p style={{ fontSize: 20, textAlign: 'center', marginTop: 10 }}>{targetInfo?.name}</p>
          </GlassCard>
        </div>
        <div style={{ marginTop: 36, display: 'flex', gap: 36, textAlign: 'center' }}>
          <div><p style={{ fontSize: 28, fontFamily: 'monospace', color: theme.text }}>{moves}</p><p style={{ fontSize: 13, color: theme.sub }}>已用 Used</p></div>
          <div><p style={{ fontSize: 28, fontFamily: 'monospace', color: theme.text }}>{maxMoves}</p><p style={{ fontSize: 13, color: theme.sub }}>上限 Max</p></div>
          <div><p style={{ fontSize: 28, fontFamily: 'monospace', color: maxMoves! - moves >= distance ? theme.text : theme.sub }}>{maxMoves! - moves}</p><p style={{ fontSize: 13, color: theme.sub }}>剩余 Left</p></div>
        </div>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); resetGame('puzzle', level); }} style={{ marginTop: 20, background: 'none', border: 'none', fontSize: 13, color: '#888', cursor: 'pointer' }}>重置本关 Reset Level</button>
      </div>
    );
  }

  if (gameMode === 'explorer') {
    return (
      <div style={{ padding: 16 }}>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); setGameMode('menu'); }} style={{ position: 'absolute', top: 88, left: 20, background: 'none', border: 'none', color: theme.sub, cursor: 'pointer', fontSize: 14 }}>← 返回 Back</button>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <h2 style={{ fontSize: 26, fontWeight: 300, marginBottom: 10, color: theme.text }}>状态空间 State Space · 64-State</h2>
          <p style={{ fontSize: 14, color: theme.sub }}>点击探索相邻状态 Click to explore adjacent states</p>
        </div>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 6 }}>
            {hexagramsData.map((h) => {
              const v = parseInt(h.binary, 2);
              return (
                <button type="button" key={h.num} onMouseDown={(e) => { e.preventDefault(); setExplorerSelected(v); }} style={{ aspectRatio: '1', padding: 6, borderRadius: 10, cursor: 'pointer', background: explorerSelected === v ? 'rgba(96,165,250,0.12)' : 'rgba(255,255,255,0.04)', border: explorerSelected === v ? `2px solid ${theme.accent}` : `1px solid ${theme.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <p style={{ fontSize: 20, color: theme.text }}>{h.name}</p>
                  <p style={{ fontSize: 11, fontFamily: 'monospace', color: theme.sub }}>{v}</p>
                </button>
              );
            })}
          </div>
          {explorerSelected !== null && (
            <GlassCard padding="28px" style={{ marginTop: 28 }}>
              <div style={{ display: 'flex', gap: 36, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Hexagram binary={toBinary(explorerSelected)} size="normal" glow={true} />
                  <p style={{ fontFamily: 'monospace', color: theme.text, marginTop: 12, fontSize: 18 }}>{toBinary(explorerSelected)}</p>
                  <p style={{ fontSize: 15, color: theme.text, marginTop: 6 }}>{getHexInfo(explorerSelected)?.name} · {getHexInfo(explorerSelected)?.nameEn}</p>
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontSize: 14, color: theme.sub, marginBottom: 18 }}>相邻状态 Adjacent (1-bit flip):</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {[0, 1, 2, 3, 4, 5].map((bit) => {
                      const adj = explorerSelected ^ (1 << bit);
                      const adjInfo = getHexInfo(adj);
                      return (
                        <button type="button" key={bit} onMouseDown={(e) => { e.preventDefault(); setExplorerSelected(adj); }} style={{ padding: '6px 14px', borderRadius: 10, fontSize: 14, background: 'rgba(255,255,255,0.06)', border: `1px solid ${theme.border}`, cursor: 'pointer' }}>
                          <span style={{ color: theme.text }}>{adjInfo?.name}</span>
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
            </GlassCard>
          )}
        </div>
      </div>
    );
  }

  return null;
}
