const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/:id", userController.getUserById);
router.get("/", userController.getAllUser);

// Additional routes for courses, quizzes, and feedback can be added similarly.

module.exports = router;
