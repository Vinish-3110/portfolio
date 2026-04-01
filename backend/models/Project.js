const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: [String], required: true },
  techs: { type: [String], required: true },
  links: {
    live: String,
    github: String,
    figma: String
  },
  image: String,
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
