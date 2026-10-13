'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  deleteExperience,
  deleteSkill,
  ExperienceItem,
  fetchExperiences,
  fetchProfile,
  fetchSkills,
  Profile,
  saveExperience,
  saveSkill,
  SiteStat,
  SkillItem,
  updateProfile,
} from '@/lib/api';
import { experienceData } from '@/data/experienceData';
import { skillsList } from '@/data/skillsData';
import '../admin-theme.css';
import { ArrowLeft, Trash2 } from 'lucide-react';

const emptyExperience = {
  role: '',
  company: '',
  companyUrl: '',
  period: '',
  type: '',
  location: '',
  summary: '',
  achievements: '',
  technologies: '',
};

const emptySkill = {
  name: '',
  level: '',
  focus: '',
  category: 'frontend' as SkillItem['category'],
};

export default function SiteContentPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [paragraphs, setParagraphs] = useState('');
  const [stats, setStats] = useState<SiteStat[]>([]);
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [experienceForm, setExperienceForm] = useState(emptyExperience);
  const [skillForm, setSkillForm] = useState(emptySkill);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const token = () => localStorage.getItem('adminToken') || '';

  const load = async () => {
    const [profileData, experienceRows, skillRows] = await Promise.all([
      fetchProfile(),
      fetchExperiences().catch(() => []),
      fetchSkills().catch(() => []),
    ]);
    setProfile(profileData);
    setParagraphs((profileData.about_paragraphs || []).join('\n\n'));
    setStats(profileData.stats?.length ? profileData.stats : [
      { value: '', label: '', sub: '' },
      { value: '', label: '', sub: '' },
      { value: '', label: '', sub: '' },
      { value: '', label: '', sub: '' },
    ]);
    setExperiences(experienceRows);
    setSkills(skillRows);
  };

  useEffect(() => {
    if (!token()) {
      router.push('/admin/login');
      return;
    }
    load().catch(() => setError('Could not load site content.'));
  }, [router]);

  const setField = (field: keyof Profile, value: string) => {
    setProfile((current) => ({ ...(current || {}), [field]: value }));
  };

  const saveProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!profile) return;
    setSaving(true);
    setError('');
    setMessage('');
    try {
      const updated = await updateProfile({
        ...profile,
        about_paragraphs: paragraphs.split(/\n\s*\n/).map((item) => item.trim()).filter(Boolean),
        stats: stats.filter((item) => item.value || item.label),
      }, token());
      setProfile(updated);
      setMessage('Site profile saved.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save profile.');
    } finally {
      setSaving(false);
    }
  };

  const addExperience = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    try {
      await saveExperience({
        ...experienceForm,
        achievements: experienceForm.achievements.split('\n').map((item) => item.trim()).filter(Boolean),
        technologies: experienceForm.technologies.split(',').map((item) => item.trim()).filter(Boolean),
      }, token());
      setExperienceForm(emptyExperience);
      setExperiences(await fetchExperiences());
      setMessage('Experience saved. The public site will use this list.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save experience.');
    }
  };

  const importExperience = async () => {
    setError('');
    try {
      for (const [index, item] of experienceData.entries()) {
        await saveExperience({ ...item, sortOrder: index }, token());
      }
      setExperiences(await fetchExperiences());
      setMessage('Current experience copied into the database.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not import experience.');
    }
  };

  const addSkill = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    try {
      await saveSkill(skillForm, token());
      setSkillForm(emptySkill);
      setSkills(await fetchSkills());
      setMessage('Skill saved.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save skill.');
    }
  };

  const importSkills = async () => {
    setError('');
    try {
      for (const [index, item] of skillsList.entries()) {
        await saveSkill({ ...item, sortOrder: index }, token());
      }
      setSkills(await fetchSkills());
      setMessage('Current skills copied into the database.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not import skills.');
    }
  };

  if (!profile) {
    return <div className="admin-loading-screen"><div className="admin-spinner" /><p>Loading site content...</p></div>;
  }

  return (
    <div className="admin-modular-shell">
      <main className="admin-main-content" style={{ margin: '0 auto', maxWidth: '980px', width: '100%' }}>
        <header className="admin-top-bar glass" style={{ marginBottom: '1.5rem' }}>
          <div className="top-title" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/admin" className="sidebar-back-link"><ArrowLeft size={16} /> Dashboard</Link>
            <h1>Site content</h1>
          </div>
        </header>

        {error && <div className="alert-box error">{error}</div>}
        {message && <div className="alert-box success">{message}</div>}

        <section className="admin-card glass">
          <div className="card-header"><h2>Profile, hero, and contact</h2></div>
          <form onSubmit={saveProfile} className="modular-form">
            <input value={profile.display_name || ''} onChange={(e) => setField('display_name', e.target.value)} placeholder="Display name" />
            <input value={profile.availability || ''} onChange={(e) => setField('availability', e.target.value)} placeholder="Availability badge" />
            <input value={profile.role_badge || ''} onChange={(e) => setField('role_badge', e.target.value)} placeholder="Hero badge" />
            <div className="input-row">
              <input value={profile.headline_before || ''} onChange={(e) => setField('headline_before', e.target.value)} placeholder="Headline start" />
              <input value={profile.headline_highlight || ''} onChange={(e) => setField('headline_highlight', e.target.value)} placeholder="Highlighted words" />
            </div>
            <input value={profile.headline_after || ''} onChange={(e) => setField('headline_after', e.target.value)} placeholder="Headline end" />
            <textarea value={profile.hero_description || ''} onChange={(e) => setField('hero_description', e.target.value)} placeholder="Hero description" />
            <input value={profile.about_heading || ''} onChange={(e) => setField('about_heading', e.target.value)} placeholder="About heading" />
            <textarea rows={6} value={paragraphs} onChange={(e) => setParagraphs(e.target.value)} placeholder="About paragraphs, separated by a blank line" />
            {stats.map((stat, index) => (
              <div className="input-row" key={index}>
                <input value={stat.value} placeholder="Stat" onChange={(e) => setStats(stats.map((item, i) => i === index ? { ...item, value: e.target.value } : item))} />
                <input value={stat.label} placeholder="Label" onChange={(e) => setStats(stats.map((item, i) => i === index ? { ...item, label: e.target.value } : item))} />
                <input value={stat.sub} placeholder="Detail" onChange={(e) => setStats(stats.map((item, i) => i === index ? { ...item, sub: e.target.value } : item))} />
              </div>
            ))}
            <div className="input-row">
              <input value={profile.email || ''} onChange={(e) => setField('email', e.target.value)} placeholder="Email" />
              <input value={profile.phone || ''} onChange={(e) => setField('phone', e.target.value)} placeholder="Phone" />
            </div>
            <div className="input-row">
              <input value={profile.linkedin || ''} onChange={(e) => setField('linkedin', e.target.value)} placeholder="LinkedIn URL" />
              <input value={profile.github || ''} onChange={(e) => setField('github', e.target.value)} placeholder="GitHub URL" />
            </div>
            <div className="input-row">
              <input value={profile.engineer_name || ''} onChange={(e) => setField('engineer_name', e.target.value)} placeholder="Card name" />
              <input value={profile.discipline || ''} onChange={(e) => setField('discipline', e.target.value)} placeholder="Discipline" />
            </div>
            <div className="input-row">
              <input value={profile.experience_label || ''} onChange={(e) => setField('experience_label', e.target.value)} placeholder="Experience label" />
              <input value={profile.core_focus || ''} onChange={(e) => setField('core_focus', e.target.value)} placeholder="Core focus" />
            </div>
            <button className="action-btn-filled" disabled={saving} type="submit">{saving ? 'Saving...' : 'Save site profile'}</button>
          </form>
        </section>

        <section className="admin-card glass" style={{ marginTop: '1.5rem' }}>
          <div className="card-header"><h2>Experience</h2></div>
          {experiences.length === 0 && (
            <button type="button" className="action-btn-outline" onClick={importExperience}>Copy the experience already on the site</button>
          )}
          <div className="entity-list" style={{ margin: '1rem 0' }}>
            {experiences.map((item) => (
              <div key={item._id} className="entity-item glass">
                <strong>{item.role} @ {item.company}</strong>
                <button type="button" className="icon-btn-danger" onClick={async () => {
                  if (!item._id || !confirm('Delete this role?')) return;
                  await deleteExperience(item._id, token());
                  setExperiences(await fetchExperiences());
                }}><Trash2 size={16} /></button>
              </div>
            ))}
          </div>
          <form onSubmit={addExperience} className="modular-form">
            <div className="input-row">
              <input required placeholder="Role" value={experienceForm.role} onChange={(e) => setExperienceForm({ ...experienceForm, role: e.target.value })} />
              <input required placeholder="Company" value={experienceForm.company} onChange={(e) => setExperienceForm({ ...experienceForm, company: e.target.value })} />
            </div>
            <div className="input-row">
              <input placeholder="Company URL" value={experienceForm.companyUrl} onChange={(e) => setExperienceForm({ ...experienceForm, companyUrl: e.target.value })} />
              <input placeholder="Period" value={experienceForm.period} onChange={(e) => setExperienceForm({ ...experienceForm, period: e.target.value })} />
            </div>
            <div className="input-row">
              <input placeholder="Location" value={experienceForm.location} onChange={(e) => setExperienceForm({ ...experienceForm, location: e.target.value })} />
              <input placeholder="Type" value={experienceForm.type} onChange={(e) => setExperienceForm({ ...experienceForm, type: e.target.value })} />
            </div>
            <textarea placeholder="Summary" value={experienceForm.summary} onChange={(e) => setExperienceForm({ ...experienceForm, summary: e.target.value })} />
            <textarea placeholder="Achievements, one per line" value={experienceForm.achievements} onChange={(e) => setExperienceForm({ ...experienceForm, achievements: e.target.value })} />
            <input placeholder="Technologies, comma separated" value={experienceForm.technologies} onChange={(e) => setExperienceForm({ ...experienceForm, technologies: e.target.value })} />
            <button className="action-btn-filled" type="submit">Add experience</button>
          </form>
        </section>

        <section className="admin-card glass" style={{ marginTop: '1.5rem' }}>
          <div className="card-header"><h2>Skills</h2></div>
          {skills.length === 0 && (
            <button type="button" className="action-btn-outline" onClick={importSkills}>Copy the skills already on the site</button>
          )}
          <div className="entity-list" style={{ margin: '1rem 0' }}>
            {skills.map((item) => (
              <div key={item._id} className="entity-item glass">
                <strong>{item.name}</strong>
                <button type="button" className="icon-btn-danger" onClick={async () => {
                  if (!item._id || !confirm('Delete this skill?')) return;
                  await deleteSkill(item._id, token());
                  setSkills(await fetchSkills());
                }}><Trash2 size={16} /></button>
              </div>
            ))}
          </div>
          <form onSubmit={addSkill} className="modular-form">
            <div className="input-row">
              <input required placeholder="Skill name" value={skillForm.name} onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })} />
              <input placeholder="Level" value={skillForm.level} onChange={(e) => setSkillForm({ ...skillForm, level: e.target.value })} />
            </div>
            <input placeholder="Focus" value={skillForm.focus} onChange={(e) => setSkillForm({ ...skillForm, focus: e.target.value })} />
            <select value={skillForm.category} onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value as SkillItem['category'] })}>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="database">Database</option>
              <option value="devops">DevOps</option>
            </select>
            <button className="action-btn-filled" type="submit">Add skill</button>
          </form>
        </section>
      </main>
    </div>
  );
}
