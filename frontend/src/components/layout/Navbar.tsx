'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';
import MagneticButton from '@/components/common/MagneticButton';

const navLinks = [
  { href: '#about', label: 'About', index: '01' },
  { href: '#stack', label: 'Stack', index: '02' },
  { href: '#experience', label: 'Experience', index: '03' },
  { href: '#work', label: 'Works', index: '04' },
  { href: '#contact', label: 'Contact', index: '05' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <header className={`navbar-container ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container navbar-content">
          {/* Logo & Availability Status */}
          <MagneticButton as="a" href="#home" className="navbar-logo">
            <span>VINISH</span>
            <span className="navbar-logo-badge">
              <span className="navbar-pulse-dot" />
              AVAILABLE
            </span>
          </MagneticButton>

          {/* Desktop Navigation Links */}
          <nav>
            <ul className="navbar-links">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <MagneticButton as="a" href={item.href} className="navbar-link">
                    <span className="navbar-link-number">{item.index}.</span>
                    <span>{item.label}</span>
                  </MagneticButton>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions: Theme Toggle + CTA */}
          <div className="navbar-actions">
            <MagneticButton
              as="button"
              onClick={toggleTheme}
              className="theme-toggle-button"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </MagneticButton>

            <MagneticButton
              as="a"
              href="#contact"
              className="btn btn-primary btn-sm desktop-only"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight size={15} />
            </MagneticButton>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-btn"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Animated Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-nav-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="mobile-nav-links">
              {navLinks.map((item, idx) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                >
                  <a
                    href={item.href}
                    className="mobile-nav-item"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span style={{ fontSize: '1rem', color: 'var(--text-accent)', marginRight: '1rem', fontFamily: 'var(--font-mono)' }}>
                      {item.index} {"//"}
                    </span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <a
                href="#contact"
                className="btn btn-primary"
                onClick={() => setMobileMenuOpen(false)}
                style={{ width: '100%' }}
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight size={16} />
              </a>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Based in India • Open to Worldwide Remote Roles
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
