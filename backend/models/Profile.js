const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  resume_url: String,
  owner_email: { type: String, unique: true, default: 'admin@portfolio.com' }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
