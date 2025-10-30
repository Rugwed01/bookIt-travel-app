const express = require('express');
const router = express.Router();

// Import route files
router.use('/experiences', require('./experiences.routes'));
router.use('/bookings', require('./bookings.routes'));
router.use('/promo', require('./promo.routes'));

module.exports = router;