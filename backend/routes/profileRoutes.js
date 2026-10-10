const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const asyncHandler = require('express-async-handler');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const adminAuth = require('../middleware/adminAuth');

const deleteOldFile = (fileUrl) => {
  if (fileUrl && fileUrl.includes('/uploads/')) {
    try {
      const filename = fileUrl.split('/uploads/')[1].split('?')[0];
      const filePath = path.join(__dirname, '../uploads', filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (err) {
      console.error('Failed to delete old file:', err);
    }
  }
};

const publicOrigin = (req) => {
  const configured = process.env.PUBLIC_BASE_URL;
  if (configured) {
    return configured.replace(/\/$/, '').replace(/\/api$/, '');
  }
  return `${req.protocol}://${req.get('host')}`;
};

const publicProfile = (profile) => ({
  resume_url: profile.resume_url || '',
  resume_filename: profile.resume_filename || '',
  theme_color: profile.theme_color,
  has_resume: Boolean(profile.resume_filename),
});

const isResumeFile = (file) => {
  const name = file.originalname || '';
  const type = file.mimetype || '';
  return /\.(pdf|doc|docx)$/i.test(name) || /pdf|msword|wordprocessingml|officedocument/.test(type);
};

const storeResume = async (req, file) => {
  if (!file || !file.buffer || !file.buffer.length) {
    const error = new Error('No resume file received');
    error.statusCode = 400;
    throw error;
  }
  if (!isResumeFile(file)) {
    const error = new Error('Resume must be a PDF or Word document');
    error.statusCode = 400;
    throw error;
  }

  let profile = await Profile.findOne();
  if (!profile) {
    profile = new Profile({ owner_email: 'admin@portfolio.com' });
  }

  profile.resume_data = file.buffer;
  profile.resume_filename = file.originalname;
  profile.resume_mimetype = file.mimetype || 'application/pdf';
  profile.resume_url = `${publicOrigin(req)}/api/profile/resume?v=${Date.now()}`;
  await profile.save();
  return profile;
};

const resumeUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
}).single('resume');

const handleResumeUpload = (req, res, next) => {
  const contentType = req.headers['content-type'] || '';
  if (!contentType.includes('multipart/form-data')) {
    return next();
  }

  resumeUpload(req, res, (err) => {
    if (!err) return next();
    const message = err.code === 'LIMIT_FILE_SIZE'
      ? 'Resume must be under 8 MB'
      : err.message;
    return res.status(400).json({ message });
  });
};

// @desc    Download the resume stored in the database
// @route   GET /api/profile/resume
router.get('/resume', asyncHandler(async (req, res) => {
  const profile = await Profile.findOne().select('+resume_data');
  if (!profile || !profile.resume_data || !profile.resume_data.length) {
    return res.status(404).json({ message: 'No resume uploaded' });
  }

  const filename = (profile.resume_filename || 'resume.pdf').replace(/["\r\n]/g, '');
  res.setHeader('Content-Type', profile.resume_mimetype || 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
  res.setHeader('Cache-Control', 'private, max-age=300');
  res.send(Buffer.from(profile.resume_data));
}));

// @desc    Get profile config
// @route   GET /api/profile
router.get('/', asyncHandler(async (req, res) => {
  let profile = await Profile.findOne();
  if (!profile) {
    profile = await Profile.create({ owner_email: 'admin@portfolio.com' });
  }
  res.json(publicProfile(profile));
}));

// @desc    Update profile config and store an uploaded resume in MongoDB
// @route   PUT /api/profile
// @access  Admin
router.put('/', adminAuth, handleResumeUpload, asyncHandler(async (req, res) => {
  const { resume_url, theme_color } = req.body || {};

  if (req.file) {
    const profile = await storeResume(req, req.file);
    if (theme_color !== undefined && theme_color !== '') {
      profile.theme_color = theme_color;
      await profile.save();
    }
    return res.json({ message: 'Resume saved', ...publicProfile(profile) });
  }

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

  if (theme_color !== undefined && theme_color !== '') {
    profile.theme_color = theme_color;
  }

  await profile.save();
  res.json({ message: 'Profile config updated', ...publicProfile(profile) });
}));

module.exports = router;
module.exports.storeResume = storeResume;
module.exports.isResumeFile = isResumeFile;
