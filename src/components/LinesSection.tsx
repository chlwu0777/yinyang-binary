'use client';

import React from 'react';
import { useLinesByHex, useHexLangMode } from '@/contexts/AppProviders';
import { theme } from '@/lib/theme';
import type { HexagramData } from '@/data/hexagrams';

function getLinesForHex(hexNum: number, linesByHex: Record<number, unknown[]> | null) {
  if (linesByHex && linesByHex[hexNum]) return linesByHex[hexNum] as Array<{ cn: string; en: string; plainCn?: string; plainEn?: string }>;
  return null;
}

const LINE_LABELS = ['初 Initial', '二 2nd', '三 3rd', '四 4th', '五 5th', '上 Top'];

function ArrowUp() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0', color: theme.sub, opacity: 0.7 }}>
      <span style={{ fontSize: 14 }}>↑</span>
    </div>
  );
}

export default function LinesSection({ hex, compact = false }: { hex: HexagramData | null | undefined; compact?: boolean }) {
  const linesByHex = useLinesByHex();
  const langMode = useHexLangMode();
  const showCn = langMode === 'both' || langMode === 'cn';
  const showEn = langMode === 'both' || langMode === 'en';
  const lines = hex ? getLinesForHex(hex.num, linesByHex) : null;

  if (!hex || !lines) return null;

  const order = [5, 4, 3, 2, 1, 0];

  if (compact) {
    return (
      <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${theme.border}` }}>
        <p style={{ fontSize: 11, color: theme.sub, marginBottom: 6 }}>六爻 / Line Statements</p>
        <p style={{ fontSize: 10, color: theme.sub, marginBottom: 8, fontStyle: 'italic' }}>自初爻至上爻，事物发展递进 / From bottom to top, development unfolds</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {order.map((idx, i) => (
            <React.Fragment key={idx}>
              {i > 0 && <ArrowUp />}
              <div style={{ fontSize: 12, color: theme.text }}>
                <span style={{ fontFamily: 'monospace', color: theme.sub, marginRight: 8 }}>{LINE_LABELS[idx]}</span>
                {showCn && <span>{lines[idx].cn}</span>}
                {showEn && <div style={{ fontSize: 11, color: theme.sub, marginTop: 2 }}>{lines[idx].en}</div>}
                {(lines[idx].plainCn || lines[idx].plainEn) && (showCn || showEn) && (
                  <div style={{ fontSize: 11, color: theme.sub, marginTop: 4, paddingTop: 4, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                    {showCn && lines[idx].plainCn && <div>白话 Vernacular: {lines[idx].plainCn}</div>}
                    {showEn && lines[idx].plainEn && <div style={{ marginTop: 2 }}>Vernacular: {lines[idx].plainEn}</div>}
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 18, borderRadius: 12, background: 'rgba(0,0,0,0.02)', border: `1px solid ${theme.border}` }}>
      <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 4, color: theme.text }}>六爻释义 / Line-by-Line</p>
      <p style={{ fontSize: 12, color: theme.sub, marginBottom: 14, lineHeight: 1.5 }}>每一卦描述事物的发展过程，自初爻至上爻依次递进。从下往上读，体会变化脉络。 / Each hexagram describes a process; read bottom to top.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {order.map((idx, i) => (
          <React.Fragment key={idx}>
            {i > 0 && <ArrowUp />}
            <div style={{ padding: '10px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.5)' }}>
              <p style={{ fontSize: 12, color: theme.sub, marginBottom: 4 }}>{LINE_LABELS[idx]} →</p>
              {showCn && <p style={{ fontSize: 14, marginBottom: 4 }}>{lines[idx].cn}</p>}
              {showEn && <p style={{ fontSize: 13, color: theme.sub, lineHeight: 1.5 }}>{lines[idx].en}</p>}
              {(lines[idx].plainCn || lines[idx].plainEn) && (showCn || showEn) && (
                <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${theme.border}` }}>
                  <p style={{ fontSize: 12, color: theme.sub, marginBottom: 2 }}>白话 · Vernacular</p>
                  {showCn && lines[idx].plainCn && <p style={{ fontSize: 13, marginBottom: 4, lineHeight: 1.5 }}>{lines[idx].plainCn}</p>}
                  {showEn && lines[idx].plainEn && <p style={{ fontSize: 12, color: theme.sub, lineHeight: 1.5 }}>{lines[idx].plainEn}</p>}
                </div>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
