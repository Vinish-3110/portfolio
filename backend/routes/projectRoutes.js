const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const asyncHandler = require('express-async-handler');

// @desc    Get all projects
// @route   GET /api/projects
router.get('/', asyncHandler(async (req, res) => {
  const projects = await Project.find({});
  res.json(projects);
}));

// @desc    Create a project
// @route   POST /api/projects
router.post('/', asyncHandler(async (req, res) => {
  const { title, description, techs, live_link, github_link, is_featured } = req.body;
  const project = new Project({
    title,
    description,
    techs,
    links: {
      live: live_link,
      github: github_link
    },
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
    await project.deleteOne();
    res.json({ message: 'Project removed' });
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
}));

module.exports = router;
