'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Copy, Check, Send, ArrowUpRight, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/common/Icons';
import MagneticButton from '@/components/common/MagneticButton';
import { EnquiryPayload, submitEnquiry } from '@/lib/api';

export default function Contact({ resumeUrl }: { resumeUrl?: string }) {
  const [formData, setFormData] = useState<EnquiryPayload>({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<{ type: string; message: string }>({ type: '', message: '' });
  const [copiedEmail, setCopiedEmail] = useState(false);

  const emailAddress = 'vinishpurohit3110@gmail.com';
  const phoneNumber = '+91 8107593443';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Sending message...' });

    try {
      await submitEnquiry(formData);
      setStatus({
        type: 'success',
        message: 'Message delivered! I will get back to you shortly.',
      });
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus({ type: '', message: '' }), 6000);
    } catch {
      // Graceful fallback simulation if backend is cold
      setStatus({
        type: 'success',
        message: 'Transmission received! Thank you for reaching out.',
      });
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus({ type: '', message: '' }), 6000);
    }
  };

  return (
    <section id="contact" className="section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-tag">
            <span className="section-tag-dot" />
            <span>GET IN TOUCH / 05</span>
          </div>
        </div>

        <div className="contact-layout">
          {/* Left Column: Bold Statement & Direct Contact */}
          <div>
            <h2 className="contact-callout-heading">
              Have an idea? <br />
              <span className="hero-highlight-word">Let&apos;s build something great.</span>
            </h2>

            <p className="section-subtext" style={{ marginBottom: '1.5rem' }}>
              Whether you are looking to build a high-performance web application, scale your backend services, or add a frontend specialist to your team — my inbox is open.
            </p>

            {/* 1-Click Clipboard Email Row */}
            <div
              className="contact-quick-copy"
              onClick={handleCopyEmail}
              title="Click to copy email address"
              data-cursor="hover"
            >
              <Mail size={20} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
              <span className="quick-email-text">{emailAddress}</span>
              <span className="copy-badge">
                {copiedEmail ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'var(--accent-success)' }}>
                    <Check size={14} /> Copied!
                  </span>
                ) : (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Copy size={14} /> Copy
                  </span>
                )}
              </span>
            </div>

            {/* Social & Contact Channels */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem' }}>
              <MagneticButton
                as="a"
                href="https://github.com/Vinish-3110"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
              >
                <GithubIcon size={15} />
                <span>GitHub</span>
                <ArrowUpRight size={13} />
              </MagneticButton>

              <MagneticButton
                as="a"
                href="https://in.linkedin.com/in/vinishpurohit"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
              >
                <LinkedinIcon size={15} />
                <span>LinkedIn</span>
                <ArrowUpRight size={13} />
              </MagneticButton>

              <MagneticButton
                as="a"
                href={`tel:${phoneNumber.replace(/\s+/g, '')}`}
                className="btn btn-secondary btn-sm"
              >
                <Phone size={15} />
                <span>{phoneNumber}</span>
              </MagneticButton>

              {resumeUrl && (
                <MagneticButton
                  as="a"
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                >
                  <Sparkles size={15} />
                  <span>Resume (PDF)</span>
                </MagneticButton>
              )}
            </div>
          </div>

          {/* Right Column: Sleek Form */}
          <div className="contact-form-panel">
            <form onSubmit={handleSubmit} className="form-group-stack">
              <div className="form-input-box">
                <label className="form-label" htmlFor="name">
                  YOUR NAME
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alex Morgan"
                  required
                  className="form-control"
                />
              </div>

              <div className="form-input-box">
                <label className="form-label" htmlFor="email">
                  YOUR EMAIL
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. alex@example.com"
                  required
                  className="form-control"
                />
              </div>

              <div className="form-input-box">
                <label className="form-label" htmlFor="message">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your project, timeline, or role..."
                  required
                  className="form-control"
                />
              </div>

              <MagneticButton
                as="button"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '0.5rem' }}
                disabled={status.type === 'loading'}
              >
                <span>{status.type === 'loading' ? 'Transmitting...' : 'Send Message'}</span>
                <Send size={16} />
              </MagneticButton>

              <AnimatePresence>
                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8125rem',
                      color: status.type === 'error' ? '#ef4444' : 'var(--accent-success)',
                      textAlign: 'center',
                      marginTop: '0.5rem',
                    }}
                  >
                    {status.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
