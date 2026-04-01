export const theme = {
  bg: '#0a0a12',
  text: '#f0f0f0',
  sub: '#a0a0b0',
  card: 'rgba(255,255,255,0.06)',
  border: 'rgba(255,255,255,0.1)',
  accent: '#60a5fa',
};

export const s = {
  ctr: { position: 'relative' as const, minHeight: '100vh', overflow: 'hidden', fontFamily: '"PingFang SC", "Microsoft YaHei", "SF Mono", "Consolas", sans-serif', background: theme.bg, color: theme.text },
  canvas: { position: 'fixed' as const, top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' as const },
  content: { position: 'relative' as const, zIndex: 10, minHeight: '100vh', padding: '80px 16px 32px', pointerEvents: 'auto' as const },
  nav: { position: 'fixed' as const, top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', justifyContent: 'center', padding: 12 },
  navIn: { display: 'flex', gap: 4, padding: 4, borderRadius: 16 },
  navBtn: (active: boolean) => ({ padding: '10px 18px', borderRadius: 6, fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer', background: active ? 'rgba(96,165,250,0.2)' : 'transparent', color: active ? '#fff' : theme.sub }),
  card: { borderRadius: 12, padding: 32 },
  center: { display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 112px)' },
  title: { fontSize: 36, fontWeight: 300, letterSpacing: 4, marginBottom: 8, color: theme.text, fontFamily: 'inherit' },
  btn: { padding: '14px 28px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 500 },
};
