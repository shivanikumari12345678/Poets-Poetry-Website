const mongoose = require('mongoose');

const MembershipSchema = new mongoose.Schema({
  memberId: {
    type: String,
    required: true,
    unique: true,
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
  city: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
    required: true,
    enum: ['साधारण सदस्य (₹500/वर्ष)', 'विशेष सदस्य (₹1,500/वर्ष)', 'संरक्षक सदस्य (₹5,000/आजीवन)'],
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['completed', 'pending', 'failed'],
    default: 'completed',
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

module.exports = mongoose.model('Membership', MembershipSchema);
