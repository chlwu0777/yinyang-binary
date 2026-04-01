'use client';

import React from 'react';

interface HexagramProps {
  binary: string;
  size?: 'normal' | 'small' | 'tiny';
  glow?: boolean;
}

export default function Hexagram({ binary, size = 'normal', glow }: HexagramProps) {
  const w = size === 'small' ? 28 : size === 'tiny' ? 20 : 40;
  const h = size === 'small' ? 4 : size === 'tiny' ? 3 : 5;

  return (
    <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 3 }}>
      {binary.split('').map((bit, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
          {bit === '1' ? (
            <div style={{ width: w, height: h, background: glow ? '#1C1917' : '#44403C', borderRadius: 2 }} />
          ) : (
            <>
              <div style={{ width: w * 0.4, height: h, background: glow ? '#A8A29E' : '#D6D3D1', borderRadius: 2 }} />
              <div style={{ width: w * 0.4, height: h, background: glow ? '#A8A29E' : '#D6D3D1', borderRadius: 2 }} />
            </>
          )}
        </div>
      ))}
    </div>
  );
}
