const mongoose = require('mongoose');

const VolunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  role: { type: String, required: true },
  skills: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

const CollaborationSchema = new mongoose.Schema({
  institutionName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  designation: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  institutionType: { type: String, required: true },
  proposal: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = {
  Volunteer: mongoose.model('Volunteer', VolunteerSchema),
  Collaboration: mongoose.model('Collaboration', CollaborationSchema),
  Contact: mongoose.model('Contact', ContactSchema),
};
