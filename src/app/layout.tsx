import type { Metadata } from 'next';
import './globals.css';
import { AppProviders } from '@/contexts/AppProviders';
import LayoutShell from '@/components/LayoutShell';

const SITE_URL = 'https://binary-8zzxanay5-chlwu0777s-projects.vercel.app';

export const metadata: Metadata = {
  title: '二进制之道 | The Tao of Binary',
  description: '阳爻=1，阴爻=0。八卦是3-bit编码，六十四卦是完整的6-bit状态空间。从太极到计算机，跨越五千年的交互旅程。',
  keywords: ['易经', 'I Ching', '二进制', 'binary', '阴阳', 'Yin Yang', '八卦', 'trigrams', '六十四卦', 'hexagrams', '伏羲', 'Fu Xi', '莱布尼茨', 'Leibniz'],
  authors: [{ name: 'Tao of Binary' }],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: '二进制之道 | The Tao of Binary',
    description: 'Yang=1, Yin=0. Trigrams=3-bit. 64 Hexagrams=6-bit state space. An interactive journey from Taiji to Computer, spanning 5,000 years.',
    url: SITE_URL,
    siteName: 'The Tao of Binary',
    images: [
      {
        url: '/screenshots/home.jpg',
        width: 1280,
        height: 720,
        alt: 'The Tao of Binary — Interactive Taiji with matrix rain background',
      },
    ],
    locale: 'zh_CN',
    alternateLocale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '二进制之道 | The Tao of Binary',
    description: 'Yang=1, Yin=0. The I Ching is a 6-bit binary system — 5,000 years before computers.',
    images: ['/screenshots/home.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
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
