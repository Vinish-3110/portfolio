'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles } from 'lucide-react';
import { GithubIcon } from '@/components/common/Icons';
import { ProjectCaseStudy } from '@/data/projectsData';
import MagneticButton from '@/components/common/MagneticButton';
import { trackProjectView } from '@/lib/analytics';

interface ProjectCardProps {
  project: ProjectCaseStudy;
  index: number;
  onOpenModal: (project: ProjectCaseStudy) => void;
}

export default function ProjectCard({ project, index, onOpenModal }: ProjectCardProps) {
  const isReverse = index % 2 === 1;

  const handleOpen = () => {
    trackProjectView(project.id, project.title);
    onOpenModal(project);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className={`project-showcase-item ${isReverse ? 'project-showcase-reverse' : ''}`}
    >
      {/* Visual Preview with Custom Cursor Lens Trigger */}
      <div
        className="project-preview-wrap"
        onClick={handleOpen}
        data-cursor="lens"
        data-lens-text="EXPLORE ↗"
      >
        <span className="project-overlay-badge">
          {project.category}
        </span>
        <img
          src={project.image}
          alt={project.title}
          className="project-preview-img"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.dataset.failed) {
              target.dataset.failed = 'true';
              target.src = '/images/projects/portfolio.webp';
            }
          }}
        />
      </div>

      {/* Project Information */}
      <div className="project-info-wrap">
        <span className="project-index-label">
          PROJECT // 0{index + 1}
        </span>

        <h3 className="project-heading">{project.title}</h3>
        <p className="project-subtitle">{project.subtitle}</p>

        {/* Metrics Strip */}
        {project.metrics && (
          <div className="project-metrics-strip">
            {project.metrics.map((m, mIdx) => (
              <div key={mIdx} className="project-metric-unit">
                <span className="metric-val-bold">{m.value}</span>
                <span className="metric-sub-tag">{m.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Tags */}
        <div className="telemetry-tech-pills">
          {project.techs.slice(0, 5).map((tech) => (
            <span key={tech} className="telemetry-pill">
              {tech}
            </span>
          ))}
          {project.techs.length > 5 && (
            <span className="telemetry-pill" style={{ color: 'var(--text-accent)' }}>
              +{project.techs.length - 5} more
            </span>
          )}
        </div>

        {/* Action CTAs */}
        <div className="project-actions-row">
          <MagneticButton
            as="button"
            onClick={handleOpen}
            className="btn btn-primary btn-sm"
          >
            <span>Case Study</span>
            <Sparkles size={14} />
          </MagneticButton>

          {project.links?.live && (
            <MagneticButton
              as="a"
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              <span>Live</span>
              <ExternalLink size={13} />
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
              <span>Code</span>
              <GithubIcon size={13} />
            </MagneticButton>
          )}
        </div>
      </div>
    </motion.article>
  );
}
