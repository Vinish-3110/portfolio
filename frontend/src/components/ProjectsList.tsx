'use client';

import { useEffect, useState } from 'react';
import { fetchProjects } from '@/lib/api';
import { motion } from 'framer-motion';
import { ExternalLink, Code2 } from 'lucide-react';

const ProjectsList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects()
            .then(data => setProjects(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <section id="projects" className="section container">
            <div className="section-header">
                <h2 className="section-title"><span className="section-hash">#</span>projects</h2>
                <div className="section-line"></div>
                <a href="/projects" className="view-all-link">View all projects ~~{'>'}</a>
            </div>

            {loading ? (
                <div className="loading-grid">
                    {[1, 2, 3].map(i => <div key={i} className="skeleton glass border-radius-12"></div>)}
                </div>
            ) : projects.length === 0 ? (
                <div className="no-projects glass">
                  <Code2 size={48} />
                  <p>Projects are being curated. Check back soon!</p>
                </div>
            ) : (
                <div className="projects-grid">
                    {projects.map((project: any, index) => (
                        <motion.div 
                            className="project-card glass" 
                            key={project.id || index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <div className="project-preview">
                                {project.image ? (
                                    <img src={project.image} alt={project.title} className="project-img" />
                                ) : (
                                    <div className="project-no-img">Modular UI Component</div>
                                )}
                                <div className="project-tags">
                                    {project.techs?.map((t: string) => (
                                      <span key={t} className="tag glass">{t}</span>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="project-info">
                                <h3 className="project-name">{project.title}</h3>
                                <div className="project-description-container">
                                    {Array.isArray(project.description) ? (
                                        <ul className="project-description-list">
                                            {project.description.map((line: string, i: number) => (
                                                <li key={i} className="project-description-item">{line}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="project-description">{project.description}</p>
                                    )}
                                </div>
                                <div className="project-cta">
                                    {project.links?.live && (
                                        <a href={project.links.live} target="_blank" className="btn btn-filled btn-sm">
                                            Live <ExternalLink size={14} />
                                        </a>
                                    )}
                                    {project.links?.github && (
                                        <a href={project.links.github} target="_blank" className="btn btn-primary btn-sm">
                                            Code <Code2 size={14} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

        </section>
    );
};

export default ProjectsList;
