'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  as?: 'button' | 'a' | 'div';
  href?: string;
  target?: string;
  rel?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  'aria-label'?: string;
  'data-cursor'?: string;
  'data-lens-text'?: string;
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.35,
  onClick,
  as = 'div',
  href,
  target,
  rel,
  style,
  disabled,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    setPosition({
      x: distanceX * strength,
      y: distanceY * strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const Component = as === 'a' ? motion.a : as === 'button' ? motion.button : motion.div;

  return (
    <Component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.2 }}
      className={`magnetic-wrap ${className}`}
      onClick={onClick}
      href={href}
      target={target}
      rel={rel}
      style={style}
      disabled={disabled}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(rest as any)}
    >
      {children}
    </Component>
  );
}
