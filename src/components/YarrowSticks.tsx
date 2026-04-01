'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useAppTheme } from '@/contexts/AppProviders';

interface Stick {
  id: number;
  x: number;
  y: number;
  rotation: number;
  group: 'center' | 'left' | 'right' | 'hung' | 'aside';
  opacity: number;
  // Each stick has persistent random traits
  curve: number;    // natural bend amount
  shade: number;    // color variation 0-1
  thickness: number; // slight width variation
}

interface YarrowSticksProps {
  total: number;
  phase: 'idle' | 'splitting' | 'hanging' | 'counting-left' | 'counting-right' | 'gathering' | 'done';
  leftCount?: number;
  rightCount?: number;
  leftRemainder?: number;
  rightRemainder?: number;
}

export default function YarrowSticks({ total, phase, leftCount = 0, rightCount = 0, leftRemainder = 0, rightRemainder = 0 }: YarrowSticksProps) {
  const theme = useAppTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [sticks, setSticks] = useState<Stick[]>([]);
  const [containerWidth, setContainerWidth] = useState(700);

  // Persistent random traits per stick (don't change on re-render)
  const traits = useMemo(() =>
    Array.from({ length: 49 }, () => ({
      curve: (Math.random() - 0.5) * 8,
      shade: Math.random(),
      thickness: 3 + Math.random() * 1.5,
      naturalRotation: (Math.random() - 0.5) * 25,
    })),
  []);

  // Initialize sticks
  useEffect(() => {
    const w = containerRef.current?.offsetWidth || 700;
    setContainerWidth(w);
    const cx = w / 2;
    const newSticks: Stick[] = [];
    for (let i = 0; i < 49; i++) {
      newSticks.push({
        id: i,
        x: cx + (Math.random() - 0.5) * 160,
        y: 140 + (Math.random() - 0.5) * 60,
        rotation: traits[i].naturalRotation,
        group: i < total ? 'center' : 'aside',
        opacity: i < total ? 1 : 0.15,
        curve: traits[i].curve,
        shade: traits[i].shade,
        thickness: traits[i].thickness,
      });
    }
    setSticks(newSticks);
  }, [total, traits]);

  // Animate based on phase
  useEffect(() => {
    const w = containerWidth;
    const cx = w / 2;
    const colSpan = 14; // spacing between sticks in a pile
    const rowH = 18;

    setSticks(prev => prev.map((s, i) => {
      if (s.group === 'aside' && phase !== 'idle') return s;

      switch (phase) {
        case 'idle':
          return {
            ...s,
            x: cx + (Math.random() - 0.5) * 160,
            y: 140 + (Math.random() - 0.5) * 60,
            rotation: traits[i].naturalRotation,
            group: i < total ? 'center' : 'aside',
            opacity: i < total ? 1 : 0.15,
          };

        case 'splitting':
          if (i >= total) return { ...s, opacity: 0.12 };
          if (i < leftCount) {
            const cols = Math.min(leftCount, 10);
            return {
              ...s,
              x: cx - 160 + (i % cols) * colSpan + (Math.random() - 0.5) * 3,
              y: 80 + Math.floor(i / cols) * rowH,
              rotation: traits[i].naturalRotation * 0.3,
              group: 'left',
              opacity: 1,
            };
          } else {
            const ri = i - leftCount;
            const rCols = Math.min(rightCount, 10);
            return {
              ...s,
              x: cx + 40 + (ri % rCols) * colSpan + (Math.random() - 0.5) * 3,
              y: 80 + Math.floor(ri / rCols) * rowH,
              rotation: traits[i].naturalRotation * 0.3,
              group: 'right',
              opacity: 1,
            };
          }

        case 'hanging':
          if (i === leftCount) {
            // Hung stalk: placed horizontally between the two piles, as if held between fingers
            return {
              ...s,
              x: cx,
              y: 48,
              group: 'hung',
              opacity: 1,
              rotation: 90, // horizontal
            };
          }
          return s;

        case 'counting-left':
          if (s.group === 'left') {
            const isRemainder = i >= (leftCount - leftRemainder);
            return {
              ...s,
              opacity: isRemainder ? 0.3 : 1,
              y: s.y + (isRemainder ? 12 : 0), // push remainder down slightly
            };
          }
          return s;

        case 'counting-right':
          if (s.group === 'right') {
            const ri = i - leftCount - 1;
            const rightTotal = rightCount - 1;
            const isRemainder = ri >= (rightTotal - rightRemainder);
            return {
              ...s,
              opacity: isRemainder ? 0.3 : 1,
              y: s.y + (isRemainder ? 12 : 0),
            };
          }
          return s;

        case 'gathering':
          if (s.opacity <= 0.3 || s.group === 'hung') {
            return {
              ...s,
              x: w - 50 + (Math.random() - 0.5) * 30,
              y: 300 + (Math.random() - 0.5) * 30,
              rotation: (Math.random() - 0.5) * 40,
              group: 'aside',
              opacity: 0.15,
            };
          }
          return {
            ...s,
            x: cx + (Math.random() - 0.5) * 120,
            y: 140 + (Math.random() - 0.5) * 50,
            rotation: traits[i].naturalRotation,
            group: 'center',
            opacity: 1,
          };

        default:
          return s;
      }
    }));
  }, [phase, total, leftCount, rightCount, leftRemainder, rightRemainder, containerWidth, traits]);

  // Render a single "yarrow stalk" as an SVG for natural look
  const renderStick = (stick: Stick) => {
    const h = 80; // stick height
    const w = stick.thickness;
    const isHung = stick.group === 'hung';
    const isDim = stick.opacity < 0.5;

    // Color: warm straw tones with variation
    const baseHue = 38 + stick.shade * 12; // 38-50 (straw yellow range)
    const baseSat = 55 + stick.shade * 20;
    const baseLit = isDim ? 65 : (45 + stick.shade * 15);
    const color1 = `hsl(${baseHue}, ${baseSat}%, ${baseLit}%)`;
    const color2 = `hsl(${baseHue - 5}, ${baseSat - 10}%, ${baseLit - 8}%)`;
    const hungColor = theme.accent;

    return (
      <div
        key={stick.id}
        style={{
          position: 'absolute',
          left: stick.x - w / 2,
          top: stick.y - h / 2,
          width: w + 2,
          height: h,
          opacity: stick.opacity,
          transform: `rotate(${stick.rotation}deg)`,
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          transformOrigin: 'center',
          filter: isHung ? `drop-shadow(0 0 6px ${theme.accent}66)` : 'none',
        }}
      >
        <svg width={w + 2} height={h} viewBox={`0 0 ${w + 2} ${h}`} style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id={`stalk-${stick.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isHung ? hungColor : color1} />
              <stop offset="50%" stopColor={isHung ? hungColor : color2} />
              <stop offset="100%" stopColor={isHung ? hungColor : color1} stopOpacity="0.8" />
            </linearGradient>
          </defs>
          {/* Main stalk body — slightly curved path */}
          <path
            d={`M${w / 2 + 1} 2 Q${w / 2 + 1 + stick.curve} ${h / 2} ${w / 2 + 1} ${h - 2}`}
            stroke={`url(#stalk-${stick.id})`}
            strokeWidth={w}
            strokeLinecap="round"
            fill="none"
          />
          {/* Top node — slightly thicker (like a real reed joint) */}
          <circle cx={w / 2 + 1} cy={4} r={w * 0.6} fill={isHung ? hungColor : color1} opacity={0.7} />
        </svg>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 700,
        height: 380,
        margin: '0 auto',
        overflow: 'hidden',
      }}
    >
      {/* Pile labels */}
      {phase === 'splitting' && (
        <>
          <div style={{ position: 'absolute', left: containerWidth / 2 - 160, top: 52, fontSize: 14, color: theme.sub, fontWeight: 500, fontFamily: "'JetBrains Mono', monospace" }}>
            {leftCount}
          </div>
          <div style={{ position: 'absolute', left: containerWidth / 2 + 40, top: 52, fontSize: 14, color: theme.sub, fontWeight: 500, fontFamily: "'JetBrains Mono', monospace" }}>
            {rightCount}
          </div>
          {/* Dividing line */}
          <div style={{ position: 'absolute', left: containerWidth / 2 - 4, top: 70, width: 1, height: 240, background: theme.divider, opacity: 0.5 }} />
        </>
      )}

      {(phase === 'hanging' || phase === 'counting-left' || phase === 'counting-right') && (
        <div style={{ position: 'absolute', left: '50%', top: 10, transform: 'translateX(-50%)', textAlign: 'center' }}>
          {/* Two-finger pinch illustration */}
          <svg width="48" height="50" viewBox="0 0 48 50" style={{ display: 'block', margin: '0 auto' }}>
            {/* Left finger */}
            <path d="M10 50 Q12 30 20 22" stroke={theme.sub} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5" />
            {/* Right finger */}
            <path d="M38 50 Q36 30 28 22" stroke={theme.sub} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5" />
            {/* Pinch point */}
            <circle cx="24" cy="20" r="3" fill={theme.accent} opacity="0.6" />
          </svg>
          <span style={{ fontSize: 11, color: theme.accent, fontWeight: 500 }}>1</span>
        </div>
      )}

      {/* Render all sticks */}
      {sticks.map(renderStick)}

      {/* Aside pile label */}
      {phase !== 'idle' && 49 - total > 0 && (
        <div style={{ position: 'absolute', right: 12, bottom: 12, fontSize: 12, color: theme.sub, opacity: 0.6, fontFamily: "'JetBrains Mono', monospace" }}>
          {49 - total}
        </div>
      )}
    </div>
  );
}
