const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const { authenticate } = require("../middleware/authMiddleware");

// router.post("/", courseController.createCourse);
router.get("/", courseController.getAllCourses);
router.get('/user', courseController.getCoursesByUserId);
router.get("/:id", courseController.getCourseById);
router.post("/:id/posts", authenticate, courseController.createPost);
router.get("/:id/posts", authenticate, courseController.getAllPosts);
router.post("/:id/feedback", authenticate, courseController.submitFeedback);

module.exports = router;
