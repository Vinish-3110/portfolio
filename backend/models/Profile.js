const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  resume_url: String,
  theme_color: { type: String, default: '#b87af0' },
  owner_email: { type: String, unique: true, default: 'admin@portfolio.com' }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
