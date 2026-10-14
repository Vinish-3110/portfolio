'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Terminal, ArrowDown, Activity } from 'lucide-react';
import MagneticButton from '@/components/common/MagneticButton';
import { fetchSkills } from '@/lib/api';
import { useSiteCopy } from '@/components/SiteSettings';

export type HeroContent = {
  roleBadge?: string;
  headlineBefore?: string;
  headlineHighlight?: string;
  headlineAfter?: string;
  description?: string;
  engineerName?: string;
  discipline?: string;
  experienceLabel?: string;
  coreFocus?: string;
};

export default function Hero({ content }: { content?: HeroContent }) {
  const copy = useSiteCopy();
  const [latency, setLatency] = useState(24);
  const [techs, setTechs] = useState<string[]>([]);

  useEffect(() => {
    // Subtle realistic ping jitter for developer immersion
    const interval = setInterval(() => {
      setLatency(Math.floor(20 + Math.random() * 12));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchSkills()
      .then((rows) => setTechs(rows.map((row) => row.name).filter(Boolean)))
      .catch(() => setTechs([]));
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
            {content?.roleBadge && (
              <div className="hero-badge-pill">
                <span className="navbar-pulse-dot" />
                <span>{content.roleBadge}</span>
              </div>
            )}

            {/* Main Editorial Headline */}
            <h1 className="hero-title">
              {content?.headlineBefore}{' '}
              {content?.headlineHighlight && <span className="hero-highlight-word">{content.headlineHighlight}</span>}{' '}
              {content?.headlineAfter}
            </h1>

            {/* Supporting Description */}
            <p className="hero-description">
              {content?.description}
            </p>

            {/* Primary Actions */}
            <div className="hero-cta-group">
              <MagneticButton
                as="a"
                href="#work"
                className="btn btn-primary"
                data-cursor="hover"
              >
                <span>{copy.heroProjects}</span>
                <ArrowUpRight size={18} />
              </MagneticButton>

              <MagneticButton
                as="a"
                href="#contact"
                className="btn btn-secondary"
                data-cursor="hover"
              >
                <span>{copy.heroContact}</span>
              </MagneticButton>
            </div>

            {/* Scroll Indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
              <ArrowDown size={14} style={{ animation: 'bounce 2s infinite' }} />
              <span>{copy.heroScroll}</span>
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
              <span className="telemetry-file-tag">{copy.telemetryFile}</span>
              <Terminal size={14} style={{ color: 'var(--text-muted)' }} />
            </div>

            <div className="telemetry-body">
              {content?.engineerName && (
                <div className="telemetry-row">
                  <span className="telemetry-label">{"//"} {copy.telemetryEngineer}</span>
                  <span className="telemetry-val" style={{ color: 'var(--text-primary)' }}>{content.engineerName}</span>
                </div>
              )}
              {content?.discipline && (
                <div className="telemetry-row">
                  <span className="telemetry-label">{"//"} {copy.telemetryDiscipline}</span>
                  <span className="telemetry-val">{content.discipline}</span>
                </div>
              )}
              {content?.experienceLabel && (
                <div className="telemetry-row">
                  <span className="telemetry-label">{"//"} {copy.telemetryExperience}</span>
                  <span className="telemetry-val">{content.experienceLabel}</span>
                </div>
              )}
              <div className="telemetry-row">
                <span className="telemetry-label">{"//"} {copy.telemetryPing}</span>
                <span className="telemetry-val" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Activity size={12} style={{ color: 'var(--accent-success)' }} />
                  {latency}ms ({copy.telemetryOptimal})
                </span>
              </div>
              {content?.coreFocus && (
                <div className="telemetry-row">
                  <span className="telemetry-label">{"//"} {copy.telemetryFocus}</span>
                  <span className="telemetry-val">{content.coreFocus}</span>
                </div>
              )}

              {techs.length > 0 && (
                <>
                  <div style={{ marginTop: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                    {"//"} {copy.telemetryTech}:
                  </div>

                  <div className="telemetry-tech-pills">
                    {techs.map((tech) => (
                      <span key={tech} className="telemetry-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
