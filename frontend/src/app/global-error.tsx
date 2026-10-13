'use client';

import React, { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Root Layout Global Error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: '2rem',
          backgroundColor: '#08090d',
          color: '#f3f4f6',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <div
          style={{
            maxWidth: '480px',
            textAlign: 'center',
            backgroundColor: '#0f1117',
            padding: '2.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            Critical Layout Error
          </h2>
          <p style={{ color: '#9ca3af', marginBottom: '2rem', fontSize: '0.9375rem', lineHeight: 1.5 }}>
            A critical system issue prevented the page shell from rendering.
          </p>
          <button
            onClick={() => reset()}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#b87af0',
              color: '#08090d',
              fontWeight: 600,
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Reload Shell
          </button>
        </div>
      </body>
    </html>
  );
}
