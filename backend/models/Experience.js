const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  companyUrl: String,
  period: String,
  type: String,
  location: String,
  summary: String,
  achievements: { type: [String], default: [] },
  technologies: { type: [String], default: [] },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);
