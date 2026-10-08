const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  titleHi: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['online', 'offline', 'competition'],
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  venueHi: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  descriptionHi: {
    type: String,
    required: true,
  },
  badge: {
    type: String,
    default: 'Upcoming',
  },
  badgeHi: {
    type: String,
    default: 'आगामी',
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Event', EventSchema);
