'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { experienceData, ExperienceItem } from '@/data/experienceData';
import { fetchExperiences } from '@/lib/api';

export default function Experience() {
  const [items, setItems] = useState<ExperienceItem[]>(experienceData);

  useEffect(() => {
    fetchExperiences()
      .then((rows) => {
        if (!rows.length) return;
        setItems(rows.map((row) => ({
          id: row._id || row.id || row.role,
          role: row.role,
          company: row.company,
          companyUrl: row.companyUrl,
          period: row.period || '',
          type: row.type || '',
          location: row.location || '',
          summary: row.summary || '',
          achievements: row.achievements || [],
          technologies: row.technologies || [],
        })));
      })
      .catch(() => {});
  }, []);
  return (
    <section id="experience" className="section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-tag">
            <span className="section-tag-dot" />
            <span>CAREER / 03</span>
          </div>
          <h2 className="section-heading-large">
            Professional trajectory &amp; engineering milestones.
          </h2>
          <p className="section-subtext">
            A chronological record of hands-on impact, product ownership, and technical contributions.
          </p>
        </div>

        {/* Editorial Timeline / Ledger */}
        <div className="experience-ledger">
          {items.map((exp, index) => (
            <motion.article
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="experience-entry"
            >
              <div className="experience-top-row">
                <h3 className="experience-role-title">
                  <span>{exp.role}</span>
                  <span style={{ color: 'var(--text-muted)' }}>@</span>
                  <span className="experience-company-pill">
                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                      >
                        {exp.company}
                        <ExternalLink size={12} />
                      </a>
                    ) : (
                      exp.company
                    )}
                  </span>
                </h3>

                <div className="experience-meta">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontWeight: 600 }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block', boxShadow: '0 0 8px #10b981' }} />
                    {exp.period}
                  </span>
                  <span style={{ margin: '0 0.5rem' }}>•</span>
                  <span>{exp.location}</span>
                  {exp.type && (
                    <>
                      <span style={{ margin: '0 0.5rem' }}>•</span>
                      <span>{exp.type}</span>
                    </>
                  )}
                </div>
              </div>

              <p className="experience-summary">{exp.summary}</p>

              {/* Achievements Bullet List */}
              <ul className="experience-achievements-list">
                {exp.achievements.map((item, aIdx) => (
                  <li key={aIdx} className="experience-achievement-item">
                    {item}
                  </li>
                ))}
              </ul>

              {/* Tech Stack Pills */}
              <div className="experience-tech-tags">
                {exp.technologies.map((tech) => (
                  <span key={tech} className="experience-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
