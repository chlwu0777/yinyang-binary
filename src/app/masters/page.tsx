'use client';

import React, { useState } from 'react';
import MasterAvatar from '@/components/MasterAvatar';
import { masters, type MasterData } from '@/data/masters';
import { layout } from '@/lib/theme';
import { t } from '@/lib/i18n';
import { useAppTheme, useLang } from '@/contexts/AppProviders';

export default function MastersPage() {
  const theme = useAppTheme();
  const lang = useLang();
  const i = t(lang);
  const [selectedMaster, setSelectedMaster] = useState<MasterData | null>(null);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 16 }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 300, marginBottom: 8, color: theme.text }}>{i.masters.title}</h1>
        <p style={{ fontSize: 15, color: theme.sub }}>{i.masters.subtitle}</p>
      </div>
      {selectedMaster ? (
        <div style={layout.card(theme)}>
          <button type="button" onMouseDown={(e) => { e.preventDefault(); setSelectedMaster(null); }} style={{ marginBottom: 28, background: 'none', border: 'none', fontSize: 14, color: theme.sub, cursor: 'pointer' }}>{i.common.back}</button>
          <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 160, height: 160, borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, background: theme.subtleBg, overflow: 'hidden' }}>
                <MasterAvatar symbol={selectedMaster.avatar} imageUrl={selectedMaster.portrait} size={140} />
              </div>
              <p style={{ fontSize: 13, color: theme.sub }}>{lang === 'cn' ? selectedMaster.era : selectedMaster.eraEn}</p>
              <p style={{ fontSize: 12, color: theme.sub }}>{lang === 'cn' ? selectedMaster.eraEn : selectedMaster.era}</p>
            </div>
            <div style={{ flex: 1, minWidth: 280 }}>
              <h2 style={{ fontSize: 32, marginBottom: 6, color: theme.text }}>{lang === 'cn' ? selectedMaster.name : selectedMaster.nameEn}</h2>
              <p style={{ fontSize: 22, marginBottom: 12, color: theme.sub }}>{lang === 'cn' ? selectedMaster.nameEn : selectedMaster.name}</p>
              <p style={{ display: 'inline-block', fontSize: 14, marginBottom: 20, padding: '6px 16px', borderRadius: 50, background: theme.subtleBg, color: theme.sub }}>{lang === 'cn' ? selectedMaster.title : selectedMaster.titleEn} · {lang === 'cn' ? selectedMaster.titleEn : selectedMaster.title}</p>
              <blockquote style={{ margin: '24px 0', padding: 20, borderRadius: 12, fontStyle: 'italic', background: theme.subtleBg, borderLeft: `4px solid ${theme.border}` }}>
                <p style={{ fontSize: 16, color: theme.text }}>{lang === 'cn' ? selectedMaster.quote : selectedMaster.quoteEn}</p>
                <p style={{ fontSize: 14, marginTop: 10, color: theme.sub }}>{lang === 'cn' ? selectedMaster.quoteEn : selectedMaster.quote}</p>
              </blockquote>
              <div style={{ marginBottom: 28 }}>
                <p style={{ lineHeight: 1.9, marginBottom: 16, fontSize: 15, color: theme.text }}>{lang === 'cn' ? selectedMaster.description : selectedMaster.descriptionEn}</p>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: theme.sub }}>{lang === 'cn' ? selectedMaster.descriptionEn : selectedMaster.description}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                <div style={{ padding: 18, borderRadius: 12, background: theme.subtleBg }}>
                  <p style={{ fontSize: 12, marginBottom: 10, color: theme.sub }}>{i.masters.contribution}</p>
                  <p style={{ fontSize: 15, color: theme.text }}>{lang === 'cn' ? selectedMaster.contribution : selectedMaster.contributionEn}</p>
                  <p style={{ fontSize: 13, marginTop: 6, color: theme.sub }}>{lang === 'cn' ? selectedMaster.contributionEn : selectedMaster.contribution}</p>
                </div>
                <div style={{ padding: 18, borderRadius: 12, background: theme.subtleBg }}>
                  <p style={{ fontSize: 12, marginBottom: 10, color: theme.sub }}>{i.masters.significance}</p>
                  <p style={{ fontSize: 15, color: theme.text }}>{lang === 'cn' ? selectedMaster.significance : selectedMaster.significanceEn}</p>
                  <p style={{ fontSize: 13, marginTop: 6, color: theme.sub }}>{lang === 'cn' ? selectedMaster.significanceEn : selectedMaster.significance}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 18 }}>
          {masters.map((m) => (
            <button type="button" key={m.id} onMouseDown={(e) => { e.preventDefault(); setSelectedMaster(m); }} style={{ ...layout.card(theme), padding: 24, cursor: 'pointer', border: `1px solid ${theme.border}`, textAlign: 'left' as const }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
                <div style={{ width: 88, height: 88, borderRadius: '50%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: theme.text }}>
                  <MasterAvatar symbol={m.avatar} imageUrl={m.portrait} size={88} />
                </div>
              </div>
              <p style={{ fontSize: 20, fontWeight: 500, textAlign: 'center', color: theme.text }}>{lang === 'cn' ? m.name : m.nameEn}</p>
              <p style={{ fontSize: 14, textAlign: 'center', color: theme.sub }}>{lang === 'cn' ? m.nameEn : m.name}</p>
              <p style={{ fontSize: 12, textAlign: 'center', marginTop: 10, color: theme.sub }}>{lang === 'cn' ? m.title : m.titleEn}</p>
              <p style={{ fontSize: 12, textAlign: 'center', marginTop: 4, color: theme.sub }}>{lang === 'cn' ? m.era : m.eraEn}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
