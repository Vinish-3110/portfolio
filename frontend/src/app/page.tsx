'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProjectsList from '@/components/ProjectsList';
import { useState, useEffect } from 'react';
import { submitEnquiry, fetchProfile } from '@/lib/api';
import { Send, Mail, Disc } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [resumeUrl, setResumeUrl] = useState('');

  useEffect(() => {
    const loadResume = async () => {
      try {
        const data = await fetchProfile();
        setResumeUrl(data.resume_url);
      } catch (err) {
        console.error('Failed to load resume');
      }
    };
    loadResume();
  }, []);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Encrypting and sending...' });
    try {
      await submitEnquiry(formData);
      setStatus({ type: 'success', message: 'Message successfully intercepted and stored!' });
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus({ type: '', message: '' }), 5000);
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message || 'Transmission failed.' });
    }
  };

  return (
    <div className="portfolio-app">
      <Header />
      
      <main>
        <Hero />
        
        {/* About section */}
        <section id="about" className="section container">
          <div className="section-header">
            <h2 className="section-title"><span className="section-hash">#</span>about-me</h2>
            <div className="section-line"></div>
          </div>
          <div className="about-grid">
            <motion.div 
              className="about-text glass"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="about-box">
                <p>Hello, i’m Vinish!</p>
                <br />
                <p>I’m a self-taught front-end developer based in India. I specialize in building high-performance, responsive web applications that combine modern aesthetics with flawless functionality.</p>
                <br />
                <p>Transforming complex requirements into intuitive, user-friendly digital experiences is what I do best. I’m always pushing boundaries and exploring the latest in tech to build the next generation of web products.</p>
                <br />
                <div className="about-btns">
                   <a href="#contacts" className="btn btn-primary">Read more ~~{'>'}</a>
                   {resumeUrl && (
                      <a href={resumeUrl} target="_blank" className="btn btn-filled">
                        CV.pdf
                      </a>
                   )}
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="about-visuals"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="profile-wrapper glass">
                <img src="/images/hero.png" alt="Vinish Illustration" className="profile-img" />
                <div className="profile-accent"></div>
              </div>
            </motion.div>
          </div>
        </section>

        <ProjectsList />

        {/* Contacts section */}
        <section id="contacts" className="section container">
           <div className="section-header">
            <h2 className="section-title"><span className="section-hash">#</span>contacts</h2>
            <div className="section-line"></div>
          </div>
          <div className="contacts-grid">
            <div className="contacts-info">
              <p className="contact-msg-top">
                I’m always open to discussing new projects, creative ideas or freelance opportunities to be part of your visions.
              </p>
              
              <div className="social-box glass">
                <h3>Message me here</h3>
                <div className="social-links">
                   <div className="social-item">
                     <Disc size={18} className="social-icon" />
                     <span>!Vinish</span>
                   </div>
                   <div className="social-item">
                     <Mail size={18} className="social-icon" />
                     <span>vinish@example.com</span>
                   </div>
                </div>
              </div>
            </div>

            <div className="contact-form-container glass">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <div className="input-wrapper">
                    <label>Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="input-wrapper">
                    <label>Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>
                <div className="input-wrapper">
                  <label>Message</label>
                  <textarea 
                    name="message" 
                    value={formData.message}
                    onChange={handleChange}
                    required 
                  ></textarea>
                </div>
                <button type="submit" disabled={status.type === 'loading'} className="btn btn-filled">
                  {status.type === 'loading' ? 'Sending...' : 'Send Message'} <Send size={16} />
                </button>
                
                <AnimatePresence>
                  {status.message && (
                    <motion.p 
                      className={`status-msg ${status.type}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      {status.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer-v2 glass">
        <div className="container footer-content">
          <div className="footer-top">
            <div className="footer-brand">
              <span className="logo">#Vinish</span>
              <p className="footer-tagline">Web developer and designer</p>
            </div>
            <div className="footer-socials">
              <h3>Media</h3>
              <div className="footer-icons">
                 {/* Icons */}
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="copyright">© {new Date().getFullYear()} Vinish. Built with Next.js & PostgreSQL.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
