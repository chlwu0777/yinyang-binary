'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface MasterAvatarProps {
  symbol: string;
  imageUrl?: string;
  size?: number;
  name?: string;
}

export default function MasterAvatar({ symbol, imageUrl, size = 120, name }: MasterAvatarProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const isCircle = size === 88;

  if (imageUrl && !imgFailed) {
    return (
      <Image
        src={imageUrl}
        alt={name ? `Portrait of ${name}` : 'Master portrait'}
        width={size}
        height={size}
        onError={() => setImgFailed(true)}
        style={{
          objectFit: 'cover',
          borderRadius: isCircle ? '50%' : 24,
        }}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={name || symbol}
      style={{
        width: size,
        height: size,
        borderRadius: isCircle ? '50%' : 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.45,
        background: 'rgba(128,128,128,0.15)',
        color: 'inherit',
      }}
    >
      {symbol}
    </div>
  );
}
