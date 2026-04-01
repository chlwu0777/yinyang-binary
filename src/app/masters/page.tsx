'use client';

import React, { useState } from 'react';
import MasterAvatar from '@/components/MasterAvatar';
import { masters, type MasterData } from '@/data/masters';
import { theme, s } from '@/lib/theme';

export default function MastersPage() {
  const [selectedMaster, setSelectedMaster] = useState<MasterData | null>(null);

  return (
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
              <div style={{ width: 160, height: 160, borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, background: 'rgba(28,25,23,0.02)', overflow: 'hidden' }}>
                <MasterAvatar symbol={selectedMaster.avatar} imageUrl={selectedMaster.portrait} size={140} />
              </div>
              <p style={{ fontSize: 13, color: '#999' }}>{selectedMaster.era}</p>
              <p style={{ fontSize: 13, color: '#aaa' }}>{selectedMaster.eraEn}</p>
            </div>
            <div style={{ flex: 1, minWidth: 280 }}>
              <h2 style={{ fontSize: 32, marginBottom: 6 }}>{selectedMaster.name}</h2>
              <p style={{ fontSize: 22, marginBottom: 12, color: theme.sub }}>{selectedMaster.nameEn}</p>
              <p style={{ display: 'inline-block', fontSize: 14, marginBottom: 20, padding: '6px 16px', borderRadius: 50, background: 'rgba(28,25,23,0.04)', color: theme.sub }}>{selectedMaster.title} · {selectedMaster.titleEn}</p>
              <blockquote style={{ margin: '24px 0', padding: 20, borderRadius: 12, fontStyle: 'italic', background: 'rgba(28,25,23,0.02)', borderLeft: `4px solid ${theme.border}` }}>
                <p style={{ fontSize: 16 }}>{selectedMaster.quote}</p>
                <p style={{ fontSize: 14, marginTop: 10, color: theme.sub }}>{selectedMaster.quoteEn}</p>
              </blockquote>
              <div style={{ marginBottom: 28 }}>
                <p style={{ lineHeight: 1.9, marginBottom: 16, fontSize: 15 }}>{selectedMaster.description}</p>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: theme.sub }}>{selectedMaster.descriptionEn}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                <div style={{ padding: 18, borderRadius: 12, background: 'rgba(28,25,23,0.03)' }}>
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
            <button type="button" key={m.id} onMouseDown={(e) => { e.preventDefault(); setSelectedMaster(m); }} style={{ ...s.card, padding: 24, cursor: 'pointer', border: `1px solid ${theme.border}`, textAlign: 'left' as const }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
                <div style={{ width: 88, height: 88, borderRadius: '50%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1C1917' }}>
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
}
