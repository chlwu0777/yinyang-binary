'use client';

import React, { useEffect, useRef, useState } from 'react';
import { timelineMilestones } from '@/data/timeline';
import { theme } from '@/lib/theme';

function TimelineItem({ milestone, index }: { milestone: typeof timelineMilestones[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const isLeft = index % 2 === 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="timeline-item"
      style={{
        display: 'flex',
        justifyContent: isLeft ? 'flex-end' : 'flex-start',
        paddingLeft: isLeft ? 0 : 'calc(50% + 30px)',
        paddingRight: isLeft ? 'calc(50% + 30px)' : 0,
        marginBottom: 60,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : `translateY(40px)`,
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${index * 0.05}s`,
        position: 'relative',
      }}
    >
      {/* Node dot on the center line */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: 20,
        transform: 'translateX(-50%)',
        width: 16,
        height: 16,
        borderRadius: '50%',
        background: visible ? theme.accent : 'transparent',
        border: `2px solid ${theme.accent}`,
        transition: 'background 0.6s ease',
        zIndex: 2,
      }} />

      {/* Connector line from dot to card */}
      <div style={{
        position: 'absolute',
        top: 26,
        left: isLeft ? 'calc(50% + 8px)' : undefined,
        right: isLeft ? undefined : 'calc(50% + 8px)',
        width: 22,
        height: 2,
        background: theme.border,
        [isLeft ? 'right' : 'left']: 'calc(50% + 8px)',
      }} />

      {/* Content card */}
      <div style={{
        background: theme.card,
        backdropFilter: 'blur(20px)',
        borderRadius: 16,
        padding: '24px 28px',
        border: `1px solid ${theme.border}`,
        maxWidth: 440,
        boxShadow: visible ? '0 8px 32px rgba(0,0,0,0.08)' : 'none',
        transition: 'box-shadow 0.8s ease',
      }}>
        {/* Year badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 12,
          padding: '4px 12px',
          borderRadius: 20,
          background: 'rgba(0,0,0,0.05)',
          fontSize: 13,
          color: theme.sub,
        }}>
          <span style={{ fontSize: 20 }}>{milestone.icon}</span>
          <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{milestone.year}</span>
        </div>

        {/* Title */}
        <h3 style={{ fontSize: 20, fontWeight: 500, marginBottom: 4, color: theme.text, lineHeight: 1.4 }}>
          {milestone.titleCn}
        </h3>
        <p style={{ fontSize: 14, color: theme.sub, marginBottom: 12, lineHeight: 1.4 }}>
          {milestone.titleEn}
        </p>

        {/* Description */}
        <p style={{ fontSize: 14, lineHeight: 1.8, color: theme.text, marginBottom: 8 }}>
          {milestone.descCn}
        </p>
        <p style={{ fontSize: 13, lineHeight: 1.7, color: theme.sub }}>
          {milestone.descEn}
        </p>

        {/* Binary representation */}
        {milestone.binary && (
          <div style={{
            marginTop: 12,
            padding: '8px 14px',
            borderRadius: 8,
            background: 'rgba(0,0,0,0.03)',
            fontFamily: 'monospace',
            fontSize: 15,
            color: theme.accent,
            letterSpacing: 3,
            textAlign: 'center',
          }}>
            {milestone.binary}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ScrollTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ padding: '80px 16px 120px', maxWidth: 1000, margin: '0 auto' }}>
      {/* Section title */}
      <div
        ref={sectionRef}
        style={{
          textAlign: 'center',
          marginBottom: 80,
          opacity: titleVisible ? 1 : 0,
          transform: titleVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <h2 style={{ fontSize: 36, fontWeight: 300, letterSpacing: 6, marginBottom: 12, color: theme.text }}>
          从太极到计算机
        </h2>
        <p style={{ fontSize: 16, color: theme.sub, letterSpacing: 2 }}>
          From Taiji to Computer
        </p>
        <p style={{ fontSize: 14, color: '#999', marginTop: 16, maxWidth: 500, margin: '16px auto 0' }}>
          一条跨越五千年的二进制思想之路
        </p>
        <p style={{ fontSize: 13, color: '#aaa', marginTop: 4 }}>
          A 5,000-year journey of binary thought
        </p>
      </div>

      {/* Timeline */}
      <div style={{ position: 'relative' }}>
        {/* Center vertical line */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: 2,
          background: `linear-gradient(to bottom, transparent, ${theme.border} 5%, ${theme.border} 95%, transparent)`,
          transform: 'translateX(-50%)',
        }} />

        {timelineMilestones.map((milestone, index) => (
          <TimelineItem key={index} milestone={milestone} index={index} />
        ))}
      </div>

      {/* Ending */}
      <div style={{
        textAlign: 'center',
        marginTop: 40,
        padding: 40,
        borderRadius: 20,
        background: theme.card,
        border: `1px solid ${theme.border}`,
      }}>
        <p style={{ fontSize: 28, fontWeight: 300, marginBottom: 12, color: theme.text }}>☯ → 01</p>
        <p style={{ fontSize: 15, color: theme.sub, lineHeight: 1.8 }}>
          从太极的浑然一体，到阴阳的二元分立，<br />
          从伏羲的三爻八卦，到现代计算机的万亿晶体管。<br />
          0和1的故事，跨越了五千年。
        </p>
        <p style={{ fontSize: 13, color: '#999', marginTop: 12, lineHeight: 1.8 }}>
          From the undivided Taiji to the binary split of Yin and Yang,<br />
          from Fu Xi&apos;s trigrams to trillions of transistors.<br />
          The story of 0 and 1 spans five millennia.
        </p>
      </div>
    </section>
  );
}
