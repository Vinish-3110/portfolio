const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');
const asyncHandler = require('express-async-handler');
const adminAuth = require('../middleware/adminAuth');

const splitList = (value) => {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  if (typeof value !== 'string') return [];
  return value.split(/\n|,/).map((item) => item.trim()).filter(Boolean);
};

router.get('/', asyncHandler(async (req, res) => {
  const items = await Experience.find({}).sort({ sortOrder: 1, createdAt: 1 });
  res.json(items);
}));

router.post('/', adminAuth, asyncHandler(async (req, res) => {
  const item = await Experience.create({
    role: req.body.role,
    company: req.body.company,
    companyUrl: req.body.companyUrl,
    period: req.body.period,
    type: req.body.type,
    location: req.body.location,
    summary: req.body.summary,
    achievements: splitList(req.body.achievements),
    technologies: splitList(req.body.technologies),
    sortOrder: Number(req.body.sortOrder) || 0,
  });
  res.status(201).json(item);
}));

router.put('/:id', adminAuth, asyncHandler(async (req, res) => {
  const item = await Experience.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Experience not found' });

  ['role', 'company', 'companyUrl', 'period', 'type', 'location', 'summary'].forEach((field) => {
    if (req.body[field] !== undefined) item[field] = req.body[field];
  });
  if (req.body.achievements !== undefined) item.achievements = splitList(req.body.achievements);
  if (req.body.technologies !== undefined) item.technologies = splitList(req.body.technologies);
  if (req.body.sortOrder !== undefined) item.sortOrder = Number(req.body.sortOrder) || 0;

  res.json(await item.save());
}));

router.delete('/:id', adminAuth, asyncHandler(async (req, res) => {
  const item = await Experience.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Experience not found' });
  await item.deleteOne();
  res.json({ message: 'Experience removed' });
}));

module.exports = router;
