'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackButtonClick, trackFormSubmit } from '@/lib/analytics';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://portfolio-d559.onrender.com/api';
const VISIT_STORAGE_PREFIX = 'portfolio:last-visit';

const getDailyVisitKey = (path: string) => {
  const today = new Date().toISOString().slice(0, 10);
  return `${VISIT_STORAGE_PREFIX}:${today}:${path}`;
};

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const path = `${pathname}${window.location.search}`;
    const storageKey = getDailyVisitKey(path);

    if (localStorage.getItem(storageKey)) return;

    localStorage.setItem(storageKey, '1');

    fetch(`${API_URL}/track-visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path }),
      keepalive: true,
    }).catch(() => {
      localStorage.removeItem(storageKey);
    });
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const actionElement = target.closest('button, a, [role="button"]');
      if (!(actionElement instanceof HTMLElement)) return;

      const label = actionElement.getAttribute('aria-label') || actionElement.textContent?.trim() || 'unlabeled';
      trackButtonClick(label.slice(0, 120), {
        path: window.location.pathname,
      });
    };

    const handleSubmit = (event: SubmitEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLFormElement)) return;

      const formName = target.getAttribute('name') || target.id || target.closest('section')?.id || 'form';
      trackFormSubmit(formName, {
        path: window.location.pathname,
      });
    };

    document.addEventListener('click', handleClick, true);
    document.addEventListener('submit', handleSubmit, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('submit', handleSubmit, true);
    };
  }, []);

  return null;
}
