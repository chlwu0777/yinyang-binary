'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { s } from '@/lib/theme';

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
      <div style={s.navIn}>
        {navItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            style={{
              ...s.navBtn(pathname === href),
              textDecoration: 'none',
            }}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
