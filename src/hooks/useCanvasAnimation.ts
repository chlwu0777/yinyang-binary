'use client';

import { useEffect, type RefObject } from 'react';

export function useCanvasAnimation(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  options: { isGamePage: boolean; themeBg: string; isDark?: boolean }
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w: number;
    let h: number;
    let particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; opacity: number; pulse: number }> = [];
    let animTime = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      particles = [];
      for (let i = 0; i < 60; i++) {
        particles.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1, opacity: Math.random() * 0.2 + 0.05, pulse: Math.random() * Math.PI * 2,
        });
      }
    };

    const animate = () => {
      animTime += 0.008;
      ctx.fillStyle = options.themeBg;
      ctx.fillRect(0, 0, w, h);

      // Dynamic colors based on theme
      const dk = options.isDark;
      const rainColor = dk ? 'rgba(234,179,8,' : 'rgba(28,25,23,';
      const helixColor = dk ? 'rgba(250,250,249,' : 'rgba(28,25,23,';
      const particleColor = dk ? 'rgba(168,162,158,' : 'rgba(28,25,23,';
      const gridColor = dk ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)';

      // Matrix code rain
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
          ctx.fillStyle = `${rainColor}${opacity})`;
          ctx.fillText(codeChars[(cx + i) % 2], cx, y);
        }
      }

      // DNA double helix (3D depth)
      const helixCount = Math.max(2, Math.floor(w / 380));
      const helixSpacing = w / (helixCount + 1);
      const freq = 0.009;
      const vSpeed = animTime * 28;

      for (let helix = 0; helix < helixCount; helix++) {
        const cx = helixSpacing * (helix + 1);
        const amp = 38 + helix * 8;
        const pOff = helix * (Math.PI / 3);

        // Pre-compute strand positions for this frame
        const points: Array<{ y: number; x0: number; x1: number; z0: number; z1: number }> = [];
        for (let y = -80; y < h + 80; y += 2) {
          const ay = ((y + vSpeed) % (h + 160)) - 80;
          const phase = ay * freq + pOff;
          points.push({
            y: ay,
            x0: cx + Math.sin(phase) * amp,
            x1: cx + Math.sin(phase + Math.PI) * amp,
            z0: Math.cos(phase),              // -1 to 1, depth for strand 0
            z1: Math.cos(phase + Math.PI),    // opposite depth for strand 1
          });
        }

        // Draw back strand first, then base pairs, then front strand (painter's algorithm)
        for (let pass = 0; pass < 3; pass++) {
          // pass 0 = back strand, pass 1 = base pairs, pass 2 = front strand
          if (pass === 0 || pass === 2) {
            // Draw a strand — pick whichever is in back (pass=0) or front (pass=2)
            ctx.beginPath();
            let started = false;
            let prevPx = 0, prevPy = 0;
            for (const pt of points) {
              // Determine which strand is front/back at this point
              const frontIs0 = pt.z0 > pt.z1;
              const drawStrand0 = pass === 2 ? frontIs0 : !frontIs0;
              const sx = drawStrand0 ? pt.x0 : pt.x1;
              const sz = drawStrand0 ? pt.z0 : pt.z1;
              // Depth-based thickness and opacity
              const depthNorm = (sz + 1) / 2; // 0=far, 1=near
              if (!started) {
                ctx.moveTo(sx, pt.y);
                prevPx = sx; prevPy = pt.y;
                started = true;
              } else {
                const mx = (prevPx + sx) / 2;
                const my = (prevPy + pt.y) / 2;
                ctx.quadraticCurveTo(prevPx, prevPy, mx, my);
                prevPx = sx; prevPy = pt.y;
              }
              // We set a single style after the path — use average depth
              void depthNorm;
            }
            // Average depth for this pass
            const avgDepth = pass === 2 ? 0.75 : 0.25;
            const strandAlpha = 0.06 + avgDepth * 0.14;
            const strandWidth = 0.5 + avgDepth * 1;
            ctx.strokeStyle = `${helixColor}${strandAlpha})`;
            ctx.lineWidth = strandWidth;
            ctx.stroke();

            // Nodes on this strand
            for (let i = 0; i < points.length; i += 22) {
              const pt = points[i];
              const frontIs0 = pt.z0 > pt.z1;
              const drawStrand0 = pass === 2 ? frontIs0 : !frontIs0;
              const nx = drawStrand0 ? pt.x0 : pt.x1;
              const nz = drawStrand0 ? pt.z0 : pt.z1;
              const depthNorm = (nz + 1) / 2;
              const pulse = Math.sin(animTime * 2 + i * 0.12) * 0.2 + 0.8;
              const nodeR = (0.8 + depthNorm * 1.8) * pulse;
              const nodeA = (0.08 + depthNorm * 0.3) * pulse;
              ctx.beginPath();
              ctx.arc(nx, pt.y, nodeR, 0, Math.PI * 2);
              ctx.fillStyle = `${helixColor}${nodeA})`;
              ctx.fill();
            }
          }

          if (pass === 1) {
            // Base pair rungs — only draw where both strands are near-equidistant in depth
            for (let i = 0; i < points.length; i += 20) {
              const pt = points[i];
              const midZ = (pt.z0 + pt.z1) / 2;
              // Only draw when roughly in the "side" view (both strands visible)
              if (Math.abs(midZ) < 0.45) {
                const rungAlpha = 0.06 * (1 - Math.abs(midZ) * 2);
                ctx.beginPath();
                ctx.moveTo(pt.x0, pt.y);
                ctx.lineTo(pt.x1, pt.y);
                ctx.strokeStyle = `${helixColor}${rungAlpha})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
                // Small dots at each end
                for (const ex of [pt.x0, pt.x1]) {
                  ctx.beginPath();
                  ctx.arc(ex, pt.y, 1.2, 0, Math.PI * 2);
                  ctx.fillStyle = `${helixColor}${rungAlpha * 1.5})`;
                  ctx.fill();
                }
              }
            }
          }
        }
      }

      if (options.isGamePage) {
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 0.5;
        for (let x = 0; x < w; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
        for (let y = 0; y < h; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
      }

      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.pulse += 0.02;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        const pulse = Math.sin(p.pulse) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `${particleColor}${p.opacity * pulse})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [canvasRef, options.isGamePage, options.themeBg, options.isDark]);
}
