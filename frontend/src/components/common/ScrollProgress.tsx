'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        scaleX,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2.5px',
        backgroundColor: 'var(--accent-primary)',
        transformOrigin: '0%',
        zIndex: 10001,
        boxShadow: '0 0 10px var(--accent-primary)',
        pointerEvents: 'none',
        maxWidth: '100%',
      }}
    />
  );
}
