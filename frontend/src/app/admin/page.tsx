'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  fetchProjects, 
  createProject, 
  deleteProject, 
  fetchEnquiries, 
  fetchResume, 
  updateResume 
} from '@/lib/api';
import './admin-theme.css';
import { LayoutDashboard, PlusCircle, FileText, MessageSquare, LogOut, Trash2, RefreshCcw, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [resumeUrl, setResumeUrl] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Project form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [techs, setTechs] = useState('');
  const [liveLink, setLiveLink] = useState('');
  const [githubLink, setGithubLink] = useState('');
  
  // Resume form
  const [newResumeUrl, setNewResumeUrl] = useState('');
  
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
      const [projData, enqData, resData] = await Promise.all([
        fetchProjects(),
        fetchEnquiries(token),
        fetchResume()
      ]);
      setProjects(projData);
      setEnquiries(enqData);
      setResumeUrl(resData.resume_url || '');
      setNewResumeUrl(resData.resume_url || '');
    } catch (err) {
      setError('Connection to backend failed. Make sure the server is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
      const newProject = {
        title,
        description: description.split('\n').map(s => s.trim()).filter(Boolean),
        techs: techs.split(',').map(s => s.trim()).filter(Boolean),
        live_link: liveLink,
        github_link: githubLink,
        is_featured: false
      };

      await createProject(newProject, token);
      setSuccess('Operation successful: Project cluster updated.');
      setTitle('');
      setDescription('');
      setTechs('');
      setLiveLink('');
      setGithubLink('');
      loadData(token);
    } catch (err) {
      setError('Primary shard write failed.');
    }
  };

  const handleDeleteProject = async (id: number) => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;
    if (!confirm('Execute deletion protocol for this project?')) return;

    try {
      await deleteProject(id, token);
      setSuccess('Resource deallocated.');
      loadData(token);
    } catch (err) {
      setError('Deletion aborted by system.');
    }
  };

  const handleUpdateResume = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
      await updateResume(newResumeUrl, token);
      setSuccess('Resume pointer updated.');
      setResumeUrl(newResumeUrl);
    } catch (err) {
      setError('Pointer update failed.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  if (loading) return (
    <div className="admin-loading-screen">
      <div className="loader"></div>
      <p>Syncing with mainframes...</p>
    </div>
  );

  return (
    <div className="admin-modular-shell">
      <aside className="admin-sidebar glass">
        <div className="sidebar-brand">
           <LayoutDashboard className="brand-icon" />
           <span>CORE_SYS</span>
        </div>
        <nav className="sidebar-nav">
          <a href="#projects-mgmt" className="nav-item-link active"><PlusCircle size={18} /> Projects</a>
          <a href="#enquiries" className="nav-item-link"><MessageSquare size={18} /> Enquiries</a>
          <a href="#resume-mgmt" className="nav-item-link"><FileText size={18} /> Attributes</a>
        </nav>
        <button onClick={handleLogout} className="sidebar-logout">
          <LogOut size={18} /> Terminate Session
        </button>
      </aside>

      <main className="admin-main-content">
        <header className="admin-top-bar glass">
           <div className="top-title">
             <h1>Operational Dashboard</h1>
             <p>System Status: <span className="status-online">Operational</span></p>
           </div>
           <button onClick={() => loadData(localStorage.getItem('adminToken') || '')} className="refresh-btn-round glass">
              <RefreshCcw size={18} />
           </button>
        </header>

        <AnimatePresence>
          {error && <motion.div initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} className="alert-box error">{error}</motion.div>}
          {success && <motion.div initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} className="alert-box success">{success}</motion.div>}
        </AnimatePresence>

        <div className="dashboard-grid">
          {/* Form Side */}
          <div className="dashboard-forms">
            <section id="projects-mgmt" className="admin-card glass">
              <div className="card-header">
                <h2>Initialize Project Entity</h2>
              </div>
              <form onSubmit={handleAddProject} className="modular-form">
                <input type="text" placeholder="Entity Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea placeholder="Entity Description (Ctrl+Enter for new line | Array Format)" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <input type="text" placeholder="Tech Stack (Item1, Item2, Item3 | Array Format)" value={techs} onChange={(e) => setTechs(e.target.value)} required />
                <div className="input-row">
                  <input type="text" placeholder="Live Domain" value={liveLink} onChange={(e) => setLiveLink(e.target.value)} />
                  <input type="text" placeholder="Source Ctrl" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} />
                </div>
                <button type="submit" className="action-btn-filled">Commit to DB</button>
              </form>
            </section>

            <section id="resume-mgmt" className="admin-card glass">
               <div className="card-header">
                  <h2>Update Global Attributes</h2>
               </div>
               <form onSubmit={handleUpdateResume} className="modular-form">
                  <input type="text" placeholder="Resume Remote URL" value={newResumeUrl} onChange={(e) => setNewResumeUrl(e.target.value)} required />
                  <button type="submit" className="action-btn-outline">Patch Resume</button>
               </form>
               {resumeUrl && <p className="attribute-info">Active Ptr: <a href={resumeUrl} target="_blank" rel="noreferrer">Open</a></p>}
            </section>
          </div>

          {/* List Side */}
          <div className="dashboard-lists">
            <section className="admin-card glass scrollable">
              <div className="card-header">
                <h2>Active Entities</h2>
              </div>
              <div className="entity-list">
                {projects.map((p: any) => (
                  <div key={p.id} className="entity-item glass">
                    <div className="entity-info">
                       <strong>{p.title}</strong>
                       <div className="entity-meta">
                          <span className="meta-tag">{Array.isArray(p.description) ? p.description.length : 1} DESCR</span>
                          <span className="meta-tag">{p.techs?.length || 0} TECHS</span>
                       </div>
                    </div>
                    <button onClick={() => handleDeleteProject(p.id)} className="icon-btn-danger">
                       <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section id="enquiries" className="admin-card glass scrollable">
              <div className="card-header">
                <h2>Incoming Transmissions</h2>
              </div>
              <div className="enquiry-stack">
                {enquiries.length === 0 ? <p className="empty-msg">No messages detected.</p> : enquiries.map((enq: any) => (
                  <div key={enq.id} className="transmission-item glass">
                    <div className="trans-head">
                       <strong>{enq.name}</strong>
                       <time>{new Date(enq.created_at).toLocaleDateString()}</time>
                    </div>
                    <code className="trans-email">{enq.email}</code>
                    <p className="trans-body">{enq.message}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
