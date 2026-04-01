'use client';

import React from 'react';
import LiquidGlass from 'liquid-glass-react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  cornerRadius?: number;
  padding?: string;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className,
  style,
  cornerRadius = 20,
  padding = '32px',
  onClick,
}: GlassCardProps) {
  return (
    <LiquidGlass
      cornerRadius={cornerRadius}
      blurAmount={0.06}
      saturation={120}
      aberrationIntensity={1.5}
      elasticity={0.15}
      displacementScale={50}
      padding={padding}
      className={className}
      style={style}
      onClick={onClick}
    >
      {children}
    </LiquidGlass>
  );
}
