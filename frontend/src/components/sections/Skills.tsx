'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Marquee from '@/components/common/Marquee';
import { fetchSkills, SkillItem } from '@/lib/api';
import { useSiteCopy } from '@/components/SiteSettings';

export default function Skills() {
  const copy = useSiteCopy();
  const skillsCategories = [
    { id: 'all', label: copy.skillsAll },
    { id: 'frontend', label: copy.skillsFrontend },
    { id: 'backend', label: copy.skillsBackend },
    { id: 'database', label: copy.skillsDatabase },
    { id: 'devops', label: copy.skillsDevops },
  ];
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetchSkills()
      .then((rows) => {
        setSkills(rows.map((row) => ({
          name: row.name,
          level: row.level || '',
          focus: row.focus || '',
          category: row.category,
        })));
      })
      .catch(() => setSkills([]))
      .finally(() => setReady(true));
  }, []);

  if (!ready || skills.length === 0) return null;

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter((skill) => skill.category === activeCategory);
  const marquee = skills.map((skill) => skill.name);

  return (
    <section id="stack" className="section-wrapper" style={{ paddingBottom: '3rem' }}>
      <div className="container">
        <div className="section-header-block">
          <div className="section-tag">
            <span className="section-tag-dot" />
            <span>{copy.skillsTag}</span>
          </div>
          <h2 className="section-heading-large">
            {copy.skillsHeading}
          </h2>
          <p className="section-subtext">
            {copy.skillsSub}
          </p>
        </div>
      </div>

      <Marquee items={marquee} speedSeconds={35} />

      <div className="container">
        <div className="skills-filter-tabs">
          {skillsCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`filter-tab ${activeCategory === cat.id ? 'active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <motion.div layout className="skills-cards-grid">
          <AnimatePresence>
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="skill-card"
              >
                <div className="skill-card-top">
                  <h3 className="skill-name">{skill.name}</h3>
                  {skill.level && <span className="skill-level-badge">{skill.level}</span>}
                </div>
                {skill.focus && <p className="skill-focus">{skill.focus}</p>}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
