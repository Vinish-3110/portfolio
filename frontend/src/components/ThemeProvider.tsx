'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'cyberpunk' | 'forest' | 'oceanic' | 'custom';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  customColor: string;
  setCustomColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [customColor, setCustomColorState] = useState<string>('#b87af0');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;

    import('@/lib/api').then(({ fetchProfile }) => {
      fetchProfile().then(data => {
        if (data.theme_color) {
          setCustomColorState(data.theme_color);
          
          if (!savedTheme || savedTheme === 'custom') {
            setTheme('custom');
            document.documentElement.setAttribute('data-theme', 'custom');
            document.documentElement.style.setProperty('--primary', data.theme_color);
            document.documentElement.style.setProperty('--primary-op', data.theme_color + '1A');
          } else {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
          }
        } else if (savedTheme) {
          setTheme(savedTheme);
          document.documentElement.setAttribute('data-theme', savedTheme);
        }
      }).catch(() => {
        if (savedTheme) {
          setTheme(savedTheme);
          document.documentElement.setAttribute('data-theme', savedTheme);
        }
      });
    });
  }, []);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    if (newTheme === 'custom') {
      document.documentElement.style.setProperty('--primary', customColor);
      document.documentElement.style.setProperty('--primary-op', customColor + '1A');
    } else {
      document.documentElement.style.removeProperty('--primary');
      document.documentElement.style.removeProperty('--primary-op');
    }
  };

  const toggleTheme = () => {
    const themes: Theme[] = ['dark', 'light', 'cyberpunk', 'forest', 'oceanic', 'custom'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    changeTheme(themes[nextIndex]);
  };

  const setCustomColor = (color: string) => {
    setCustomColorState(color);
    if (theme === 'custom') {
      document.documentElement.style.setProperty('--primary', color);
      document.documentElement.style.setProperty('--primary-op', color + '1A');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: changeTheme, toggleTheme, customColor, setCustomColor }}>
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
