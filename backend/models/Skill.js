const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: String,
  focus: String,
  category: {
    type: String,
    enum: ['frontend', 'backend', 'database', 'devops'],
    default: 'frontend',
  },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
