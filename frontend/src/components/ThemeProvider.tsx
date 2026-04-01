'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'cyberpunk' | 'forest' | 'oceanic' | 'custom';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [customColor, setCustomColor] = useState<string>('#b87af0');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }

    // Fetch global config
    import('@/lib/api').then(({ fetchProfile }) => {
      fetchProfile().then(data => {
        if (data.theme_color) {
          setCustomColor(data.theme_color);
          if (savedTheme === 'custom' || (!savedTheme && data.theme_color)) {
            document.documentElement.style.setProperty('--primary', data.theme_color);
          }
        }
      }).catch(() => console.error('Failed to fetch theme profile'));
    });
  }, []);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    if (newTheme === 'custom') {
      document.documentElement.style.setProperty('--primary', customColor);
    } else {
      document.documentElement.style.removeProperty('--primary');
    }
  };

  const toggleTheme = () => {
    const themes: Theme[] = ['dark', 'light', 'cyberpunk', 'forest', 'oceanic', 'custom'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    changeTheme(themes[nextIndex]);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: changeTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
