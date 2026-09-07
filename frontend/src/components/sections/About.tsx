'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileDown, ArrowUpRight } from 'lucide-react';
import MagneticButton from '@/components/common/MagneticButton';

const stats = [
  { value: '2+', label: 'Years Experience', sub: 'Production software engineering' },
  { value: '15+', label: 'Projects & Modules', sub: 'Shipped to real users' },
  { value: '98%', label: 'Lighthouse Target', sub: 'Performance & Accessibility' },
  { value: '60fps', label: 'Interaction Goal', sub: 'Fluid UI micro-interactions' },
];

export default function About({ resumeUrl }: { resumeUrl?: string }) {
  return (
    <section id="about" className="section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-tag">
            <span className="section-tag-dot" />
            <span>ABOUT / 01</span>
          </div>
          <h2 className="section-heading-large">
            I build scalable, interactive, and user-focused web experiences.
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
            <p>
              I am a <strong>Web Developer with 2+ years of professional engineering experience</strong>, specializing in the modern JavaScript and Python ecosystems. My focus is at the intersection of robust system design and delightful, polished user interfaces.
            </p>
            <p>
              Over the past two years, I have architected high-performance frontends with <strong>Next.js and React</strong>, built resilient <strong>Node.js and Python (FastAPI/Django)</strong> microservices, and engineered data pipelines with PostgreSQL, MongoDB, and Redis.
            </p>
            <p>
              I care deeply about software craftsmanship: zero layout shifts, accessible semantic HTML, modular component architecture, and fluid transitions that make digital products feel alive without compromising speed.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '2rem' }}>
              {resumeUrl ? (
                <MagneticButton
                  as="a"
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <span>Download CV (PDF)</span>
                  <FileDown size={16} />
                </MagneticButton>
              ) : (
                <MagneticButton
                  as="a"
                  href="#contact"
                  className="btn btn-primary"
                >
                  <span>Request Resume</span>
                  <FileDown size={16} />
                </MagneticButton>
              )}

              <MagneticButton
                as="a"
                href="#experience"
                className="btn btn-secondary"
              >
                <span>View Career Timeline</span>
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
            {stats.map((item, idx) => (
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
