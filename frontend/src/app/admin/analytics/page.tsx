'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ArrowLeft,
  Download,
  Eye,
  Radio,
  RefreshCcw,
  Users,
  TrendingUp,
  Globe2,
  FileText,
  AlertCircle,
  BarChart3,
} from 'lucide-react';
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

// Custom Chart Tooltip
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="custom-chart-tooltip">
        <div className="tooltip-title">{label}</div>
        <div className="tooltip-val">{payload[0].value.toLocaleString()} visits</div>
      </div>
    );
  }
  return null;
}

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState<AnalyticsStats>(emptyStats);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const token = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('adminToken') || '';
  }, []);

  const loadStats = useCallback(async (isRefresh = false) => {
    if (!token) {
      router.push('/admin/login');
      return;
    }

    try {
      setError('');
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      const data = await fetchAnalyticsStats(token);
      setStats(data);
    } catch {
      setError('Failed to fetch analytics telemetry. Verify backend connectivity on port 5000.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [router, token]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const handleExportCsv = async () => {
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/admin/stats/export.csv`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed export');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `portfolio-analytics-${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      alert('Could not generate CSV export. Check server logs.');
    }
  };

  if (loading) {
    return (
      <div className="analytics-empty">
        <div className="admin-spinner" />
        <p>Synthesizing telemetry data...</p>
      </div>
    );
  }

  return (
    <main className="analytics-shell">
      <div className="analytics-wrap">
        {/* Header */}
        <header className="analytics-header">
          <div className="analytics-title">
            <div className="analytics-title-row">
              <BarChart3 size={24} style={{ color: '#10b981' }} />
              <h1>Analytics Cockpit</h1>
            </div>
            <p>Real-time visits, geographic distribution, and page performance telemetry.</p>
          </div>

          <div className="analytics-actions">
            <Link href="/admin" className="analytics-button" aria-label="Back to admin dashboard">
              <ArrowLeft size={16} />
              <span>Back to Dashboard</span>
            </Link>

            <button
              className="analytics-button"
              onClick={() => loadStats(true)}
              disabled={refreshing}
              aria-label="Refresh analytics data"
            >
              <RefreshCcw size={16} className={refreshing ? 'admin-spinner' : ''} style={refreshing ? { width: 16, height: 16, borderWidth: 2 } : {}} />
              <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>

            <button
              className="analytics-button primary"
              onClick={handleExportCsv}
              aria-label="Export analytics CSV file"
            >
              <Download size={16} />
              <span>Export CSV</span>
            </button>
          </div>
        </header>

        {error ? (
          <div className="analytics-error">
            <AlertCircle size={28} />
            <p>{error}</p>
            <button onClick={() => loadStats(false)} className="analytics-button">
              Retry Connection
            </button>
          </div>
        ) : (
          <>
            {/* KPI Metric Cards */}
            <section className="analytics-kpis">
              <article className="kpi-card">
                <div className="kpi-top">
                  <span className="kpi-label">Total Traffic</span>
                  <div className="kpi-icon-pill emerald">
                    <Eye size={18} />
                  </div>
                </div>
                <div className="kpi-value">{stats.totalVisitors.toLocaleString()}</div>
                <div className="kpi-subtext">
                  <TrendingUp size={14} style={{ color: '#10b981' }} />
                  <span>Aggregated page visits recorded</span>
                </div>
              </article>

              <article className="kpi-card">
                <div className="kpi-top">
                  <span className="kpi-label">Unique Visitors</span>
                  <div className="kpi-icon-pill cyan">
                    <Users size={18} />
                  </div>
                </div>
                <div className="kpi-value">{stats.uniqueVisitors.toLocaleString()}</div>
                <div className="kpi-subtext">
                  <span>Distinct client IP fingerprints</span>
                </div>
              </article>

              <article className="kpi-card">
                <div className="kpi-top">
                  <span className="kpi-label">Realtime Visitors</span>
                  <div className="kpi-icon-pill purple">
                    <Radio size={18} />
                  </div>
                </div>
                <div className="kpi-value" style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="status-dot-pulse" style={{ width: 10, height: 10 }} />
                  {stats.realtimeVisitors.toLocaleString()}
                </div>
                <div className="kpi-subtext">
                  <span>Active in the last 15 minutes</span>
                </div>
              </article>
            </section>

            {/* Charts Grid */}
            <section className="analytics-grid">
              {/* Daily Visitors Area Chart */}
              <article className="chart-card">
                <div className="chart-card-header">
                  <h2>Daily Visit Trajectory</h2>
                  <span className="chart-badge">PAST 30 DAYS</span>
                </div>
                <div className="chart-frame">
                  {mounted && (
                    <ResponsiveContainer width="100%" height={280} minWidth={0}>
                      <AreaChart data={stats.dailyVisitors} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                        <XAxis
                          dataKey="date"
                          stroke="#6b7280"
                          tick={{ fontSize: 11, fill: '#9ca3af' }}
                          tickLine={false}
                        />
                        <YAxis
                          stroke="#6b7280"
                          tick={{ fontSize: 11, fill: '#9ca3af' }}
                          tickLine={false}
                          allowDecimals={false}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="count"
                          stroke="#10b981"
                          strokeWidth={2.5}
                          fillOpacity={1}
                          fill="url(#colorVisits)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </article>

              {/* Top Countries Bar Chart */}
              <article className="chart-card">
                <div className="chart-card-header">
                  <h2>Geographic Reach</h2>
                  <span className="chart-badge" style={{ color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.3)', background: 'rgba(56, 189, 248, 0.1)' }}>
                    TOP REGIONS
                  </span>
                </div>
                <div className="chart-frame">
                  {mounted && (
                    <ResponsiveContainer width="100%" height={280} minWidth={0}>
                      <BarChart data={stats.topCountries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                        <XAxis
                          dataKey="country"
                          stroke="#6b7280"
                          tick={{ fontSize: 11, fill: '#9ca3af' }}
                          tickLine={false}
                        />
                        <YAxis
                          stroke="#6b7280"
                          tick={{ fontSize: 11, fill: '#9ca3af' }}
                          tickLine={false}
                          allowDecimals={false}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="count" fill="#38bdf8" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </article>

              {/* Ranked Top Pages */}
              <article className="chart-card pages-rank-card">
                <div className="chart-card-header">
                  <h2>High-Traffic Routes &amp; Resources</h2>
                  <span className="chart-badge" style={{ color: '#a855f7', borderColor: 'rgba(168, 85, 247, 0.3)', background: 'rgba(168, 85, 247, 0.1)' }}>
                    TOP ENDPOINTS
                  </span>
                </div>
                {stats.topPages.length === 0 ? (
                  <p className="empty-msg">No page traffic recorded yet.</p>
                ) : (
                  <div className="pages-list">
                    {stats.topPages.map((p, idx) => (
                      <div key={p.path || idx} className="page-row">
                        <div className="page-info">
                          <span className={`page-rank-pill ${idx === 0 ? 'gold' : ''}`}>
                            #{idx + 1}
                          </span>
                          <span className="page-path">{p.path}</span>
                        </div>
                        <span className="page-views-badge">
                          {p.count.toLocaleString()} views
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
