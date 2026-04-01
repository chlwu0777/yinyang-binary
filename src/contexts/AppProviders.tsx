'use client';

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { getTheme, type ThemeColors, type ThemeMode } from '@/lib/theme';
import type { Lang } from '@/lib/i18n';

// ── Lines data ──
type LineData = { cn: string; en: string; plainCn?: string; plainEn?: string };
type LinesByHex = Record<number, LineData[]>;
export const LinesByHexContext = createContext<LinesByHex | null>(null);

// ── Language mode (全站) ──
const LangContext = createContext<Lang>('cn');
const SetLangContext = createContext<(l: Lang) => void>(() => {});

// ── Theme mode ──
const ThemeModeContext = createContext<ThemeMode>('light');
const SetThemeModeContext = createContext<(m: ThemeMode) => void>(() => {});
const ThemeContext = createContext<ThemeColors>(getTheme('light'));

// ── Hex lang mode (for爻辞 display, maps from global lang) ──
export const HexLangModeContext = createContext<'both' | 'cn' | 'en'>('cn');

export function AppProviders({ children }: { children: ReactNode }) {
  const [linesByHex, setLinesByHex] = useState<LinesByHex | null>(null);
  const [lang, setLang] = useState<Lang>('cn');
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  const theme = getTheme(themeMode);

  useEffect(() => {
    import('@/data/linesByHex').then((mod) => {
      setLinesByHex(mod.linesByHex);
    });
  }, []);

  // Update body background/color when theme changes
  useEffect(() => {
    document.body.style.background = theme.bg;
    document.body.style.color = theme.text;
  }, [theme.bg, theme.text]);

  return (
    <ThemeModeContext.Provider value={themeMode}>
      <SetThemeModeContext.Provider value={setThemeMode}>
        <ThemeContext.Provider value={theme}>
          <LangContext.Provider value={lang}>
            <SetLangContext.Provider value={setLang}>
              <LinesByHexContext.Provider value={linesByHex}>
                <HexLangModeContext.Provider value={lang}>
                  {children}
                </HexLangModeContext.Provider>
              </LinesByHexContext.Provider>
            </SetLangContext.Provider>
          </LangContext.Provider>
        </ThemeContext.Provider>
      </SetThemeModeContext.Provider>
    </ThemeModeContext.Provider>
  );
}

// ── Hooks ──
export function useLinesByHex() { return useContext(LinesByHexContext); }
export function useHexLangMode() { return useContext(HexLangModeContext); }
export function useLang() { return useContext(LangContext); }
export function useSetLang() { return useContext(SetLangContext); }
export function useThemeMode() { return useContext(ThemeModeContext); }
export function useSetThemeMode() { return useContext(SetThemeModeContext); }
export function useAppTheme() { return useContext(ThemeContext); }

// Deprecated but keep for compatibility
export function useSetHexLangMode() { return useContext(SetLangContext) as unknown as (m: 'both' | 'cn' | 'en') => void; }
