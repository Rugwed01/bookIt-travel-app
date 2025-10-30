const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: [true, 'User email is required'],
    trim: true,
    lowercase: true,
  },
  userName: {
    type: String,
    required: [true, 'User name is required'],
  },
  experience: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experience',
    required: true,
  },
  slot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Slot',
    required: true,
  },
  numberOfGuests: {
    type: Number,
    required: true,
    min: 1,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  bookingReference: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'confirmed',
  },
}, { timestamps: true });

// Prevent duplicate bookings for the same user and slot
// This compound index enforces uniqueness of (userEmail, experience, slot)
BookingSchema.index({ userEmail: 1, experience: 1, slot: 1 }, { unique: true });

module.exports = mongoose.model('Booking', BookingSchema);