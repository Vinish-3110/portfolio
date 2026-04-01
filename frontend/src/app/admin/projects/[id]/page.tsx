'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { fetchProject, updateProject, uploadFile } from '@/lib/api';
import '../../admin-theme.css';
import { ArrowLeft, Save } from 'lucide-react';
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
      .catch(err => setError('Failed to pull project attributes.'))
      .finally(() => setLoading(false));
  }, [unwrappedParams.id, router]);

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

      console.log('Update payload:', formData);
      const res = await updateProject(unwrappedParams.id, formData, token);
      console.log('Update response:', res);
      setSuccess('Entity updated successfully. Redirecting...');
      setProjectImage(null);
      setTimeout(() => router.push('/admin'), 1500);
    } catch (err) {
      console.error('Update failed:', err);
      setError('Failed to rewrite entity attributes.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="admin-loading-screen">
      <div className="loader"></div>
      <p>Fetching entity data...</p>
    </div>
  );

  return (
    <div className="admin-modular-shell">
      <main className="admin-main-content" style={{ margin: '0 auto', maxWidth: '800px', width: '100%' }}>
        <header className="admin-top-bar glass" style={{ marginBottom: '2rem' }}>
           <div className="top-title" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
             <button onClick={() => router.push('/admin')} className="icon-btn-edit" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '0.8rem', borderRadius: '50%', cursor: 'pointer' }}>
                <ArrowLeft size={20} />
             </button>
             <h1>Entity Inspector: <span style={{ color: 'var(--text-main)' }}>{title}</span></h1>
           </div>
        </header>

        <AnimatePresence>
          {error && <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} className="alert-box error">{error}</motion.div>}
          {success && <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} className="alert-box success">{success}</motion.div>}
        </AnimatePresence>

        <section className="admin-card glass">
          <div className="card-header">
            <h2>Rewrite configuration attributes</h2>
          </div>
          
          <form onSubmit={handleUpdate} className="modular-form">
            <div className="input-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
               <label style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>Entity Title</label>
               <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            
            <div className="input-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
               <label style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>Entity Description (Ctrl+Enter for new line | Array Format)</label>
               <textarea rows={5} value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>

            <div className="input-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
               <label style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>Tech Stack (Comma Separated)</label>
               <input type="text" value={techs} onChange={(e) => setTechs(e.target.value)} required />
            </div>

            <div className="input-row">
              <div className="input-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                 <label style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>Live Domain</label>
                 <input type="text" value={liveLink} onChange={(e) => setLiveLink(e.target.value)} />
              </div>
              <div className="input-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                 <label style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>Source Repository</label>
                 <input type="text" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} />
              </div>
            </div>
            
            <div className="input-row">
               <div className="input-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                 <label style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>Update Image File</label>
                 <input type="file" onChange={(e) => e.target.files && setProjectImage(e.target.files[0])} />
               </div>
               {currentImageUrl && (
                  <div className="input-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>Current Image</label>
                    <img 
                      src={currentImageUrl.startsWith('http') ? currentImageUrl : `${(process.env.NEXT_PUBLIC_API_URL || 'https://portfolio-d559.onrender.com/api').replace('/api', '')}${currentImageUrl}`} 
                      alt="Preview" 
                      style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }} 
                    />
                  </div>
               )}
            </div>

            <button type="button" disabled={saving} onClick={handleUpdate} className="action-btn-filled" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
               {saving ? 'Rewriting...' : 'Rewrite Configuration'} <Save size={18} />
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
