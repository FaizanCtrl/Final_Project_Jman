// routes/feedbackRoutes.js
const express = require('express');
const feedbackController = require('../controllers/feedbackController');
const router = express.Router();

router.get('/average-feedback',feedbackController.getAverageFeedback);

module.exports = router;
