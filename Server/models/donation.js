const mongoose = require('mongoose');

// Donation schema
const donationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true,
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization', // Reference to the charitable organization running the campaign
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // paymentMethod: {
  //   type: String,
  //   enum: ['credit_card', 'paypal', 'bank_transfer', 'other'],
  //   required: true,
  // },
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
  },
  message: {
    type: String,
  },
  transactionId: {
    type: String,
    required: true,
  },
  // currency: {
  //   type: String,
  //   required: true,
  // },
});

// Donation model
const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
