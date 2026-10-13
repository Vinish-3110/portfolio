'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import ScrollProgress from '@/components/common/ScrollProgress';
import CustomCursor from '@/components/common/CustomCursor';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import { fetchProfile, Profile } from '@/lib/api';

// Dynamic import with ssr: false for WebGL Three.js canvas
const HyperspeedLoader = dynamic(
  () => import('@/components/common/HyperspeedLoader'),
  { ssr: false }
);

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    fetchProfile()
      .then((data) => setProfile(data))
      .catch((err) => {
        console.warn('Profile fetch offline; using defaults:', err);
      });
  }, []);

  const resumeUrl = profile?.resume_url || '';

  return (
    <div className="portfolio-app">
      {/* 3D Hyperspeed Intro WebGL Loader */}
      {isLoading && (
        <HyperspeedLoader onComplete={() => setIsLoading(false)} />
      )}

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Physics-Based Custom Cursor & Lens System */}
      <CustomCursor />

      {/* Floating Dynamic Navbar */}
      <Navbar displayName={profile?.display_name} availability={profile?.availability} />

      {/* Main Sections */}
      <main>
        <Hero content={{
          roleBadge: profile?.role_badge,
          headlineBefore: profile?.headline_before,
          headlineHighlight: profile?.headline_highlight,
          headlineAfter: profile?.headline_after,
          description: profile?.hero_description,
          engineerName: profile?.engineer_name,
          discipline: profile?.discipline,
          experienceLabel: profile?.experience_label,
          coreFocus: profile?.core_focus,
        }} />
        <About
          resumeUrl={resumeUrl}
          heading={profile?.about_heading}
          paragraphs={profile?.about_paragraphs}
          stats={profile?.stats}
        />
        <Skills />
        <Experience />
        <Projects />
        <Contact
          resumeUrl={resumeUrl}
          email={profile?.email}
          phone={profile?.phone}
          github={profile?.github}
          linkedin={profile?.linkedin}
        />
      </main>

      {/* Technical Footer */}
      <Footer displayName={profile?.display_name} />
    </div>
  );
}

