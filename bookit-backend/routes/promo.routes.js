const express = require('express');
const router = express.Router();
const controller = require('../controllers/promo.controller');

// POST /api/promo/validate
router.post('/validate', controller.validatePromoCode);

module.exports = router;