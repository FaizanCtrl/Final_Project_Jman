const courseService = require("../services/courseService");

class CourseController {
  async createCourse(req, res) {
    try {
      const course = await courseService.createCourse(req.body);
      res.status(201).json(course);
    } catch (error) {
      res.status(500).json({ error: "Failed to create course" });
    }
  }

  async getAllCourses(req, res) {
    try {
      const courses = await courseService.getAllCourses();
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve courses" });
    }
  }

  async getCourseById(req, res) {
    try {
      const course = await courseService.getCourseById(req.params.id);
      if (!course) return res.status(404).json({ error: "Course not found" });
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve course" });
    }
  }

  async createPost(req, res) {
    const courseId = parseInt(req.params.id);
    const { content } = req.body;
    const userId = parseInt(req.user.id); // Get user ID from the auth middleware

    try {
      const newPost = await courseService.createPost(courseId, userId, content);
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllPosts(req, res) {
    const courseId = parseInt(req.params.id); // Get course ID from the URL parameters

    try {
      const posts = await courseService.getAllPosts(courseId);
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async submitFeedback(req, res) {
    const courseId = parseInt(req.params.id, 10); // Get courseId from params
    const userId = req.user.id; // Get userId from authenticated user
    const { content, rating } = req.body; // Get feedback content from request body

    try {
      const newFeedback = await courseService.createFeedback(
        courseId,
        userId,
        content,
        rating
      );
      res.status(201).json(newFeedback);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCoursesByUserId(req, res) {
    const userId = parseInt(req.user.id); // Get user ID from the auth middleware
    // console.log(userId)
    try {
      const courses = await courseService.getCoursesByUserId(userId);
      res.status(200).json(courses);
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new CourseController();
