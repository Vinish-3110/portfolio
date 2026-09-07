'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchProject, updateProject } from '@/lib/api';
import '../../admin-theme.css';
import { ArrowLeft, Save, UploadCloud, FolderGit2, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Project form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [techs, setTechs] = useState('');
  const [liveLink, setLiveLink] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [projectImage, setProjectImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    
    fetchProject(unwrappedParams.id)
      .then(project => {
        setTitle(project.title || '');
        setDescription(Array.isArray(project.description) ? project.description.join('\n') : project.description || '');
        setTechs(Array.isArray(project.techs) ? project.techs.join(', ') : project.techs || '');
        setLiveLink(project.links?.live || '');
        setGithubLink(project.links?.github || '');
        setCurrentImageUrl(project.image || '');
        setIsFeatured(project.isFeatured || false);
      })
      .catch(() => setError('Failed to retrieve project details.'))
      .finally(() => setLoading(false));
  }, [unwrappedParams.id, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProjectImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
      setSaving(true);
      setError('');
      setSuccess('');
      
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', JSON.stringify(description.split('\n').map(s => s.trim()).filter(Boolean)));
      formData.append('techs', JSON.stringify(techs.split(',').map(s => s.trim()).filter(Boolean)));
      formData.append('live_link', liveLink);
      formData.append('github_link', githubLink);
      formData.append('is_featured', String(isFeatured));
      
      if (projectImage) {
        formData.append('image', projectImage);
      }

      await updateProject(unwrappedParams.id, formData, token);
      setSuccess('Project updated successfully! Redirecting to dashboard...');
      setTimeout(() => router.push('/admin'), 1200);
    } catch {
      setError('Failed to update project. Please verify inputs.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-loading-screen">
        <div className="admin-spinner" />
        <p>Loading project editor...</p>
      </div>
    );
  }

  const effectiveImage = imagePreview || (currentImageUrl ? (
    currentImageUrl.startsWith('http') 
      ? currentImageUrl 
      : `${(process.env.NEXT_PUBLIC_API_URL || 'https://portfolio-d559.onrender.com/api').replace('/api', '')}${currentImageUrl}`
  ) : null);

  return (
    <div className="admin-modular-shell" style={{ justifyContent: 'center' }}>
      <main className="admin-main-content" style={{ margin: '0 auto', maxWidth: '840px', width: '100%', padding: '2.5rem 1.5rem' }}>
        {/* Header with Breadcrumb */}
        <header className="admin-top-bar glass" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link 
              href="/admin" 
              className="refresh-btn-round"
              title="Return to Dashboard"
              aria-label="Return to Dashboard"
            >
              <ArrowLeft size={18} />
            </Link>
            <div className="top-title">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: '#9ca3af' }}>
                <Link href="/admin" style={{ color: '#9ca3af', textDecoration: 'none' }}>Admin</Link>
                <span>/</span>
                <span>Projects</span>
                <span>/</span>
                <span style={{ color: '#10b981' }}>Edit</span>
              </div>
              <h1 style={{ fontSize: '1.375rem' }}>{title || 'Edit Project'}</h1>
            </div>
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

        {/* Edit Form Card */}
        <section className="admin-card glass">
          <div className="card-header">
            <h2>
              <FolderGit2 size={20} style={{ color: '#10b981' }} />
              <span>Project Configuration</span>
            </h2>
          </div>
          
          <form onSubmit={handleUpdate} className="modular-form">
            <div className="input-wrapper">
              <label htmlFor="edit-title">Project Title</label>
              <input 
                id="edit-title"
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
              />
            </div>
            
            <div className="input-wrapper">
              <label htmlFor="edit-desc">Project Highlights (One per line)</label>
              <textarea 
                id="edit-desc"
                rows={5} 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                required 
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="edit-techs">Technologies (Comma-separated)</label>
              <input 
                id="edit-techs"
                type="text" 
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
                <label htmlFor="edit-live">Live Demo URL</label>
                <input 
                  id="edit-live"
                  type="text" 
                  value={liveLink} 
                  onChange={(e) => setLiveLink(e.target.value)} 
                  placeholder="https://..."
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="edit-github">GitHub Repository</label>
                <input 
                  id="edit-github"
                  type="text" 
                  value={githubLink} 
                  onChange={(e) => setGithubLink(e.target.value)} 
                  placeholder="https://github.com/..."
                />
              </div>
            </div>
            
            <div className="input-wrapper">
              <label>Cover Image</label>
              <div className="file-input-styled" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <UploadCloud size={20} style={{ color: '#10b981' }} />
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange} 
                  style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }}
                />
              </div>
              {effectiveImage && (
                <div style={{ marginTop: '0.75rem' }}>
                  <img 
                    src={effectiveImage} 
                    alt="Cover Preview" 
                    style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--admin-border)' }} 
                  />
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button 
                type="submit" 
                disabled={saving} 
                className="action-btn-filled" 
                style={{ flex: 1 }}
              >
                {saving ? (
                  <>
                    <Loader2 size={18} className="admin-spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
                    <span>Saving Changes...</span>
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    <span>Save Changes</span>
                  </>
                )}
              </button>

              <Link 
                href="/admin" 
                className="action-btn-outline"
                style={{ textDecoration: 'none' }}
              >
                Cancel
              </Link>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
