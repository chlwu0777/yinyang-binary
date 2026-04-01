'use client';

import React from 'react';

interface TaijiProps {
  size?: number;
  rotation?: number;
  onClick?: () => void;
  interactive?: boolean;
}

export default function Taiji({ size = 80, rotation = 0, onClick, interactive }: TaijiProps) {
  return (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); onClick?.(); }}
      style={{ background: 'none', border: 'none', padding: 0, cursor: interactive ? 'pointer' : 'default' }}
    >
      <svg viewBox="0 0 100 100" style={{ width: size, height: size, transform: `rotate(${rotation}deg)` }}>
        <circle cx="50" cy="50" r="48" fill="#1a1a2e" stroke="rgba(96,165,250,0.4)" strokeWidth="1.5" />
        <path d="M50,2 A48,48 0 0,1 50,98 A24,24 0 0,1 50,50 A24,24 0 0,0 50,2" fill="#e0e0f0" />
        <circle cx="50" cy="26" r="7" fill="#e0e0f0" />
        <circle cx="50" cy="74" r="7" fill="#1a1a2e" stroke="rgba(96,165,250,0.4)" strokeWidth="1.5" />
      </svg>
    </button>
  );
}
