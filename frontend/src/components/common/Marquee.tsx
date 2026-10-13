'use client';

import React from 'react';

interface MarqueeProps {
  items: string[];
  speedSeconds?: number;
  className?: string;
}

export default function Marquee({ items, speedSeconds = 30, className = '' }: MarqueeProps) {
  // Duplicate array for seamless infinite scroll
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className={`marquee-container ${className}`}>
      <div
        className="marquee-track"
        style={{ animationDuration: `${speedSeconds}s` }}
      >
        {duplicatedItems.map((item, idx) => (
          <div key={idx} className="marquee-item">
            <span>{item}</span>
            <span className="marquee-separator">/</span>
          </div>
        ))}
      </div>
    </div>
  );
}
