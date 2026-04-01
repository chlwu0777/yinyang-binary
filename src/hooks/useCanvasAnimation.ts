'use client';

import { useEffect, type RefObject } from 'react';

export function useCanvasAnimation(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  options: { isGamePage: boolean; themeBg: string }
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
          ctx.fillStyle = `rgba(96,165,250,${opacity * 0.7})`;
          ctx.fillText(codeChars[(cx + i) % 2], cx, y);
        }
      }

      // DNA double helix
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
            ctx.strokeStyle = `rgba(96,165,250,${0.15 * (1 - Math.abs(depth - 0.5) * 2)})`;
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
          ctx.strokeStyle = 'rgba(96,165,250,0.18)';
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
            ctx.fillStyle = `rgba(96,165,250,${(0.2 + depth * 0.4) * pulse})`;
            ctx.fill();
          }
        }
      }

      if (options.isGamePage) {
        ctx.strokeStyle = 'rgba(96,165,250,0.06)';
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
        ctx.fillStyle = `rgba(140,160,200,${p.opacity * pulse})`;
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
  }, [canvasRef, options.isGamePage, options.themeBg]);
}
