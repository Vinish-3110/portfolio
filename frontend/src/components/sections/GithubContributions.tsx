'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import {
  githubContributionsYears,
  contributionColors,
  formatContributionDate,
  ContributionDay,
  YearContributionData,
} from '@/data/githubContributionsData';

export default function GithubContributions() {
  const [selectedYear, setSelectedYear] = useState<'2026' | '2025' | '2024'>('2026');
  const [liveYearData, setLiveYearData] = useState<Record<string, YearContributionData>>({});
  const [hoveredDay, setHoveredDay] = useState<{
    day: ContributionDay;
    x: number;
    y: number;
  } | null>(null);

  // Fetch live contributions from Next.js API route connected directly to GitHub
  useEffect(() => {
    let isCancelled = false;

    fetch(`/api/github-contributions?year=${selectedYear}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!isCancelled && data && data.weeks && data.weeks.length > 0) {
          setLiveYearData((prev) => ({ ...prev, [selectedYear]: data }));
        }
      })
      .catch((err) => {
        console.warn('Using pre-rendered GitHub dataset:', err);
      });

    return () => {
      isCancelled = true;
    };
  }, [selectedYear]);

  const activeData = liveYearData[selectedYear] || githubContributionsYears[selectedYear];
  const years: ('2026' | '2025' | '2024')[] = ['2026', '2025', '2024'];

  const handleCellMouseEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    day: ContributionDay
  ) => {
    if (!day.date) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredDay({
      day,
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
    });
  };

  const handleCellMouseLeave = () => {
    setHoveredDay(null);
  };

  return (
    <div className="github-contributions-section">
      <div className="github-contributions-shell">
        {/* Main Calendar View Area */}
        <div className="github-calendar-column">
          {/* Calendar Top Bar */}
          <div className="github-header-row">
            <h3 className="github-total-title">
              {activeData.totalContributions}
            </h3>

            <div className="github-header-controls">
              <div className="github-settings-pill">
                <span>Contribution settings</span>
                <ChevronDown size={12} />
              </div>
            </div>
          </div>

          {/* Inner GitHub Slate Box */}
          <div className="github-graph-card">
            <div className="github-graph-scroll-area">
              <div className="github-graph-inner">
                {/* Months Header Labels - locked to exact column pixel positions */}
                <div className="github-months-row">
                  {activeData.months.map((m, idx) => (
                    <span
                      key={idx}
                      className="github-month-label"
                      style={{
                        left: `${32 + m.weekIndex * 13}px`,
                      }}
                    >
                      {m.name}
                    </span>
                  ))}
                </div>

                {/* Calendar Body: Weekdays + 53-Week Grid */}
                <div className="github-grid-body">
                  {/* Day Labels (Sun-Sat: Mon, Wed, Fri shown) */}
                  <div className="github-days-column">
                    <span className="github-day-label" style={{ gridRow: 2 }}>
                      Mon
                    </span>
                    <span className="github-day-label" style={{ gridRow: 4 }}>
                      Wed
                    </span>
                    <span className="github-day-label" style={{ gridRow: 6 }}>
                      Fri
                    </span>
                  </div>

                  {/* 53 Columns Grid */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedYear}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="github-weeks-grid"
                    >
                      {activeData.weeks.map((week, wIdx) => (
                        <div key={wIdx} className="github-week-col">
                          {week.days.map((day, dIdx) => (
                            <div
                              key={dIdx}
                              className="github-day-cell"
                              style={{
                                backgroundColor: contributionColors[day.level],
                                visibility: day.date ? 'visible' : 'hidden',
                              }}
                              onMouseEnter={(e) => handleCellMouseEnter(e, day)}
                              onMouseLeave={handleCellMouseLeave}
                            />
                          ))}
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bottom Footer Legend */}
                <div className="github-graph-footer">
                  <a
                    href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-learn-link"
                  >
                    Learn how we count contributions
                  </a>

                  <div className="github-legend">
                    <span className="github-legend-text">Less</span>
                    <span
                      className="github-legend-cell"
                      style={{ backgroundColor: contributionColors[0] }}
                    />
                    <span
                      className="github-legend-cell"
                      style={{ backgroundColor: contributionColors[1] }}
                    />
                    <span
                      className="github-legend-cell"
                      style={{ backgroundColor: contributionColors[2] }}
                    />
                    <span
                      className="github-legend-cell"
                      style={{ backgroundColor: contributionColors[3] }}
                    />
                    <span
                      className="github-legend-cell"
                      style={{ backgroundColor: contributionColors[4] }}
                    />
                    <span className="github-legend-text">More</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Year Selector Sidebar */}
        <aside className="github-years-nav">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`github-year-btn ${
                selectedYear === year ? 'active' : ''
              }`}
            >
              {year}
            </button>
          ))}
        </aside>
      </div>

      {/* Floating Hover Tooltip */}
      {hoveredDay && hoveredDay.day.date && (
        <div
          className="github-tooltip"
          style={{
            left: hoveredDay.x,
            top: hoveredDay.y,
          }}
        >
          <strong>
            {hoveredDay.day.count === 0
              ? 'No contributions'
              : `${hoveredDay.day.count} contribution${
                  hoveredDay.day.count > 1 ? 's' : ''
                }`}
          </strong>{' '}
          on {formatContributionDate(hoveredDay.day.date)}
        </div>
      )}
    </div>
  );
}
