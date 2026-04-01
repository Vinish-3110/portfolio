'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Terminal } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="hero-section container">
      <div className="hero-content">
        <motion.div 
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="status-badge glass">
             <Terminal size={14} className="terminal-icon" />
             <span>Available for projects</span>
          </div>
          <h1 className="hero-title">
            I craft digital <br />
            <span className="hero-highlight">experiences</span> that <br />
            matter to people.
          </h1>
          <p className="hero-subtitle">
            A developer based in India, building functional, beautiful, and accessible web experiences from scratch.
          </p>
          <div className="hero-actions">
            <a href="#contacts" className="btn btn-filled">
               Get in touch!!
            </a>
            <a href="#projects" className="btn btn-primary">
               View works <ExternalLink size={16} />
            </a>
          </div>
        </motion.div>

        <motion.div 
          className="hero-illustration"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="illustration-wrapper glass">
              <Image 
                 src="/images/hero.png" 
                 alt="Vinish Portrait" 
                 width={460} 
                 height={460} 
                 className="hero-image"
                 priority
               />
               <div className="current-status glass">
                 <div className="status-indicator ripple"></div>
                 Currently building <span className="highlight-text">Portfolio 2.0</span>
               </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
};

export default Hero;
