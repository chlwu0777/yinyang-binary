'use client';

import React, { useState, useEffect, useRef, useContext } from 'react';
import { LinesByHexContext, HexLangModeContext, useAppTheme } from '@/contexts/AppProviders';
import type { HexagramData } from '@/data/hexagrams';

const LINE_LABELS = ['初 Initial', '二 2nd', '三 3rd', '四 4th', '五 5th', '上 Top'];
const LINE_W = 72;
const LINE_H = 10;
const LINE_GAP = 4;

function getLinesForHex(hexNum: number, linesByHex: Record<number, unknown[]> | null) {
  if (linesByHex && linesByHex[hexNum]) return linesByHex[hexNum] as Array<{ cn: string; en: string; plainCn?: string; plainEn?: string }>;
  return null;
}

export default function HexagramInteractive({ hex }: { hex: HexagramData | null }) {
  const theme = useAppTheme();
  const linesByHex = useContext(LinesByHexContext);
  const langMode = useContext(HexLangModeContext);
  const rootRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [pinnedLine, setPinnedLine] = useState<number | null>(null);

  if (!hex) return null;
  const bits = hex.binary.split('');
  const lineData = getLinesForHex(hex.num, linesByHex);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const root = rootRef.current!;
    const tooltipEl = tooltipRef.current!;
    if (!root || !tooltipEl || !hex) return;
    const rows = root.querySelectorAll('[data-yao-line]') as NodeListOf<HTMLElement>;
    let currentHover: number | null = null;
    const currentPinned = pinnedLine;
    let leaveTimer: ReturnType<typeof setTimeout> | null = null;
    const lastMouse = { x: 0, y: 0 };
    const LEAVE_DELAY = 350;

    function applyHighlight(index: number | null) {
      const active = index !== null ? index : currentPinned;
      rows.forEach((row, j) => {
        const isActive = active === j;
        row.style.background = isActive ? theme.activeHighlight : 'transparent';
        const inner = row.querySelector('.yao-line-inner') as HTMLElement | null;
        if (!inner) return;
        const segs = inner.children as HTMLCollectionOf<HTMLElement>;
        const color = isActive ? (bits[j] === '1' ? theme.activeLine : theme.activeLineAlt) : (bits[j] === '1' ? theme.yangLine : theme.yinLine);
        for (let k = 0; k < segs.length; k++) {
          segs[k].style.background = color;
          segs[k].style.boxShadow = isActive && bits[j] === '1' ? '0 0 16px rgba(202,138,4,0.35)' : 'none';
        }
      });
      if (active !== null && tooltipEl && rows[active]) {
        const row = rows[active];
        const rootRect = root.getBoundingClientRect();
        const rowRect = row.getBoundingClientRect();
        const gap = 12;
        tooltipEl.style.left = (rootRect.width + gap) + 'px';
        tooltipEl.style.top = ((rowRect.top - rootRect.top) + rowRect.height / 2) + 'px';
        tooltipEl.style.transform = 'translateY(-50%)';
        tooltipEl.style.marginTop = '0';
        tooltipEl.style.display = 'block';
        const hintEl = tooltipEl.querySelector('.yao-tooltip-pin-hint') as HTMLElement | null;
        const labelEl = tooltipEl.querySelector('.yao-tooltip-label') as HTMLElement | null;
        const cnEl = tooltipEl.querySelector('.yao-tooltip-cn') as HTMLElement | null;
        const enEl = tooltipEl.querySelector('.yao-tooltip-en') as HTMLElement | null;
        const plainCnEl = tooltipEl.querySelector('.yao-tooltip-plain-cn') as HTMLElement | null;
        const plainEnEl = tooltipEl.querySelector('.yao-tooltip-plain-en') as HTMLElement | null;
        const plainWrap = tooltipEl.querySelector('.yao-tooltip-plain-wrap') as HTMLElement | null;
        if (hintEl) hintEl.style.display = currentPinned === active ? 'block' : 'none';
        if (labelEl) labelEl.textContent = LINE_LABELS[active] + ' · 爻辞 Line Statement';
        const ld = lineData && lineData[active];
        const showCn = langMode === 'both' || langMode === 'cn';
        const showEn = langMode === 'both' || langMode === 'en';
        if (cnEl) { cnEl.textContent = ld ? ld.cn : (showCn ? '暂无爻辞' : ''); cnEl.style.display = showCn ? 'block' : 'none'; }
        if (enEl) { enEl.textContent = ld ? ld.en : (showEn ? 'No line text loaded.' : ''); enEl.style.display = showEn ? 'block' : 'none'; }
        if (plainWrap) plainWrap.style.display = (ld && (ld.plainCn || ld.plainEn) && (showCn || showEn)) ? 'block' : 'none';
        if (plainCnEl) { plainCnEl.textContent = ld && ld.plainCn ? ld.plainCn : ''; plainCnEl.style.display = showCn ? 'block' : 'none'; }
        if (plainEnEl) { plainEnEl.textContent = ld && ld.plainEn ? ld.plainEn : ''; plainEnEl.style.display = showEn ? 'block' : 'none'; }
      } else {
        tooltipEl.style.display = 'none';
      }
    }

    function isInsideRoot(x: number, y: number) {
      const r = root.getBoundingClientRect();
      return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
    }

    function onOver(e: MouseEvent) {
      lastMouse.x = e.clientX;
      lastMouse.y = e.clientY;
      if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer = null; }
      const target = e.target as HTMLElement;
      const row = target.closest('[data-yao-line]') as HTMLElement | null;
      if (!row) return;
      const i = parseInt(row.getAttribute('data-yao-line')!, 10);
      if (isNaN(i) || i < 0 || i > 5) return;
      if (currentHover === i) return;
      currentHover = i;
      applyHighlight(i);
    }

    function onLeave() {
      if (leaveTimer) return;
      leaveTimer = setTimeout(() => {
        leaveTimer = null;
        if (isInsideRoot(lastMouse.x, lastMouse.y)) return;
        currentHover = null;
        applyHighlight(currentPinned);
      }, LEAVE_DELAY);
    }

    function onGlobalMove(e: MouseEvent) {
      lastMouse.x = e.clientX;
      lastMouse.y = e.clientY;
    }

    root.addEventListener('mouseover', onOver as EventListener, true);
    root.addEventListener('mouseleave', onLeave as EventListener, true);
    document.addEventListener('mousemove', onGlobalMove as EventListener, true);
    applyHighlight(pinnedLine);
    return () => {
      if (leaveTimer) clearTimeout(leaveTimer);
      root.removeEventListener('mouseover', onOver as EventListener, true);
      root.removeEventListener('mouseleave', onLeave as EventListener, true);
      document.removeEventListener('mousemove', onGlobalMove as EventListener, true);
    };
  }, [hex?.num, hex?.binary, pinnedLine, langMode, lineData, bits, theme]);

  const handleClick = (i: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setPinnedLine(pinnedLine === i ? null : i);
  };

  return (
    <div
      ref={rootRef}
      style={{
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'auto',
        paddingBottom: 12,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: LINE_GAP }}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            data-yao-line={i}
            role="button"
            tabIndex={0}
            title={lineData && lineData[i] ? lineData[i].cn : LINE_LABELS[i] + ' 爻 Line'}
            onClick={handleClick(i)}
            style={{
              cursor: 'pointer',
              minHeight: 28,
              padding: '6px 12px',
              borderRadius: 6,
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              outline: 'none',
              userSelect: 'none',
            }}
          >
            <div className="yao-line-inner" style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
              {bits[i] === '1' ? (
                <div style={{ width: LINE_W, height: LINE_H, background: theme.yangLine, borderRadius: 4, transition: 'all 0.2s' }} />
              ) : (
                <>
                  <div style={{ width: LINE_W * 0.42, height: LINE_H, background: theme.yinLine, borderRadius: 4, transition: 'all 0.2s' }} />
                  <div style={{ width: LINE_W * 0.42, height: LINE_H, background: theme.yinLine, borderRadius: 4, transition: 'all 0.2s' }} />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <div
        ref={tooltipRef}
        className="yao-tooltip"
        style={{
          display: 'none',
          position: 'absolute',
          left: 0,
          top: 0,
          transform: 'translateY(-50%)',
          marginTop: 0,
          minWidth: 300,
          maxWidth: 380,
          padding: '16px 20px',
          borderRadius: 12,
          background: theme.tooltipBg,
          border: theme.tooltipBorder,
          boxShadow: '0 10px 32px rgba(28,25,23,0.12)',
          zIndex: 1000,
          pointerEvents: 'none',
        }}
      >
        <p className="yao-tooltip-pin-hint" style={{ display: 'none', fontSize: 11, color: theme.sub, marginBottom: 4 }}>点击该爻可关闭 · Click again to close</p>
        <p className="yao-tooltip-label" style={{ fontSize: 12, color: theme.sub, marginBottom: 8 }} />
        <p className="yao-tooltip-cn" style={{ fontSize: 15, marginBottom: 8, lineHeight: 1.6 }} />
        <p className="yao-tooltip-en" style={{ fontSize: 13, color: theme.sub, lineHeight: 1.5 }} />
        <div className="yao-tooltip-plain-wrap" style={{ display: 'none', marginTop: 8, paddingTop: 8, borderTop: '1px solid rgba(0,0,0,0.08)' }}>
          <p style={{ fontSize: 11, color: theme.sub, marginBottom: 4 }}>白话 · Vernacular</p>
          <p className="yao-tooltip-plain-cn" style={{ fontSize: 13, marginBottom: 4, lineHeight: 1.5 }} />
          <p className="yao-tooltip-plain-en" style={{ fontSize: 12, color: theme.sub, lineHeight: 1.5 }} />
        </div>
      </div>
    </div>
  );
}
