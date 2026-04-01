'use client';

import React, { useState } from 'react';
import Hexagram from '@/components/Hexagram';
import HexagramInteractive from '@/components/HexagramInteractive';
import LinesSection from '@/components/LinesSection';
import { hexagramsData, type HexagramData } from '@/data/hexagrams';
import { trigramInfo } from '@/data/trigrams';
import { theme, s } from '@/lib/theme';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import { useHexLangMode, useSetHexLangMode } from '@/contexts/AppProviders';

export default function HexagramsPage() {
  const [selectedHexagram, setSelectedHexagram] = useState<HexagramData | null>(null);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const hexLangMode = useHexLangMode();
  const setHexLangMode = useSetHexLangMode();

  const randomHexagram = () => {
    const h = hexagramsData[Math.floor(Math.random() * hexagramsData.length)];
    setSelectedHexagram(h);
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <h1 style={{ fontSize: 32, fontWeight: 300, marginBottom: 8 }}>六十四卦 · 64 Hexagrams</h1>
        <p style={{ fontSize: 15, color: theme.sub }}>64 Hexagrams · 6-bit State Space</p>
      </div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {(['both', 'cn', 'en'] as const).map((mode) => (
            <button key={mode} type="button" onMouseDown={(e) => { e.preventDefault(); setHexLangMode(mode); }} style={{ padding: '8px 16px', borderRadius: 8, border: `1px solid ${theme.border}`, background: hexLangMode === mode ? 'rgba(96,165,250,0.3)' : 'rgba(255,255,255,0.04)', color: hexLangMode === mode ? '#fff' : theme.sub, fontSize: 14, cursor: 'pointer' }}>
              {mode === 'both' ? '中英' : mode === 'cn' ? '中文' : 'English'}
            </button>
          ))}
        </div>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); randomHexagram(); }} style={{ padding: '8px 20px', borderRadius: 8, border: `1px solid ${theme.accent}`, background: 'rgba(96,165,250,0.3)', color: '#fff', fontSize: 14, cursor: 'pointer' }}>随机一卦</button>
      </div>
      {selectedHexagram ? (
        <GlassCard>
          <div style={{ marginBottom: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button type="button" onMouseDown={(e) => { e.preventDefault(); setSelectedHexagram(null); }} style={{ background: 'none', border: 'none', fontSize: 14, color: theme.sub, cursor: 'pointer' }}>← 返回 Back</button>
            <button type="button" onMouseDown={(e) => { e.preventDefault(); randomHexagram(); }} style={{ padding: '6px 14px', borderRadius: 6, border: `1px solid ${theme.accent}`, background: 'rgba(96,165,250,0.3)', color: '#fff', fontSize: 13, cursor: 'pointer' }}>随机一卦</button>
          </div>
          <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'visible' }}>
              <div style={{ padding: '20px 20px 20px 24px', borderRadius: 12, marginBottom: 18, background: 'rgba(255,255,255,0.04)', overflow: 'visible', display: 'inline-block' }}>
                <HexagramInteractive hex={selectedHexagram} />
              </div>
              <p style={{ fontSize: 12, color: theme.sub, marginBottom: 8 }}>鼠标悬停爻线查看释义 Hover over lines for line statements</p>
              <p style={{ fontFamily: 'monospace', fontSize: 20, color: theme.accent }}>{selectedHexagram.binary}</p>
              <p style={{ fontSize: 12, color: '#999', marginTop: 4 }}>十进制 Decimal: {parseInt(selectedHexagram.binary, 2)}</p>
              <div style={{ display: 'flex', gap: 28, marginTop: 20 }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 12, color: '#999' }}>上卦 Upper</p>
                  <p style={{ fontSize: 28 }}>{trigramInfo[selectedHexagram.binary.slice(3)]?.symbol}</p>
                  <p style={{ fontSize: 14 }}>{trigramInfo[selectedHexagram.binary.slice(3)]?.name}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 12, color: '#999' }}>下卦 Lower</p>
                  <p style={{ fontSize: 28 }}>{trigramInfo[selectedHexagram.binary.slice(0, 3)]?.symbol}</p>
                  <p style={{ fontSize: 14 }}>{trigramInfo[selectedHexagram.binary.slice(0, 3)]?.name}</p>
                </div>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 280 }}>
              <span style={{ display: 'inline-block', fontSize: 14, padding: '6px 16px', borderRadius: 50, background: 'rgba(96,165,250,0.3)', color: '#fff' }}>第 {selectedHexagram.num} 卦 Hexagram {selectedHexagram.num}</span>
              <h2 style={{ fontSize: 52, marginTop: 18, marginBottom: 10 }}>{selectedHexagram.name}</h2>
              <p style={{ fontSize: 26, marginBottom: 6, color: theme.sub }}>{selectedHexagram.nameEn}</p>
              <p style={{ fontSize: 18, marginBottom: 20, color: '#888' }}>{selectedHexagram.meaning} · {selectedHexagram.meaningEn}</p>
              <div style={{ padding: 18, borderRadius: 12, marginBottom: 18, background: 'rgba(255,255,255,0.05)', border: `1px solid ${theme.border}` }}>
                <p style={{ fontSize: 12, marginBottom: 6, color: theme.sub }}>系统状态 System State</p>
                <p style={{ fontSize: 20, fontFamily: 'monospace', color: theme.text }}>{selectedHexagram.state}</p>
                <p style={{ fontSize: 14, marginTop: 6 }}>{selectedHexagram.desc} · {selectedHexagram.descEn}</p>
              </div>
              <div style={{ padding: 18, borderRadius: 12, marginBottom: 18, background: 'rgba(255,255,255,0.04)' }}>
                <p style={{ fontSize: 12, marginBottom: 10, color: '#999' }}>关键词 Keywords</p>
                <p style={{ fontSize: 15 }}>{selectedHexagram.kw} · {selectedHexagram.kwEn}</p>
              </div>
              <div style={{ padding: 18, borderRadius: 12, background: 'rgba(255,255,255,0.03)', borderLeft: `4px solid ${theme.border}` }}>
                <p style={{ fontSize: 12, marginBottom: 10, color: '#999' }}>象辞 Image Statement</p>
                <p style={{ fontStyle: 'italic', fontSize: 15 }}>{selectedHexagram.img} · {selectedHexagram.imgEn}</p>
              </div>
              <div style={{ marginTop: 20 }}>
                <LinesSection hex={selectedHexagram} />
              </div>
            </div>
          </div>
        </GlassCard>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 8 }}>
          {hexagramsData.map((h) => (
            <button
              type="button"
              key={h.num}
              onMouseDown={(e) => { e.preventDefault(); setSelectedHexagram(h); }}
              onMouseEnter={() => setHoveredNode(h.num)}
              onMouseLeave={() => setHoveredNode(null)}
              style={{
                padding: 10, borderRadius: 10,
                border: hoveredNode === h.num ? `2px solid ${theme.accent}` : `1px solid ${theme.border}`,
                background: hoveredNode === h.num ? 'rgba(96,165,250,0.12)' : 'rgba(255,255,255,0.04)',
                cursor: 'pointer', transition: 'all 0.2s',
                transform: hoveredNode === h.num ? 'scale(1.12)' : 'scale(1)',
                zIndex: hoveredNode === h.num ? 10 : 1,
                position: 'relative',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
              }}
            >
              <span style={{ fontSize: 11, color: '#999' }}>{h.num}</span>
              <div style={{ margin: '5px 0' }}><Hexagram binary={h.binary} size="tiny" /></div>
              <span style={{ fontSize: 15, fontWeight: 500 }}>{h.name}</span>
              <span style={{ fontSize: 11, color: theme.sub }}>{h.nameEn}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
