const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  hashed_ip: { type: String, required: true, index: true },
  country: { type: String, default: 'Unknown' },
  city: { type: String, default: 'Unknown' },
  userAgent: { type: String, default: '' },
  path: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, index: true },
});

visitorSchema.index({ createdAt: -1 });
visitorSchema.index({ hashed_ip: 1, createdAt: -1 });

module.exports = mongoose.model('Visitor', visitorSchema);
