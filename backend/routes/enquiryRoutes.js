const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');
const asyncHandler = require('express-async-handler');
const adminAuth = require('../middleware/adminAuth');

// @desc    Submit enquiry
// @route   POST /api/enquiries
router.post('/', asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;
  const enquiry = new Enquiry({ name, email, message });
  await enquiry.save();
  res.status(201).json({ message: 'Enquiry received' });
}));

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Admin
router.get('/', adminAuth, asyncHandler(async (req, res) => {
  const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
  res.json(enquiries);
}));

router.delete('/:id', adminAuth, asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id);
  if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
  await enquiry.deleteOne();
  res.json({ message: 'Enquiry removed' });
}));

module.exports = router;
