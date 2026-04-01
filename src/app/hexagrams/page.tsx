'use client';

import React, { useState } from 'react';
import Hexagram from '@/components/Hexagram';
import HexagramInteractive from '@/components/HexagramInteractive';
import LinesSection from '@/components/LinesSection';
import { hexagramsData, type HexagramData } from '@/data/hexagrams';
import { trigramInfo } from '@/data/trigrams';
import { layout } from '@/lib/theme';
import { t } from '@/lib/i18n';
import { useAppTheme, useLang } from '@/contexts/AppProviders';

export default function HexagramsPage() {
  const theme = useAppTheme();
  const lang = useLang();
  const i = t(lang);
  const [selectedHexagram, setSelectedHexagram] = useState<HexagramData | null>(null);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const randomHexagram = () => {
    const h = hexagramsData[Math.floor(Math.random() * hexagramsData.length)];
    setSelectedHexagram(h);
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <h1 style={{ fontSize: 32, fontWeight: 300, marginBottom: 8 }}>{i.hexagrams.title}</h1>
        <p style={{ fontSize: 15, color: theme.sub }}>{i.hexagrams.subtitle}</p>
      </div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); randomHexagram(); }} style={{ padding: '8px 20px', borderRadius: 8, border: `1px solid ${theme.accent}`, background: theme.accent, color: theme.bg, fontSize: 14, cursor: 'pointer' }}>{i.hexagrams.random}</button>
      </div>
      {selectedHexagram ? (
        <div style={layout.card(theme)}>
          <div style={{ marginBottom: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button type="button" onMouseDown={(e) => { e.preventDefault(); setSelectedHexagram(null); }} style={{ background: 'none', border: 'none', fontSize: 14, color: theme.sub, cursor: 'pointer' }}>{i.common.back}</button>
            <button type="button" onMouseDown={(e) => { e.preventDefault(); randomHexagram(); }} style={{ padding: '6px 14px', borderRadius: 6, border: `1px solid ${theme.accent}`, background: theme.accent, color: theme.bg, fontSize: 13, cursor: 'pointer' }}>{i.hexagrams.random}</button>
          </div>
          <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'visible' }}>
              <div style={{ padding: '20px 20px 20px 24px', borderRadius: 12, marginBottom: 18, background: theme.subtleBg, overflow: 'visible', display: 'inline-block' }}>
                <HexagramInteractive hex={selectedHexagram} />
              </div>
              <p style={{ fontSize: 12, color: theme.sub, marginBottom: 8 }}>{i.hexagrams.hoverHint}</p>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, color: theme.accent }}>{selectedHexagram.binary}</p>
              <p style={{ fontSize: 12, color: theme.sub, marginTop: 4 }}>{lang === 'cn' ? '十进制' : 'Decimal'}: {parseInt(selectedHexagram.binary, 2)}</p>
              <div style={{ display: 'flex', gap: 28, marginTop: 20 }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 12, color: theme.sub }}>{lang === 'cn' ? '上卦' : 'Upper'}</p>
                  <p style={{ fontSize: 28 }}>{trigramInfo[selectedHexagram.binary.slice(3)]?.symbol}</p>
                  <p style={{ fontSize: 14 }}>{trigramInfo[selectedHexagram.binary.slice(3)]?.name}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 12, color: theme.sub }}>{lang === 'cn' ? '下卦' : 'Lower'}</p>
                  <p style={{ fontSize: 28 }}>{trigramInfo[selectedHexagram.binary.slice(0, 3)]?.symbol}</p>
                  <p style={{ fontSize: 14 }}>{trigramInfo[selectedHexagram.binary.slice(0, 3)]?.name}</p>
                </div>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 280 }}>
              <span style={{ display: 'inline-block', fontSize: 14, padding: '6px 16px', borderRadius: 50, background: theme.accent, color: theme.bg }}>{lang === 'cn' ? `第 ${selectedHexagram.num} 卦` : `Hexagram ${selectedHexagram.num}`}</span>
              <h2 style={{ fontSize: 52, marginTop: 18, marginBottom: 10 }}>{lang === 'cn' ? selectedHexagram.name : selectedHexagram.nameEn}</h2>
              <p style={{ fontSize: 26, marginBottom: 6, color: theme.sub }}>{lang === 'cn' ? selectedHexagram.nameEn : selectedHexagram.name}</p>
              <p style={{ fontSize: 18, marginBottom: 20, color: theme.sub }}>{lang === 'cn' ? selectedHexagram.meaning : selectedHexagram.meaningEn} · {lang === 'cn' ? selectedHexagram.meaningEn : selectedHexagram.meaning}</p>
              <div style={{ padding: 18, borderRadius: 12, marginBottom: 18, background: theme.subtleBg, border: `1px solid ${theme.border}` }}>
                <p style={{ fontSize: 12, marginBottom: 6, color: theme.sub }}>{i.hexagrams.systemState}</p>
                <p style={{ fontSize: 20, fontFamily: "'JetBrains Mono', monospace", color: theme.text }}>{selectedHexagram.state}</p>
                <p style={{ fontSize: 14, marginTop: 6 }}>{lang === 'cn' ? selectedHexagram.desc : selectedHexagram.descEn} · {lang === 'cn' ? selectedHexagram.descEn : selectedHexagram.desc}</p>
              </div>
              <div style={{ padding: 18, borderRadius: 12, marginBottom: 18, background: theme.subtleBg }}>
                <p style={{ fontSize: 12, marginBottom: 10, color: theme.sub }}>{i.hexagrams.keywords}</p>
                <p style={{ fontSize: 15 }}>{lang === 'cn' ? selectedHexagram.kw : selectedHexagram.kwEn} · {lang === 'cn' ? selectedHexagram.kwEn : selectedHexagram.kw}</p>
              </div>
              <div style={{ padding: 18, borderRadius: 12, background: theme.subtleBg, borderLeft: `4px solid ${theme.border}` }}>
                <p style={{ fontSize: 12, marginBottom: 10, color: theme.sub }}>{i.hexagrams.imageStatement}</p>
                <p style={{ fontStyle: 'italic', fontSize: 15 }}>{lang === 'cn' ? selectedHexagram.img : selectedHexagram.imgEn} · {lang === 'cn' ? selectedHexagram.imgEn : selectedHexagram.img}</p>
              </div>
              <div style={{ marginTop: 20 }}>
                <LinesSection hex={selectedHexagram} />
              </div>
            </div>
          </div>
        </div>
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
                background: hoveredNode === h.num ? theme.subtleBg : theme.card,
                cursor: 'pointer', transition: 'all 0.2s',
                transform: hoveredNode === h.num ? 'scale(1.12)' : 'scale(1)',
                zIndex: hoveredNode === h.num ? 10 : 1,
                position: 'relative',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
              }}
            >
              <span style={{ fontSize: 11, color: theme.sub }}>{h.num}</span>
              <div style={{ margin: '5px 0' }}><Hexagram binary={h.binary} size="tiny" /></div>
              <span style={{ fontSize: 15, fontWeight: 500 }}>{lang === 'cn' ? h.name : h.nameEn}</span>
              <span style={{ fontSize: 11, color: theme.sub }}>{lang === 'cn' ? h.nameEn : h.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
