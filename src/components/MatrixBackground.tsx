'use client';

import React, { useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useCanvasAnimation } from '@/hooks/useCanvasAnimation';
import { theme, s } from '@/lib/theme';

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const isGamePage = pathname === '/game';

  useCanvasAnimation(canvasRef, { isGamePage, themeBg: theme.bg });

  return <canvas ref={canvasRef} style={s.canvas} />;
}
