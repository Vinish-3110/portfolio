const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const asyncHandler = require('express-async-handler');
const { storeResume, isResumeFile } = require('./profileRoutes');

const router = express.Router();
const uploadsDir = path.join(__dirname, '../uploads');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 12 * 1024 * 1024 },
}).single('file');

const handleUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (!err) return next();
    const message = err.code === 'LIMIT_FILE_SIZE'
      ? 'File must be under 12 MB'
      : err.message;
    return res.status(400).json({ message });
  });
};

router.post('/', handleUpload, asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  if (isResumeFile(req.file)) {
    const profile = await storeResume(req, req.file);
    const storedPath = profile.resume_url.replace(/^https?:\/\/[^/]+/, '');
    return res.json({ url: storedPath, stored: 'database' });
  }

  fs.mkdirSync(uploadsDir, { recursive: true });
  const filename = `file-${Date.now()}${path.extname(req.file.originalname)}`;
  fs.writeFileSync(path.join(uploadsDir, filename), req.file.buffer);
  res.json({ url: `/uploads/${filename}`, stored: 'disk' });
}));

module.exports = router;
