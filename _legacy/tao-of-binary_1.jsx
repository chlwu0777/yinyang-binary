import React, { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';

let linesByHexModule = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mod = require('./tao-of-binary-lines.js');
  linesByHexModule = mod?.linesByHex ?? mod?.default?.linesByHex ?? null;
} catch (_) {}

const LinesByHexContext = createContext(null);
const HexLangModeContext = createContext('both'); // 'both' | 'cn' | 'en'

const defaultTheme = { card: '#fff', sub: '#666', border: '#eee' };
function getLinesForHex(hexNum, linesByHexFromContext) {
  if (linesByHexFromContext && linesByHexFromContext[hexNum]) return linesByHexFromContext[hexNum];
  if (typeof window !== 'undefined' && window.linesByHex && window.linesByHex[hexNum]) return window.linesByHex[hexNum];
  if (linesByHexModule && linesByHexModule[hexNum]) return linesByHexModule[hexNum];
  return null;
}
const LINE_LABELS = ['初 Initial', '二 2nd', '三 3rd', '四 4th', '五 5th', '上 Top'];
const LINE_W = 72;
const LINE_H = 10;
const LINE_GAP = 4;

const HexagramInteractive = ({ hex, theme: themeProp }) => {
  const theme = themeProp || defaultTheme;
  const linesByHex = useContext(LinesByHexContext);
  const langMode = useContext(HexLangModeContext);
  const rootRef = React.useRef(null);
  const tooltipRef = React.useRef(null);
  const [pinnedLine, setPinnedLine] = useState(null);
  if (!hex) return null;
  const bits = hex.binary.split('');
  const lineData = getLinesForHex(hex.num, linesByHex);

  React.useEffect(() => {
    const root = rootRef.current;
    const tooltipEl = tooltipRef.current;
    if (!root || !tooltipEl || !hex) return;
    const rows = root.querySelectorAll('[data-yao-line]');
    let currentHover = null;
    const currentPinned = pinnedLine;
    let leaveTimer = null;
    let lastMouse = { x: 0, y: 0 };
    const LEAVE_DELAY = 350;

    function applyHighlight(index) {
      const active = index !== null ? index : currentPinned;
      rows.forEach((row, j) => {
        const isActive = active === j;
        row.style.background = isActive ? 'rgba(0,102,204,0.15)' : 'transparent';
        const inner = row.querySelector('.yao-line-inner');
        if (!inner) return;
        const segs = inner.children;
        const color = isActive ? (bits[j] === '1' ? '#0066cc' : '#3388cc') : (bits[j] === '1' ? '#2a2a2a' : '#555');
        for (let k = 0; k < segs.length; k++) {
          segs[k].style.background = color;
          segs[k].style.boxShadow = isActive && bits[j] === '1' ? '0 0 16px rgba(0,102,204,0.5)' : 'none';
        }
      });
      if (active !== null && tooltipEl && rows[active]) {
        const row = rows[active];
        const rootRect = root.getBoundingClientRect();
        const rowRect = row.getBoundingClientRect();
        const gap = 12;
        tooltipEl.style.left = (rootRect.width + gap) + 'px';
        tooltipEl.style.top = ((rowRect.top - rootRect.top) + rowRect.height / 2) + 'px';
        tooltipEl.style.transform = 'translateY(-50%)';
        tooltipEl.style.marginTop = '0';
        tooltipEl.style.display = 'block';
        const hintEl = tooltipEl.querySelector('.yao-tooltip-pin-hint');
        const labelEl = tooltipEl.querySelector('.yao-tooltip-label');
        const cnEl = tooltipEl.querySelector('.yao-tooltip-cn');
        const enEl = tooltipEl.querySelector('.yao-tooltip-en');
        const plainCnEl = tooltipEl.querySelector('.yao-tooltip-plain-cn');
        const plainEnEl = tooltipEl.querySelector('.yao-tooltip-plain-en');
        const plainWrap = tooltipEl.querySelector('.yao-tooltip-plain-wrap');
        if (hintEl) hintEl.style.display = currentPinned === active ? 'block' : 'none';
        if (labelEl) labelEl.textContent = LINE_LABELS[active] + ' · 爻辞 Line Statement';
        let lineData = (typeof window !== 'undefined' && window.linesByHex && window.linesByHex[hex.num])
          ? window.linesByHex[hex.num]
          : getLinesForHex(hex.num, linesByHex);
        const ld = lineData && lineData[active];
        const showCn = langMode === 'both' || langMode === 'cn';
        const showEn = langMode === 'both' || langMode === 'en';
        if (cnEl) { cnEl.textContent = ld ? ld.cn : (showCn ? '暂无爻辞' : ''); cnEl.style.display = showCn ? 'block' : 'none'; }
        if (enEl) { enEl.textContent = ld ? ld.en : (showEn ? 'No line text loaded.' : ''); enEl.style.display = showEn ? 'block' : 'none'; }
        if (plainWrap) plainWrap.style.display = (ld && (ld.plainCn || ld.plainEn) && (showCn || showEn)) ? 'block' : 'none';
        if (plainCnEl) { plainCnEl.textContent = ld && ld.plainCn ? ld.plainCn : ''; plainCnEl.style.display = showCn ? 'block' : 'none'; }
        if (plainEnEl) { plainEnEl.textContent = ld && ld.plainEn ? ld.plainEn : ''; plainEnEl.style.display = showEn ? 'block' : 'none'; }
      } else {
        tooltipEl.style.display = 'none';
      }
    }

    function isInsideRoot(x, y) {
      const r = root.getBoundingClientRect();
      return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
    }

    function onOver(e) {
      lastMouse.x = e.clientX;
      lastMouse.y = e.clientY;
      if (leaveTimer) {
        clearTimeout(leaveTimer);
        leaveTimer = null;
      }
      const row = e.target.closest('[data-yao-line]');
      if (!row) return;
      const i = parseInt(row.getAttribute('data-yao-line'), 10);
      if (isNaN(i) || i < 0 || i > 5) return;
      if (currentHover === i) return;
      currentHover = i;
      applyHighlight(i);
    }

    function onLeave() {
      if (leaveTimer) return;
      leaveTimer = setTimeout(() => {
        leaveTimer = null;
        if (isInsideRoot(lastMouse.x, lastMouse.y)) return;
        currentHover = null;
        applyHighlight(currentPinned);
      }, LEAVE_DELAY);
    }

    function onGlobalMove(e) {
      lastMouse.x = e.clientX;
      lastMouse.y = e.clientY;
    }

    root.addEventListener('mouseover', onOver, true);
    root.addEventListener('mouseleave', onLeave, true);
    document.addEventListener('mousemove', onGlobalMove, true);
    applyHighlight(pinnedLine);
    return () => {
      if (leaveTimer) clearTimeout(leaveTimer);
      root.removeEventListener('mouseover', onOver, true);
      root.removeEventListener('mouseleave', onLeave, true);
      document.removeEventListener('mousemove', onGlobalMove, true);
    };
  }, [hex && hex.num, hex && hex.binary, pinnedLine, langMode]);

  const handleClick = (i) => (e) => {
    e.preventDefault();
    setPinnedLine(pinnedLine === i ? null : i);
  };

  return (
    <div
      ref={rootRef}
      style={{
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'auto',
        paddingBottom: 12
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: LINE_GAP }}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            data-yao-line={i}
            role="button"
            tabIndex={0}
            title={lineData && lineData[i] ? lineData[i].cn : LINE_LABELS[i] + ' 爻 Line'}
            onClick={handleClick(i)}
            style={{
              cursor: 'pointer',
              minHeight: 28,
              padding: '6px 12px',
              borderRadius: 6,
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              outline: 'none',
              userSelect: 'none'
            }}
          >
            <div className="yao-line-inner" style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
              {bits[i] === '1' ? (
                <div style={{ width: LINE_W, height: LINE_H, background: '#2a2a2a', borderRadius: 4, transition: 'all 0.2s' }} />
              ) : (
                <>
                  <div style={{ width: LINE_W * 0.42, height: LINE_H, background: '#555', borderRadius: 4, transition: 'all 0.2s' }} />
                  <div style={{ width: LINE_W * 0.42, height: LINE_H, background: '#555', borderRadius: 4, transition: 'all 0.2s' }} />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <div
        ref={tooltipRef}
        className="yao-tooltip"
        style={{
          display: 'none',
          position: 'absolute',
          left: 0,
          top: 0,
          transform: 'translateY(-50%)',
          marginTop: 0,
          minWidth: 300,
          maxWidth: 380,
          padding: '16px 20px',
          borderRadius: 12,
          background: theme.card,
          border: '2px solid rgba(0,102,204,0.5)',
          boxShadow: '0 10px 32px rgba(0,0,0,0.15)',
          zIndex: 1000,
          pointerEvents: 'none'
        }}
      >
        <p className="yao-tooltip-pin-hint" style={{ display: 'none', fontSize: 11, color: theme.sub, marginBottom: 4 }}>点击该爻可关闭 · Click again to close</p>
        <p className="yao-tooltip-label" style={{ fontSize: 12, color: theme.sub, marginBottom: 8 }} />
        <p className="yao-tooltip-cn" style={{ fontSize: 15, marginBottom: 8, lineHeight: 1.6 }} />
        <p className="yao-tooltip-en" style={{ fontSize: 13, color: theme.sub, lineHeight: 1.5 }} />
        <div className="yao-tooltip-plain-wrap" style={{ display: 'none', marginTop: 8, paddingTop: 8, borderTop: '1px solid rgba(0,0,0,0.08)' }}>
          <p style={{ fontSize: 11, color: theme.sub, marginBottom: 4 }}>白话 · Vernacular</p>
          <p className="yao-tooltip-plain-cn" style={{ fontSize: 13, marginBottom: 4, lineHeight: 1.5 }} />
          <p className="yao-tooltip-plain-en" style={{ fontSize: 12, color: theme.sub, lineHeight: 1.5 }} />
        </div>
      </div>
    </div>
  );
};

const TaoOfBinary = (props) => {
  const linesByHexValue = props.linesByHex ?? (typeof window !== 'undefined' ? window.linesByHex : null) ?? linesByHexModule ?? {};
  const [currentPage, setCurrentPage] = useState('home');
  const [rotation, setRotation] = useState(0);
  const [homePhase, setHomePhase] = useState(0);
  const [currentTrigram, setCurrentTrigram] = useState([]);
  const [lowerTrigram, setLowerTrigram] = useState(null);
  const [upperTrigram, setUpperTrigram] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [separationProgress, setSeparationProgress] = useState(0);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedHexagram, setSelectedHexagram] = useState(null);
  const [selectedMaster, setSelectedMaster] = useState(null);
  const [gameMode, setGameMode] = useState('menu');
  const [gameState, setGameState] = useState(0);
  const [targetState, setTargetState] = useState(null);
  const [moves, setMoves] = useState(0);
  const [maxMoves, setMaxMoves] = useState(null);
  const [level, setLevel] = useState(1);
  const [animatingBit, setAnimatingBit] = useState(null);
  const [showEpiphany, setShowEpiphany] = useState(false);
  const [explorerSelected, setExplorerSelected] = useState(null);
  const [hexLangMode, setHexLangMode] = useState('both'); // 'both' | 'cn' | 'en'
  const [linesByHexFetched, setLinesByHexFetched] = useState(null);
  const canvasRef = useRef(null);

  const isGamePage = currentPage === 'game';
  const linesByHexMerged = linesByHexFetched ?? linesByHexValue;
  const theme = {
    bg: '#f5f5f5',
    text: '#1a1a1a',
    sub: '#555',
    card: 'rgba(255,255,255,0.95)',
    border: 'rgba(0,0,0,0.1)',
    accent: '#1a1a1a'
  };

  useEffect(() => { const i = setInterval(() => setRotation(r => r + 0.15), 16); return () => clearInterval(i); }, []);
  useEffect(() => { if (isAnimating && separationProgress < 1) { const t = setTimeout(() => setSeparationProgress(p => Math.min(p + 0.02, 1)), 16); return () => clearTimeout(t); } if (separationProgress >= 1 && isAnimating) { setIsAnimating(false); setHomePhase(1); } }, [isAnimating, separationProgress]);

  useEffect(() => {
    const hasData = linesByHexValue && linesByHexValue[1]?.length > 0;
    if (hasData) return;
    fetch('./tao-of-binary-lines.json').then(r => r.ok ? r.json() : null).then(data => {
      if (data && typeof data === 'object') setLinesByHexFetched(data);
    }).catch(() => {});
  }, [linesByHexValue]);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId, w, h, particles = [];
    let animTime = 0;
    const resize = () => {
      w = window.innerWidth; h = window.innerHeight; canvas.width = w; canvas.height = h;
      particles = [];
      for (let i = 0; i < 60; i++) particles.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1, opacity: Math.random() * 0.2 + 0.05, pulse: Math.random() * Math.PI * 2
      });
    };
    const animate = () => {
      animTime += 0.008;
      ctx.fillStyle = theme.bg;
      ctx.fillRect(0, 0, w, h);

      // 矩阵代码雨 Matrix code rain (0/1 falling)
      const codeChars = '01';
      ctx.font = '12px "SF Mono", "Consolas", "PingFang SC", monospace';
      ctx.textAlign = 'center';
      const colWidth = 18;
      const codeSpeed = 28;
      for (let cx = 0; cx < w + colWidth; cx += colWidth) {
        const colSeed = (cx * 7) % 97;
        for (let i = 0; i < 22; i++) {
          const y = ((animTime * codeSpeed * (0.7 + (colSeed % 3) * 0.15) + i * 22 + colSeed * 2) % (h + 80)) - 40;
          const opacity = (1 - (i / 22) * 0.85) * (0.12 + Math.sin(animTime * 2 + cx * 0.02) * 0.06);
          ctx.fillStyle = `rgba(40,40,50,${opacity})`;
          ctx.fillText(codeChars[(cx + i) % 2], cx, y);
        }
      }

      // DNA 双螺旋 DNA double helix
      const helixCount = Math.max(2, Math.floor(w / 320));
      const helixSpacing = w / (helixCount + 1);
      const frequency = 0.012;
      const verticalSpeed = animTime * 45;

      for (let helix = 0; helix < helixCount; helix++) {
        const centerX = helixSpacing * (helix + 1);
        const amplitude = 48 + helix * 12;
        const phaseOffset = helix * (Math.PI / 3);

        for (let y = -60; y < h + 60; y += 28) {
          const adjustedY = ((y + verticalSpeed) % (h + 120)) - 60;
          const phase = adjustedY * frequency + phaseOffset;
          const x1 = centerX + Math.sin(phase) * amplitude;
          const x2 = centerX + Math.sin(phase + Math.PI) * amplitude;
          const depth = (Math.cos(phase) + 1) / 2;
          if (depth > 0.25 && depth < 0.75) {
            ctx.beginPath();
            ctx.moveTo(x1, adjustedY);
            ctx.lineTo(x2, adjustedY);
            ctx.strokeStyle = `rgba(30,30,40,${0.2 * (1 - Math.abs(depth - 0.5) * 2)})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }

        for (let strand = 0; strand < 2; strand++) {
          const strandPhase = strand * Math.PI;
          ctx.beginPath();
          for (let y = -60; y < h + 60; y += 4) {
            const adjustedY = ((y + verticalSpeed) % (h + 120)) - 60;
            const phase = adjustedY * frequency + phaseOffset + strandPhase;
            const x = centerX + Math.sin(phase) * amplitude;
            if (y === -60) ctx.moveTo(x, adjustedY);
            else ctx.lineTo(x, adjustedY);
          }
          ctx.strokeStyle = 'rgba(30,30,40,0.25)';
          ctx.lineWidth = 2;
          ctx.stroke();

          for (let y = -60; y < h + 60; y += 26) {
            const adjustedY = ((y + verticalSpeed) % (h + 120)) - 60;
            const phase = adjustedY * frequency + phaseOffset + strandPhase;
            const x = centerX + Math.sin(phase) * amplitude;
            const depth = (Math.cos(phase) + 1) / 2;
            const size = 2 + depth * 2.5;
            const pulse = Math.sin(animTime * 3 + y * 0.08) * 0.35 + 0.65;
            ctx.beginPath();
            ctx.arc(x, adjustedY, size * pulse, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(40,40,50,${(0.3 + depth * 0.5) * pulse})`;
            ctx.fill();
          }
        }
      }

      if (isGamePage) {
        ctx.strokeStyle = 'rgba(0,0,0,0.08)';
        ctx.lineWidth = 0.5;
        for (let x = 0; x < w; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
        for (let y = 0; y < h; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
      }

      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.pulse += 0.02;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        const pulse = Math.sin(p.pulse) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(60,60,70,${p.opacity * pulse})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    resize();
    window.addEventListener('resize', resize);
    animId = requestAnimationFrame(animate);
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animId); };
  }, [currentPage, theme.bg]);

  const masters = [
    { id: 'fuxi', name: '伏羲', nameEn: 'Fu Xi', era: '约前3000年', eraEn: 'c. 3000 BCE', title: '八卦始祖', titleEn: 'Creator of Trigrams', avatar: '☰', portrait: './portraits/fuxi.png', quote: '"仰则观象于天，俯则观法于地"', quoteEn: '"Looking up to heavens, looking down to earth."', description: '中华民族人文始祖，创制八卦，开启中华文明的符号系统。', descriptionEn: 'Created the Eight Trigrams - humanity\'s first binary symbolic system.', contribution: '创制先天八卦', contributionEn: 'Created Earlier Heaven Bagua', significance: '开创二元符号描述世界', significanceEn: 'Pioneered binary symbols' },
    { id: 'kingwen', name: '周文王', nameEn: 'King Wen', era: '约前1152-1056年', eraEn: 'c. 1152-1056 BCE', title: '六十四卦推演者', titleEn: 'Developer of 64 Hexagrams', avatar: '䷀', portrait: './portraits/kingwen.png', quote: '"天行健，君子以自强不息"', quoteEn: '"Heaven moves with vigor."', description: '被囚羑里七年，将八卦推演为六十四卦。', descriptionEn: 'Combined trigrams into 64 hexagrams - a complete 6-bit state space.', contribution: '推演六十四卦', contributionEn: 'Derived 64 hexagrams', significance: '3-bit扩展到6-bit状态空间', significanceEn: 'Expanded to 6-bit state space' },
    { id: 'confucius', name: '孔子', nameEn: 'Confucius', era: '前551-479年', eraEn: '551-479 BCE', title: '《易传》作者', titleEn: 'Author of Ten Wings', avatar: '儒', portrait: './portraits/confucius.png', quote: '"五十以学易，可以无大过矣"', quoteEn: '"Study the Changes at fifty."', description: '儒家创始人，晚年精研《周易》，著《易传》十篇。', descriptionEn: 'Wrote Ten Wings commentary, elevating to philosophy.', contribution: '著《易传》十翼', contributionEn: 'Authored Ten Wings', significance: '状态机理论升华为哲学', significanceEn: 'Elevated to philosophy' },
    { id: 'shao', name: '邵雍', nameEn: 'Shao Yong', era: '1011-1077', eraEn: '1011-1077 CE', title: '象数易学大师', titleEn: 'Image-Number Master', avatar: '数', portrait: './portraits/shaoyong.png', quote: '"一分为二，二分为四"', quoteEn: '"One divides into two, two into four."', description: '北宋理学家，"加一倍法"与二进制完全一致。', descriptionEn: 'Doubling method identical to binary - 600 years before Leibniz.', contribution: '发现"加一倍法"', contributionEn: 'Discovered doubling method', significance: '数学描述二进制结构', significanceEn: 'Mathematical binary description' },
    { id: 'leibniz', name: '莱布尼茨', nameEn: 'Leibniz', era: '1646-1716', eraEn: '1646-1716 CE', title: '二进制发明者', titleEn: 'Binary Inventor', avatar: '01', portrait: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Gottfried_Wilhelm_von_Leibniz.jpg/240px-Gottfried_Wilhelm_von_Leibniz.jpg', quote: '"1和0足以创造一切"', quoteEn: '"One suffices to derive all."', description: '1703年发现六十四卦与二进制数0-63完美对应。', descriptionEn: 'Discovered hexagrams correspond to binary 0-63.', contribution: '发现易经与二进制对应', contributionEn: 'Linked I Ching to binary', significance: '连接东方智慧与西方数学', significanceEn: 'Connected East-West wisdom' },
    { id: 'takashima', name: '高岛吞象', nameEn: 'Takashima', era: '1832-1914', eraEn: '1832-1914 CE', title: '易学实占大师', titleEn: 'Divination Master', avatar: '占', portrait: './portraits/takashima.png', quote: '"易は天地の道"', quoteEn: '"I Ching illuminates heaven and earth."', description: '日本明治易学家，将易经应用于商业决策。', descriptionEn: 'Applied I Ching to business decisions.', contribution: '著《高岛易断》', contributionEn: 'Authored Takashima Ekidan', significance: '证明实用决策系统价值', significanceEn: 'Proved practical value' },
    { id: 'wilhelm', name: '卫礼贤', nameEn: 'R. Wilhelm', era: '1873-1930', eraEn: '1873-1930 CE', title: '易经西传使者', titleEn: 'Bridge to West', avatar: '译', portrait: './portraits/wilhelm.png', quote: '"《易经》是中国思想的源头"', quoteEn: '"I Ching is the living source."', description: '德国汉学家，完成最具影响力的《易经》德文译本。', descriptionEn: 'Produced the most influential I Ching translation.', contribution: '翻译《易经》德文本', contributionEn: 'Translated to German', significance: '西方首次系统理解易经', significanceEn: 'Enabled Western understanding' },
    { id: 'jung', name: '荣格', nameEn: 'C.G. Jung', era: '1875-1961', eraEn: '1875-1961 CE', title: '共时性理论创立者', titleEn: 'Synchronicity Creator', avatar: '心', portrait: './portraits/jung.png', quote: '"共时性是非因果性的联系"', quoteEn: '"Synchronicity is acausal connecting."', description: '深受易经启发，提出"共时性"概念。', descriptionEn: 'Developed Synchronicity inspired by I Ching.', contribution: '提出共时性原理', contributionEn: 'Developed synchronicity', significance: '连接古代智慧与现代科学', significanceEn: 'Connected to modern science' }
  ];

  const trigramInfo = { '000': { name: '坤', nameEn: 'Kūn', symbol: '☷', element: '地', elementEn: 'Earth', state: 'Ground' }, '001': { name: '震', nameEn: 'Zhèn', symbol: '☳', element: '雷', elementEn: 'Thunder', state: 'Init' }, '010': { name: '坎', nameEn: 'Kǎn', symbol: '☵', element: '水', elementEn: 'Water', state: 'Risk' }, '011': { name: '兑', nameEn: 'Duì', symbol: '☱', element: '泽', elementEn: 'Lake', state: 'Output' }, '100': { name: '艮', nameEn: 'Gèn', symbol: '☶', element: '山', elementEn: 'Mountain', state: 'Stop' }, '101': { name: '离', nameEn: 'Lí', symbol: '☲', element: '火', elementEn: 'Fire', state: 'Display' }, '110': { name: '巽', nameEn: 'Xùn', symbol: '☴', element: '风', elementEn: 'Wind', state: 'Broadcast' }, '111': { name: '乾', nameEn: 'Qián', symbol: '☰', element: '天', elementEn: 'Heaven', state: 'Active' } };
  const fourImages = { '00': { name: '少阴', nameEn: 'Lesser Yin', flip: false }, '01': { name: '少阳', nameEn: 'Lesser Yang', flip: false }, '10': { name: '老阴', nameEn: 'Greater Yin', flip: true, t: '0→1' }, '11': { name: '老阳', nameEn: 'Greater Yang', flip: true, t: '1→0' } };

  const hexagramsData = [
    { num: 1, binary: '111111', name: '乾', nameEn: 'Qián', meaning: '天', meaningEn: 'Creative', state: 'FULL_ACTIVE', desc: '全激活态', descEn: 'All open', kw: '刚健', kwEn: 'Strength', img: '天行健', imgEn: 'Heaven moves' },
    { num: 2, binary: '000000', name: '坤', nameEn: 'Kūn', meaning: '地', meaningEn: 'Receptive', state: 'RECEPTIVE', desc: '全接收态', descEn: 'Awaiting', kw: '柔顺', kwEn: 'Receptivity', img: '地势坤', imgEn: 'Earth' },
    { num: 3, binary: '010001', name: '屯', nameEn: 'Zhūn', meaning: '难', meaningEn: 'Difficulty', state: 'INIT_DIFF', desc: '初始困难', descEn: 'Boot struggle', kw: '艰难', kwEn: 'Birth pains', img: '云雷屯', imgEn: 'Thunder' },
    { num: 4, binary: '100010', name: '蒙', nameEn: 'Méng', meaning: '蒙', meaningEn: 'Folly', state: 'UNTRAINED', desc: '未训练', descEn: 'Guidance', kw: '启发', kwEn: 'Education', img: '山下泉', imgEn: 'Spring' },
    { num: 5, binary: '010111', name: '需', nameEn: 'Xū', meaning: '待', meaningEn: 'Waiting', state: 'WAIT', desc: '等待态', descEn: 'Pending', kw: '等待', kwEn: 'Patience', img: '云天', imgEn: 'Clouds' },
    { num: 6, binary: '111010', name: '讼', nameEn: 'Sòng', meaning: '讼', meaningEn: 'Conflict', state: 'CONFLICT', desc: '冲突态', descEn: 'Conflict', kw: '争执', kwEn: 'Dispute', img: '天水', imgEn: 'Opposition' },
    { num: 7, binary: '000010', name: '师', nameEn: 'Shī', meaning: '师', meaningEn: 'Army', state: 'ORGANIZE', desc: '组织态', descEn: 'Hierarchy', kw: '纪律', kwEn: 'Discipline', img: '地水', imgEn: 'Water' },
    { num: 8, binary: '010000', name: '比', nameEn: 'Bǐ', meaning: '比', meaningEn: 'Union', state: 'NETWORK', desc: '网络态', descEn: 'Connect', kw: '团结', kwEn: 'Unity', img: '水地', imgEn: 'Water' },
    { num: 9, binary: '110111', name: '小畜', nameEn: 'Xiǎo Xù', meaning: '小畜', meaningEn: 'Small Taming', state: 'BUFFER', desc: '小缓冲', descEn: 'Cache', kw: '积累', kwEn: 'Gathering', img: '风天', imgEn: 'Wind' },
    { num: 10, binary: '111011', name: '履', nameEn: 'Lǚ', meaning: '履', meaningEn: 'Treading', state: 'CAREFUL', desc: '谨慎态', descEn: 'Careful', kw: '谨慎', kwEn: 'Conduct', img: '天泽', imgEn: 'Treading' },
    { num: 11, binary: '000111', name: '泰', nameEn: 'Tài', meaning: '泰', meaningEn: 'Peace', state: 'FLOW', desc: '通畅态', descEn: 'Throughput', kw: '和谐', kwEn: 'Harmony', img: '天地交', imgEn: 'Union' },
    { num: 12, binary: '111000', name: '否', nameEn: 'Pǐ', meaning: '否', meaningEn: 'Standstill', state: 'BLOCKED', desc: '阻塞态', descEn: 'Closed', kw: '阻塞', kwEn: 'Stagnation', img: '天地不交', imgEn: 'Separation' },
    { num: 13, binary: '111101', name: '同人', nameEn: 'Tóng Rén', meaning: '同人', meaningEn: 'Fellowship', state: 'SYNC', desc: '协同态', descEn: 'Parallel', kw: '团结', kwEn: 'Fellowship', img: '天火', imgEn: 'Fellowship' },
    { num: 14, binary: '101111', name: '大有', nameEn: 'Dà Yǒu', meaning: '大有', meaningEn: 'Possession', state: 'ABUNDANCE', desc: '丰盛态', descEn: 'Resource+', kw: '丰盛', kwEn: 'Abundance', img: '火天', imgEn: 'Great having' },
    { num: 15, binary: '000100', name: '谦', nameEn: 'Qiān', meaning: '谦', meaningEn: 'Modesty', state: 'LOW_POWER', desc: '低功耗', descEn: 'Energy save', kw: '谦虚', kwEn: 'Humility', img: '地山', imgEn: 'Modesty' },
    { num: 16, binary: '001000', name: '豫', nameEn: 'Yù', meaning: '豫', meaningEn: 'Enthusiasm', state: 'READY', desc: '预备态', descEn: 'Prepared', kw: '喜悦', kwEn: 'Joy', img: '雷地', imgEn: 'Enthusiasm' },
    { num: 17, binary: '011001', name: '随', nameEn: 'Suí', meaning: '随', meaningEn: 'Following', state: 'FOLLOW', desc: '跟随态', descEn: 'Subordinate', kw: '顺从', kwEn: 'Adaptation', img: '泽雷', imgEn: 'Following' },
    { num: 18, binary: '100110', name: '蛊', nameEn: 'Gǔ', meaning: '蛊', meaningEn: 'Decay Work', state: 'REPAIR', desc: '修复态', descEn: 'Error fix', kw: '改革', kwEn: 'Repair', img: '山风', imgEn: 'Repair' },
    { num: 19, binary: '000011', name: '临', nameEn: 'Lín', meaning: '临', meaningEn: 'Approach', state: 'APPROACH', desc: '接近态', descEn: 'Connect', kw: '接近', kwEn: 'Approach', img: '地泽', imgEn: 'Approach' },
    { num: 20, binary: '110000', name: '观', nameEn: 'Guān', meaning: '观', meaningEn: 'View', state: 'OBSERVE', desc: '观察态', descEn: 'Read-only', kw: '观察', kwEn: 'Observe', img: '风地', imgEn: 'Viewing' },
    { num: 21, binary: '101001', name: '噬嗑', nameEn: 'Shì Kè', meaning: '噬嗑', meaningEn: 'Biting', state: 'FORCE', desc: '决断态', descEn: 'Force', kw: '决断', kwEn: 'Decision', img: '火雷', imgEn: 'Biting' },
    { num: 22, binary: '100101', name: '贲', nameEn: 'Bì', meaning: '贲', meaningEn: 'Grace', state: 'FORMAT', desc: '美化态', descEn: 'Styled', kw: '美化', kwEn: 'Beauty', img: '山火', imgEn: 'Grace' },
    { num: 23, binary: '100000', name: '剥', nameEn: 'Bō', meaning: '剥', meaningEn: 'Splitting', state: 'DECAY', desc: '衰减态', descEn: 'Failing', kw: '衰败', kwEn: 'Decay', img: '山地', imgEn: 'Stripping' },
    { num: 24, binary: '000001', name: '复', nameEn: 'Fù', meaning: '复', meaningEn: 'Return', state: 'RESET', desc: '复位态', descEn: 'Reboot', kw: '回归', kwEn: 'Return', img: '地雷', imgEn: 'Return' },
    { num: 25, binary: '111001', name: '无妄', nameEn: 'Wú Wàng', meaning: '无妄', meaningEn: 'Innocence', state: 'AUTHENTIC', desc: '真实态', descEn: 'No mask', kw: '真诚', kwEn: 'Sincerity', img: '天雷', imgEn: 'Innocence' },
    { num: 26, binary: '100111', name: '大畜', nameEn: 'Dà Xù', meaning: '大畜', meaningEn: 'Great Taming', state: 'BIG_BUFFER', desc: '大缓冲', descEn: 'Deep store', kw: '积累', kwEn: 'Accumulate', img: '山天', imgEn: 'Great taming' },
    { num: 27, binary: '100001', name: '颐', nameEn: 'Yí', meaning: '颐', meaningEn: 'Nourish', state: 'MAINTAIN', desc: '养护态', descEn: 'Upkeep', kw: '滋养', kwEn: 'Nourish', img: '山雷', imgEn: 'Nourishing' },
    { num: 28, binary: '011110', name: '大过', nameEn: 'Dà Guò', meaning: '大过', meaningEn: 'Excess', state: 'OVERLOAD', desc: '过载态', descEn: 'Critical', kw: '过度', kwEn: 'Excess', img: '泽风', imgEn: 'Great exceeding' },
    { num: 29, binary: '010010', name: '坎', nameEn: 'Kǎn', meaning: '坎', meaningEn: 'Abysmal', state: 'DANGER', desc: '危险态', descEn: 'Deep risk', kw: '危险', kwEn: 'Danger', img: '坎水', imgEn: 'Water' },
    { num: 30, binary: '101101', name: '离', nameEn: 'Lí', meaning: '离', meaningEn: 'Clinging', state: 'DISPLAY', desc: '显示态', descEn: 'Clear out', kw: '光明', kwEn: 'Brightness', img: '离火', imgEn: 'Fire' },
    { num: 31, binary: '011100', name: '咸', nameEn: 'Xián', meaning: '咸', meaningEn: 'Influence', state: 'SENSE', desc: '感应态', descEn: 'Coupling', kw: '感应', kwEn: 'Attraction', img: '泽山', imgEn: 'Influence' },
    { num: 32, binary: '001110', name: '恒', nameEn: 'Héng', meaning: '恒', meaningEn: 'Duration', state: 'STEADY', desc: '恒定态', descEn: 'Stable', kw: '持久', kwEn: 'Persistence', img: '雷风', imgEn: 'Duration' },
    { num: 33, binary: '111100', name: '遁', nameEn: 'Dùn', meaning: '遁', meaningEn: 'Retreat', state: 'RETREAT', desc: '退避态', descEn: 'Withdraw', kw: '退避', kwEn: 'Retreat', img: '天山', imgEn: 'Retreat' },
    { num: 34, binary: '001111', name: '大壮', nameEn: 'Dà Zhuàng', meaning: '大壮', meaningEn: 'Great Power', state: 'POWER', desc: '强盛态', descEn: 'Max out', kw: '强盛', kwEn: 'Strength', img: '雷天', imgEn: 'Great power' },
    { num: 35, binary: '101000', name: '晋', nameEn: 'Jìn', meaning: '晋', meaningEn: 'Progress', state: 'PROGRESS', desc: '进展态', descEn: 'Upgrading', kw: '进步', kwEn: 'Advancement', img: '火地', imgEn: 'Progress' },
    { num: 36, binary: '000101', name: '明夷', nameEn: 'Míng Yí', meaning: '明夷', meaningEn: 'Darkening', state: 'HIDDEN', desc: '隐匿态', descEn: 'Low profile', kw: '隐藏', kwEn: 'Concealment', img: '地火', imgEn: 'Darkening' },
    { num: 37, binary: '110101', name: '家人', nameEn: 'Jiā Rén', meaning: '家人', meaningEn: 'Family', state: 'INTERNAL', desc: '内部态', descEn: 'Closed sys', kw: '家庭', kwEn: 'Family', img: '风火', imgEn: 'Family' },
    { num: 38, binary: '101011', name: '睽', nameEn: 'Kuí', meaning: '睽', meaningEn: 'Opposition', state: 'DIVERGE', desc: '分歧态', descEn: 'Opposition', kw: '对立', kwEn: 'Opposition', img: '火泽', imgEn: 'Opposition' },
    { num: 39, binary: '010100', name: '蹇', nameEn: 'Jiǎn', meaning: '蹇', meaningEn: 'Obstruction', state: 'OBSTACLE', desc: '阻碍态', descEn: 'Blocked', kw: '困难', kwEn: 'Difficulty', img: '水山', imgEn: 'Obstruction' },
    { num: 40, binary: '001010', name: '解', nameEn: 'Xiè', meaning: '解', meaningEn: 'Deliverance', state: 'RELEASE', desc: '释放态', descEn: 'Unlock', kw: '解脱', kwEn: 'Release', img: '雷水', imgEn: 'Deliverance' },
    { num: 41, binary: '100011', name: '损', nameEn: 'Sǔn', meaning: '损', meaningEn: 'Decrease', state: 'DECREASE', desc: '减损态', descEn: 'Free mem', kw: '减少', kwEn: 'Decrease', img: '山泽', imgEn: 'Decrease' },
    { num: 42, binary: '110001', name: '益', nameEn: 'Yì', meaning: '益', meaningEn: 'Increase', state: 'INCREASE', desc: '增益态', descEn: 'Acquire', kw: '增加', kwEn: 'Increase', img: '风雷', imgEn: 'Increase' },
    { num: 43, binary: '011111', name: '夬', nameEn: 'Guài', meaning: '夬', meaningEn: 'Breakthrough', state: 'BREAK', desc: '突破态', descEn: 'Decisive', kw: '决断', kwEn: 'Resolution', img: '泽天', imgEn: 'Breakthrough' },
    { num: 44, binary: '111110', name: '姤', nameEn: 'Gòu', meaning: '姤', meaningEn: 'Coming to Meet', state: 'ENCOUNTER', desc: '遭遇态', descEn: 'Unexpected', kw: '邂逅', kwEn: 'Encounter', img: '天风', imgEn: 'Meeting' },
    { num: 45, binary: '011000', name: '萃', nameEn: 'Cuì', meaning: '萃', meaningEn: 'Gathering', state: 'GATHER', desc: '聚集态', descEn: 'Aggregate', kw: '聚集', kwEn: 'Assembly', img: '泽地', imgEn: 'Gathering' },
    { num: 46, binary: '000110', name: '升', nameEn: 'Shēng', meaning: '升', meaningEn: 'Pushing Up', state: 'ASCEND', desc: '上升态', descEn: 'Growing', kw: '上升', kwEn: 'Ascending', img: '地风', imgEn: 'Pushing up' },
    { num: 47, binary: '011010', name: '困', nameEn: 'Kùn', meaning: '困', meaningEn: 'Oppression', state: 'EXHAUSTED', desc: '困境态', descEn: 'Depleted', kw: '困境', kwEn: 'Exhaustion', img: '泽水', imgEn: 'Oppression' },
    { num: 48, binary: '010110', name: '井', nameEn: 'Jǐng', meaning: '井', meaningEn: 'The Well', state: 'SOURCE', desc: '源头态', descEn: 'Supply', kw: '滋养', kwEn: 'Nourishment', img: '水风', imgEn: 'The well' },
    { num: 49, binary: '011101', name: '革', nameEn: 'Gé', meaning: '革', meaningEn: 'Revolution', state: 'REVOLUTION', desc: '变革态', descEn: 'Refactor', kw: '变革', kwEn: 'Change', img: '泽火', imgEn: 'Revolution' },
    { num: 50, binary: '101110', name: '鼎', nameEn: 'Dǐng', meaning: '鼎', meaningEn: 'Cauldron', state: 'TRANSFORM', desc: '转化态', descEn: 'Processing', kw: '转化', kwEn: 'Transform', img: '火风', imgEn: 'Cauldron' },
    { num: 51, binary: '001001', name: '震', nameEn: 'Zhèn', meaning: '震', meaningEn: 'Arousing', state: 'ACTIVATE', desc: '激活态', descEn: 'Start', kw: '震动', kwEn: 'Shock', img: '震雷', imgEn: 'Thunder' },
    { num: 52, binary: '100100', name: '艮', nameEn: 'Gèn', meaning: '艮', meaningEn: 'Still', state: 'PAUSE', desc: '静止态', descEn: 'Still', kw: '静止', kwEn: 'Stillness', img: '艮山', imgEn: 'Mountain' },
    { num: 53, binary: '110100', name: '渐', nameEn: 'Jiàn', meaning: '渐', meaningEn: 'Development', state: 'GRADUAL', desc: '渐进态', descEn: 'Step by step', kw: '循序', kwEn: 'Gradual', img: '风山', imgEn: 'Development' },
    { num: 54, binary: '001011', name: '归妹', nameEn: 'Guī Mèi', meaning: '归妹', meaningEn: 'Marrying Maiden', state: 'DEPENDENT', desc: '从属态', descEn: 'Linked', kw: '从属', kwEn: 'Subordinate', img: '雷泽', imgEn: 'Marrying' },
    { num: 55, binary: '001101', name: '丰', nameEn: 'Fēng', meaning: '丰', meaningEn: 'Abundance', state: 'PEAK', desc: '峰值态', descEn: 'Maximum', kw: '丰盛', kwEn: 'Abundance', img: '雷火', imgEn: 'Abundance' },
    { num: 56, binary: '101100', name: '旅', nameEn: 'Lǚ', meaning: '旅', meaningEn: 'Wanderer', state: 'TEMPORARY', desc: '游离态', descEn: 'Transient', kw: '旅行', kwEn: 'Travel', img: '火山', imgEn: 'Wanderer' },
    { num: 57, binary: '110110', name: '巽', nameEn: 'Xùn', meaning: '巽', meaningEn: 'Gentle', state: 'PENETRATE', desc: '渗透态', descEn: 'Deep cast', kw: '渗透', kwEn: 'Penetration', img: '巽风', imgEn: 'Wind' },
    { num: 58, binary: '011011', name: '兑', nameEn: 'Duì', meaning: '兑', meaningEn: 'Joyous', state: 'JOY', desc: '喜悦态', descEn: 'Positive', kw: '喜悦', kwEn: 'Joy', img: '兑泽', imgEn: 'Lake' },
    { num: 59, binary: '110010', name: '涣', nameEn: 'Huàn', meaning: '涣', meaningEn: 'Dispersion', state: 'DISPERSE', desc: '分散态', descEn: 'Distributed', kw: '分散', kwEn: 'Dissolution', img: '风水', imgEn: 'Dispersion' },
    { num: 60, binary: '010011', name: '节', nameEn: 'Jié', meaning: '节', meaningEn: 'Limitation', state: 'LIMIT', desc: '限制态', descEn: 'Constrained', kw: '节制', kwEn: 'Limitation', img: '水泽', imgEn: 'Limitation' },
    { num: 61, binary: '110011', name: '中孚', nameEn: 'Zhōng Fú', meaning: '中孚', meaningEn: 'Inner Truth', state: 'TRUTH', desc: '诚信态', descEn: 'Validated', kw: '真诚', kwEn: 'Sincerity', img: '风泽', imgEn: 'Inner truth' },
    { num: 62, binary: '001100', name: '小过', nameEn: 'Xiǎo Guò', meaning: '小过', meaningEn: 'Small Exceeding', state: 'FINE_TUNE', desc: '微调态', descEn: 'Minor adj', kw: '谨慎', kwEn: 'Caution', img: '雷山', imgEn: 'Small exceeding' },
    { num: 63, binary: '010101', name: '既济', nameEn: 'Jì Jì', meaning: '既济', meaningEn: 'After Completion', state: 'COMPLETE', desc: '完成态', descEn: 'Task done', kw: '完成', kwEn: 'Completion', img: '水火', imgEn: 'After completion' },
    { num: 64, binary: '101010', name: '未济', nameEn: 'Wèi Jì', meaning: '未济', meaningEn: 'Before Completion', state: 'INCOMPLETE', desc: '未完成态', descEn: 'Pending', kw: '未完', kwEn: 'Incomplete', img: '火水', imgEn: 'Before completion' }
  ];

  const puzzles = [
    { start: 0, target: 1, max: 1, hint: '翻转一比特', hintEn: 'Flip one bit' },
    { start: 0, target: 7, max: 3, hint: '抵达流动态', hintEn: 'Reach flow state' },
    { start: 0, target: 63, max: 6, hint: '全激活', hintEn: 'Full activation' },
    { start: 63, target: 0, max: 6, hint: '回归原点', hintEn: 'Return to origin' },
    { start: 21, target: 42, max: 6, hint: '取反', hintEn: 'Bitwise invert' },
    { start: 1, target: 62, max: 5, hint: '差一步', hintEn: 'One step away' },
    { start: 36, target: 27, max: 6, hint: '镜像', hintEn: 'Mirror' },
    { start: 0, target: 21, max: 3, hint: '完成在望', hintEn: 'Almost done' }
  ];

  const getBit = (st, p) => (st >> p) & 1;
  const toBinary = (st, b = 6) => st.toString(2).padStart(b, '0');
  const hammingDist = (a, b) => { let x = a ^ b, c = 0; while (x) { c += x & 1; x >>= 1; } return c; };
  const getHexInfo = (bin) => { if (typeof bin === 'number') bin = toBinary(bin); return hexagramsData.find(h => h.binary === bin); };
  const flipBit = useCallback((p) => { setAnimatingBit(p); setTimeout(() => setAnimatingBit(null), 300); const n = gameState ^ (1 << p); setGameState(n); setMoves(m => m + 1); if (targetState !== null && n === targetState && level >= 3 && !showEpiphany) setTimeout(() => setShowEpiphany(true), 500); }, [gameState, targetState, level, showEpiphany]);

  const s = { ctr: { position: 'relative', minHeight: '100vh', overflow: 'hidden', fontFamily: '"PingFang SC", "Microsoft YaHei", "SF Mono", "Consolas", sans-serif', background: theme.bg, color: theme.text }, canvas: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }, content: { position: 'relative', zIndex: 10, minHeight: '100vh', padding: '80px 16px 32px', pointerEvents: 'auto' }, nav: { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', justifyContent: 'center', padding: 12 }, navIn: { display: 'flex', gap: 4, padding: 4, borderRadius: 8, background: theme.card, backdropFilter: 'blur(20px)', border: `1px solid ${theme.border}` }, navBtn: (a) => ({ padding: '10px 18px', borderRadius: 6, fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer', background: a ? '#1a1a1a' : 'transparent', color: a ? '#fff' : theme.sub }), card: { background: theme.card, backdropFilter: 'blur(20px)', borderRadius: 12, padding: 32, border: `1px solid ${theme.border}` }, center: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 112px)' }, title: { fontSize: 36, fontWeight: 300, letterSpacing: 4, marginBottom: 8, color: theme.text, fontFamily: 'inherit' }, btn: { padding: '14px 28px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 500 } };

  const Taiji = ({ size = 80, onClick, interactive }) => (<button type="button" onMouseDown={(e) => { e.preventDefault(); onClick?.(); }} style={{ background: 'none', border: 'none', padding: 0, cursor: interactive ? 'pointer' : 'default' }}><svg viewBox="0 0 100 100" style={{ width: size, height: size, transform: `rotate(${rotation}deg)` }}><circle cx="50" cy="50" r="48" fill="#f5f5f5" stroke="#1a1a1a" strokeWidth="1.5" /><path d="M50,2 A48,48 0 0,1 50,98 A24,24 0 0,1 50,50 A24,24 0 0,0 50,2" fill="#1a1a1a" /><circle cx="50" cy="26" r="7" fill="#1a1a1a" /><circle cx="50" cy="74" r="7" fill="#f5f5f5" stroke="#1a1a1a" strokeWidth="1.5" /></svg></button>);
  const Line = ({ isYang, w = 50, h = 8, glow }) => (<div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>{isYang ? <div style={{ width: w, height: h, background: glow ? '#1a1a1a' : '#333', borderRadius: h / 2, boxShadow: glow ? '0 0 10px rgba(0,0,0,0.2)' : 'none' }} /> : <><div style={{ width: w * 0.4, height: h, background: glow ? '#555' : '#444', borderRadius: h / 2 }} /><div style={{ width: w * 0.4, height: h, background: glow ? '#555' : '#444', borderRadius: h / 2 }} /></>}</div>);
  const Hexagram = ({ binary, size = 'normal', glow }) => { const w = size === 'small' ? 28 : size === 'tiny' ? 20 : 40, h = size === 'small' ? 4 : size === 'tiny' ? 3 : 5; return (<div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 3 }}>{binary.split('').map((bit, i) => (<div key={i} style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>{bit === '1' ? <div style={{ width: w, height: h, background: glow ? '#1a1a1a' : '#333', borderRadius: 2 }} /> : <><div style={{ width: w * 0.4, height: h, background: glow ? '#666' : '#555', borderRadius: 2 }} /><div style={{ width: w * 0.4, height: h, background: glow ? '#666' : '#555', borderRadius: 2 }} /></>}</div>))}</div>); };
  const GameBitLine = ({ value, position, canFlip, isAnimating: anim }) => { const isY = value === 1; return (<button type="button" onMouseDown={(e) => { e.preventDefault(); canFlip && flipBit(position); }} disabled={!canFlip} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'none', border: 'none', cursor: canFlip ? 'pointer' : 'default', opacity: canFlip ? 1 : 0.5, transform: anim ? 'scale(1.15) rotateX(180deg)' : 'scale(1)', transition: 'all 0.3s' }}><Line isYang={isY} w={60} h={10} glow={canFlip} /><div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 64 }}><span style={{ fontFamily: 'monospace', fontSize: 20, fontWeight: 'bold', color: isY ? '#1a1a1a' : '#555' }}>{value}</span><span style={{ fontSize: 13, color: theme.sub }}>{isY ? '阳 Yang' : '阴 Yin'}</span></div></button>); };
  const MasterAvatar = ({ symbol, imageUrl, size = 120 }) => {
    const [imgFailed, setImgFailed] = useState(false);
    const isCircle = size === 88;
    const showSymbol = !imageUrl || imgFailed;
    if (imageUrl && !imgFailed) {
      return (
        <img
          src={imageUrl}
          alt=""
          onError={() => setImgFailed(true)}
          style={{
            width: size,
            height: size,
            objectFit: 'cover',
            borderRadius: isCircle ? '50%' : 24,
          }}
        />
      );
    }
    return (
      <div style={{
        width: size,
        height: size,
        borderRadius: isCircle ? '50%' : 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.45,
        background: 'rgba(0,0,0,0.08)',
        color: '#1a1a1a',
      }}>
        {symbol}
      </div>
    );
  };

  const LinesSection = ({ hex, compact = false }) => {
    const linesByHexCtx = useContext(LinesByHexContext);
    const langMode = useContext(HexLangModeContext);
    const showCn = langMode === 'both' || langMode === 'cn';
    const showEn = langMode === 'both' || langMode === 'en';
    const lines = hex ? getLinesForHex(hex.num, linesByHexCtx) : null;
    if (!hex || !lines) return null;
    const lineLabels = ['初 Initial', '二 2nd', '三 3rd', '四 4th', '五 5th', '上 Top'];
    const order = [5, 4, 3, 2, 1, 0];
    const ArrowUp = () => (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0', color: theme.sub, opacity: 0.7 }}>
        <span style={{ fontSize: 14 }}>↑</span>
      </div>
    );
    if (compact) {
      return (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${theme.border}` }}>
          <p style={{ fontSize: 11, color: theme.sub, marginBottom: 6 }}>六爻 / Line Statements</p>
          <p style={{ fontSize: 10, color: theme.sub, marginBottom: 8, fontStyle: 'italic' }}>自初爻至上爻，事物发展递进 / From bottom to top, development unfolds</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {order.map((idx, i) => (
              <React.Fragment key={idx}>
                {i > 0 && <ArrowUp />}
                <div style={{ fontSize: 12, color: theme.text }}>
                  <span style={{ fontFamily: 'monospace', color: theme.sub, marginRight: 8 }}>{lineLabels[idx]}</span>
                  {showCn && <span>{lines[idx].cn}</span>}
                  {showEn && <div style={{ fontSize: 11, color: theme.sub, marginTop: 2, marginLeft: 0 }}>{lines[idx].en}</div>}
                  {(lines[idx].plainCn || lines[idx].plainEn) && (showCn || showEn) && (
                    <div style={{ fontSize: 11, color: theme.sub, marginTop: 4, marginLeft: 0, paddingTop: 4, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                      {showCn && lines[idx].plainCn && <div>白话 Vernacular: {lines[idx].plainCn}</div>}
                      {showEn && lines[idx].plainEn && <div style={{ marginTop: 2 }}>Vernacular: {lines[idx].plainEn}</div>}
                    </div>
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div style={{ padding: 18, borderRadius: 12, background: 'rgba(0,0,0,0.02)', border: `1px solid ${theme.border}` }}>
        <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 4, color: theme.text }}>六爻释义 / Line-by-Line</p>
        <p style={{ fontSize: 12, color: theme.sub, marginBottom: 14, lineHeight: 1.5 }}>每一卦描述事物的发展过程，自初爻至上爻依次递进。从下往上读，体会变化脉络。 / Each hexagram describes a process; read bottom to top.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {order.map((idx, i) => (
              <React.Fragment key={idx}>
                {i > 0 && <ArrowUp />}
                <div style={{ padding: '10px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.5)' }}>
                  <p style={{ fontSize: 12, color: theme.sub, marginBottom: 4 }}>{lineLabels[idx]} →</p>
                  {showCn && <p style={{ fontSize: 14, marginBottom: 4 }}>{lines[idx].cn}</p>}
                  {showEn && <p style={{ fontSize: 13, color: theme.sub, lineHeight: 1.5 }}>{lines[idx].en}</p>}
                  {(lines[idx].plainCn || lines[idx].plainEn) && (showCn || showEn) && (
                    <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${theme.border}` }}>
                      <p style={{ fontSize: 12, color: theme.sub, marginBottom: 2 }}>白话 · Vernacular</p>
                      {showCn && lines[idx].plainCn && <p style={{ fontSize: 13, marginBottom: 4, lineHeight: 1.5 }}>{lines[idx].plainCn}</p>}
                      {showEn && lines[idx].plainEn && <p style={{ fontSize: 12, color: theme.sub, lineHeight: 1.5 }}>{lines[idx].plainEn}</p>}
                    </div>
                  )}
                </div>
              </React.Fragment>
            ))}
        </div>
      </div>
    );
  };

  const Nav = () => (<nav style={s.nav}><div style={s.navIn}>{[{ id: 'home', l: '首页 Home' }, { id: 'masters', l: '先贤 Masters' }, { id: 'hexagrams', l: '六十四卦 64 Hexagrams' }, { id: 'game', l: '游戏 Game' }].map(({ id, l }) => (<button type="button" key={id} onMouseDown={(e) => { e.preventDefault(); setCurrentPage(id); setSelectedHexagram(null); setSelectedMaster(null); setHomePhase(0); setCurrentTrigram([]); setLowerTrigram(null); setUpperTrigram(null); setGameMode('menu'); }} style={s.navBtn(currentPage === id)}>{l}</button>))}</div></nav>);

  const HomePage = () => {
    const handleTaijiClick = () => { setIsAnimating(true); setSeparationProgress(0); };
    const addLine = (v) => currentTrigram.length < 3 && setCurrentTrigram([...currentTrigram, v]);
    const setAsLower = () => { if (currentTrigram.length === 3) { setLowerTrigram(currentTrigram.join('')); setCurrentTrigram([]); setHomePhase(3); } };
    const setAsUpper = () => { if (currentTrigram.length === 3) { setUpperTrigram(currentTrigram.join('')); setCurrentTrigram([]); } };
    const resetAll = () => { setHomePhase(0); setCurrentTrigram([]); setLowerTrigram(null); setUpperTrigram(null); setSeparationProgress(0); setIsAnimating(false); };
    const trigramKey = currentTrigram.length === 3 ? currentTrigram.join('') : null;
    const fullHex = lowerTrigram && upperTrigram ? lowerTrigram + upperTrigram : null;
    const hexData = fullHex ? getHexInfo(fullHex) : null;

    if (homePhase === 0 && !isAnimating) return (<div style={s.center}><div style={{ textAlign: 'center', marginBottom: 40 }}><h1 style={{ ...s.title, fontSize: 42 }}>二进制之道 · Tao of Binary</h1><p style={{ fontSize: 15, color: theme.sub }}>易经是古老的状态迁移系统 / I Ching: an ancient state-transition system</p></div><div style={{ ...s.card, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 40 }}><p style={{ fontSize: 12, color: '#999', marginBottom: 20 }}>PRE-BINARY · 尚未离散化 Not yet discretized</p><Taiji size={140} onClick={handleTaijiClick} interactive={true} /><p style={{ fontSize: 26, fontWeight: 300, marginTop: 28 }}>太极 Taiji</p><p style={{ fontSize: 14, color: theme.sub }}>Taiji · The Undifferentiated</p></div><p style={{ fontSize: 13, color: '#aaa', marginTop: 40 }}>点击开始离散化 Click to start discretization →</p></div>);
    if (isAnimating) { const sp = separationProgress * 120; return (<div style={s.center}><div style={{ textAlign: 'center', marginBottom: 40 }}><h2 style={{ fontSize: 26, fontWeight: 300 }}>模拟 → 数字 Analog → Digital</h2></div><div style={{ position: 'relative', width: 320, height: 200 }}><div style={{ position: 'absolute', left: `calc(50% - ${sp}px - 45px)`, top: '50%', transform: 'translateY(-50%)', opacity: separationProgress }}><div style={{ width: 90, height: 14, background: '#888', borderRadius: 7 }} /></div><div style={{ position: 'absolute', left: `calc(50% + ${sp}px - 45px)`, top: '50%', transform: 'translateY(-50%)', opacity: separationProgress, display: 'flex', gap: 14 }}><div style={{ width: 36, height: 14, background: '#888', borderRadius: 7 }} /><div style={{ width: 36, height: 14, background: '#888', borderRadius: 7 }} /></div><div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', opacity: 1 - separationProgress }}><Taiji size={120} /></div></div></div>); }
    if (homePhase === 1) return (<div style={s.center}><div style={{ textAlign: 'center', marginBottom: 32 }}><h2 style={{ fontSize: 26, fontWeight: 300, marginBottom: 8 }}>第一层：二进制逻辑 Layer 1: Binary Logic</h2><p style={{ fontSize: 14, color: theme.sub }}>Yang = 1, Yin = 0</p></div><div style={{ display: 'flex', gap: 32, marginBottom: 32, flexWrap: 'wrap', justifyContent: 'center' }}><button type="button" onMouseDown={(e) => { e.preventDefault(); setHomePhase(2); }} style={{ ...s.card, cursor: 'pointer', border: 'none', minWidth: 140 }}><div style={{ width: 80, height: 14, background: '#888', borderRadius: 7, margin: '0 auto' }} /><div style={{ textAlign: 'center', marginTop: 20 }}><p style={{ fontSize: 22 }}>阳 Yang</p><p style={{ fontSize: 36, fontFamily: 'monospace', fontWeight: 'bold', opacity: 0.6 }}>1</p></div></button><button type="button" onMouseDown={(e) => { e.preventDefault(); setHomePhase(2); }} style={{ ...s.card, cursor: 'pointer', border: 'none', minWidth: 140 }}><div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}><div style={{ width: 32, height: 14, background: '#888', borderRadius: 7 }} /><div style={{ width: 32, height: 14, background: '#888', borderRadius: 7 }} /></div><div style={{ textAlign: 'center', marginTop: 20 }}><p style={{ fontSize: 22 }}>阴 Yin</p><p style={{ fontSize: 36, fontFamily: 'monospace', fontWeight: 'bold', opacity: 0.6 }}>0</p></div></button></div><div style={{ ...s.card, padding: 20 }}><p style={{ fontSize: 12, textAlign: 'center', marginBottom: 16, color: theme.sub }}>四象 Four Images · 2-bit</p><div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>{Object.entries(fourImages).map(([c, i]) => (<div key={c} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 14px', borderRadius: 12, background: i.flip ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)' }}><span style={{ fontFamily: 'monospace', fontSize: 15, color: theme.sub }}>{c}</span><span style={{ fontSize: 13, color: theme.sub, marginTop: 4 }}>{i.name} · {i.nameEn}</span>{i.flip && <span style={{ fontSize: 11, color: '#aaa', marginTop: 2 }}>{i.t}</span>}</div>))}</div></div><button type="button" onMouseDown={(e) => { e.preventDefault(); resetAll(); }} style={{ marginTop: 28, background: 'none', border: 'none', fontSize: 13, color: '#999', cursor: 'pointer' }}>← 重新开始 Restart</button></div>);
    if (homePhase === 2) return (<div style={s.center}><div style={{ textAlign: 'center', marginBottom: 28 }}><h2 style={{ fontSize: 26, fontWeight: 300, marginBottom: 8 }}>第二层：八卦 (3-bit) Layer 2: Eight Trigrams</h2><p style={{ fontSize: 14, color: theme.sub }}>自下而上构建 Built bottom-up</p></div><div style={{ ...s.card, minWidth: 280, maxWidth: 320, marginBottom: 24 }}><div style={{ minHeight: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>{currentTrigram.length === 0 ? <p style={{ color: '#bbb' }}>选择爻线 Select lines</p> : <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 10 }}>{currentTrigram.map((v, i) => <Line key={i} isYang={v === 1} w={80} h={12} />)}</div>}</div>{currentTrigram.length > 0 && (<div style={{ textAlign: 'center', marginTop: 20, paddingTop: 20, borderTop: `1px solid ${theme.border}` }}><p style={{ fontFamily: 'monospace', fontSize: 22, letterSpacing: 6, color: theme.sub }}>{currentTrigram.join('')}</p>{trigramKey && trigramInfo[trigramKey] && (<div style={{ marginTop: 16 }}><p style={{ fontSize: 40 }}>{trigramInfo[trigramKey].symbol}</p><p style={{ fontSize: 22, marginTop: 8 }}>{trigramInfo[trigramKey].name} · {trigramInfo[trigramKey].element} {trigramInfo[trigramKey].elementEn}</p></div>)}</div>)}</div><div style={{ display: 'flex', gap: 16, marginBottom: 20 }}><button type="button" onMouseDown={(e) => { e.preventDefault(); currentTrigram.length < 3 && addLine(1); }} disabled={currentTrigram.length >= 3} style={{ ...s.card, padding: 18, cursor: currentTrigram.length >= 3 ? 'default' : 'pointer', opacity: currentTrigram.length >= 3 ? 0.3 : 1, border: 'none' }}><div style={{ width: 56, height: 10, background: '#888', borderRadius: 5, margin: '0 auto' }} /><span style={{ display: 'block', fontSize: 14, marginTop: 10, color: theme.sub }}>阳 Yang (1)</span></button><button type="button" onMouseDown={(e) => { e.preventDefault(); currentTrigram.length < 3 && addLine(0); }} disabled={currentTrigram.length >= 3} style={{ ...s.card, padding: 18, cursor: currentTrigram.length >= 3 ? 'default' : 'pointer', opacity: currentTrigram.length >= 3 ? 0.3 : 1, border: 'none' }}><div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}><div style={{ width: 22, height: 10, background: '#888', borderRadius: 5 }} /><div style={{ width: 22, height: 10, background: '#888', borderRadius: 5 }} /></div><span style={{ display: 'block', fontSize: 14, marginTop: 10, color: theme.sub }}>阴 Yin (0)</span></button></div><div style={{ display: 'flex', gap: 12 }}><button type="button" onMouseDown={(e) => { e.preventDefault(); setCurrentTrigram([]); }} style={{ padding: '10px 20px', background: 'none', border: 'none', fontSize: 14, color: theme.sub, cursor: 'pointer' }}>重置 Reset</button>{currentTrigram.length === 3 && <button type="button" onMouseDown={(e) => { e.preventDefault(); setAsLower(); }} style={{ ...s.btn, background: '#1a1a1a', color: '#fff' }}>设为下卦 Set as Lower →</button>}</div><div style={{ marginTop: 36, maxWidth: 380 }}><p style={{ fontSize: 12, textAlign: 'center', marginBottom: 14, color: '#999' }}>八卦 Eight Trigrams · 3-bit</p><div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>{Object.entries(trigramInfo).map(([c, i]) => (<div key={c} style={{ ...s.card, padding: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}><span style={{ fontSize: 24 }}>{i.symbol}</span><span style={{ fontSize: 14, marginTop: 4 }}>{i.name}</span><span style={{ fontSize: 11, fontFamily: 'monospace', color: '#888' }}>{c}</span></div>))}</div></div><button type="button" onMouseDown={(e) => { e.preventDefault(); setHomePhase(1); }} style={{ marginTop: 28, background: 'none', border: 'none', fontSize: 13, color: '#999', cursor: 'pointer' }}>← 返回 Back</button></div>);
    if (homePhase === 3) return (<div style={s.center}><div style={{ textAlign: 'center', marginBottom: 28 }}><h2 style={{ fontSize: 26, fontWeight: 300, marginBottom: 8 }}>第三层：六十四卦 (6-bit) Layer 3: 64 Hexagrams</h2><p style={{ fontSize: 14, color: theme.sub }}>下卦 + 上卦 Lower + Upper</p></div><div style={{ ...s.card, minWidth: 300, maxWidth: 360, marginBottom: 24 }}><div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{upperTrigram ? (<div style={{ marginBottom: 12 }}><p style={{ fontSize: 12, textAlign: 'center', marginBottom: 10, color: theme.sub }}>上卦 Upper · {trigramInfo[upperTrigram]?.name}</p><div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 8 }}>{upperTrigram.split('').map((b, i) => <Line key={`u-${i}`} isYang={b === '1'} w={70} h={10} />)}</div></div>) : (<div style={{ marginBottom: 20 }}><p style={{ fontSize: 14, marginBottom: 14, color: theme.sub }}>构建上卦 Build Upper Trigram</p>{currentTrigram.length > 0 && <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 8, marginBottom: 14 }}>{currentTrigram.map((v, i) => <Line key={i} isYang={v === 1} w={70} h={10} />)}</div>}<div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}><button type="button" onMouseDown={(e) => { e.preventDefault(); currentTrigram.length < 3 && addLine(1); }} disabled={currentTrigram.length >= 3} style={{ padding: 10, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: 'none', cursor: currentTrigram.length >= 3 ? 'default' : 'pointer', opacity: currentTrigram.length >= 3 ? 0.3 : 1 }}><div style={{ width: 44, height: 8, background: '#888', borderRadius: 4 }} /></button><button type="button" onMouseDown={(e) => { e.preventDefault(); currentTrigram.length < 3 && addLine(0); }} disabled={currentTrigram.length >= 3} style={{ padding: 10, borderRadius: 10, background: 'rgba(0,0,0,0.05)', border: 'none', cursor: currentTrigram.length >= 3 ? 'default' : 'pointer', opacity: currentTrigram.length >= 3 ? 0.3 : 1 }}><div style={{ display: 'flex', gap: 6 }}><div style={{ width: 18, height: 8, background: '#1a1a1a', borderRadius: 4 }} /><div style={{ width: 18, height: 8, background: '#1a1a1a', borderRadius: 4 }} /></div></button></div>{currentTrigram.length === 3 && <button type="button" onMouseDown={(e) => { e.preventDefault(); setAsUpper(); }} style={{ marginTop: 14, padding: '6px 18px', borderRadius: 50, fontSize: 13, background: theme.accent, color: '#fff', border: 'none', cursor: 'pointer' }}>确认上卦 Confirm Upper</button>}</div>)}{upperTrigram && lowerTrigram && <div style={{ width: '100%', borderTop: `1px solid ${theme.border}`, margin: '14px 0' }} />}<div style={{ marginTop: 12 }}><div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 8 }}>{lowerTrigram.split('').map((b, i) => <Line key={`l-${i}`} isYang={b === '1'} w={70} h={10} />)}</div><p style={{ fontSize: 12, textAlign: 'center', marginTop: 10, color: theme.sub }}>下卦 Lower · {trigramInfo[lowerTrigram]?.name}</p></div>{fullHex && (<div style={{ marginTop: 28, paddingTop: 20, textAlign: 'center', width: '100%', borderTop: `1px solid ${theme.border}` }}><p style={{ fontFamily: 'monospace', fontSize: 20, letterSpacing: 6, color: theme.accent }}>{fullHex}</p><p style={{ fontSize: 12, color: '#aaa', marginTop: 4 }}>十进制 Decimal: {parseInt(fullHex, 2)}</p>{hexData && (<><p style={{ fontSize: 32, marginTop: 12 }}>第 {hexData.num} 卦 Hexagram {hexData.num} · {hexData.name}</p><p style={{ fontSize: 18, color: theme.sub }}>{hexData.nameEn} · {hexData.meaning}</p><div style={{ marginTop: 18, padding: 14, borderRadius: 12, background: 'rgba(0,136,255,0.06)' }}><p style={{ fontSize: 14, fontFamily: 'monospace', color: theme.accent }}>{hexData.state}</p><p style={{ fontSize: 14, color: theme.sub, marginTop: 4 }}>{hexData.desc} · {hexData.descEn}</p></div><div style={{ marginTop: 20, textAlign: 'left' }}><LinesSection hex={hexData} compact={true} /></div></>)}</div>)}</div></div><div style={{ display: 'flex', gap: 14 }}><button type="button" onMouseDown={(e) => { e.preventDefault(); resetAll(); }} style={{ padding: '12px 22px', borderRadius: 50, fontSize: 14, color: theme.sub, background: 'transparent', border: `1px solid ${theme.border}`, cursor: 'pointer' }}>重新开始 Restart</button><button type="button" onMouseDown={(e) => { e.preventDefault(); setUpperTrigram(null); setCurrentTrigram([]); }} style={{ ...s.btn, background: theme.accent, color: '#fff' }}>换上卦 Change Upper</button></div></div>);
    return null;
  };

  const MastersPage = () => (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 16 }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 300, marginBottom: 8 }}>易学先贤 · Masters of Change</h1>
        <p style={{ fontSize: 15, color: theme.sub }}>二进制思想的先贤 Pioneers of binary thought</p>
      </div>
      {selectedMaster ? (
        <div style={s.card}>
          <button type="button" onMouseDown={(e) => { e.preventDefault(); setSelectedMaster(null); }} style={{ marginBottom: 28, background: 'none', border: 'none', fontSize: 14, color: theme.sub, cursor: 'pointer' }}>← 返回 Back</button>
          <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 160, height: 160, borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, background: 'rgba(0,0,0,0.02)', overflow: 'hidden' }}>
                <MasterAvatar symbol={selectedMaster.avatar} imageUrl={selectedMaster.portrait} size={140} />
              </div>
              <p style={{ fontSize: 13, color: '#999' }}>{selectedMaster.era}</p>
              <p style={{ fontSize: 13, color: '#aaa' }}>{selectedMaster.eraEn}</p>
            </div>
            <div style={{ flex: 1, minWidth: 280 }}>
              <h2 style={{ fontSize: 32, marginBottom: 6 }}>{selectedMaster.name}</h2>
              <p style={{ fontSize: 22, marginBottom: 12, color: theme.sub }}>{selectedMaster.nameEn}</p>
              <p style={{ display: 'inline-block', fontSize: 14, marginBottom: 20, padding: '6px 16px', borderRadius: 50, background: 'rgba(0,0,0,0.05)', color: theme.sub }}>{selectedMaster.title} · {selectedMaster.titleEn}</p>
              <blockquote style={{ margin: '24px 0', padding: 20, borderRadius: 12, fontStyle: 'italic', background: 'rgba(0,0,0,0.02)', borderLeft: `4px solid ${theme.border}` }}>
                <p style={{ fontSize: 16 }}>{selectedMaster.quote}</p>
                <p style={{ fontSize: 14, marginTop: 10, color: theme.sub }}>{selectedMaster.quoteEn}</p>
              </blockquote>
              <div style={{ marginBottom: 28 }}>
                <p style={{ lineHeight: 1.9, marginBottom: 16, fontSize: 15 }}>{selectedMaster.description}</p>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: theme.sub }}>{selectedMaster.descriptionEn}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                <div style={{ padding: 18, borderRadius: 12, background: 'rgba(0,0,0,0.03)' }}>
                  <p style={{ fontSize: 12, marginBottom: 10, color: '#999' }}>主要贡献 Main Contribution</p>
                  <p style={{ fontSize: 15 }}>{selectedMaster.contribution}</p>
                  <p style={{ fontSize: 13, marginTop: 6, color: theme.sub }}>{selectedMaster.contributionEn}</p>
                </div>
                <div style={{ padding: 18, borderRadius: 12, background: 'rgba(255,255,255,0.06)' }}>
                  <p style={{ fontSize: 12, marginBottom: 10, color: '#aaa' }}>历史意义 Significance</p>
                  <p style={{ fontSize: 15 }}>{selectedMaster.significance}</p>
                  <p style={{ fontSize: 13, marginTop: 6, color: theme.sub }}>{selectedMaster.significanceEn}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 18 }}>
          {masters.map((m) => (
            <button type="button" key={m.id} onMouseDown={(e) => { e.preventDefault(); setSelectedMaster(m); }} style={{ ...s.card, padding: 24, cursor: 'pointer', border: `1px solid ${theme.border}`, textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
                <div style={{ width: 88, height: 88, borderRadius: '50%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1a1a' }}>
                  <MasterAvatar symbol={m.avatar} imageUrl={m.portrait} size={88} />
                </div>
              </div>
              <p style={{ fontSize: 20, fontWeight: 500, textAlign: 'center' }}>{m.name}</p>
              <p style={{ fontSize: 14, textAlign: 'center', color: theme.sub }}>{m.nameEn}</p>
              <p style={{ fontSize: 12, textAlign: 'center', marginTop: 10, color: '#999' }}>{m.title}</p>
              <p style={{ fontSize: 12, textAlign: 'center', marginTop: 4, color: '#aaa' }}>{m.era}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const randomHexagram = () => {
    const h = hexagramsData[Math.floor(Math.random() * hexagramsData.length)];
    setSelectedHexagram(h);
  };

  const HexagramsPage = () => (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <h1 style={{ fontSize: 32, fontWeight: 300, marginBottom: 8 }}>六十四卦 · 64 Hexagrams</h1>
        <p style={{ fontSize: 15, color: theme.sub }}>64 Hexagrams · 6-bit State Space</p>
      </div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['both', 'cn', 'en'].map(mode => (
            <button key={mode} type="button" onMouseDown={(e) => { e.preventDefault(); setHexLangMode(mode); }} style={{ padding: '8px 16px', borderRadius: 8, border: `1px solid ${theme.border}`, background: hexLangMode === mode ? theme.accent : theme.card, color: hexLangMode === mode ? '#fff' : theme.sub, fontSize: 14, cursor: 'pointer' }}>{mode === 'both' ? '中英' : mode === 'cn' ? '中文' : 'English'}</button>
          ))}
        </div>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); randomHexagram(); }} style={{ padding: '8px 20px', borderRadius: 8, border: `1px solid ${theme.accent}`, background: theme.accent, color: '#fff', fontSize: 14, cursor: 'pointer' }}>随机一卦</button>
      </div>
      {selectedHexagram ? (
        <div style={s.card}>
          <div style={{ marginBottom: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button type="button" onMouseDown={(e) => { e.preventDefault(); setSelectedHexagram(null); }} style={{ background: 'none', border: 'none', fontSize: 14, color: theme.sub, cursor: 'pointer' }}>← 返回 Back</button>
            <button type="button" onMouseDown={(e) => { e.preventDefault(); randomHexagram(); }} style={{ padding: '6px 14px', borderRadius: 6, border: `1px solid ${theme.accent}`, background: theme.accent, color: '#fff', fontSize: 13, cursor: 'pointer' }}>随机一卦</button>
          </div>
          <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'visible' }}>
              <div style={{ padding: '20px 20px 20px 24px', borderRadius: 12, marginBottom: 18, background: 'rgba(0,0,0,0.03)', overflow: 'visible', display: 'inline-block' }}>
                <HexagramInteractive hex={selectedHexagram} theme={theme} />
              </div>
              <p style={{ fontSize: 12, color: theme.sub, marginBottom: 8 }}>鼠标悬停爻线查看释义 Hover over lines for line statements</p>
              <p style={{ fontFamily: 'monospace', fontSize: 20, color: theme.accent }}>{selectedHexagram.binary}</p>
              <p style={{ fontSize: 12, color: '#999', marginTop: 4 }}>十进制 Decimal: {parseInt(selectedHexagram.binary, 2)}</p>
              <div style={{ display: 'flex', gap: 28, marginTop: 20 }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 12, color: '#999' }}>上卦 Upper</p>
                  <p style={{ fontSize: 28 }}>{trigramInfo[selectedHexagram.binary.slice(3)]?.symbol}</p>
                  <p style={{ fontSize: 14 }}>{trigramInfo[selectedHexagram.binary.slice(3)]?.name}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 12, color: '#999' }}>下卦 Lower</p>
                  <p style={{ fontSize: 28 }}>{trigramInfo[selectedHexagram.binary.slice(0, 3)]?.symbol}</p>
                  <p style={{ fontSize: 14 }}>{trigramInfo[selectedHexagram.binary.slice(0, 3)]?.name}</p>
                </div>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 280 }}>
              <span style={{ display: 'inline-block', fontSize: 14, padding: '6px 16px', borderRadius: 50, background: theme.accent, color: '#fff' }}>第 {selectedHexagram.num} 卦 Hexagram {selectedHexagram.num}</span>
              <h2 style={{ fontSize: 52, marginTop: 18, marginBottom: 10 }}>{selectedHexagram.name}</h2>
              <p style={{ fontSize: 26, marginBottom: 6, color: theme.sub }}>{selectedHexagram.nameEn}</p>
              <p style={{ fontSize: 18, marginBottom: 20, color: '#888' }}>{selectedHexagram.meaning} · {selectedHexagram.meaningEn}</p>
              <div style={{ padding: 18, borderRadius: 12, marginBottom: 18, background: 'rgba(0,0,0,0.04)', border: `1px solid ${theme.border}` }}>
                <p style={{ fontSize: 12, marginBottom: 6, color: theme.sub }}>系统状态 System State</p>
                <p style={{ fontSize: 20, fontFamily: 'monospace', color: theme.text }}>{selectedHexagram.state}</p>
                <p style={{ fontSize: 14, marginTop: 6 }}>{selectedHexagram.desc} · {selectedHexagram.descEn}</p>
              </div>
              <div style={{ padding: 18, borderRadius: 12, marginBottom: 18, background: 'rgba(0,0,0,0.03)' }}>
                <p style={{ fontSize: 12, marginBottom: 10, color: '#999' }}>关键词 Keywords</p>
                <p style={{ fontSize: 15 }}>{selectedHexagram.kw} · {selectedHexagram.kwEn}</p>
              </div>
              <div style={{ padding: 18, borderRadius: 12, background: 'rgba(0,0,0,0.02)', borderLeft: `4px solid ${theme.border}` }}>
                <p style={{ fontSize: 12, marginBottom: 10, color: '#999' }}>象辞 Image Statement</p>
                <p style={{ fontStyle: 'italic', fontSize: 15 }}>{selectedHexagram.img} · {selectedHexagram.imgEn}</p>
              </div>
              <div style={{ marginTop: 20 }}>
                <LinesSection hex={selectedHexagram} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 8 }}>
          {hexagramsData.map((h) => (
            <button type="button" key={h.num} onMouseDown={(e) => { e.preventDefault(); setSelectedHexagram(h); }} onMouseEnter={() => setHoveredNode(h.num)} onMouseLeave={() => setHoveredNode(null)} style={{ padding: 10, borderRadius: 10, border: hoveredNode === h.num ? `2px solid ${theme.accent}` : `1px solid ${theme.border}`, background: hoveredNode === h.num ? 'rgba(0,0,0,0.06)' : theme.card, cursor: 'pointer', transition: 'all 0.2s', transform: hoveredNode === h.num ? 'scale(1.12)' : 'scale(1)', zIndex: hoveredNode === h.num ? 10 : 1, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: '#999' }}>{h.num}</span>
              <div style={{ margin: '5px 0' }}><Hexagram binary={h.binary} size="tiny" /></div>
              <span style={{ fontSize: 15, fontWeight: 500 }}>{h.name}</span>
              <span style={{ fontSize: 11, color: theme.sub }}>{h.nameEn}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const GamePage = () => {
    const resetGame = (mode, lvl = 1) => {
      setGameMode(mode);
      if (mode === 'puzzle') {
        const p = puzzles[lvl - 1];
        setLevel(lvl);
        setGameState(p.start);
        setTargetState(p.target);
        setMaxMoves(p.max);
      } else {
        setGameState(0);
        setTargetState(null);
        setMaxMoves(null);
      }
      setMoves(0);
      setShowEpiphany(false);
    };

    if (gameMode === 'menu') {
      return (
        <div style={{ ...s.center, padding: 16 }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h1 style={{ fontSize: 52, fontWeight: 300, letterSpacing: 6, marginBottom: 18, color: theme.text }}>状态机 State Machine</h1>
            <p style={{ fontSize: 19, color: theme.sub, marginBottom: 10 }}>翻转比特，见证意义涌现 Flip bits, witness meaning emerge</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, width: '100%', maxWidth: 340 }}>
            <button type="button" onMouseDown={(e) => { e.preventDefault(); resetGame('sandbox'); }} style={{ padding: '20px 32px', borderRadius: 16, textAlign: 'left', cursor: 'pointer', background: theme.card, border: `1px solid ${theme.border}` }}>
              <p style={{ fontSize: 20, color: theme.text, marginBottom: 6 }}>沙盒模式 · Sandbox</p>
              <p style={{ fontSize: 13, color: theme.sub }}>自由探索64态 Free exploration of 64 states</p>
            </button>
            <button type="button" onMouseDown={(e) => { e.preventDefault(); resetGame('puzzle', 1); }} style={{ padding: '20px 32px', borderRadius: 16, textAlign: 'left', cursor: 'pointer', background: theme.card, border: `1px solid ${theme.border}` }}>
              <p style={{ fontSize: 20, color: theme.text, marginBottom: 6 }}>解谜模式 · Puzzle</p>
              <p style={{ fontSize: 13, color: theme.sub }}>状态迁移挑战 State transition challenge</p>
            </button>
            <button type="button" onMouseDown={(e) => { e.preventDefault(); setGameMode('explorer'); }} style={{ padding: '20px 32px', borderRadius: 16, textAlign: 'left', cursor: 'pointer', background: theme.card, border: `1px solid ${theme.border}` }}>
              <p style={{ fontSize: 20, color: theme.text, marginBottom: 6 }}>状态空间 · Explorer</p>
              <p style={{ fontSize: 13, color: theme.sub }}>64态可视化地图 64-state visual map</p>
            </button>
          </div>
          <p style={{ position: 'absolute', bottom: 36, fontSize: 13, color: theme.sub, textAlign: 'center' }}>此状态机在三千多年前即被描述。 This state machine was described over 3000 years ago.</p>
        </div>
      );
    }

    if (gameMode === 'sandbox') {
      const info = getHexInfo(gameState);
      const lower = gameState & 7;
      const upper = (gameState >> 3) & 7;
      return (
        <div style={{ ...s.center, padding: 16 }}>
          <button type="button" onMouseDown={(e) => { e.preventDefault(); setGameMode('menu'); }} style={{ position: 'absolute', top: 88, left: 20, background: 'none', border: 'none', color: theme.sub, cursor: 'pointer', fontSize: 14 }}>← 返回 Back</button>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h2 style={{ fontSize: 26, fontWeight: 300, marginBottom: 10, color: theme.text }}>沙盒模式 Sandbox</h2>
            <p style={{ fontSize: 14, color: '#888' }}>点击比特翻转 Click to flip bits</p>
          </div>
          <div style={{ display: 'flex', gap: 36, alignItems: 'flex-start', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ ...s.card, padding: 28 }}>
              <p style={{ fontSize: 12, color: '#888', marginBottom: 10, textAlign: 'center' }}>上卦 Upper · {trigramInfo[toBinary(upper, 3)]?.name}</p>
              <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 14, marginBottom: 18 }}>
                {[3, 4, 5].map(p => (<div key={p} style={{ display: 'flex', alignItems: 'center', gap: 14 }}><span style={{ fontSize: 12, color: '#666', width: 26 }}>{p + 1}</span><GameBitLine value={getBit(gameState, p)} position={p} canFlip={true} isAnimating={animatingBit === p} /></div>))}
              </div>
              <div style={{ borderTop: '1px solid #333', margin: '18px 0' }} />
              <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 14 }}>
                {[0, 1, 2].map(p => (<div key={p} style={{ display: 'flex', alignItems: 'center', gap: 14 }}><span style={{ fontSize: 12, color: '#666', width: 26 }}>{p + 1}</span><GameBitLine value={getBit(gameState, p)} position={p} canFlip={true} isAnimating={animatingBit === p} /></div>))}
              </div>
              <p style={{ fontSize: 12, color: '#888', marginTop: 10, textAlign: 'center' }}>下卦 Lower · {trigramInfo[toBinary(lower, 3)]?.name}</p>
            </div>
            <div style={{ ...s.card, padding: 28, minWidth: 220 }}>
              <p style={{ fontFamily: 'monospace', fontSize: 32, letterSpacing: 6, color: theme.text, marginBottom: 10, textAlign: 'center' }}>{toBinary(gameState)}</p>
              <p style={{ fontSize: 13, color: theme.sub, textAlign: 'center', marginBottom: 20 }}>十进制 Decimal: {gameState}</p>
              {info && (<div style={{ textAlign: 'center' }}><p style={{ fontSize: 48, marginBottom: 6 }}>{info.name}</p><p style={{ fontSize: 20, color: theme.sub, marginBottom: 6 }}>{info.nameEn}</p><p style={{ fontSize: 14, color: theme.sub, marginBottom: 16 }}>#{info.num}</p><div style={{ padding: '14px 18px', borderRadius: 12, background: 'rgba(0,0,0,0.04)', border: `1px solid ${theme.border}` }}><p style={{ fontSize: 15, fontFamily: 'monospace', color: theme.text }}>{info.state}</p><p style={{ fontSize: 13, color: theme.sub, marginTop: 6 }}>{info.desc} · {info.descEn}</p></div><div style={{ marginTop: 16, textAlign: 'left' }}><LinesSection hex={info} compact={true} /></div></div>)}
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #333' }}>
                <p style={{ fontSize: 13, color: '#888' }}>步数 Moves: {moves}</p>
                <button type="button" onMouseDown={(e) => { e.preventDefault(); setGameState(0); setMoves(0); }} style={{ marginTop: 10, background: 'none', border: 'none', fontSize: 13, color: '#aaa', cursor: 'pointer' }}>重置 Reset</button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (gameMode === 'puzzle') {
      const puzzle = puzzles[level - 1];
      const info = getHexInfo(gameState);
      const targetInfo = getHexInfo(targetState);
      const distance = hammingDist(gameState, targetState);
      const isWin = gameState === targetState;
      const isLose = maxMoves && moves >= maxMoves && !isWin;

      return (
        <div style={{ ...s.center, padding: 16, position: 'relative' }}>
          <button type="button" onMouseDown={(e) => { e.preventDefault(); setGameMode('menu'); }} style={{ position: 'absolute', top: 88, left: 20, background: 'none', border: 'none', color: theme.sub, cursor: 'pointer', fontSize: 14 }}>← 返回 Back</button>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h2 style={{ fontSize: 26, fontWeight: 300, marginBottom: 10, color: theme.text }}>第 {level} 关 Level {level}</h2>
            <p style={{ fontSize: 14, color: '#888' }}>{puzzle?.hint} · {puzzle?.hintEn}</p>
          </div>
          {(isWin || isLose) && (<div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, background: 'rgba(0,0,0,0.85)' }}><div style={{ textAlign: 'center', padding: 36, borderRadius: 20, background: 'rgba(20,20,30,0.95)', border: isWin ? '2px solid #fff' : '2px solid #888' }}>{isWin ? (<><p style={{ fontSize: 48, marginBottom: 18 }}>🎉</p><p style={{ fontSize: 26, color: '#fff', marginBottom: 10 }}>达成目标！ Goal Reached!</p><p style={{ fontSize: 15, color: '#ccc', marginBottom: 20 }}>用时 {moves} 步 Completed in {moves} moves</p>{level < puzzles.length ? <button type="button" onMouseDown={(e) => { e.preventDefault(); resetGame('puzzle', level + 1); }} style={{ padding: '10px 28px', borderRadius: 10, background: '#fff', color: '#050508', border: 'none', cursor: 'pointer', fontSize: 15 }}>下一关 Next →</button> : <p style={{ color: '#fff', fontSize: 16 }}>全部通关！ All Complete!</p>}</>) : (<><p style={{ fontSize: 48, marginBottom: 18 }}>💀</p><p style={{ fontSize: 26, color: '#ccc', marginBottom: 10 }}>步数用尽 Out of Moves</p><button type="button" onMouseDown={(e) => { e.preventDefault(); resetGame('puzzle', level); }} style={{ padding: '10px 28px', borderRadius: 10, background: '#666', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 15 }}>再试一次 Try Again</button></>)}</div></div>)}
          <div style={{ display: 'flex', gap: 36, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ ...s.card, padding: 28 }}>
              <p style={{ fontSize: 13, color: '#888', marginBottom: 18, textAlign: 'center' }}>当前 Current</p>
              <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 10, marginBottom: 18 }}>{[0, 1, 2, 3, 4, 5].map(p => <GameBitLine key={p} value={getBit(gameState, p)} position={p} canFlip={!isWin && !isLose} isAnimating={animatingBit === p} />)}</div>
              <p style={{ fontFamily: 'monospace', fontSize: 22, color: theme.text, textAlign: 'center' }}>{toBinary(gameState)}</p>
              <p style={{ fontSize: 20, textAlign: 'center', marginTop: 10 }}>{info?.name}</p>
              {info && <div style={{ marginTop: 14 }}><LinesSection hex={info} compact={true} /></div>}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><p style={{ fontSize: 32, color: theme.sub }}>→</p><p style={{ fontSize: 13, color: theme.sub, marginTop: 10 }}>距离 Distance: {distance}</p></div>
            <div style={{ ...s.card, padding: 28, borderColor: theme.border }}>
              <p style={{ fontSize: 13, color: theme.sub, marginBottom: 18, textAlign: 'center' }}>目标 Target</p>
              <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 10, marginBottom: 18 }}>{[0, 1, 2, 3, 4, 5].map(p => <GameBitLine key={p} value={getBit(targetState, p)} position={p} canFlip={false} isAnimating={false} />)}</div>
              <p style={{ fontFamily: 'monospace', fontSize: 22, color: theme.sub, textAlign: 'center' }}>{toBinary(targetState)}</p>
              <p style={{ fontSize: 20, textAlign: 'center', marginTop: 10 }}>{targetInfo?.name}</p>
            </div>
          </div>
          <div style={{ marginTop: 36, display: 'flex', gap: 36, textAlign: 'center' }}>
            <div><p style={{ fontSize: 28, fontFamily: 'monospace', color: theme.text }}>{moves}</p><p style={{ fontSize: 13, color: theme.sub }}>已用 Used</p></div>
            <div><p style={{ fontSize: 28, fontFamily: 'monospace', color: theme.text }}>{maxMoves}</p><p style={{ fontSize: 13, color: theme.sub }}>上限 Max</p></div>
            <div><p style={{ fontSize: 28, fontFamily: 'monospace', color: maxMoves - moves >= distance ? theme.text : theme.sub }}>{maxMoves - moves}</p><p style={{ fontSize: 13, color: theme.sub }}>剩余 Left</p></div>
          </div>
          <button type="button" onMouseDown={(e) => { e.preventDefault(); resetGame('puzzle', level); }} style={{ marginTop: 20, background: 'none', border: 'none', fontSize: 13, color: '#888', cursor: 'pointer' }}>重置本关 Reset Level</button>
        </div>
      );
    }

    if (gameMode === 'explorer') {
      return (
        <div style={{ padding: 16 }}>
          <button type="button" onMouseDown={(e) => { e.preventDefault(); setGameMode('menu'); }} style={{ position: 'absolute', top: 88, left: 20, background: 'none', border: 'none', color: theme.sub, cursor: 'pointer', fontSize: 14 }}>← 返回 Back</button>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h2 style={{ fontSize: 26, fontWeight: 300, marginBottom: 10, color: theme.text }}>状态空间 State Space · 64-State</h2>
            <p style={{ fontSize: 14, color: theme.sub }}>点击探索相邻状态 Click to explore adjacent states</p>
          </div>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 6 }}>
              {hexagramsData.map((h) => { const v = parseInt(h.binary, 2); return (<button type="button" key={h.num} onMouseDown={(e) => { e.preventDefault(); setExplorerSelected(v); }} style={{ aspectRatio: '1', padding: 6, borderRadius: 10, cursor: 'pointer', background: explorerSelected === v ? 'rgba(0,0,0,0.08)' : theme.card, border: explorerSelected === v ? `2px solid ${theme.accent}` : `1px solid ${theme.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><p style={{ fontSize: 20, color: theme.text }}>{h.name}</p><p style={{ fontSize: 11, fontFamily: 'monospace', color: theme.sub }}>{v}</p></button>); })}
            </div>
            {explorerSelected !== null && (<div style={{ marginTop: 28, padding: 28, borderRadius: 20, background: theme.card, border: `1px solid ${theme.border}` }}><div style={{ display: 'flex', gap: 36, alignItems: 'flex-start', flexWrap: 'wrap' }}><div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Hexagram binary={toBinary(explorerSelected)} size="normal" glow={true} /><p style={{ fontFamily: 'monospace', color: theme.text, marginTop: 12, fontSize: 18 }}>{toBinary(explorerSelected)}</p><p style={{ fontSize: 15, color: theme.text, marginTop: 6 }}>{getHexInfo(explorerSelected)?.name} · {getHexInfo(explorerSelected)?.nameEn}</p></div><div style={{ flex: 1, minWidth: 200 }}><p style={{ fontSize: 14, color: theme.sub, marginBottom: 18 }}>相邻状态 Adjacent (1-bit flip):</p><div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>{[0, 1, 2, 3, 4, 5].map(bit => { const adj = explorerSelected ^ (1 << bit), adjInfo = getHexInfo(adj); return (<button type="button" key={bit} onMouseDown={(e) => { e.preventDefault(); setExplorerSelected(adj); }} style={{ padding: '6px 14px', borderRadius: 10, fontSize: 14, background: 'rgba(0,0,0,0.06)', border: `1px solid ${theme.border}`, cursor: 'pointer' }}><span style={{ color: theme.text }}>{adjInfo?.name}</span><span style={{ fontSize: 12, color: theme.sub, marginLeft: 6 }}>({adj})</span></button>); })}</div></div><div style={{ width: '100%', marginTop: 20 }}><LinesSection hex={getHexInfo(explorerSelected)} compact={true} /></div></div></div>)}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <LinesByHexContext.Provider value={linesByHexMerged}>
    <HexLangModeContext.Provider value={hexLangMode}>
      <div style={s.ctr}>
        <canvas ref={canvasRef} style={s.canvas} />
        <Nav />
        <div style={s.content}>
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'masters' && <MastersPage />}
          {currentPage === 'hexagrams' && <HexagramsPage />}
          {currentPage === 'game' && <GamePage />}
        </div>
      </div>
    </HexLangModeContext.Provider>
    </LinesByHexContext.Provider>
  );
};

export default TaoOfBinary;
