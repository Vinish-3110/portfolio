'use client';

import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import GithubContributions from './GithubContributions';
import { fetchProjects, Project, ProjectView } from '@/lib/api';
import { useSiteCopy } from '@/components/SiteSettings';

function toProjectView(project: Project, index: number): ProjectView {
  const description = Array.isArray(project.description)
    ? project.description.filter(Boolean)
    : project.description
      ? [project.description]
      : [];

  return {
    id: String(project._id || project.id || index),
    title: project.title,
    description,
    techs: project.techs || [],
    links: {
      live: project.links?.live || undefined,
      github: project.showGithub === false ? undefined : project.links?.github || undefined,
      figma: project.links?.figma || undefined,
    },
    image: project.image || undefined,
  };
}

export default function Projects() {
  const copy = useSiteCopy();
  const [projectsList, setProjectsList] = useState<ProjectView[]>([]);
  const [ready, setReady] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectView | null>(null);

  useEffect(() => {
    fetchProjects()
      .then((apiProjects) => setProjectsList(apiProjects.map(toProjectView)))
      .catch(() => setProjectsList([]))
      .finally(() => setReady(true));
  }, []);

  return (
    <>
      {ready && projectsList.length > 0 && (
        <section id="work" className="section-wrapper">
          <div className="container">
            <div className="section-header-block">
              <div className="section-tag">
                <span className="section-tag-dot" />
                <span>{copy.projectsTag}</span>
              </div>
              <h2 className="section-heading-large">
                {copy.projectsHeading}
              </h2>
              <p className="section-subtext">
                {copy.projectsSub}
              </p>
            </div>

            <div className="projects-showcase-flow">
              {projectsList.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onOpenModal={setSelectedProject}
                />
              ))}
            </div>
          </div>

          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        </section>
      )}
      <GithubContributions />
    </>
  );
}
