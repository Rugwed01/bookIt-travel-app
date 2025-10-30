const Booking = require('../models/booking.model');
const Slot = require('../models/slot.model');
const Experience = require('../models/experience.model');
const { nanoid } = require('nanoid');
const mongoose = require('mongoose');

// @desc    Create a new booking
// @route   POST /api/bookings
exports.createBooking = async (req, res) => {
  const {
    userEmail,
    userName,
    experienceId,
    slotId,
    numberOfGuests,
  } = req.body;

  // 1. Basic field validation
  if (!userEmail || !userName || !experienceId || !slotId || !numberOfGuests) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }
  
  if (parseInt(numberOfGuests) < 1) {
    return res.status(400).json({ success: false, message: 'Number of guests must be at least 1' });
  }

  // We MUST use a transaction here.
  // This ensures that checking capacity, creating the booking, and
  // updating the slot's bookedCount happen "atomically".
  // If any step fails, the whole process rolls back.
  
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 2. Find documents within the transaction session
    const slot = await Slot.findById(slotId).session(session);
    const experience = await Experience.findById(experienceId).session(session);

    // 3. Validation checks
    if (!slot || !experience) {
      throw new Error('Invalid experience or slot ID');
    }

    if (slot.experience.toString() !== experience._id.toString()) {
      throw new Error('Slot does not belong to the specified experience');
    }

    // 4. Check duplicate booking by same user for same slot (idempotency/anti-double-booking)
    const existing = await Booking.findOne({
      userEmail: String(userEmail).toLowerCase(),
      experience: experienceId,
      slot: slotId,
    }).session(session);
    if (existing) {
      throw new Error('You have already booked this slot.');
    }

    // 5. THE CRITICAL BUSINESS LOGIC: Check availability
    const newBookedCount = slot.bookedCount + numberOfGuests;
    if (newBookedCount > slot.totalCapacity) {
      throw new Error('Not enough capacity for this slot. Please try a different slot or fewer guests.');
    }

    // 6. Update the slot's booked count
    slot.bookedCount = newBookedCount;
    await slot.save({ session });

    // 7. Create the new booking
    const totalPrice = experience.price * numberOfGuests;
    const bookingReference = `BKT-${nanoid(8).toUpperCase()}`;

    const newBooking = new Booking({
      userEmail,
      userName,
      experience: experienceId,
      slot: slotId,
      numberOfGuests,
      totalPrice,
      bookingReference,
    });

    await newBooking.save({ session });

    // 8. If all successful, commit the transaction
    await session.commitTransaction();

    // 9. Send success response to the client
    res.status(201).json({
      success: true,
      message: 'Booking confirmed!',
      data: newBooking,
    });

  } catch (error) {
    // 10. If any error occurred, abort the transaction
    await session.abortTransaction();
    
    // Send a specific error message if it's one we threw
    const knownErrors = [
      'Invalid experience or slot ID',
      'Slot does not belong to the specified experience',
      'Not enough capacity for this slot. Please try a different slot or fewer guests.',
      'You have already booked this slot.'
    ];

    if (knownErrors.includes(error.message)) {
      return res.status(409).json({ success: false, message: error.message }); // 409 Conflict is appropriate here
    }

    // Otherwise, send a generic server error
    // Handle duplicate key error from unique index as duplicate booking
    if (error && error.code === 11000) {
      return res.status(409).json({ success: false, message: 'You have already booked this slot.' });
    }
    res.status(500).json({ success: false, message: `Booking failed: ${error.message}` });

  } finally {
    // 11. Always end the session
    session.endSession();
  }
};