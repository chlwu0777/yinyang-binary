export const theme = {
  bg: '#FAFAF9',
  text: '#1C1917',
  sub: '#78716C',
  card: 'rgba(255,255,255,0.85)',
  border: '#E7E5E4',
  accent: '#CA8A04',
};

export const s = {
  ctr: { position: 'relative' as const, minHeight: '100vh', overflow: 'hidden', fontFamily: "'Noto Sans SC', 'Inter', 'PingFang SC', sans-serif", background: theme.bg, color: theme.text },
  canvas: { position: 'fixed' as const, top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' as const },
  content: { position: 'relative' as const, zIndex: 10, minHeight: '100vh', padding: '80px 16px 32px', pointerEvents: 'auto' as const },
  nav: { position: 'fixed' as const, top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', justifyContent: 'center', padding: 12 },
  navIn: { display: 'flex', gap: 4, padding: 4, borderRadius: 8, background: theme.card, backdropFilter: 'blur(20px)', border: `1px solid ${theme.border}` },
  navBtn: (active: boolean) => ({ padding: '10px 18px', borderRadius: 6, fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer', background: active ? '#1C1917' : 'transparent', color: active ? '#fff' : theme.sub }),
  card: { background: theme.card, backdropFilter: 'blur(20px)', borderRadius: 12, padding: 32, border: `1px solid ${theme.border}`, boxShadow: '0 1px 3px rgba(28,25,23,0.04), 0 4px 12px rgba(28,25,23,0.03)' },
  center: { display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 112px)' },
  title: { fontSize: 36, fontWeight: 300, letterSpacing: 4, marginBottom: 8, color: theme.text, fontFamily: "'Noto Serif SC', 'Playfair Display', serif" },
  btn: { padding: '14px 28px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 500 },
};
