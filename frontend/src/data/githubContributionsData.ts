export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4; // 0 = none, 1 = low, 2 = medium, 3 = high, 4 = very high
}

export interface ContributionWeek {
  days: ContributionDay[];
}

export interface YearContributionData {
  year: string;
  totalContributions: string;
  title: string;
  months: { name: string; weekIndex: number }[];
  weeks: ContributionWeek[];
}

// Color scale matching GitHub Dark mode
export const contributionColors = {
  0: "#161b22",
  1: "#0e4429",
  2: "#006d32",
  3: "#26a641",
  4: "#39d353",
} as const;

// Helper to format date string to "Mon DD, YYYY"
export function formatContributionDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// 2026 Activity (matching user's screenshot: 1,000 contributions from Sep 2025 to Aug 2026)
function generate2026Data(): YearContributionData {
  const months = [
    { name: "Sep", weekIndex: 0 },
    { name: "Oct", weekIndex: 4 },
    { name: "Nov", weekIndex: 9 },
    { name: "Dec", weekIndex: 13 },
    { name: "Jan", weekIndex: 17 },
    { name: "Feb", weekIndex: 22 },
    { name: "Mar", weekIndex: 26 },
    { name: "Apr", weekIndex: 31 },
    { name: "May", weekIndex: 35 },
    { name: "Jun", weekIndex: 39 },
    { name: "Jul", weekIndex: 44 },
    { name: "Aug", weekIndex: 48 },
  ];

  // Specific heatmap distribution modeled on the user's screenshot
  // 52 weeks x 7 days (0: Sun, 1: Mon, 2: Tue, 3: Wed, 4: Thu, 5: Fri, 6: Sat)
  const heatmapPattern: number[][] = [
    // Sep (weeks 0-3)
    [0, 0, 0, 0, 0, 1, 0],
    [0, 3, 2, 2, 0, 0, 0],
    [0, 3, 2, 3, 2, 1, 0],
    [0, 3, 2, 3, 2, 2, 0],
    // Oct (weeks 4-8) - very dense
    [1, 3, 2, 2, 2, 2, 0],
    [0, 3, 2, 2, 3, 0, 0],
    [0, 2, 0, 0, 1, 0, 0],
    [0, 1, 2, 2, 1, 2, 0],
    [0, 2, 2, 3, 1, 2, 0],
    // Nov (weeks 9-12) - high density
    [0, 3, 3, 3, 2, 2, 0],
    [0, 3, 2, 2, 2, 0, 0],
    [1, 0, 2, 2, 0, 3, 0],
    [0, 1, 2, 3, 1, 2, 0],
    // Dec (weeks 13-16) - active
    [0, 0, 2, 2, 2, 2, 0],
    [0, 2, 1, 1, 1, 3, 0],
    [0, 2, 2, 3, 2, 0, 0],
    [0, 3, 2, 0, 1, 2, 0],
    // Jan (weeks 17-21) - very active
    [0, 2, 1, 2, 1, 0, 0],
    [0, 3, 2, 2, 2, 3, 0],
    [0, 1, 2, 4, 3, 0, 0],
    [0, 1, 3, 2, 2, 1, 0],
    [0, 3, 2, 3, 1, 0, 0],
    // Feb (weeks 22-25) - strong
    [0, 0, 3, 1, 3, 0, 0],
    [0, 3, 2, 3, 2, 1, 0],
    [0, 1, 3, 4, 3, 0, 0],
    [0, 2, 2, 3, 2, 1, 0],
    // Mar (weeks 26-30) - high
    [0, 1, 3, 2, 2, 0, 0],
    [0, 2, 1, 3, 1, 1, 0],
    [0, 3, 0, 2, 2, 0, 0],
    [0, 1, 2, 0, 0, 0, 0],
    [0, 2, 2, 2, 2, 1, 0],
    // Apr (weeks 31-34) - steady
    [0, 3, 1, 4, 2, 0, 0],
    [0, 0, 2, 1, 2, 0, 0],
    [0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0],
    // May (weeks 35-38) - active blocks
    [0, 1, 2, 2, 0, 0, 0],
    [0, 1, 2, 3, 3, 0, 0],
    [0, 1, 2, 3, 4, 0, 0],
    [0, 2, 0, 2, 1, 1, 0],
    // Jun (weeks 39-43) - moderate
    [0, 0, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 3, 0],
    [0, 3, 2, 4, 1, 2, 0],
    [0, 2, 0, 1, 1, 2, 0],
    [0, 0, 2, 1, 0, 0, 0],
    // Jul (weeks 44-47) - lighter
    [0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0],
    // Aug (weeks 48-51) - sparse tail
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 2, 0],
    [0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0],
  ];

  // Base date: exactly 52 weeks prior to end of August 2026
  const startDate = new Date(2025, 8, 1); // Sep 1, 2025
  const countMultiplier = { 0: 0, 1: 1, 2: 3, 3: 6, 4: 12 };

  const weeks: ContributionWeek[] = [];
  let currentDate = new Date(startDate);

  for (let w = 0; w < 52; w++) {
    const days: ContributionDay[] = [];
    const patternWeek = heatmapPattern[w] || [0, 0, 0, 0, 0, 0, 0];

    for (let d = 0; d < 7; d++) {
      const level = (patternWeek[d] ?? 0) as 0 | 1 | 2 | 3 | 4;
      const count = level === 0 ? 0 : (countMultiplier[level] || 1) + (d % 2);

      const y = currentDate.getFullYear();
      const m = String(currentDate.getMonth() + 1).padStart(2, "0");
      const dt = String(currentDate.getDate()).padStart(2, "0");

      days.push({
        date: `${y}-${m}-${dt}`,
        count,
        level,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }
    weeks.push({ days });
  }

  return {
    year: "2026",
    totalContributions: "1,000 contributions in the last year",
    title: "1,000 contributions in the last year",
    months,
    weeks,
  };
}

// 2025 Activity
function generate2025Data(): YearContributionData {
  const months = [
    { name: "Jan", weekIndex: 0 },
    { name: "Feb", weekIndex: 4 },
    { name: "Mar", weekIndex: 8 },
    { name: "Apr", weekIndex: 13 },
    { name: "May", weekIndex: 17 },
    { name: "Jun", weekIndex: 21 },
    { name: "Jul", weekIndex: 26 },
    { name: "Aug", weekIndex: 30 },
    { name: "Sep", weekIndex: 35 },
    { name: "Oct", weekIndex: 39 },
    { name: "Nov", weekIndex: 43 },
    { name: "Dec", weekIndex: 48 },
  ];

  const startDate = new Date(2025, 0, 1);
  const weeks: ContributionWeek[] = [];
  let currentDate = new Date(startDate);

  for (let w = 0; w < 52; w++) {
    const days: ContributionDay[] = [];
    for (let d = 0; d < 7; d++) {
      // Deterministic pleasant distribution
      const randSeed = (w * 7 + d * 13) % 29;
      let level: 0 | 1 | 2 | 3 | 4 = 0;
      if (randSeed > 10) level = 1;
      if (randSeed > 16) level = 2;
      if (randSeed > 22) level = 3;
      if (randSeed > 27) level = 4;

      const y = currentDate.getFullYear();
      const m = String(currentDate.getMonth() + 1).padStart(2, "0");
      const dt = String(currentDate.getDate()).padStart(2, "0");

      days.push({
        date: `${y}-${m}-${dt}`,
        count: level === 0 ? 0 : level * 2 + (d % 3),
        level,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }
    weeks.push({ days });
  }

  return {
    year: "2025",
    totalContributions: "842 contributions in 2025",
    title: "842 contributions in 2025",
    months,
    weeks,
  };
}

// 2024 Activity
function generate2024Data(): YearContributionData {
  const months = [
    { name: "Jan", weekIndex: 0 },
    { name: "Feb", weekIndex: 4 },
    { name: "Mar", weekIndex: 8 },
    { name: "Apr", weekIndex: 13 },
    { name: "May", weekIndex: 17 },
    { name: "Jun", weekIndex: 21 },
    { name: "Jul", weekIndex: 26 },
    { name: "Aug", weekIndex: 30 },
    { name: "Sep", weekIndex: 35 },
    { name: "Oct", weekIndex: 39 },
    { name: "Nov", weekIndex: 43 },
    { name: "Dec", weekIndex: 48 },
  ];

  const startDate = new Date(2024, 0, 1);
  const weeks: ContributionWeek[] = [];
  let currentDate = new Date(startDate);

  for (let w = 0; w < 52; w++) {
    const days: ContributionDay[] = [];
    for (let d = 0; d < 7; d++) {
      const randSeed = (w * 5 + d * 11) % 31;
      let level: 0 | 1 | 2 | 3 | 4 = 0;
      if (randSeed > 14) level = 1;
      if (randSeed > 20) level = 2;
      if (randSeed > 26) level = 3;

      const y = currentDate.getFullYear();
      const m = String(currentDate.getMonth() + 1).padStart(2, "0");
      const dt = String(currentDate.getDate()).padStart(2, "0");

      days.push({
        date: `${y}-${m}-${dt}`,
        count: level === 0 ? 0 : level * 2,
        level,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }
    weeks.push({ days });
  }

  return {
    year: "2024",
    totalContributions: "486 contributions in 2024",
    title: "486 contributions in 2024",
    months,
    weeks,
  };
}

export const githubContributionsYears: Record<string, YearContributionData> = {
  "2026": generate2026Data(),
  "2025": generate2025Data(),
  "2024": generate2024Data(),
};
