const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');
const asyncHandler = require('express-async-handler');
const adminAuth = require('../middleware/adminAuth');

const CATEGORIES = ['frontend', 'backend', 'database', 'devops'];

router.get('/', asyncHandler(async (req, res) => {
  const items = await Skill.find();
  res.json(items);
}));

router.post('/', adminAuth, asyncHandler(async (req, res) => {
  const category = CATEGORIES.includes(req.body.category) ? req.body.category : 'frontend';
  const item = await Skill.create({
    name: req.body.name,
    level: req.body.level,
    focus: req.body.focus,
    category,
    sortOrder: Number(req.body.sortOrder) || 0,
  });
  res.status(201).json(item);
}));

router.put('/:id', adminAuth, asyncHandler(async (req, res) => {
  const item = await Skill.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Skill not found' });

  const patch = {};
  ['name', 'level', 'focus'].forEach((field) => {
    if (req.body[field] !== undefined) patch[field] = req.body[field];
  });
  if (req.body.category !== undefined && CATEGORIES.includes(req.body.category)) {
    patch.category = req.body.category;
  }
  if (req.body.sortOrder !== undefined) patch.sortOrder = Number(req.body.sortOrder) || 0;

  res.json(await Skill.update(req.params.id, patch));
}));

router.delete('/:id', adminAuth, asyncHandler(async (req, res) => {
  const item = await Skill.remove(req.params.id);
  if (!item) return res.status(404).json({ message: 'Skill not found' });
  res.json({ message: 'Skill removed' });
}));

module.exports = router;
