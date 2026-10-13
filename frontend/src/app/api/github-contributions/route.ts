import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 3600; // Cache for 1 hour

const GITHUB_USERNAME = 'Vinish-3110';

interface RawContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const yearParam = searchParams.get('year') || '2026';

  // Map 2026 to "last" for rolling last-year 52-week calendar, or specific year
  const apiYear = yearParam === '2026' ? 'last' : yearParam;

  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=${apiYear}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      throw new Error(`GitHub contributions API returned ${res.status}`);
    }

    const data = await res.json();
    const days: RawContributionDay[] = data.contributions || [];
    const totalCount =
      data.total?.lastYear ??
      data.total?.[yearParam] ??
      days.reduce((acc: number, d: RawContributionDay) => acc + d.count, 0);

    // Group days into weeks of 7 days, aligned to Sunday start
    const weeks: { days: RawContributionDay[] }[] = [];
    let currentWeek: RawContributionDay[] = [];

    if (days.length > 0) {
      const [fy, fm, fd] = days[0].date.split('-').map(Number);
      const firstDate = new Date(fy, fm - 1, fd);
      const startPadding = firstDate.getDay(); // 0 = Sun

      for (let i = 0; i < startPadding; i++) {
        currentWeek.push({ date: '', count: 0, level: 0 });
      }

      for (const day of days) {
        currentWeek.push(day);
        if (currentWeek.length === 7) {
          weeks.push({ days: currentWeek });
          currentWeek = [];
        }
      }

      if (currentWeek.length > 0) {
        while (currentWeek.length < 7) {
          currentWeek.push({ date: '', count: 0, level: 0 });
        }
        weeks.push({ days: currentWeek });
      }
    }

    // Determine month label positions
    const monthNames = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
    const standardMonths = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const months: { name: string; weekIndex: number }[] = [];
    let lastMonth = -1;

    weeks.forEach((w, wIdx) => {
      const validDay = w.days.find((d) => d.date);
      if (validDay) {
        const [, mStr] = validDay.date.split('-').map(Number);
        const mIndex = mStr - 1;
        // Avoid adding a duplicate trailing month label if within 3 weeks of the end
        if (mIndex !== lastMonth && wIdx < 50) {
          months.push({ name: standardMonths[mIndex], weekIndex: wIdx });
          lastMonth = mIndex;
        }
      }
    });

    const totalText =
      yearParam === '2026'
        ? `${totalCount.toLocaleString()} contributions in the last year`
        : `${totalCount.toLocaleString()} contributions in ${yearParam}`;

    return NextResponse.json({
      year: yearParam,
      totalContributions: totalText,
      title: totalText,
      months,
      weeks,
      username: GITHUB_USERNAME,
    });
  } catch (error) {
    console.error('Failed to fetch live GitHub contributions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch live contributions', username: GITHUB_USERNAME },
      { status: 500 }
    );
  }
}
