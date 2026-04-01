import type { Metadata } from 'next';
import './globals.css';
import { AppProviders } from '@/contexts/AppProviders';
import LayoutShell from '@/components/LayoutShell';

export const metadata: Metadata = {
  title: '二进制之道 | The Tao of Binary',
  description: '探索阴阳爻与二进制的古老联系 — Exploring the ancient connection between Yin-Yang and Binary',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <AppProviders>
          <LayoutShell>{children}</LayoutShell>
        </AppProviders>
      </body>
    </html>
  );
}
