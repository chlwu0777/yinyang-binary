export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  bg: string;
  text: string;
  sub: string;
  card: string;
  border: string;
  accent: string;
  // Derived colors for components
  yangLine: string;
  yangLineAlt: string;
  yinLine: string;
  yinLineAlt: string;
  placeholderLine: string;
  glowShadow: string;
  activeHighlight: string;
  activeLine: string;
  activeLineAlt: string;
  tooltipBg: string;
  tooltipBorder: string;
  subtleBg: string;
  divider: string;
}

export function getTheme(mode: ThemeMode): ThemeColors {
  if (mode === 'dark') {
    return {
      bg: '#0C0A09',
      text: '#FAFAF9',
      sub: '#A8A29E',
      card: 'rgba(255,255,255,0.06)',
      border: 'rgba(255,255,255,0.1)',
      accent: '#EAB308',
      yangLine: '#FAFAF9',
      yangLineAlt: '#A8A29E',
      yinLine: '#78716C',
      yinLineAlt: '#57534E',
      placeholderLine: '#78716C',
      glowShadow: '0 0 10px rgba(234,179,8,0.25)',
      activeHighlight: 'rgba(234,179,8,0.1)',
      activeLine: '#EAB308',
      activeLineAlt: '#FACC15',
      tooltipBg: 'rgba(12,10,9,0.95)',
      tooltipBorder: '2px solid rgba(234,179,8,0.4)',
      subtleBg: 'rgba(255,255,255,0.04)',
      divider: 'rgba(255,255,255,0.08)',
    };
  }
  return {
    bg: '#FAFAF9',
    text: '#1C1917',
    sub: '#78716C',
    card: 'rgba(255,255,255,0.85)',
    border: '#E7E5E4',
    accent: '#CA8A04',
    yangLine: '#1C1917',
    yangLineAlt: '#44403C',
    yinLine: '#78716C',
    yinLineAlt: '#A8A29E',
    placeholderLine: '#A8A29E',
    glowShadow: '0 0 10px rgba(202,138,4,0.2)',
    activeHighlight: 'rgba(202,138,4,0.08)',
    activeLine: '#CA8A04',
    activeLineAlt: '#D4A520',
    tooltipBg: 'rgba(255,255,255,0.95)',
    tooltipBorder: '2px solid rgba(202,138,4,0.4)',
    subtleBg: 'rgba(28,25,23,0.02)',
    divider: '#E7E5E4',
  };
}

// Static style helpers (layout only, no colors)
export const layout = {
  ctr: (theme: ThemeColors) => ({ position: 'relative' as const, minHeight: '100vh', overflow: 'hidden', fontFamily: "'Noto Sans SC', 'Inter', 'PingFang SC', sans-serif", background: theme.bg, color: theme.text }),
  canvas: { position: 'fixed' as const, top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' as const },
  content: { position: 'relative' as const, zIndex: 10, minHeight: '100vh', padding: '80px 16px 32px', pointerEvents: 'auto' as const },
  nav: { position: 'fixed' as const, top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', justifyContent: 'center', padding: 12 },
  navIn: (theme: ThemeColors) => ({ display: 'flex', alignItems: 'center', gap: 4, padding: 4, borderRadius: 8, background: theme.card, backdropFilter: 'blur(20px)', border: `1px solid ${theme.border}` }),
  navBtn: (active: boolean, theme: ThemeColors) => ({ padding: '10px 18px', borderRadius: 6, fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer', background: active ? theme.text : 'transparent', color: active ? theme.bg : theme.sub }),
  card: (theme: ThemeColors) => ({ background: theme.card, backdropFilter: 'blur(20px)', borderRadius: 12, padding: 32, border: `1px solid ${theme.border}`, boxShadow: '0 1px 3px rgba(28,25,23,0.04), 0 4px 12px rgba(28,25,23,0.03)' }),
  center: { display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 112px)' },
  title: (theme: ThemeColors) => ({ fontSize: 36, fontWeight: 300, letterSpacing: 4, marginBottom: 8, color: theme.text, fontFamily: "'Noto Serif SC', 'Playfair Display', serif" }),
  btn: { padding: '14px 28px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 500 },
};
