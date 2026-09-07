'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Layers, Cpu, Sparkles } from 'lucide-react';
import { GithubIcon } from '@/components/common/Icons';
import { ProjectCaseStudy } from '@/data/projectsData';
import MagneticButton from '@/components/common/MagneticButton';

interface ProjectModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [project]);

  // Keyboard escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="modal-backdrop" onClick={onClose}>
        <motion.div
          className="modal-surface"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="modal-close-btn"
            aria-label="Close project details"
          >
            <X size={18} />
          </button>

          {/* Header Image */}
          <div className="modal-header-hero">
            <img
              src={project.image}
              alt={project.title}
              className="modal-header-img"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.failed) {
                  target.dataset.failed = 'true';
                  target.src = '/images/projects/portfolio.webp';
                }
              }}
            />
          </div>

          {/* Modal Content */}
          <div className="modal-body">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span className="section-tag" style={{ margin: 0 }}>
                {project.category}
              </span>
              <span style={{ color: 'var(--text-muted)' }}>•</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                {project.year}
              </span>
            </div>

            <h2 className="modal-title">{project.title}</h2>
            <p className="modal-subtitle">{project.subtitle}</p>

            {/* Quick CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              {project.links?.live && (
                <MagneticButton
                  as="a"
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  <span>Live Preview</span>
                  <ExternalLink size={14} />
                </MagneticButton>
              )}
              {project.links?.github && (
                <MagneticButton
                  as="a"
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                >
                  <span>Source Code</span>
                  <GithubIcon size={14} />
                </MagneticButton>
              )}
            </div>

            {/* Performance & Engineering Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="about-metrics-grid" style={{ marginBottom: '2rem' }}>
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="metric-card" style={{ padding: '1.25rem 1rem' }}>
                    <span className="metric-number" style={{ fontSize: '1.75rem' }}>{m.value}</span>
                    <span className="metric-label">{m.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Problem Statement */}
            <h3 className="modal-section-title">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <Layers size={16} /> 01 // The Challenge &amp; Problem
              </span>
            </h3>
            <p className="modal-text">{project.problem}</p>

            {/* Engineering Solution */}
            <h3 className="modal-section-title">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <Cpu size={16} /> 02 // Architectural Solution
              </span>
            </h3>
            <p className="modal-text">{project.solution}</p>

            {/* Architecture Highlights */}
            <div style={{ marginTop: '1rem' }}>
              <ul className="modal-bullets">
                {project.architecture.map((item, idx) => (
                  <li key={idx} className="modal-bullet-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Core Features */}
            <h3 className="modal-section-title">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={16} /> 03 // Key Capabilities
              </span>
            </h3>
            <ul className="modal-bullets">
              {project.features.map((feat, idx) => (
                <li key={idx} className="modal-bullet-item">
                  {feat}
                </li>
              ))}
            </ul>

            {/* Measured Impact */}
            <h3 className="modal-section-title">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} /> 04 // Measured Results
              </span>
            </h3>
            <ul className="modal-bullets">
              {project.impact.map((imp, idx) => (
                <li key={idx} className="modal-bullet-item">
                  {imp}
                </li>
              ))}
            </ul>

            {/* Tech Stack Used */}
            <h3 className="modal-section-title">Technologies</h3>
            <div className="telemetry-tech-pills">
              {project.techs.map((tech) => (
                <span key={tech} className="telemetry-pill">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
