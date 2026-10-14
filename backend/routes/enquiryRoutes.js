const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');
const asyncHandler = require('express-async-handler');
const adminAuth = require('../middleware/adminAuth');

// @desc    Submit enquiry
// @route   POST /api/enquiries
router.post('/', asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;
  await Enquiry.create({ name, email, message });
  res.status(201).json({ message: 'Enquiry received' });
}));

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Admin
router.get('/', adminAuth, asyncHandler(async (req, res) => {
  const enquiries = await Enquiry.find();
  res.json(enquiries);
}));

router.delete('/:id', adminAuth, asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.remove(req.params.id);
  if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
  res.json({ message: 'Enquiry removed' });
}));

module.exports = router;
