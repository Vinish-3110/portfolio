'use client';

import React, { useState, useEffect } from 'react';
import { curatedProjects, ProjectCaseStudy } from '@/data/projectsData';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import GithubContributions from './GithubContributions';
import { fetchProjects } from '@/lib/api';

export default function Projects() {
  const [projectsList, setProjectsList] = useState<ProjectCaseStudy[]>(curatedProjects);
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);

  useEffect(() => {
    // Attempt to merge live projects from API if available
    fetchProjects()
      .then((apiProjects) => {
        if (apiProjects && apiProjects.length > 0) {
          // Merge API projects with curated data to ensure rich case study metrics are preserved
          const merged: ProjectCaseStudy[] = curatedProjects.map((curated) => {
            const match = apiProjects.find(
              (p) => p.title.toLowerCase().trim() === curated.title.toLowerCase().trim()
            );
            if (match) {
              return {
                ...curated,
                links: {
                  live: match.links?.live || curated.links.live,
                  github: match.links?.github || curated.links.github,
                },
                image: match.image || curated.image,
              };
            }
            return curated;
          });

          // Add any new projects from API that were not in curated list
          apiProjects.forEach((p, idx) => {
            const exists = merged.some(
              (m) => m.title.toLowerCase().trim() === p.title.toLowerCase().trim()
            );
            if (!exists) {
              merged.push({
                id: String(p._id || p.id || `api-proj-${idx}`),
                title: p.title,
                subtitle: Array.isArray(p.description) ? p.description[0] : p.description || 'Full-Stack Web Project',
                tagline: 'Engineered with modern frontend and backend standards.',
                year: '2024',
                category: 'Web Application',
                role: 'Full-Stack Developer',
                description: Array.isArray(p.description) ? p.description : [p.description || ''],
                techs: p.techs || ['Next.js', 'React', 'TypeScript'],
                metrics: [
                  { label: 'Architecture', value: 'Modular' },
                  { label: 'Status', value: 'Production' },
                ],
                problem: 'Engineering a resilient, high-speed solution to address modern digital requirements.',
                solution: 'Architected with clean component abstractions, type-safety, and optimized asset delivery.',
                architecture: ['Modular component architecture', 'RESTful API integration', 'Modern state management'],
                features: ['Responsive UI layout', 'Performant client interactions', 'Clean API contracts'],
                impact: ['Delivered exceptional user experience and high maintainability'],
                links: {
                  live: p.links?.live,
                  github: p.links?.github,
                },
                image: p.image || '/images/projects/portfolio.webp',
                featured: Boolean(p.isFeatured),
              });
            }
          });

          setProjectsList(merged);
        }
      })
      .catch((err) => {
        console.warn('API fetch offline or cold; using rich local case studies:', err);
      });
  }, []);

  return (
    <section id="work" className="section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-tag">
            <span className="section-tag-dot" />
            <span>SELECTED WORKS / 04</span>
          </div>
          <h2 className="section-heading-large">
            Featured case studies &amp; systems.
          </h2>
          <p className="section-subtext">
            Deep dive into architectures, engineering trade-offs, and measurable outcomes.
          </p>
        </div>

        {/* Alternating Editorial Showcase Flow */}
        <div className="projects-showcase-flow">
          {projectsList.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpenModal={(proj) => setSelectedProject(proj)}
            />
          ))}
        </div>

        {/* GitHub Contribution Activity & Velocity */}
        <GithubContributions />
      </div>

      {/* Case Study Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
