'use client';

import React, { useState } from 'react';

interface MasterAvatarProps {
  symbol: string;
  imageUrl?: string;
  size?: number;
}

export default function MasterAvatar({ symbol, imageUrl, size = 120 }: MasterAvatarProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const isCircle = size === 88;

  if (imageUrl && !imgFailed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageUrl}
        alt=""
        onError={() => setImgFailed(true)}
        style={{
          width: size,
          height: size,
          objectFit: 'cover',
          borderRadius: isCircle ? '50%' : 24,
        }}
      />
    );
  }

  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: isCircle ? '50%' : 24,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size * 0.45,
      background: 'rgba(128,128,128,0.15)',
      color: 'inherit',
    }}>
      {symbol}
    </div>
  );
}
