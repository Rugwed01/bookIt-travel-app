const express = require('express');
const router = express.Router();
const controller = require('../controllers/experience.controller');

// GET /api/experiences
router.get('/', controller.getAllExperiences);

// GET /api/experiences/:id
router.get('/:id', controller.getExperienceById);

module.exports = router;