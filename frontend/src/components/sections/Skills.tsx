'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Marquee from '@/components/common/Marquee';
import { skillsCategories, skillsList, marqueeTechs } from '@/data/skillsData';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredSkills = activeCategory === 'all'
    ? skillsList
    : skillsList.filter((s) => s.category === activeCategory);

  return (
    <section id="stack" className="section-wrapper" style={{ paddingBottom: '3rem' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-tag">
            <span className="section-tag-dot" />
            <span>CAPABILITIES / 02</span>
          </div>
          <h2 className="section-heading-large">
            Full-spectrum engineering stack.
          </h2>
          <p className="section-subtext">
            Carefully chosen tools and frameworks engineered for developer ergonomics, scale, and high-performance user interfaces.
          </p>
        </div>
      </div>

      {/* Infinite Horizontal Marquee */}
      <Marquee items={marqueeTechs} speedSeconds={35} />

      <div className="container">
        {/* Filter Tabs */}
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

        {/* Dynamic Skill Cards Grid */}
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
                  <span className="skill-level-badge">{skill.level}</span>
                </div>
                <p className="skill-focus">{skill.focus}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
