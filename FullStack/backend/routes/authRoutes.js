// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Route for user registration
router.post("/register", authController.register.bind(authController));

// Route for user login
router.post("/login", authController.login.bind(authController));

module.exports = router;
