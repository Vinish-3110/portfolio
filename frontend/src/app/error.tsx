'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log runtime exception for monitoring and debugging
    console.error('Unhandled Application Error caught by Error Boundary:', error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-base, #08090d)',
        color: 'var(--text-primary, #f3f4f6)',
        padding: '2rem',
        fontFamily: 'var(--font-outfit, sans-serif)',
      }}
    >
      <div
        style={{
          maxWidth: '560px',
          width: '100%',
          backgroundColor: 'var(--bg-surface, #0f1117)',
          border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
          borderRadius: '16px',
          padding: '2.5rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
          textAlign: 'center',
        }}
      >
        {/* Warning Icon Badge */}
        <div
          style={{
            width: '56px',
            height: '56px',
            margin: '0 auto 1.5rem',
            borderRadius: '12px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ef4444',
          }}
        >
          <AlertTriangle size={28} />
        </div>

        {/* Section Label */}
        <span
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.75rem',
            color: '#ef4444',
            letterSpacing: '0.1em',
            marginBottom: '0.75rem',
          }}
        >
          SYSTEM EXCEPTION // 500
        </span>

        <h1
          style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            marginBottom: '1rem',
            color: 'var(--text-primary, #f3f4f6)',
          }}
        >
          Something interrupted the view.
        </h1>

        <p
          style={{
            color: 'var(--text-secondary, #9ca3af)',
            fontSize: '0.9375rem',
            lineHeight: 1.6,
            marginBottom: '1.75rem',
          }}
        >
          An unexpected error occurred during page execution. Our error boundary intercepted the failure to preserve session state.
        </p>

        {/* Error Technical Code Pill */}
        {error.digest && (
          <div
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              marginBottom: '2rem',
              fontFamily: 'var(--font-fira-code, monospace)',
              fontSize: '0.75rem',
              color: 'var(--text-muted, #6b7280)',
              wordBreak: 'break-all',
            }}
          >
            Digest: {error.digest}
          </div>
        )}

        {/* Action Controls */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center',
          }}
        >
          <button
            onClick={() => reset()}
            className="btn btn-primary btn-sm"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
            }}
          >
            <RefreshCw size={14} />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="btn btn-secondary btn-sm"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
            }}
          >
            <Home size={14} />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
