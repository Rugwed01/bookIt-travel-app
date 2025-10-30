const Experience = require('../models/experience.model');
const Slot = require('../models/slot.model.js');

// @desc    Get all experiences (basic info)
// @route   GET /api/experiences
exports.getAllExperiences = async (req, res) => {
  try {
    // Select only the fields needed for the list view
    const experiences = await Experience.find().select(
      'title price thumbnailUrl location duration'
    );
    res.status(200).json({ success: true, data: experiences });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get a single experience by ID (detailed info)
// @route   GET /api/experiences/:id
exports.getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res
        .status(404)
        .json({ success: false, message: 'Experience not found' });
    }

    // Find available slots for this experience
    // We only show slots that are in the future and not full
    const availableSlots = await Slot.find({
      experience: experience._id,
      startTime: { $gt: new Date() },
      // Check if bookedCount is less than totalCapacity
      $expr: { $lt: ['$bookedCount', '$totalCapacity'] },
    }).sort('startTime');

    res.status(200).json({
      success: true,
      data: {
        ...experience.toObject(), // Convert mongoose doc to plain object
        slots: availableSlots,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};