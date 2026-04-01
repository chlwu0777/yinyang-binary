'use client';

import React from 'react';
import { useAppTheme } from '@/contexts/AppProviders';

interface LineProps {
  isYang: boolean;
  w?: number;
  h?: number;
  glow?: boolean;
}

export default function Line({ isYang, w = 50, h = 8, glow }: LineProps) {
  const theme = useAppTheme();
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
      {isYang ? (
        <div style={{ width: w, height: h, background: glow ? theme.yangLine : theme.yangLineAlt, borderRadius: h / 2, boxShadow: glow ? theme.glowShadow : 'none' }} />
      ) : (
        <>
          <div style={{ width: w * 0.4, height: h, background: glow ? theme.yinLine : theme.yinLineAlt, borderRadius: h / 2 }} />
          <div style={{ width: w * 0.4, height: h, background: glow ? theme.yinLine : theme.yinLineAlt, borderRadius: h / 2 }} />
        </>
      )}
    </div>
  );
}
