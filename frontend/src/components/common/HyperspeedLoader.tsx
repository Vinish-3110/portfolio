'use client';

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Hyperspeed, { HyperspeedOptions } from './Hyperspeed';
import styles from './HyperspeedLoader.module.css';
import { useSiteSettings } from '@/components/SiteSettings';

interface HyperspeedLoaderProps {
  onComplete: () => void;
  minDurationMs?: number;
}

export const HyperspeedLoader: React.FC<HyperspeedLoaderProps> = ({
  onComplete,
  minDurationMs = 2800
}) => {
  const settings = useSiteSettings();
  const loader = settings?.loader;
  const copy = settings?.copy;
  const statusMessages = (loader?.statuses?.length ? loader.statuses : ['']).map((text, index, list) => ({
    threshold: Math.round((index / Math.max(list.length, 1)) * 96),
    text,
  }));
  const [progress, setProgress] = useState(0);
  const [isAccelerating, setIsAccelerating] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const completedRef = useRef(false);

  // Memoized custom options matching Vinish's cyber-obsidian design system
  const effectOptions: Partial<HyperspeedOptions> = useMemo(
    () => ({
      distortion: 'turbulentDistortion',
      length: 450,
      roadWidth: 10,
      islandWidth: 2,
      lanesPerRoad: 3,
      fov: 90,
      fovSpeedUp: 145,
      speedUp: 3.2,
      carLightsFade: 0.35,
      totalSideLightSticks: 26,
      lightPairsPerRoadWay: 45,
      shoulderLinesWidthPercentage: 0.05,
      brokenLinesWidthPercentage: 0.1,
      brokenLinesLengthPercentage: 0.5,
      lightStickWidth: [0.12, 0.45],
      lightStickHeight: [1.3, 1.8],
      movingAwaySpeed: [70, 95],
      movingCloserSpeed: [-130, -175],
      carLightsLength: [400 * 0.04, 400 * 0.22],
      carLightsRadius: [0.06, 0.15],
      carWidthPercentage: [0.3, 0.5],
      carShiftX: [-0.8, 0.8],
      carFloorSeparation: [0, 4.5],
      colors: {
        roadColor: loader?.road || '#06070a',
        islandColor: loader?.island || '#0a0c12',
        background: loader?.background || '#000000',
        shoulderLines: loader?.shoulder || '#6366f1',
        brokenLines: loader?.brokenLines || '#38bdf8',
        leftCars: loader?.leftCars || ['#d856bf', '#818cf8', '#c084fc'],
        rightCars: loader?.rightCars || ['#06b6d4', '#0ea5e9', '#38bdf8'],
        sticks: loader?.sticks || '#06b6d4',
      }
    }),
    [loader]
  );

  const triggerExit = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setProgress(100);
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 750);
  }, [onComplete]);

  // Keyboard shortcut: Escape or Space to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.code === 'Space') {
        e.preventDefault();
        triggerExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerExit]);

  // Smooth progress incrementation with acceleration boost
  useEffect(() => {
    let animId: number;
    if (startTimeRef.current === null) {
      startTimeRef.current = Date.now();
    }
    const startTime = startTimeRef.current;

    const tickProgress = () => {
      const elapsed = Date.now() - startTime;
      const boostMultiplier = isAccelerating ? 2.8 : 1.0;
      const computedProgress = Math.min(99, (elapsed / minDurationMs) * 100 * boostMultiplier);

      setProgress(prev => {
        const nextVal = Math.max(prev, Math.round(computedProgress));
        if (nextVal >= 99 && !completedRef.current) {
          triggerExit();
          return 100;
        }
        return nextVal;
      });

      if (!completedRef.current) {
        animId = requestAnimationFrame(tickProgress);
      }
    };

    animId = requestAnimationFrame(tickProgress);
    return () => cancelAnimationFrame(animId);
  }, [isAccelerating, minDurationMs, triggerExit]);

  // Active status log message
  const currentStatus = useMemo(() => {
    for (let i = statusMessages.length - 1; i >= 0; i--) {
      if (progress >= statusMessages[i].threshold) {
        return statusMessages[i].text;
      }
    }
    return statusMessages[0]?.text || '';
  }, [progress, statusMessages]);

  // Real-time warp speed calculation
  const warpSpeed = useMemo(() => {
    const base = 1.0 + (progress / 100) * 8.8;
    const finalVal = isAccelerating ? base * 1.5 : base;
    return finalVal.toFixed(1);
  }, [progress, isAccelerating]);

  return (
    <div
      className={`${styles.loaderWrapper} ${isExiting ? styles.exiting : ''}`}
      style={{
        ['--loader-bg' as string]: loader?.background,
        ['--loader-accent' as string]: loader?.hudAccent,
        ['--loader-secondary' as string]: loader?.hudSecondary,
        ['--loader-highlight' as string]: loader?.hudHighlight,
        ['--loader-title' as string]: loader?.title,
        ['--loader-title-mid' as string]: loader?.titleMid,
      }}
      onMouseDown={() => setIsAccelerating(true)}
      onMouseUp={() => setIsAccelerating(false)}
      onTouchStart={() => setIsAccelerating(true)}
      onTouchEnd={() => setIsAccelerating(false)}
    >
      {/* 3D WebGL Hyperspeed Background Canvas */}
      <div className={styles.canvasContainer}>
        <Hyperspeed
          effectOptions={effectOptions}
          onAccelerate={setIsAccelerating}
        />
      </div>

      {/* Atmospheric Overlays */}
      <div className={styles.vignetteOverlay} />
      <div className={styles.gridOverlay} />

      {/* Top Telemetry Header */}
      {/* <header className={styles.topBar}>
        <div className={styles.brandPill}>
          <span className={styles.statusDot} />
          <span>HYPERDRIVE ACTIVE // VINISH.DEV</span>
        </div>

        <button
          type="button"
          className={styles.skipButton}
          onClick={e => {
            e.stopPropagation();
            triggerExit();
          }}
          aria-label="Skip introduction animation"
        >
          <span>Enter Workspace</span>
          <span className={styles.skipKey}>ESC</span>
        </button>
      </header> */}

      {/* Central Glassmorphism Telemetry HUD */}
      <div className={styles.hudCard}>
        <div className={styles.hudHeaderBadge}>
          <span>{copy?.loaderBadge}</span>
        </div>

        <h1 className={styles.mainTitle}>
          {copy?.loaderTitle}
        </h1>

        <div className={styles.statusLog}>
          <span>{currentStatus}</span>
          <span className={styles.statusCursor} />
        </div>

        {/* Progress Bar & Telemetry Metrics */}
        <div className={styles.progressSection}>
          <div className={styles.progressBarTrack}>
            <div
              className={styles.progressBarFill}
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className={styles.telemetryRow}>
            <span className={styles.speedMetric}>
              {copy?.loaderWarp}: {warpSpeed}c
            </span>
            <span className={styles.percentageMetric}>{progress}%</span>
          </div>
        </div>
      </div>

      {/* Interactive Bottom Acceleration Prompt */}
      <div
        className={`${styles.interactiveHint} ${
          isAccelerating ? styles.accelerating : ''
        }`}
      >
        <span>
          {isAccelerating ? copy?.loaderAccelerate : copy?.loaderHold}
        </span>
      </div>
    </div>
  );
};

export default HyperspeedLoader;
