const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
  experience: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experience',
    required: true,
    index: true, // Index for faster queries by experience
  },
  startTime: {
    type: Date,
    required: true,
  },
  totalCapacity: {
    type: Number,
    required: true,
    min: 1,
  },
  bookedCount: {
    type: Number,
    default: 0,
    validate: {
      validator: function (value) {
        // 'this' refers to the document being validated
        return value <= this.totalCapacity;
      },
      message: 'Booked count cannot exceed total capacity',
    },
  },
}, { timestamps: true });

// Virtual property to check if slot is full
SlotSchema.virtual('isFull').get(function () {
  return this.bookedCount >= this.totalCapacity;
});

module.exports = mongoose.model('Slot', SlotSchema);