'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ArrowLeft, Download, Eye, Radio, RefreshCcw, Users } from 'lucide-react';
import { API_URL, AnalyticsStats, fetchAnalyticsStats } from '@/lib/api';
import './analytics.css';

const emptyStats: AnalyticsStats = {
  totalVisitors: 0,
  uniqueVisitors: 0,
  realtimeVisitors: 0,
  dailyVisitors: [],
  topCountries: [],
  topPages: [],
};

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState<AnalyticsStats>(emptyStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const token = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('adminToken') || '';
  }, []);

  const loadStats = useCallback(async () => {
    if (!token) {
      router.push('/admin/login');
      return;
    }

    try {
      setError('');
      setLoading(true);
      setStats(await fetchAnalyticsStats(token));
    } catch {
      setError('Analytics data could not be loaded.');
    } finally {
      setLoading(false);
    }
  }, [router, token]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const handleExportCsv = async () => {
    if (!token) return;

    const response = await fetch(`${API_URL}/admin/stats/export.csv`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) return;

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analytics-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <div className="analytics-empty">Loading analytics...</div>;
  }

  return (
    <main className="analytics-shell">
      <div className="analytics-wrap">
        <header className="analytics-header">
          <div className="analytics-title">
            <h1>Analytics</h1>
            <p>Visits, geography, page performance, and live activity.</p>
          </div>
          <div className="analytics-actions">
            <a href="/admin" className="analytics-button" aria-label="Back to admin">
              <ArrowLeft size={16} /> Admin
            </a>
            <button className="analytics-button" onClick={loadStats} aria-label="Refresh analytics">
              <RefreshCcw size={16} /> Refresh
            </button>
            <button className="analytics-button primary" onClick={handleExportCsv} aria-label="Export analytics CSV">
              <Download size={16} /> CSV
            </button>
          </div>
        </header>

        {error ? (
          <div className="analytics-error">{error}</div>
        ) : (
          <>
            <section className="analytics-kpis">
              <article className="analytics-card">
                <div className="kpi-label"><Eye size={16} /> Total Visitors</div>
                <div className="kpi-value">{stats.totalVisitors.toLocaleString()}</div>
              </article>
              <article className="analytics-card">
                <div className="kpi-label"><Users size={16} /> Unique Visitors</div>
                <div className="kpi-value">{stats.uniqueVisitors.toLocaleString()}</div>
              </article>
              <article className="analytics-card">
                <div className="kpi-label"><Radio size={16} /> Live Now</div>
                <div className="kpi-value">{stats.realtimeVisitors.toLocaleString()}</div>
              </article>
            </section>

            <section className="analytics-grid">
              <article className="analytics-card chart-card">
                <h2>Daily Visitors</h2>
                <div className="chart-frame">
                  <ResponsiveContainer>
                    <LineChart data={stats.dailyVisitors}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-op)" />
                      <XAxis dataKey="date" stroke="var(--text-dim)" tick={{ fontSize: 12 }} />
                      <YAxis stroke="var(--text-dim)" allowDecimals={false} />
                      <Tooltip />
                      <Line type="monotone" dataKey="count" stroke="var(--primary)" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </article>

              <article className="analytics-card chart-card">
                <h2>Top Countries</h2>
                <div className="chart-frame">
                  <ResponsiveContainer>
                    <BarChart data={stats.topCountries}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-op)" />
                      <XAxis dataKey="country" stroke="var(--text-dim)" tick={{ fontSize: 12 }} />
                      <YAxis stroke="var(--text-dim)" allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="count" fill="var(--secondary)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </article>

              <article className="analytics-card chart-card">
                <h2>Page Views</h2>
                <div className="chart-frame">
                  <ResponsiveContainer>
                    <BarChart data={stats.topPages} layout="vertical" margin={{ left: 12, right: 16 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-op)" />
                      <XAxis type="number" stroke="var(--text-dim)" allowDecimals={false} />
                      <YAxis type="category" dataKey="path" stroke="var(--text-dim)" width={120} tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="count" fill="var(--primary)" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </article>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
