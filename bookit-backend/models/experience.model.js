const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
  },
  duration: {
    type: String, // e.g., "3 hours", "Full day"
    required: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
  imageUrls: [String],
  category: {
    type: String,
    enum: ['Adventure', 'Cultural', 'Relaxation', 'Food & Drink'],
    default: 'Adventure',
  },
}, { timestamps: true });

module.exports = mongoose.model('Experience', ExperienceSchema);