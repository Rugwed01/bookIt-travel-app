const express = require('express');
const router = express.Router();
const controller = require('../controllers/booking.controller');

// POST /api/bookings
router.post('/', controller.createBooking);

module.exports = router;