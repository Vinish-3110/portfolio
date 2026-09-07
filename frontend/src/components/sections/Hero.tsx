'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Terminal, ArrowDown, Activity } from 'lucide-react';
import MagneticButton from '@/components/common/MagneticButton';

const featuredTechs = [
  'Next.js 16',
  'React 19',
  'TypeScript',
  'Node.js',
  'Python',
  'FastAPI',
  'Django',
  'Angular',
];

export default function Hero() {
  const [latency, setLatency] = useState(24);

  useEffect(() => {
    // Subtle realistic ping jitter for developer immersion
    const interval = setInterval(() => {
      setLatency(Math.floor(20 + Math.random() * 12));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="hero-wrapper">
      <div className="container">
        <div className="hero-grid">
          {/* Left: Editorial Headline & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Experience Status Pill */}
            <div className="hero-badge-pill">
              <span className="navbar-pulse-dot" />
              <span>WEB DEVELOPER • 2+ YEARS PROFESSIONAL EXP</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="hero-title">
              Building modern <span className="hero-highlight-word">digital experiences</span>{' '}&amp;{' '}scalable web apps.
            </h1>

            {/* Supporting Description */}
            <p className="hero-description">
              Engineering high-performance web products with Next.js, React, Node.js, and Python.
              Focused on fluid 60fps micro-interactions, clean system architecture, and accessible user interfaces.
            </p>

            {/* Primary Actions */}
            <div className="hero-cta-group">
              <MagneticButton
                as="a"
                href="#work"
                className="btn btn-primary"
                data-cursor="hover"
              >
                <span>View Projects</span>
                <ArrowUpRight size={18} />
              </MagneticButton>

              <MagneticButton
                as="a"
                href="#contact"
                className="btn btn-secondary"
                data-cursor="hover"
              >
                <span>Contact Me</span>
              </MagneticButton>
            </div>

            {/* Scroll Indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
              <ArrowDown size={14} style={{ animation: 'bounce 2s infinite' }} />
              <span>SCROLL TO EXPLORE ARCHITECTURE</span>
            </div>
          </motion.div>

          {/* Right: Interactive Developer Telemetry Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="telemetry-card"
          >
            <div className="telemetry-header">
              <div className="telemetry-dots">
                <span className="telemetry-dot dot-red" />
                <span className="telemetry-dot dot-yellow" />
                <span className="telemetry-dot dot-green" />
              </div>
              <span className="telemetry-file-tag">developer-telemetry.config.ts</span>
              <Terminal size={14} style={{ color: 'var(--text-muted)' }} />
            </div>

            <div className="telemetry-body">
              <div className="telemetry-row">
                <span className="telemetry-label">{"//"} engineer</span>
                <span className="telemetry-val" style={{ color: 'var(--text-primary)' }}>Vinish Purohit</span>
              </div>
              <div className="telemetry-row">
                <span className="telemetry-label">{"//"} primary_discipline</span>
                <span className="telemetry-val">Frontend Architecture &amp; Full-Stack</span>
              </div>
              <div className="telemetry-row">
                <span className="telemetry-label">{"//"} experience</span>
                <span className="telemetry-val">2+ Years Production Grade</span>
              </div>
              <div className="telemetry-row">
                <span className="telemetry-label">{"//"} telemetry_ping</span>
                <span className="telemetry-val" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Activity size={12} style={{ color: 'var(--accent-success)' }} />
                  {latency}ms (Optimal)
                </span>
              </div>
              <div className="telemetry-row">
                <span className="telemetry-label">{"//"} core_focus</span>
                <span className="telemetry-val">SSR, App Router, REST APIs, Micro-interactions</span>
              </div>

              <div style={{ marginTop: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                {"//"} active_technologies:
              </div>

              <div className="telemetry-tech-pills">
                {featuredTechs.map((tech) => (
                  <span key={tech} className="telemetry-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
