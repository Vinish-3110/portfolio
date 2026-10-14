const { query } = require('../config/db');

const Visitor = {
  async create(data) {
    await query(
      `INSERT INTO visitors (hashed_ip, country, city, user_agent, path)
       VALUES ($1, $2, $3, $4, $5)`,
      [data.hashed_ip, data.country || 'Unknown', data.city || 'Unknown', data.userAgent || '', data.path]
    );
  },

  async stats() {
    const [total, unique, daily, countries, pages, realtime] = await Promise.all([
      query('SELECT COUNT(*)::int AS count FROM visitors'),
      query('SELECT COUNT(DISTINCT hashed_ip)::int AS count FROM visitors'),
      query(`SELECT to_char(created_at AT TIME ZONE 'UTC', 'YYYY-MM-DD') AS date, COUNT(*)::int AS count
             FROM visitors GROUP BY 1 ORDER BY 1`),
      query(`SELECT country, COUNT(*)::int AS count
             FROM visitors GROUP BY country ORDER BY count DESC LIMIT 10`),
      query(`SELECT path, COUNT(*)::int AS count
             FROM visitors GROUP BY path ORDER BY count DESC LIMIT 10`),
      query(`SELECT COUNT(DISTINCT hashed_ip)::int AS count
             FROM visitors WHERE created_at >= NOW() - INTERVAL '5 minutes'`),
    ]);

    return {
      totalVisitors: total.rows[0].count,
      uniqueVisitors: unique.rows[0].count,
      dailyVisitors: daily.rows,
      topCountries: countries.rows,
      topPages: pages.rows,
      realtimeVisitors: realtime.rows[0].count,
    };
  },

  async list() {
    const { rows } = await query(
      `SELECT hashed_ip, country, city, user_agent AS "userAgent", path, created_at AS "createdAt"
       FROM visitors ORDER BY created_at DESC`
    );
    return rows;
  },
};

module.exports = Visitor;
