'use client';

import React from 'react';
import LiquidGlass from 'liquid-glass-react';

interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  style?: React.CSSProperties;
  padding?: string;
}

export default function GlassButton({
  children,
  onClick,
  active,
  style,
  padding = '10px 20px',
}: GlassButtonProps) {
  return (
    <LiquidGlass
      cornerRadius={100}
      blurAmount={active ? 0.1 : 0.06}
      saturation={active ? 160 : 120}
      aberrationIntensity={active ? 3 : 1.5}
      elasticity={0.3}
      displacementScale={active ? 80 : 50}
      padding={padding}
      onClick={onClick}
      style={{
        cursor: 'pointer',
        ...style,
      }}
    >
      {children}
    </LiquidGlass>
  );
}
