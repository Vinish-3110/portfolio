const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const asyncHandler = require('express-async-handler');
const fs = require('fs');
const path = require('path');
const adminAuth = require('../middleware/adminAuth');
const { presentProfile } = require('../siteDefaults');

const CONTENT_FIELDS = [
  'display_name', 'availability', 'role_badge',
  'headline_before', 'headline_highlight', 'headline_after', 'hero_description',
  'about_heading', 'email', 'phone', 'linkedin', 'github',
  'engineer_name', 'discipline', 'experience_label', 'core_focus',
];

const deleteOldFile = (fileUrl) => {
  if (fileUrl && fileUrl.includes('/uploads/')) {
    try {
      const filename = fileUrl.split('/uploads/')[1];
      const filePath = path.join(__dirname, '../uploads', filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (err) {
      console.error('Failed to delete old file:', err);
    }
  }
};

// @desc    Get profile config
// @route   GET /api/profile
router.get('/', asyncHandler(async (req, res) => {
  let profile = await Profile.findOne();
  if (!profile) {
    profile = await Profile.create({ owner_email: 'admin@portfolio.com' });
  }
  res.json(presentProfile(profile));
}));

// @desc    Update profile config
// @route   PUT /api/profile
// @access  Admin
router.put('/', adminAuth, asyncHandler(async (req, res) => {
  const { resume_url, theme_color, about_paragraphs, stats } = req.body;
  let profile = await Profile.findOne();
  if (!profile) {
    profile = new Profile({ owner_email: 'admin@portfolio.com' });
  }

  if (resume_url !== undefined && resume_url !== profile.resume_url) {
    if (profile.resume_url) {
      deleteOldFile(profile.resume_url);
    }
    profile.resume_url = resume_url;
  }

  if (theme_color !== undefined) profile.theme_color = theme_color;

  CONTENT_FIELDS.forEach((field) => {
    if (req.body[field] !== undefined) profile[field] = req.body[field];
  });

  if (about_paragraphs !== undefined) {
    profile.about_paragraphs = Array.isArray(about_paragraphs)
      ? about_paragraphs.map((line) => String(line).trim()).filter(Boolean)
      : String(about_paragraphs).split('\n').map((line) => line.trim()).filter(Boolean);
  }

  if (Array.isArray(stats)) {
    profile.stats = stats
      .filter((item) => item && (item.value || item.label))
      .map((item) => ({ value: item.value || '', label: item.label || '', sub: item.sub || '' }));
  }

  await profile.save();
  res.json({ message: 'Profile updated', ...presentProfile(profile) });
}));

module.exports = router;
