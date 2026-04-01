'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { layout } from '@/lib/theme';
import { t } from '@/lib/i18n';
import { useAppTheme, useLang, useSetLang, useThemeMode, useSetThemeMode } from '@/contexts/AppProviders';

export default function Nav() {
  const pathname = usePathname();
  const theme = useAppTheme();
  const lang = useLang();
  const setLang = useSetLang();
  const themeMode = useThemeMode();
  const setThemeMode = useSetThemeMode();
  const i = t(lang);

  const navItems = [
    { href: '/', label: i.nav.home },
    { href: '/masters', label: i.nav.masters },
    { href: '/hexagrams', label: i.nav.hexagrams },
    { href: '/divination', label: i.divination.navLabel },
    { href: '/game', label: i.nav.game },
  ];

  const toggleBtnStyle: React.CSSProperties = {
    padding: '6px 12px',
    borderRadius: 6,
    fontSize: 13,
    fontWeight: 600,
    border: `1px solid ${theme.border}`,
    cursor: 'pointer',
    background: theme.card,
    color: theme.sub,
    backdropFilter: 'blur(10px)',
    transition: 'all 0.2s',
    fontFamily: "'Inter', sans-serif",
  };

  return (
    <nav style={layout.nav}>
      <div style={{ ...layout.navIn(theme), justifyContent: 'space-between', width: 'auto', maxWidth: '95vw' }}>
        {/* Left: navigation links */}
        <div style={{ display: 'flex', gap: 4 }}>
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                ...layout.navBtn(pathname === href, theme),
                textDecoration: 'none',
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right: toggle buttons */}
        <div style={{ display: 'flex', gap: 6, marginLeft: 12 }}>
          {/* Language toggle */}
          <button
            type="button"
            onClick={() => setLang(lang === 'cn' ? 'en' : 'cn')}
            style={toggleBtnStyle}
            title={lang === 'cn' ? 'Switch to English' : '切换为中文'}
          >
            {lang === 'cn' ? 'EN' : '中'}
          </button>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}
            style={toggleBtnStyle}
            title={themeMode === 'light' ? (lang === 'cn' ? '夜间模式' : 'Dark mode') : (lang === 'cn' ? '日间模式' : 'Light mode')}
          >
            {themeMode === 'light' ? '☾' : '☀'}
          </button>
        </div>
      </div>
    </nav>
  );
}
