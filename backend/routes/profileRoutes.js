const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const asyncHandler = require('express-async-handler');
const fs = require('fs');
const path = require('path');

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
  res.json({ resume_url: profile.resume_url, theme_color: profile.theme_color });
}));

// @desc    Update profile config
// @route   PUT /api/profile
// @access  Admin
router.put('/', asyncHandler(async (req, res) => {
  const { resume_url, theme_color } = req.body;
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
  await profile.save();
  res.json({ message: 'Profile config updated', resume_url: profile.resume_url, theme_color: profile.theme_color });
}));

module.exports = router;
