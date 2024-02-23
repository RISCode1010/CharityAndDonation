const mongoose = require('mongoose');

// Campaign schema
const campaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization', // Reference to the charitable organization running the campaign
    required: true,
  },
  donations: [       //====
    {
      type: mongoose.Types.ObjectId,
      ref: "Donation",
    },
  ],
  goalAmount: {
    type: Number,
    required: true,
  },
  currentAmount: {
    type: Number,
    default: 0,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'expired'],
    default: 'active',
  },
  campaignMedia: {
    images: [String], // Store URLs to campaign images
    videos: [String], // Store URLs to campaign videos
  },
  campaignTags: [String], // Store campaign tags as an array of strings
  location: {
    city: String,
    state: String,
    country: String,
  },
});

// Campaign model
const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;
