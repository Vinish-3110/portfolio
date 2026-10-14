const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const asyncHandler = require('express-async-handler');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const adminAuth = require('../middleware/adminAuth');

const uploadsDir = path.join(__dirname, '../uploads');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    cb(null, uploadsDir);
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

// Helper to delete an image file by URL
const deleteOldImage = (imageUrl) => {
  if (imageUrl && imageUrl.includes('/uploads/')) {
    try {
      const filename = imageUrl.split('/uploads/')[1];
      const filePath = path.join(__dirname, '../uploads', filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (err) {
      console.error('Failed to delete old image file:', err);
    }
  }
};

// @desc    Get all projects
// @route   GET /api/projects
router.get('/', asyncHandler(async (req, res) => {
  res.json(await Project.find());
}));

// @desc    Create a project
// @route   POST /api/projects
router.post('/', adminAuth, asyncHandler(async (req, res) => {
  const { title, description, techs, live_link, github_link, is_featured, image } = req.body;
  const createdProject = await Project.create({
    title,
    description,
    techs,
    live_link,
    github_link,
    image,
    isFeatured: is_featured,
  });
  res.status(201).json(createdProject);
}));

// @desc    Delete a project
// @route   DELETE /api/projects/:id
router.delete('/:id', adminAuth, asyncHandler(async (req, res) => {
  const project = await Project.remove(req.params.id);
  if (project) {
    if (project.image) deleteOldImage(project.image);
    res.json({ message: 'Project removed' });
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
}));

// @desc    Get single project
// @route   GET /api/projects/:id
router.get('/:id', asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
}));

// @desc    Update a project
// @route   PUT /api/projects/:id
router.put('/:id', adminAuth, upload.single('image'), asyncHandler(async (req, res) => {
  const { title, description, techs, live_link, github_link, is_featured } = req.body;
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  const patch = {};
  if (title) patch.title = title;
  if (description) patch.description = description;
  if (techs) patch.techs = techs;
  if (live_link !== undefined) patch.live_link = live_link;
  if (github_link !== undefined) patch.github_link = github_link;
  if (is_featured !== undefined) patch.isFeatured = is_featured === 'true' || is_featured === true;

  if (req.file) {
    if (project.image) deleteOldImage(project.image);
    patch.image = `/uploads/${req.file.filename}`;
  }

  res.json(await Project.update(req.params.id, patch));
}));

module.exports = router;
