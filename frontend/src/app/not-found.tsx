import React from 'react';
import Link from 'next/link';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
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
          maxWidth: '520px',
          width: '100%',
          textAlign: 'center',
          backgroundColor: 'var(--bg-surface, #0f1117)',
          border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
          borderRadius: '16px',
          padding: '3rem 2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div
          style={{
            width: '56px',
            height: '56px',
            margin: '0 auto 1.5rem',
            borderRadius: '12px',
            backgroundColor: 'rgba(184, 122, 240, 0.1)',
            border: '1px solid rgba(184, 122, 240, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-primary, #b87af0)',
          }}
        >
          <Compass size={28} />
        </div>

        <span
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.75rem',
            color: 'var(--accent-primary, #b87af0)',
            letterSpacing: '0.1em',
            marginBottom: '0.5rem',
          }}
        >
          STATUS // 404
        </span>

        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            marginBottom: '1rem',
          }}
        >
          Destination Not Found
        </h1>

        <p
          style={{
            color: 'var(--text-secondary, #9ca3af)',
            fontSize: '0.9375rem',
            lineHeight: 1.6,
            marginBottom: '2rem',
          }}
        >
          The resource or route you requested does not exist or has been relocated to another path.
        </p>

        <Link
          href="/"
          className="btn btn-primary btn-sm"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
          }}
        >
          <ArrowLeft size={15} />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
