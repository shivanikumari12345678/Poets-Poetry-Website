const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  receiptId: {
    type: String,
    required: true,
    unique: true,
  },
  donorName: {
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
  amount: {
    type: Number,
    required: true,
  },
  cause: {
    type: String,
    default: 'General Cultural Corpus',
  },
  panNumber: {
    type: String,
    default: '',
  },
  transactionId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Donation', DonationSchema);
