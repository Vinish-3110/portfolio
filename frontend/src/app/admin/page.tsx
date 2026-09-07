'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  fetchProjects, 
  createProject, 
  deleteProject, 
  fetchEnquiries, 
  fetchProfile, 
  updateProfile, 
  uploadFile, 
  Enquiry, 
  Project 
} from '@/lib/api';
import './admin-theme.css';
import { 
  FolderGit2, 
  PlusCircle, 
  FileText, 
  MessageSquare, 
  LogOut, 
  Trash2, 
  RefreshCcw, 
  BarChart3, 
  ExternalLink, 
  Edit3, 
  Copy, 
  Check, 
  Menu, 
  X, 
  UploadCloud, 
  Palette, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [resumeUrl, setResumeUrl] = useState('');
  const [themeColor, setThemeColor] = useState('');
  const [loading, setLoading] = useState(true);
  const [submittingProject, setSubmittingProject] = useState(false);
  const [updatingProfileState, setUpdatingProfileState] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  
  // Project form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [techs, setTechs] = useState('');
  const [liveLink, setLiveLink] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [projectImage, setProjectImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Profile form
  const [newResumeFile, setNewResumeFile] = useState<File | null>(null);
  const [newThemeColor, setNewThemeColor] = useState('#10b981');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      loadData(token);
    }
  }, [router]);

  const loadData = async (token: string) => {
    try {
      setLoading(true);
      setError('');
      const [projData, enqData, profileData] = await Promise.all([
        fetchProjects(),
        fetchEnquiries(token),
        fetchProfile()
      ]);
      setProjects(projData);
      setEnquiries(enqData);
      setResumeUrl(profileData.resume_url || '');
      setThemeColor(profileData.theme_color || '#10b981');
      setNewThemeColor(profileData.theme_color || '#10b981');
    } catch {
      setError('Connection to backend failed. Make sure the server is active.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProjectImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
      setSubmittingProject(true);
      setError('');
      setSuccess('');

      let imageUrl = '';
      if (projectImage) {
        imageUrl = await uploadFile(projectImage);
      }

      const newProject = {
        title,
        description: description.split('\n').map(s => s.trim()).filter(Boolean),
        techs: techs.split(',').map(s => s.trim()).filter(Boolean),
        live_link: liveLink,
        github_link: githubLink,
        is_featured: false,
        image: imageUrl
      };

      await createProject(newProject, token);
      setSuccess('Project published successfully!');
      setTitle('');
      setDescription('');
      setTechs('');
      setLiveLink('');
      setGithubLink('');
      setProjectImage(null);
      setImagePreview(null);
      loadData(token);
    } catch {
      setError('Failed to create project. Please verify inputs and backend connection.');
    } finally {
      setSubmittingProject(false);
    }
  };

  const handleDeleteProject = async (id: string | number) => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) return;

    try {
      await deleteProject(id, token);
      setSuccess('Project removed successfully.');
      loadData(token);
    } catch {
      setError('Could not delete project. Please try again.');
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
      setUpdatingProfileState(true);
      setError('');
      setSuccess('');

      let uploadedResumeUrl = resumeUrl;
      if (newResumeFile) {
        uploadedResumeUrl = await uploadFile(newResumeFile);
      }

      await updateProfile({ resume_url: uploadedResumeUrl, theme_color: newThemeColor }, token);
      setSuccess('Profile attributes and theme updated successfully.');
      setResumeUrl(uploadedResumeUrl);
      setThemeColor(newThemeColor);
      setNewResumeFile(null);
      
      document.documentElement.style.setProperty('--primary', newThemeColor);
      document.documentElement.style.setProperty('--primary-op', newThemeColor + '1A');
    } catch {
      setError('Failed to update attributes.');
    } finally {
      setUpdatingProfileState(false);
    }
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to sign out of the Admin Console?')) {
      localStorage.removeItem('adminToken');
      router.push('/admin/login');
    }
  };

  if (loading) {
    return (
      <div className="admin-loading-screen">
        <div className="admin-spinner" />
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-modular-shell">
      {/* Mobile Drawer Overlay */}
      <div 
        className={`sidebar-overlay ${mobileMenuOpen ? 'open' : ''}`} 
        onClick={() => setMobileMenuOpen(false)} 
      />

      {/* Sidebar Navigation */}
      <aside className={`admin-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-icon-box">
            <ShieldCheck size={20} />
          </div>
          <div className="brand-title-wrap">
            <span className="brand-title">Admin Console</span>
            <span className="brand-badge">VINISH PUROHIT</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <span className="sidebar-section-title">Navigation</span>
          <a 
            href="#projects-mgmt" 
            className="nav-item-link active"
            onClick={() => setMobileMenuOpen(false)}
          >
            <FolderGit2 size={18} />
            <span>Projects</span>
          </a>

          <Link 
            href="/admin/analytics" 
            className="nav-item-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            <BarChart3 size={18} />
            <span>Analytics</span>
          </Link>

          <a 
            href="#enquiries" 
            className="nav-item-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            <MessageSquare size={18} />
            <span>Enquiries</span>
          </a>

          <a 
            href="#resume-mgmt" 
            className="nav-item-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            <FileText size={18} />
            <span>Resume &amp; Theme</span>
          </a>
        </nav>

        <div className="sidebar-footer">
          <Link href="/" target="_blank" rel="noopener noreferrer" className="sidebar-back-link">
            <Globe size={14} />
            <span>View Live Site</span>
            <ExternalLink size={12} />
          </Link>

          <button onClick={handleLogout} className="sidebar-logout">
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main-content">
        {/* Top Bar */}
        <header className="admin-top-bar glass">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="menu-toggle-btn"
              aria-label="Toggle Navigation Drawer"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div className="top-title">
              <h1>Portfolio Control Center</h1>
              <p>
                System Status:{' '}
                <span className="status-pill">
                  <span className="status-dot-pulse" />
                  Operational
                </span>
              </p>
            </div>
          </div>

          <div className="top-actions">
            <Link href="/admin/analytics" className="top-action-link">
              <BarChart3 size={16} />
              <span>Analytics</span>
            </Link>

            <Link href="/" target="_blank" rel="noopener noreferrer" className="top-action-link">
              <ExternalLink size={16} />
              <span>Live Site</span>
            </Link>

            <button 
              onClick={() => loadData(localStorage.getItem('adminToken') || '')} 
              className="refresh-btn-round"
              title="Refresh Data"
              aria-label="Refresh Data"
            >
              <RefreshCcw size={18} />
            </button>
          </div>
        </header>

        {/* Global Feedback Banners */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              className="alert-box error"
            >
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </motion.div>
          )}
          {success && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              className="alert-box success"
            >
              <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
              <span>{success}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2-Column Responsive Dashboard Grid */}
        <div className="dashboard-grid">
          {/* Left Column: Management Forms */}
          <div className="dashboard-forms">
            {/* Publish Project Form */}
            <section id="projects-mgmt" className="admin-card glass">
              <div className="card-header">
                <h2>
                  <PlusCircle size={20} style={{ color: '#10b981' }} />
                  <span>Publish New Project</span>
                </h2>
              </div>

              <form onSubmit={handleAddProject} className="modular-form">
                <div className="input-wrapper">
                  <label htmlFor="project-title">Project Title</label>
                  <input 
                    id="project-title"
                    type="text" 
                    placeholder="e.g. Omnisphere Cloud Suite" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="project-desc">Description (1-3 Key Highlights, one per line)</label>
                  <textarea 
                    id="project-desc"
                    placeholder="Built high-speed Next.js frontend&#10;Integrated Redis task queue with Node.js&#10;Deployed automated CI/CD pipeline" 
                    rows={4}
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="project-techs">Technologies (Comma-separated)</label>
                  <input 
                    id="project-techs"
                    type="text" 
                    placeholder="Next.js, TypeScript, Node.js, MongoDB, Redis" 
                    value={techs} 
                    onChange={(e) => setTechs(e.target.value)} 
                    required 
                  />
                  {techs && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.4rem' }}>
                      {techs.split(',').map((t, idx) => t.trim() && (
                        <span key={idx} className="meta-tag">{t.trim()}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="input-row">
                  <div className="input-wrapper">
                    <label htmlFor="project-live">Live Demo URL</label>
                    <input 
                      id="project-live"
                      type="text" 
                      placeholder="https://..." 
                      value={liveLink} 
                      onChange={(e) => setLiveLink(e.target.value)} 
                    />
                  </div>
                  <div className="input-wrapper">
                    <label htmlFor="project-github">GitHub Repository</label>
                    <input 
                      id="project-github"
                      type="text" 
                      placeholder="https://github.com/..." 
                      value={githubLink} 
                      onChange={(e) => setGithubLink(e.target.value)} 
                    />
                  </div>
                </div>

                <div className="input-wrapper">
                  <label>Project Cover Image</label>
                  <div className="file-input-styled" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <UploadCloud size={20} style={{ color: '#10b981' }} />
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageChange} 
                      style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }}
                    />
                  </div>
                  {imagePreview && (
                    <div style={{ marginTop: '0.75rem' }}>
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        style={{ width: '100%', maxHeight: '160px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--admin-border)' }} 
                      />
                    </div>
                  )}
                </div>

                <button type="submit" className="action-btn-filled" disabled={submittingProject}>
                  {submittingProject ? 'Publishing...' : 'Publish to Portfolio'}
                </button>
              </form>
            </section>

            {/* Profile & Theme Settings Form */}
            <section id="resume-mgmt" className="admin-card glass">
              <div className="card-header">
                <h2>
                  <Palette size={20} style={{ color: '#38bdf8' }} />
                  <span>Resume &amp; Theme Settings</span>
                </h2>
              </div>

              <form onSubmit={handleUpdateProfile} className="modular-form">
                <div className="input-wrapper">
                  <label>Update Resume Document (PDF)</label>
                  <div className="file-input-styled" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <FileText size={20} style={{ color: '#38bdf8' }} />
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx" 
                      onChange={(e) => e.target.files && setNewResumeFile(e.target.files[0])} 
                      style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }}
                    />
                  </div>
                  {resumeUrl && (
                    <p className="attribute-info">
                      <span>Current Active Resume:</span>
                      <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                        Preview File ({resumeUrl.split('/').pop()?.slice(0, 24) || 'Resume.pdf'})
                      </a>
                    </p>
                  )}
                </div>

                <div className="input-wrapper">
                  <label>Accent Brand Color</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <input 
                      type="color" 
                      value={newThemeColor} 
                      onChange={(e) => setNewThemeColor(e.target.value)}
                      style={{ width: '48px', height: '42px', padding: 0, cursor: 'pointer', border: '1px solid var(--admin-border)', borderRadius: '8px', background: 'transparent' }}
                    />
                    <input 
                      type="text" 
                      value={newThemeColor} 
                      onChange={(e) => setNewThemeColor(e.target.value)} 
                      style={{ flex: 1 }}
                      placeholder="#hexcode"
                    />
                  </div>
                  {themeColor && (
                    <p className="attribute-info">
                      <span>Stored Theme Accent:</span>
                      <span style={{ color: themeColor, fontWeight: 700, fontFamily: 'var(--font-fira-code)' }}>
                        {themeColor}
                      </span>
                    </p>
                  )}
                </div>

                <button type="submit" className="action-btn-outline" disabled={updatingProfileState}>
                  {updatingProfileState ? 'Updating...' : 'Save Settings'}
                </button>
              </form>
            </section>
          </div>

          {/* Right Column: Published Projects & Inquiries */}
          <div className="dashboard-lists">
            {/* Published Projects List */}
            <section className="admin-card glass scrollable">
              <div className="card-header">
                <h2>
                  <FolderGit2 size={20} style={{ color: '#10b981' }} />
                  <span>Published Projects</span>
                </h2>
                <span className="card-count-badge">{projects.length} Total</span>
              </div>

              <div className="entity-list">
                {projects.length === 0 ? (
                  <p className="empty-msg">No custom projects found. Publish your first project using the form.</p>
                ) : (
                  projects.map((p) => {
                    const projectId = p._id || p.id || '';
                    return (
                      <div key={projectId} className="entity-item glass">
                        <div className="entity-info">
                          <strong>{p.title}</strong>
                          <div className="entity-meta">
                            <span className="meta-tag">
                              {Array.isArray(p.description) ? `${p.description.length} Highlights` : '1 Item'}
                            </span>
                            <span className="meta-tag">
                              {p.techs?.length || 0} Techs
                            </span>
                            {p.links?.live && (
                              <a href={p.links.live} target="_blank" rel="noreferrer" className="meta-tag" style={{ color: '#10b981' }}>
                                Live ↗
                              </a>
                            )}
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Link href={`/admin/projects/${projectId}`} className="icon-btn-edit">
                            <Edit3 size={14} />
                            <span>Edit</span>
                          </Link>
                          <button 
                            onClick={() => handleDeleteProject(projectId)} 
                            className="icon-btn-danger"
                            title="Delete Project"
                            aria-label="Delete Project"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </section>

            {/* Enquiries & Messages Inbox */}
            <section id="enquiries" className="admin-card glass scrollable">
              <div className="card-header">
                <h2>
                  <MessageSquare size={20} style={{ color: '#38bdf8' }} />
                  <span>Client Enquiries</span>
                </h2>
                <span className="card-count-badge" style={{ color: '#38bdf8' }}>
                  {enquiries.length} Messages
                </span>
              </div>

              <div className="enquiry-stack">
                {enquiries.length === 0 ? (
                  <p className="empty-msg">No client enquiries received yet.</p>
                ) : (
                  enquiries.map((enq) => {
                    const enqId = enq._id || enq.id || Math.random();
                    const dateStr = enq.createdAt || enq.created_at ? new Date(enq.createdAt || enq.created_at || '').toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    }) : 'Recent';

                    return (
                      <div key={enqId} className="transmission-item glass">
                        <div className="trans-head">
                          <strong>{enq.name}</strong>
                          <time>{dateStr}</time>
                        </div>

                        <div className="trans-email-row">
                          <span className="trans-email">{enq.email}</span>
                          <button 
                            type="button" 
                            onClick={() => handleCopyEmail(enq.email)} 
                            className="trans-copy-btn"
                            title="Copy email address"
                            aria-label="Copy email address"
                          >
                            {copiedEmail === enq.email ? <Check size={14} style={{ color: '#10b981' }} /> : <Copy size={14} />}
                          </button>
                        </div>

                        <p className="trans-body">{enq.message}</p>
                      </div>
                    );
                  })
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
