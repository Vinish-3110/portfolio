'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import MagneticButton from '@/components/common/MagneticButton';

export default function Footer() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-bar">
      <div className="container footer-content">
        {/* Left: System Status & Time */}
        <div className="footer-system-status">
          <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--accent-success)' }} />
          <span>SYS.ONLINE</span>
          <span>{"//"}</span>
          <span>NEW DELHI (IST): {time || 'CALCULATING...'}</span>
        </div>

        {/* Center: Tech Stack Credits */}
        <div className="footer-tech-stack">
          ENGINEERED WITH NEXT.JS 16 & FRAMER MOTION
        </div>

        {/* Right: Back to Top & Copyright */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} VINISH
          </span>
          <MagneticButton
            as="button"
            onClick={scrollToTop}
            className="theme-toggle-button"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
}
