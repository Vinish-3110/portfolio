'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { Palette, SiteCopy, SiteSettings } from '@/lib/siteSettings';

const SiteSettingsContext = createContext<SiteSettings | null>(null);

export function SiteSettingsProvider({
  value,
  children,
}: {
  value: SiteSettings;
  children: React.ReactNode;
}) {
  return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>;
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}

export function useSiteCopy(): Partial<SiteCopy> {
  return useContext(SiteSettingsContext)?.copy || {};
}

const hexToRgba = (hex: string, alpha: number) => {
  const normalized = hex.replace('#', '');
  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) return hex;
  const value = Number.parseInt(normalized, 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};

const applyPalette = (palette: Palette) => {
  const root = document.documentElement;
  const entries: Record<string, string> = {
    '--bg-main': palette.background,
    '--bg-surface': palette.surface,
    '--bg-surface-elevated': palette.elevated,
    '--text-primary': palette.text,
    '--text-secondary': palette.secondary,
    '--text-muted': palette.muted,
    '--text-accent': palette.textAccent,
    '--accent-primary': palette.accent,
    '--accent-secondary': palette.accentSecondary,
    '--accent-success': palette.success,
    '--accent-glow': hexToRgba(palette.accent, 0.25),
    '--border-active': hexToRgba(palette.accent, 0.5),
  };
  Object.entries(entries).forEach(([name, color]) => {
    if (color) root.style.setProperty(name, color);
  });
};

export function SiteAppearance() {
  const settings = useSiteSettings();
  const { theme } = useTheme();

  useEffect(() => {
    if (!settings) return;
    applyPalette(theme === 'light' ? settings.light : settings.colors);
  }, [settings, theme]);

  return null;
}
