const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const asyncHandler = require('express-async-handler');

// @desc    Get resume URL
// @route   GET /api/profile/resume
router.get('/resume', asyncHandler(async (req, res) => {
  let profile = await Profile.findOne();
  if (!profile) {
    profile = await Profile.create({ owner_email: 'admin@portfolio.com' });
  }
  res.json({ resume_url: profile.resume_url });
}));

// @desc    Update resume URL
// @route   PUT /api/profile/resume
// @access  Admin
router.put('/resume', asyncHandler(async (req, res) => {
  const { resume_url } = req.body;
  let profile = await Profile.findOne();
  if (!profile) {
    profile = new Profile({ owner_email: 'admin@portfolio.com' });
  }
  profile.resume_url = resume_url;
  await profile.save();
  res.json({ message: 'Resume pointer updated', resume_url });
}));

module.exports = router;
