'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileDown, ArrowUpRight } from 'lucide-react';
import MagneticButton from '@/components/common/MagneticButton';
import { downloadResume } from '@/lib/api';
import { useSiteCopy } from '@/components/SiteSettings';

export default function About({
  heading,
  paragraphs,
  stats,
}: {
  heading?: string;
  paragraphs?: string[];
  stats?: { value: string; label: string; sub: string }[];
}) {
  const copy = useSiteCopy();
  const aboutParagraphs = paragraphs ?? [];
  const aboutStats = stats ?? [];
  const [resumeMessage, setResumeMessage] = useState('');

  const handleResumeDownload = async () => {
    setResumeMessage('');
    try {
      await downloadResume();
    } catch {
      setResumeMessage('Resume is not available right now.');
    }
  };
  return (
    <section id="about" className="section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-tag">
            <span className="section-tag-dot" />
            <span>{copy.aboutTag}</span>
          </div>
          <h2 className="section-heading-large">
            {heading}
          </h2>
        </div>

        {/* 2-Column Content Grid */}
        <div className="about-grid">
          {/* Left: Editorial Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="about-narrative"
          >
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '2rem' }}>
              <MagneticButton
                as="button"
                type="button"
                onClick={handleResumeDownload}
                className="btn btn-primary"
              >
                <span>{copy.aboutResume}</span>
                <FileDown size={16} />
              </MagneticButton>
              {resumeMessage && (
                <span style={{ alignSelf: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  {resumeMessage}
                </span>
              )}

              <MagneticButton
                as="a"
                href="#experience"
                className="btn btn-secondary"
              >
                <span>{copy.aboutTimeline}</span>
                <ArrowUpRight size={16} />
              </MagneticButton>
            </div>
          </motion.div>

          {/* Right: Key Performance Metrics & Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="about-metrics-grid"
          >
            {aboutStats.map((item, idx) => (
              <div key={idx} className="metric-card">
                <span className="metric-number">{item.value}</span>
                <span className="metric-label">{item.label}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  {item.sub}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
