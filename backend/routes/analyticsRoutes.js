const express = require('express');
const crypto = require('crypto');
const geoip = require('geoip-lite');
const rateLimit = require('express-rate-limit');
const asyncHandler = require('express-async-handler');
const Visitor = require('../models/Visitor');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

const trackVisitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 120,
  standardHeaders: true,
  legacyHeaders: false,
});

const botUserAgentPattern = /bot|crawler|spider|crawling|preview|facebookexternalhit|slackbot|discordbot|twitterbot|linkedinbot|whatsapp|telegrambot|pingdom|uptimerobot|headless|lighthouse/i;

const getClientIp = (req) => {
  const forwardedFor = req.headers['x-forwarded-for'];
  const ip = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor?.split(',')[0];
  return (ip || req.ip || req.socket.remoteAddress || '')
    .trim()
    .replace(/^::ffff:/, '');
};

const hashIp = (ip) => {
  const salt = process.env.IP_HASH_SALT || '';
  return crypto.createHash('sha256').update(`${salt}:${ip}`).digest('hex');
};

const sanitizePath = (path) => {
  if (typeof path !== 'string') return '/';
  const normalizedPath = path.trim().slice(0, 2048);
  return normalizedPath.startsWith('/') ? normalizedPath : '/';
};

router.post('/track-visit', trackVisitLimiter, asyncHandler(async (req, res) => {
  const userAgent = req.get('user-agent') || '';

  if (!userAgent || botUserAgentPattern.test(userAgent)) {
    return res.status(204).send();
  }

  const clientIp = getClientIp(req);
  const geo = geoip.lookup(clientIp);

  await Visitor.create({
    hashed_ip: hashIp(clientIp),
    country: geo?.country || 'Unknown',
    city: geo?.city || 'Unknown',
    userAgent: userAgent.slice(0, 512),
    path: sanitizePath(req.body.path),
  });

  res.status(201).json({ tracked: true });
}));

router.get('/admin/stats', adminAuth, asyncHandler(async (req, res) => {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

  const [
    totalVisitors,
    uniqueVisitors,
    dailyVisitors,
    topCountries,
    topPages,
    realtimeVisitors,
  ] = await Promise.all([
    Visitor.countDocuments(),
    Visitor.distinct('hashed_ip').then((ips) => ips.length),
    Visitor.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      { $project: { _id: 0, date: '$_id', count: 1 } },
    ]),
    Visitor.aggregate([
      { $group: { _id: '$country', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      { $project: { _id: 0, country: '$_id', count: 1 } },
    ]),
    Visitor.aggregate([
      { $group: { _id: '$path', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      { $project: { _id: 0, path: '$_id', count: 1 } },
    ]),
    Visitor.distinct('hashed_ip', { createdAt: { $gte: fiveMinutesAgo } }).then((ips) => ips.length),
  ]);

  res.json({
    totalVisitors,
    uniqueVisitors,
    dailyVisitors,
    topCountries,
    topPages,
    realtimeVisitors,
  });
}));

router.get('/admin/stats/export.csv', adminAuth, asyncHandler(async (req, res) => {
  const visits = await Visitor.find({})
    .sort({ createdAt: -1 })
    .select('country city userAgent path createdAt hashed_ip -_id')
    .lean();

  const escapeCsv = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
  const rows = [
    ['hashed_ip', 'country', 'city', 'userAgent', 'path', 'createdAt'],
    ...visits.map((visit) => [
      visit.hashed_ip,
      visit.country,
      visit.city,
      visit.userAgent,
      visit.path,
      visit.createdAt?.toISOString(),
    ]),
  ];

  res.header('Content-Type', 'text/csv');
  res.attachment(`analytics-${new Date().toISOString().slice(0, 10)}.csv`);
  res.send(rows.map((row) => row.map(escapeCsv).join(',')).join('\n'));
}));

module.exports = router;
