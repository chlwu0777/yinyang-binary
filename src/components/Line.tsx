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
        <div style={{ width: w, height: h, background: glow ? '#1a1a1a' : '#333', borderRadius: h / 2, boxShadow: glow ? '0 0 10px rgba(0,0,0,0.2)' : 'none' }} />
      ) : (
        <>
          <div style={{ width: w * 0.4, height: h, background: glow ? '#555' : '#444', borderRadius: h / 2 }} />
          <div style={{ width: w * 0.4, height: h, background: glow ? '#555' : '#444', borderRadius: h / 2 }} />
        </>
      )}
    </div>
  );
}
