const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const asyncHandler = require('express-async-handler');
const fs = require('fs');
const path = require('path');

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
  const projects = await Project.find({});
  res.json(projects);
}));

// @desc    Create a project
// @route   POST /api/projects
router.post('/', asyncHandler(async (req, res) => {
  const { title, description, techs, live_link, github_link, is_featured, image } = req.body;
  const project = new Project({
    title,
    description,
    techs,
    links: {
      live: live_link,
      github: github_link
    },
    image: image,
    isFeatured: is_featured
  });
  const createdProject = await project.save();
  res.status(201).json(createdProject);
}));

// @desc    Delete a project
// @route   DELETE /api/projects/:id
router.delete('/:id', asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (project) {
    if (project.image) {
      deleteOldImage(project.image);
    }
    await project.deleteOne();
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
router.put('/:id', asyncHandler(async (req, res) => {
  const { title, description, techs, live_link, github_link, is_featured, image } = req.body;
  const project = await Project.findById(req.params.id);

  if (project) {
    project.title = title || project.title;
    project.description = description || project.description;
    project.techs = techs || project.techs;
    if (project.links) {
      project.links.live = live_link !== undefined ? live_link : project.links.live;
      project.links.github = github_link !== undefined ? github_link : project.links.github;
    } else {
      project.links = { live: live_link, github: github_link };
    }
    project.isFeatured = is_featured !== undefined ? is_featured : project.isFeatured;
    
    // Clean up old image if a new one is provided and it differs
    if (image !== undefined && image !== project.image) {
      if (project.image) {
        deleteOldImage(project.image);
      }
      project.image = image;
    }

    const updatedProject = await project.save();
    res.json(updatedProject);
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
}));

module.exports = router;
