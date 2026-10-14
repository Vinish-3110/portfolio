'use client';

import React from 'react';
import { COPY_FIELDS, LoaderSettings, PALETTE_FIELDS, Palette, SiteSettings } from '@/lib/siteSettings';

const colorValue = (value: string) => (/^#[0-9a-fA-F]{6}$/.test(value) ? value : '#000000');

function ColorRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label style={{ display: 'grid', gridTemplateColumns: '180px 52px 1fr', gap: '0.75rem', alignItems: 'center' }}>
      <span>{label}</span>
      <input type="color" value={colorValue(value)} onChange={(event) => onChange(event.target.value)} />
      <input value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function PaletteFields({
  palette,
  onChange,
}: {
  palette: Palette;
  onChange: (palette: Palette) => void;
}) {
  return (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      {PALETTE_FIELDS.map((field) => (
        <ColorRow
          key={field.key}
          label={field.label}
          value={palette[field.key]}
          onChange={(value) => onChange({ ...palette, [field.key]: value })}
        />
      ))}
    </div>
  );
}

export default function SettingsEditor({
  settings,
  onChange,
}: {
  settings: SiteSettings;
  onChange: (settings: SiteSettings) => void;
}) {
  const setLoader = (patch: Partial<LoaderSettings>) => {
    onChange({ ...settings, loader: { ...settings.loader, ...patch } });
  };
  const groups = COPY_FIELDS.reduce<string[]>((names, field) => (
    names.includes(field.group) ? names : [...names, field.group]
  ), []);

  return (
    <>
      <section className="admin-card glass" style={{ marginTop: '1.5rem' }}>
        <div className="card-header"><h2>Colours</h2></div>
        <div className="modular-form">
          <h3>Dark theme</h3>
          <PaletteFields palette={settings.colors} onChange={(colors) => onChange({ ...settings, colors })} />
          <h3 style={{ marginTop: '1.5rem' }}>Light theme</h3>
          <PaletteFields palette={settings.light} onChange={(light) => onChange({ ...settings, light })} />
        </div>
      </section>

      <section className="admin-card glass" style={{ marginTop: '1.5rem' }}>
        <div className="card-header"><h2>Intro animation</h2></div>
        <div className="modular-form" style={{ display: 'grid', gap: '0.75rem' }}>
          <ColorRow label="Scene background" value={settings.loader.background} onChange={(background) => setLoader({ background })} />
          <ColorRow label="Road" value={settings.loader.road} onChange={(road) => setLoader({ road })} />
          <ColorRow label="Island" value={settings.loader.island} onChange={(island) => setLoader({ island })} />
          <ColorRow label="Shoulder lines" value={settings.loader.shoulder} onChange={(shoulder) => setLoader({ shoulder })} />
          <ColorRow label="Lane lines" value={settings.loader.brokenLines} onChange={(brokenLines) => setLoader({ brokenLines })} />
          <ColorRow label="Light sticks" value={settings.loader.sticks} onChange={(sticks) => setLoader({ sticks })} />
          {settings.loader.leftCars.map((color, index) => (
            <ColorRow
              key={`left-${index}`}
              label={`Left lights ${index + 1}`}
              value={color}
              onChange={(value) => setLoader({ leftCars: settings.loader.leftCars.map((item, itemIndex) => itemIndex === index ? value : item) })}
            />
          ))}
          {settings.loader.rightCars.map((color, index) => (
            <ColorRow
              key={`right-${index}`}
              label={`Right lights ${index + 1}`}
              value={color}
              onChange={(value) => setLoader({ rightCars: settings.loader.rightCars.map((item, itemIndex) => itemIndex === index ? value : item) })}
            />
          ))}
          <ColorRow label="HUD accent" value={settings.loader.hudAccent} onChange={(hudAccent) => setLoader({ hudAccent })} />
          <ColorRow label="HUD secondary" value={settings.loader.hudSecondary} onChange={(hudSecondary) => setLoader({ hudSecondary })} />
          <ColorRow label="HUD highlight" value={settings.loader.hudHighlight} onChange={(hudHighlight) => setLoader({ hudHighlight })} />
          <ColorRow label="Title start" value={settings.loader.title} onChange={(title) => setLoader({ title })} />
          <ColorRow label="Title middle" value={settings.loader.titleMid} onChange={(titleMid) => setLoader({ titleMid })} />
          {settings.loader.statuses.map((status, index) => (
            <label key={`status-${index}`} style={{ display: 'grid', gap: '0.35rem' }}>
              <span>Status line {index + 1}</span>
              <input
                value={status}
                onChange={(event) => setLoader({
                  statuses: settings.loader.statuses.map((item, itemIndex) => itemIndex === index ? event.target.value : item),
                })}
              />
            </label>
          ))}
        </div>
      </section>

      {groups.map((group) => (
        <section key={group} className="admin-card glass" style={{ marginTop: '1.5rem' }}>
          <div className="card-header"><h2>{group}</h2></div>
          <div className="modular-form" style={{ display: 'grid', gap: '0.75rem' }}>
            {COPY_FIELDS.filter((field) => field.group === group).map((field) => (
              <label key={field.key} style={{ display: 'grid', gap: '0.35rem' }}>
                <span>{field.label}</span>
                {field.key.endsWith('Body') || field.key.endsWith('Sub') || field.key === 'seoDescription' ? (
                  <textarea
                    rows={3}
                    value={settings.copy[field.key]}
                    onChange={(event) => onChange({
                      ...settings,
                      copy: { ...settings.copy, [field.key]: event.target.value },
                    })}
                  />
                ) : (
                  <input
                    value={settings.copy[field.key]}
                    onChange={(event) => onChange({
                      ...settings,
                      copy: { ...settings.copy, [field.key]: event.target.value },
                    })}
                  />
                )}
              </label>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
