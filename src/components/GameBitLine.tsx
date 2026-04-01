'use client';

import React from 'react';
import Line from './Line';
import { theme } from '@/lib/theme';

interface GameBitLineProps {
  value: number;
  position: number;
  canFlip: boolean;
  isAnimating: boolean;
  onFlip?: (position: number) => void;
}

export default function GameBitLine({ value, position, canFlip, isAnimating: anim, onFlip }: GameBitLineProps) {
  const isY = value === 1;

  return (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); canFlip && onFlip?.(position); }}
      disabled={!canFlip}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: 'none',
        border: 'none',
        cursor: canFlip ? 'pointer' : 'default',
        opacity: canFlip ? 1 : 0.5,
        transform: anim ? 'scale(1.15) rotateX(180deg)' : 'scale(1)',
        transition: 'all 0.3s',
      }}
    >
      <Line isYang={isY} w={60} h={10} glow={canFlip} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 64 }}>
        <span style={{ fontFamily: 'monospace', fontSize: 20, fontWeight: 'bold', color: isY ? '#1a1a1a' : '#555' }}>{value}</span>
        <span style={{ fontSize: 13, color: theme.sub }}>{isY ? '阳 Yang' : '阴 Yin'}</span>
      </div>
    </button>
  );
}
