'use client';

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Hyperspeed, { HyperspeedOptions } from './Hyperspeed';
import styles from './HyperspeedLoader.module.css';

interface HyperspeedLoaderProps {
  onComplete: () => void;
  minDurationMs?: number;
}

const STATUS_MESSAGES = [
  { threshold: 0, text: 'INITIALIZING TELEMETRY & SYSTEM CORES...' },
  { threshold: 25, text: 'SYNTHESIZING 2+ YEARS PRODUCTION EXPERIENCE...' },
  { threshold: 52, text: 'COMPILING FULL-STACK APPS & ARCHITECTURE...' },
  { threshold: 78, text: 'APPROACHING TARGET: VINISH PUROHIT...' },
  { threshold: 96, text: 'WARP COMPLETE. ENTERING WORKSPACE...' }
];

export const HyperspeedLoader: React.FC<HyperspeedLoaderProps> = ({
  onComplete,
  minDurationMs = 2800
}) => {
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
        roadColor: 0x06070a,
        islandColor: 0x0a0c12,
        background: 0x000000,
        shoulderLines: 0x6366f1,
        brokenLines: 0x38bdf8,
        leftCars: [0xd856bf, 0x818cf8, 0xc084fc],
        rightCars: [0x06b6d4, 0x0ea5e9, 0x38bdf8],
        sticks: 0x06b6d4
      }
    }),
    []
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
    for (let i = STATUS_MESSAGES.length - 1; i >= 0; i--) {
      if (progress >= STATUS_MESSAGES[i].threshold) {
        return STATUS_MESSAGES[i].text;
      }
    }
    return STATUS_MESSAGES[0].text;
  }, [progress]);

  // Real-time warp speed calculation
  const warpSpeed = useMemo(() => {
    const base = 1.0 + (progress / 100) * 8.8;
    const finalVal = isAccelerating ? base * 1.5 : base;
    return finalVal.toFixed(1);
  }, [progress, isAccelerating]);

  return (
    <div
      className={`${styles.loaderWrapper} ${isExiting ? styles.exiting : ''}`}
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
          <span>SYS.TELEMETRY: CONNECTED</span>
        </div>

        <h1 className={styles.mainTitle}>
          Taking you to Vinish&apos;s work life
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
              WARP VELOCITY: {warpSpeed}c
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
          {isAccelerating ? 'HYPER-ACCELERATING...' : 'HOLD CLICK OR TOUCH TO ACCELERATE'}
        </span>
      </div>
    </div>
  );
};

export default HyperspeedLoader;
