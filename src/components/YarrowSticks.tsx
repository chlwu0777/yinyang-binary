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
  curve: number;
  shade: number;
  thickness: number;
}

interface YarrowSticksProps {
  total: number;
  phase: 'idle' | 'splitting' | 'hanging' | 'counting-left' | 'counting-right' | 'gathering' | 'done';
  leftCount?: number;
  rightCount?: number;
  leftRemainder?: number;
  rightRemainder?: number;
}

/** Elegant brush-rest (笔架/笔搁) SVG for holding the hung stalk */
function BrushRest({ accent, sub }: { accent: string; sub: string }) {
  return (
    <svg width="100" height="56" viewBox="0 0 100 56" style={{ display: 'block', margin: '0 auto' }}>
      {/* Base — elegant curved stand */}
      <path
        d="M15 52 Q20 44 30 42 Q50 38 70 42 Q80 44 85 52"
        stroke={sub}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.4"
      />
      {/* Left arm — upward curve */}
      <path
        d="M30 42 Q32 28 38 18"
        stroke={sub}
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        opacity="0.35"
      />
      {/* Right arm — upward curve */}
      <path
        d="M70 42 Q68 28 62 18"
        stroke={sub}
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        opacity="0.35"
      />
      {/* Cross bar where stalk rests */}
      <path
        d="M36 20 Q50 15 64 20"
        stroke={accent}
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        opacity="0.4"
      />
      {/* Small feet */}
      <circle cx="15" cy="53" r="2" fill={sub} opacity="0.25" />
      <circle cx="85" cy="53" r="2" fill={sub} opacity="0.25" />
      <circle cx="50" cy="54" r="1.5" fill={sub} opacity="0.2" />
    </svg>
  );
}

export default function YarrowSticks({ total, phase, leftCount = 0, rightCount = 0, leftRemainder = 0, rightRemainder = 0 }: YarrowSticksProps) {
  const theme = useAppTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [sticks, setSticks] = useState<Stick[]>([]);
  const [containerWidth, setContainerWidth] = useState(800);

  const traits = useMemo(() =>
    Array.from({ length: 49 }, () => ({
      curve: (Math.random() - 0.5) * 7,
      shade: Math.random(),
      thickness: 3 + Math.random() * 1.5,
      naturalRotation: (Math.random() - 0.5) * 20,
    })),
  []);

  useEffect(() => {
    const w = containerRef.current?.offsetWidth || 800;
    setContainerWidth(w);
    const cx = w / 2;
    const newSticks: Stick[] = [];
    for (let i = 0; i < 49; i++) {
      newSticks.push({
        id: i,
        x: cx + (Math.random() - 0.5) * 220,
        y: 200 + (Math.random() - 0.5) * 80,
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

  useEffect(() => {
    const w = containerWidth;
    const cx = w / 2;
    // Spread piles wider: left pile centered around 25%, right around 75%
    const leftCx = w * 0.22;
    const rightCx = w * 0.72;
    const colSpan = 15;
    const rowH = 18;
    // Aside area: bottom-right
    const asideX = w * 0.88;
    const asideY = 350;

    setSticks(prev => prev.map((s, i) => {
      if (s.group === 'aside' && phase !== 'idle') return s;

      switch (phase) {
        case 'idle':
          return {
            ...s,
            x: cx + (Math.random() - 0.5) * 220,
            y: 200 + (Math.random() - 0.5) * 80,
            rotation: traits[i].naturalRotation,
            group: i < total ? 'center' : 'aside',
            opacity: i < total ? 1 : 0.15,
          };

        case 'splitting':
          if (i >= total) return { ...s, opacity: 0.1 };
          if (i < leftCount) {
            const cols = Math.min(leftCount, 8);
            return {
              ...s,
              x: leftCx + (i % cols) * colSpan + (Math.random() - 0.5) * 2,
              y: 140 + Math.floor(i / cols) * rowH,
              rotation: traits[i].naturalRotation * 0.2,
              group: 'left',
              opacity: 1,
            };
          } else {
            const ri = i - leftCount;
            const rCols = Math.min(rightCount, 8);
            return {
              ...s,
              x: rightCx + (ri % rCols) * colSpan + (Math.random() - 0.5) * 2,
              y: 140 + Math.floor(ri / rCols) * rowH,
              rotation: traits[i].naturalRotation * 0.2,
              group: 'right',
              opacity: 1,
            };
          }

        case 'hanging':
          if (i === leftCount) {
            // Stalk rests on the brush rest: horizontal, centered at top
            return {
              ...s,
              x: cx,
              y: 58,
              group: 'hung',
              opacity: 1,
              rotation: 85 + (Math.random() - 0.5) * 6,
            };
          }
          return s;

        case 'counting-left':
          if (s.group === 'left') {
            const isRemainder = i >= (leftCount - leftRemainder);
            return {
              ...s,
              opacity: isRemainder ? 0.25 : 1,
              y: isRemainder ? s.y + 20 : s.y,
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
              opacity: isRemainder ? 0.25 : 1,
              y: isRemainder ? s.y + 20 : s.y,
            };
          }
          return s;

        case 'gathering':
          if (s.opacity <= 0.25 || s.group === 'hung') {
            return {
              ...s,
              x: asideX + (Math.random() - 0.5) * 40,
              y: asideY + (Math.random() - 0.5) * 40,
              rotation: (Math.random() - 0.5) * 35,
              group: 'aside',
              opacity: 0.15,
            };
          }
          return {
            ...s,
            x: cx + (Math.random() - 0.5) * 180,
            y: 200 + (Math.random() - 0.5) * 60,
            rotation: traits[i].naturalRotation,
            group: 'center',
            opacity: 1,
          };

        default:
          return s;
      }
    }));
  }, [phase, total, leftCount, rightCount, leftRemainder, rightRemainder, containerWidth, traits]);

  const renderStick = (stick: Stick) => {
    const h = 80;
    const w = stick.thickness;
    const isHung = stick.group === 'hung';
    const isDim = stick.opacity < 0.5;
    const baseHue = 38 + stick.shade * 12;
    const baseSat = 55 + stick.shade * 20;
    const baseLit = isDim ? 65 : (45 + stick.shade * 15);
    const color1 = `hsl(${baseHue}, ${baseSat}%, ${baseLit}%)`;
    const color2 = `hsl(${baseHue - 5}, ${baseSat - 10}%, ${baseLit - 8}%)`;

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
          filter: isHung ? `drop-shadow(0 0 8px ${theme.accent}55)` : 'none',
        }}
      >
        <svg width={w + 2} height={h} viewBox={`0 0 ${w + 2} ${h}`} style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id={`stalk-${stick.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isHung ? theme.accent : color1} />
              <stop offset="50%" stopColor={isHung ? theme.accent : color2} />
              <stop offset="100%" stopColor={isHung ? theme.accent : color1} stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <path
            d={`M${w / 2 + 1} 2 Q${w / 2 + 1 + stick.curve} ${h / 2} ${w / 2 + 1} ${h - 2}`}
            stroke={`url(#stalk-${stick.id})`}
            strokeWidth={w}
            strokeLinecap="round"
            fill="none"
          />
          <circle cx={w / 2 + 1} cy={4} r={w * 0.55} fill={isHung ? theme.accent : color1} opacity={0.6} />
        </svg>
      </div>
    );
  };

  const showRest = phase === 'hanging' || phase === 'counting-left' || phase === 'counting-right';

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 800,
        height: 420,
        margin: '0 auto',
        overflow: 'hidden',
      }}
    >
      {/* Brush rest (笔架) at center top for hung stalk */}
      {showRest && (
        <div style={{ position: 'absolute', left: '50%', top: 20, transform: 'translateX(-50%)' }}>
          <BrushRest accent={theme.accent} sub={theme.sub} />
          <p style={{ textAlign: 'center', fontSize: 11, color: theme.accent, marginTop: 2, fontWeight: 500, letterSpacing: 2 }}>
            1
          </p>
        </div>
      )}

      {/* Left pile label */}
      {(phase === 'splitting' || phase === 'hanging' || phase === 'counting-left' || phase === 'counting-right') && (
        <div style={{ position: 'absolute', left: containerWidth * 0.22 - 8, top: 118, fontSize: 13, color: theme.sub, fontFamily: "'JetBrains Mono', monospace" }}>
          {leftCount}
        </div>
      )}

      {/* Right pile label */}
      {(phase === 'splitting' || phase === 'hanging' || phase === 'counting-left' || phase === 'counting-right') && (
        <div style={{ position: 'absolute', left: containerWidth * 0.72 - 8, top: 118, fontSize: 13, color: theme.sub, fontFamily: "'JetBrains Mono', monospace" }}>
          {rightCount}
        </div>
      )}

      {/* All sticks */}
      {sticks.map(renderStick)}

      {/* Aside pile label */}
      {phase !== 'idle' && 49 - total > 0 && (
        <div style={{ position: 'absolute', right: 20, bottom: 16, fontSize: 12, color: theme.sub, opacity: 0.5, fontFamily: "'JetBrains Mono', monospace" }}>
          {49 - total}
        </div>
      )}
    </div>
  );
}
