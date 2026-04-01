'use client';

import React from 'react';

interface LineProps {
  isYang: boolean;
  w?: number;
  h?: number;
  glow?: boolean;
}

export default function Line({ isYang, w = 50, h = 8, glow }: LineProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
      {isYang ? (
        <div style={{ width: w, height: h, background: glow ? '#e0e0f0' : '#c0c0d0', borderRadius: h / 2, boxShadow: glow ? '0 0 12px rgba(96,165,250,0.4)' : 'none' }} />
      ) : (
        <>
          <div style={{ width: w * 0.4, height: h, background: glow ? '#a0a0b8' : '#808098', borderRadius: h / 2 }} />
          <div style={{ width: w * 0.4, height: h, background: glow ? '#a0a0b8' : '#808098', borderRadius: h / 2 }} />
        </>
      )}
    </div>
  );
}
