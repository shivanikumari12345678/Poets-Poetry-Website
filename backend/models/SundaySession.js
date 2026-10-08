const mongoose = require('mongoose');

const SundaySessionSchema = new mongoose.Schema({
  regId: {
    type: String,
    required: true,
    unique: true,
  },
  sessionNumber: {
    type: String,
    default: '249th International Sunday E-Goshthi',
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    default: 'India',
  },
  participantRole: {
    type: String,
    enum: ['listener', 'poet'],
    default: 'listener',
  },
  poemTitle: {
    type: String,
    default: '',
  },
  zoomLink: {
    type: String,
    default: 'https://us02web.zoom.us/j/82947192015?pwd=BulandiSahityaLive2026',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('SundaySession', SundaySessionSchema);
