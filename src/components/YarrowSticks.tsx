'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useAppTheme } from '@/contexts/AppProviders';

interface Stick {
  id: number;
  x: number;
  y: number;
  rotation: number;
  group: 'center' | 'left' | 'right' | 'hung' | 'aside';
  opacity: number;
}

interface YarrowSticksProps {
  total: number;
  phase: 'idle' | 'splitting' | 'hanging' | 'counting-left' | 'counting-right' | 'gathering' | 'done';
  leftCount?: number;
  rightCount?: number;
  leftRemainder?: number;
  rightRemainder?: number;
  asideCount?: number;
}

export default function YarrowSticks({ total, phase, leftCount = 0, rightCount = 0, leftRemainder = 0, rightRemainder = 0 }: YarrowSticksProps) {
  const theme = useAppTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [sticks, setSticks] = useState<Stick[]>([]);
  const [containerWidth, setContainerWidth] = useState(600);

  // Initialize sticks
  useEffect(() => {
    const w = containerRef.current?.offsetWidth || 600;
    setContainerWidth(w);
    const newSticks: Stick[] = [];
    for (let i = 0; i < 49; i++) {
      newSticks.push({
        id: i,
        x: w / 2 + (Math.random() - 0.5) * 80,
        y: 120 + (Math.random() - 0.5) * 40,
        rotation: (Math.random() - 0.5) * 30,
        group: i < total ? 'center' : 'aside',
        opacity: i < total ? 1 : 0.2,
      });
    }
    setSticks(newSticks);
  }, [total]);

  // Animate based on phase
  useEffect(() => {
    const w = containerWidth;
    const centerX = w / 2;

    setSticks(prev => prev.map((s, i) => {
      if (s.group === 'aside' && phase !== 'idle') return s;

      switch (phase) {
        case 'idle':
          return {
            ...s,
            x: centerX + (Math.random() - 0.5) * 80,
            y: 120 + (Math.random() - 0.5) * 40,
            group: i < total ? 'center' : 'aside',
            opacity: i < total ? 1 : 0.15,
          };

        case 'splitting':
          if (i >= total) return { ...s, opacity: 0.15 };
          if (i < leftCount) {
            return {
              ...s,
              x: centerX - 100 + (i % 8) * 10 + (Math.random() - 0.5) * 4,
              y: 100 + Math.floor(i / 8) * 14,
              group: 'left',
              opacity: 1,
            };
          } else {
            const ri = i - leftCount;
            return {
              ...s,
              x: centerX + 60 + (ri % 8) * 10 + (Math.random() - 0.5) * 4,
              y: 100 + Math.floor(ri / 8) * 14,
              group: 'right',
              opacity: 1,
            };
          }

        case 'hanging':
          if (i === leftCount) {
            // The hung stick
            return {
              ...s,
              x: centerX,
              y: 20,
              group: 'hung',
              opacity: 1,
              rotation: 0,
            };
          }
          return s;

        case 'counting-left':
          if (s.group === 'left') {
            const li = i;
            const isRemainder = li >= (leftCount - leftRemainder);
            return {
              ...s,
              opacity: isRemainder ? 0.4 : 1,
            };
          }
          return s;

        case 'counting-right':
          if (s.group === 'right') {
            const ri = i - leftCount - 1; // -1 for hung
            const rightTotal = rightCount - 1;
            const isRemainder = ri >= (rightTotal - rightRemainder);
            return {
              ...s,
              opacity: isRemainder ? 0.4 : 1,
            };
          }
          return s;

        case 'gathering':
          // Move remainders + hung to aside
          if (s.opacity <= 0.4 || s.group === 'hung') {
            return {
              ...s,
              x: w - 60 + (Math.random() - 0.5) * 20,
              y: 200 + (Math.random() - 0.5) * 20,
              group: 'aside',
              opacity: 0.2,
            };
          }
          // Remaining sticks back to center
          return {
            ...s,
            x: centerX + (Math.random() - 0.5) * 60,
            y: 120 + (Math.random() - 0.5) * 30,
            group: 'center',
            opacity: 1,
          };

        default:
          return s;
      }
    }));
  }, [phase, total, leftCount, rightCount, leftRemainder, rightRemainder, containerWidth]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 600,
        height: 260,
        margin: '0 auto',
        overflow: 'hidden',
      }}
    >
      {/* Labels */}
      {phase === 'splitting' && (
        <>
          <div style={{ position: 'absolute', left: '20%', top: 0, fontSize: 12, color: theme.sub, textAlign: 'center' }}>
            {leftCount}
          </div>
          <div style={{ position: 'absolute', right: '20%', top: 0, fontSize: 12, color: theme.sub, textAlign: 'center' }}>
            {rightCount}
          </div>
        </>
      )}
      {phase === 'hanging' && (
        <div style={{ position: 'absolute', left: '50%', top: 4, transform: 'translateX(-50%)', fontSize: 11, color: theme.accent }}>
          1
        </div>
      )}

      {/* Sticks */}
      {sticks.map((stick) => (
        <div
          key={stick.id}
          style={{
            position: 'absolute',
            left: stick.x,
            top: stick.y,
            width: 2.5,
            height: 55,
            borderRadius: 1.5,
            background: stick.group === 'hung'
              ? theme.accent
              : `linear-gradient(to bottom, ${theme.accent}cc, ${theme.accent}88)`,
            opacity: stick.opacity,
            transform: `rotate(${stick.rotation}deg)`,
            transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            transformOrigin: 'center',
          }}
        />
      ))}

      {/* Aside label */}
      {phase !== 'idle' && (
        <div style={{ position: 'absolute', right: 8, bottom: 8, fontSize: 11, color: theme.sub }}>
          {49 - total}
        </div>
      )}
    </div>
  );
}
