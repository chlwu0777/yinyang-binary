'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LiquidGlass from 'liquid-glass-react';
import { s, theme } from '@/lib/theme';

const navItems = [
  { href: '/', label: '首页 Home' },
  { href: '/masters', label: '先贤 Masters' },
  { href: '/hexagrams', label: '六十四卦 64 Hexagrams' },
  { href: '/game', label: '游戏 Game' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav style={s.nav}>
      <LiquidGlass
        cornerRadius={16}
        blurAmount={0.08}
        saturation={130}
        elasticity={0.15}
        displacementScale={40}
        padding="4px"
      >
        <div style={{ display: 'flex', gap: 4 }}>
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                ...s.navBtn(pathname === href),
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </LiquidGlass>
    </nav>
  );
}
