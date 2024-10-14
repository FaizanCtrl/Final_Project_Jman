const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");

// Route to get quiz questions by course ID
router.get("/:courseId", quizController.getQuizByCourse);
// Route to save quiz result
router.post("/result", quizController.saveQuizResult);
router.get('/result/:quizId', quizController.checkAttempt);
router.get('/:userId/quizzes', quizController.getQuizResults);
module.exports = router;
