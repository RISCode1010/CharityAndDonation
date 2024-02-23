const mongoose = require('mongoose');

// Content schema
const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user who authored the content
    required: true,
  },
  publicationDate: {
    type: Date,
    default: Date.now,
  },
  tags: [String], // Store content tags as an array of strings
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the user who made the comment
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the user who liked the content
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  views: {
    type: Number,
    default: 0,
  },
  attachments: [
    {
      filename: String, // filename of the attachment
      path: String, // URL of the attachment
      mimeType: String, // (e.g., image/jpeg, application/pdf)
    },
  ],
});

// Content model
const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
