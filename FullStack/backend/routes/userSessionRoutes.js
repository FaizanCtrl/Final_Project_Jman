// userSessionRoutes.js
const express = require('express');
const router = express.Router();
const UserSessionController = require('../controllers/UserSessionController');

// Define a route to log user sessions
router.post('/log', UserSessionController.logSession);

module.exports = router;
