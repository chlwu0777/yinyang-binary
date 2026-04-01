'use client';

import React, { useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useCanvasAnimation } from '@/hooks/useCanvasAnimation';
import { layout } from '@/lib/theme';
import { useAppTheme, useThemeMode } from '@/contexts/AppProviders';

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const isGamePage = pathname === '/game';
  const theme = useAppTheme();
  const themeMode = useThemeMode();

  useCanvasAnimation(canvasRef, { isGamePage, themeBg: theme.bg, isDark: themeMode === 'dark' });

  return <canvas ref={canvasRef} style={layout.canvas} />;
}
