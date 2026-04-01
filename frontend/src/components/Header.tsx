'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Palette } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from './ThemeProvider';

const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, customColor, setCustomColor } = useTheme();
  const [showThemes, setShowThemes] = useState(false);

  const links = [
    { name: '#home', label: 'home' },
    { name: '#projects', label: 'works' },
    { name: '#about', label: 'about-me' },
    { name: '#contacts', label: 'contacts' },
  ];

  const themes: Array<{id: any, color: string, name: string}> = [
    { id: 'dark', color: '#abb2bf', name: 'Original' },
    { id: 'light', color: '#5C2D91', name: 'Light' },
    { id: 'cyberpunk', color: '#f0f', name: 'Cyber' },
    { id: 'forest', color: '#4ade80', name: 'Forest' },
    { id: 'oceanic', color: '#38bdf8', name: 'Ocean' },
    { id: 'custom', color: 'conic-gradient(red, yellow, green, blue, magenta, red)', name: 'Brand' },
  ];

  return (
    <header className="header glass">
      <div className="container header-content">
        <Link href="/" className="logo">
          <span className="logo-icon">#</span>Vinish
        </Link>

        {/* Desktop Nav */}
        <nav className="nav desktop-only">
          <ul className="nav-list">
            {links.map((link) => (
              <li key={link.name} className="nav-item">
                <Link href={link.name} className={`nav-link ${pathname === link.name ? 'active' : ''}`}>
                  <span className="nav-hash">#</span>{link.label}
                </Link>
              </li>
            ))}
            
            {/* Theme Picker */}
            <li className="nav-item theme-picker-container">
               <button onClick={() => setShowThemes(!showThemes)} className="theme-toggle-btn">
                 <Palette size={20} />
               </button>
               {showThemes && (
                 <div className="theme-dropdown glass">
                   {themes.map(t => (
                     <button 
                       key={t.id} 
                       onClick={() => {
                         setTheme(t.id);
                         if (t.id !== 'custom') setShowThemes(false);
                       }}
                       className={`theme-opt ${theme === t.id ? 'active' : ''}`}
                     >
                       {t.id === 'custom' ? (
                         <div className="theme-color-dot" style={{ background: t.color, position: 'relative', overflow: 'hidden' }}>
                           <input 
                             type="color" 
                             value={customColor || '#b87af0'}
                             onChange={(e) => {
                               setCustomColor(e.target.value);
                               setTheme('custom');
                             }}
                             onClick={(e) => e.stopPropagation()}
                             style={{ position: 'absolute', top: -5, left: -5, width: 30, height: 30, opacity: 0, cursor: 'pointer' }}
                             title="Pick custom color"
                           />
                         </div>
                       ) : (
                         <span className="theme-color-dot" style={{background: t.color}}></span>
                       )}
                       {t.name}
                     </button>
                   ))}
                 </div>
               )}
            </li>
          </ul>
        </nav>

        {/* Mobile Nav Button */}
        <div className="mobile-actions mobile-only">
          <button onClick={() => setIsOpen(!isOpen)} className="menu-btn">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        {isOpen && (
          <div className="mobile-menu glass mobile-only">
             <ul className="mobile-nav-list">
              {links.map((link) => (
                <li key={link.name} className="mobile-nav-item">
                  <Link 
                    href={link.name} 
                    className="mobile-nav-link"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="nav-hash">#</span>{link.label}
                  </Link>
                </li>
              ))}
              <li className="mobile-nav-item">
                 <p className="mobile-theme-label">Switch Theme:</p>
                 <div className="mobile-theme-grid">
                   {themes.map(t => (
                     <button 
                       key={t.id} 
                       onClick={() => {
                         setTheme(t.id);
                         if (t.id !== 'custom') setIsOpen(false);
                       }}
                       className={`mobile-theme-opt ${theme === t.id ? 'active' : ''}`}
                       style={{ borderColor: theme === t.id ? t.color : 'transparent' }}
                     >
                       {t.id === 'custom' ? (
                         <div className="theme-color-dot" style={{ background: t.color, position: 'relative', overflow: 'hidden' }}>
                           <input 
                             type="color" 
                             value={customColor || '#b87af0'}
                             onChange={(e) => {
                               setCustomColor(e.target.value);
                               setTheme('custom');
                             }}
                             onClick={(e) => e.stopPropagation()}
                             style={{ position: 'absolute', top: -5, left: -5, width: 30, height: 30, opacity: 0, cursor: 'pointer' }}
                             title="Pick custom color"
                           />
                         </div>
                       ) : (
                         <span className="theme-color-dot" style={{background: t.color}}></span>
                       )}
                     </button>
                   ))}
                 </div>
              </li>
            </ul>
          </div>
        )}
      </div>

    </header>
  );
};

export default Header;
