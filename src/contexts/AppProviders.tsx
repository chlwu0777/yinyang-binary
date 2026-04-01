'use client';

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type LineData = { cn: string; en: string; plainCn?: string; plainEn?: string };
type LinesByHex = Record<number, LineData[]>;

export const LinesByHexContext = createContext<LinesByHex | null>(null);
export const HexLangModeContext = createContext<'both' | 'cn' | 'en'>('both');
export const SetHexLangModeContext = createContext<(m: 'both' | 'cn' | 'en') => void>(() => {});

export function AppProviders({ children }: { children: ReactNode }) {
  const [linesByHex, setLinesByHex] = useState<LinesByHex | null>(null);
  const [hexLangMode, setHexLangMode] = useState<'both' | 'cn' | 'en'>('both');

  useEffect(() => {
    import('@/data/linesByHex').then((mod) => {
      setLinesByHex(mod.linesByHex);
    });
  }, []);

  return (
    <LinesByHexContext.Provider value={linesByHex}>
      <HexLangModeContext.Provider value={hexLangMode}>
        <SetHexLangModeContext.Provider value={setHexLangMode}>
          {children}
        </SetHexLangModeContext.Provider>
      </HexLangModeContext.Provider>
    </LinesByHexContext.Provider>
  );
}

export function useLinesByHex() {
  return useContext(LinesByHexContext);
}

export function useHexLangMode() {
  return useContext(HexLangModeContext);
}

export function useSetHexLangMode() {
  return useContext(SetHexLangModeContext);
}
