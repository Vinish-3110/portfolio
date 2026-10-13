const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  value: String,
  label: String,
  sub: String,
}, { _id: false });

const profileSchema = new mongoose.Schema({
  resume_url: String,
  theme_color: { type: String, default: '#b87af0' },
  owner_email: { type: String, unique: true, default: 'admin@portfolio.com' },
  display_name: String,
  availability: String,
  role_badge: String,
  headline_before: String,
  headline_highlight: String,
  headline_after: String,
  hero_description: String,
  about_heading: String,
  about_paragraphs: { type: [String], default: undefined },
  stats: { type: [statSchema], default: undefined },
  email: String,
  phone: String,
  linkedin: String,
  github: String,
  engineer_name: String,
  discipline: String,
  experience_label: String,
  core_focus: String,
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
