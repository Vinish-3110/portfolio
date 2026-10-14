'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/common/Icons';
import { projectMediaUrl, ProjectView } from '@/lib/api';
import MagneticButton from '@/components/common/MagneticButton';
import { useSiteCopy } from '@/components/SiteSettings';

interface ProjectModalProps {
  project: ProjectView | null;
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

  const copy = useSiteCopy();
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
          {project.image && (
            <div className="modal-header-hero">
              <img
                src={projectMediaUrl(project.image)}
                alt={project.title}
                className="modal-header-img"
              />
            </div>
          )}

          {/* Modal Content */}
          <div className="modal-body">
            <h2 className="modal-title">{project.title}</h2>
            {project.description[0] && <p className="modal-subtitle">{project.description[0]}</p>}

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
                  <span>{copy.projectLivePreview}</span>
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
                  <span>{copy.projectSource}</span>
                  <GithubIcon size={14} />
                </MagneticButton>
              )}
            </div>

            {project.description.length > 1 && (
              <ul className="modal-bullets">
                {project.description.slice(1).map((line, idx) => (
                  <li key={idx} className="modal-bullet-item">
                    {line}
                  </li>
                ))}
              </ul>
            )}

            {/* Tech Stack Used */}
            <h3 className="modal-section-title">{copy.projectTechnologies}</h3>
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
