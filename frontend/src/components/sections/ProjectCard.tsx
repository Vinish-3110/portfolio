'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles } from 'lucide-react';
import { GithubIcon } from '@/components/common/Icons';
import { projectMediaUrl, ProjectView } from '@/lib/api';
import MagneticButton from '@/components/common/MagneticButton';
import { trackProjectView } from '@/lib/analytics';
import { useSiteCopy } from '@/components/SiteSettings';

interface ProjectCardProps {
  project: ProjectView;
  index: number;
  onOpenModal: (project: ProjectView) => void;
}

export default function ProjectCard({ project, index, onOpenModal }: ProjectCardProps) {
  const copy = useSiteCopy();
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
        {project.image && (
          <img
            src={projectMediaUrl(project.image)}
            alt={project.title}
            className="project-preview-img"
            loading="lazy"
          />
        )}
      </div>

      {/* Project Information */}
      <div className="project-info-wrap">
        <span className="project-index-label">
          {copy.projectLabel} // 0{index + 1}
        </span>

        <h3 className="project-heading">{project.title}</h3>
        {project.description[0] && <p className="project-subtitle">{project.description[0]}</p>}

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
            <span>{copy.projectCaseStudy}</span>
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
              <span>{copy.projectLive}</span>
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
              <span>{copy.projectCode}</span>
              <GithubIcon size={13} />
            </MagneticButton>
          )}
        </div>
      </div>
    </motion.article>
  );
}
