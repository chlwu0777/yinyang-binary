'use client';

import React from 'react';
import { layout } from '@/lib/theme';
import { useAppTheme } from '@/contexts/AppProviders';
import MatrixBackground from '@/components/MatrixBackground';
import Nav from '@/components/Nav';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const theme = useAppTheme();

  return (
    <div style={layout.ctr(theme)}>
      <MatrixBackground />
      <Nav />
      <div style={layout.content}>
        {children}
      </div>
    </div>
  );
}
