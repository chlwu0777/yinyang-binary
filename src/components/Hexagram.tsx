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
            <div style={{ width: w, height: h, background: glow ? '#1a1a1a' : '#333', borderRadius: 2 }} />
          ) : (
            <>
              <div style={{ width: w * 0.4, height: h, background: glow ? '#666' : '#555', borderRadius: 2 }} />
              <div style={{ width: w * 0.4, height: h, background: glow ? '#666' : '#555', borderRadius: 2 }} />
            </>
          )}
        </div>
      ))}
    </div>
  );
}
