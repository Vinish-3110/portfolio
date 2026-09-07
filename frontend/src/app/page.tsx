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
import { fetchProfile } from '@/lib/api';

// Dynamic import with ssr: false for WebGL Three.js canvas
const HyperspeedLoader = dynamic(
  () => import('@/components/common/HyperspeedLoader'),
  { ssr: false }
);

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [resumeUrl, setResumeUrl] = useState<string>('');

  useEffect(() => {
    fetchProfile()
      .then((data) => {
        if (data.resume_url) {
          setResumeUrl(data.resume_url);
        }
      })
      .catch((err) => {
        console.warn('Profile fetch offline; using defaults:', err);
      });
  }, []);

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
      <Navbar />

      {/* Main Sections */}
      <main>
        <Hero />
        <About resumeUrl={resumeUrl} />
        <Skills />
        <Experience />
        <Projects />
        <Contact resumeUrl={resumeUrl} />
      </main>

      {/* Technical Footer */}
      <Footer />
    </div>
  );
}

