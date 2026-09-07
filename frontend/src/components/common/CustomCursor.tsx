'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

function subscribePointer(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const finePointer = window.matchMedia('(pointer: fine)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  finePointer.addEventListener('change', callback);
  reducedMotion.addEventListener('change', callback);
  return () => {
    finePointer.removeEventListener('change', callback);
    reducedMotion.removeEventListener('change', callback);
  };
}

function getPointerSnapshot() {
  if (typeof window === 'undefined') return true;
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return !hasFinePointer || prefersReducedMotion;
}

function getServerPointerSnapshot() {
  return true;
}

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorMode, setCursorMode] = useState<'default' | 'hover' | 'lens'>('default');
  const [lensText, setLensText] = useState('EXPLORE ↗');
  const isTouch = useSyncExternalStore(subscribePointer, getPointerSnapshot, getServerPointerSnapshot);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Fast, responsive spring physics for seamless tracking
  const springConfig = { damping: 28, stiffness: 450, mass: 0.3 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (isTouch) {
      document.body.classList.remove('has-custom-cursor');
      return;
    }

    if (isVisible) {
      document.body.classList.add('has-custom-cursor');
    } else {
      document.body.classList.remove('has-custom-cursor');
    }

    return () => {
      document.body.classList.remove('has-custom-cursor');
    };
  }, [isVisible, isTouch]);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      document.body.classList.remove('has-custom-cursor');
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleBlur = () => {
      setIsVisible(false);
      document.body.classList.remove('has-custom-cursor');
    };

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const inGithubCard = target.closest('.github-graph-card');
      if (inGithubCard) {
        setCursorMode('default');
        return;
      }

      const lensEl = target.closest('[data-cursor="lens"]');
      if (lensEl) {
        setCursorMode('lens');
        const customText = lensEl.getAttribute('data-lens-text');
        setLensText(customText || 'EXPLORE ↗');
        return;
      }

      const interactiveEl = target.closest('a, button, [role="button"], input, textarea, .interactive-hover');
      if (interactiveEl) {
        setCursorMode('hover');
        return;
      }

      setCursorMode('default');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleElementHover, { passive: true });
    window.addEventListener('blur', handleBlur);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleElementHover);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.classList.remove('has-custom-cursor');
    };
  }, [mouseX, mouseY, isTouch, isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Precision Center Dot */}
      <motion.div
        className="custom-cursor-dot"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: cursorMode === 'lens' ? 0.35 : 1,
        }}
      />

      {/* Physics-based Trailing Ring / Lens */}
      <motion.div
        className={`custom-cursor-ring ${
          cursorMode === 'lens'
            ? 'cursor-ring-lens'
            : cursorMode === 'hover'
            ? 'cursor-ring-hover'
            : 'cursor-ring-default'
        }`}
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {cursorMode === 'lens' && <span>{lensText}</span>}
      </motion.div>
    </>
  );
}
