const quizService = require("../services/quizService");

class QuizController {
  async createQuiz(req, res) {
    try {
      const quiz = await quizService.createQuiz(req.body);
      res.status(201).json(quiz);
    } catch (error) {
      res.status(500).json({ error: "Failed to create quiz" });
    }
  }

  async getQuiz(req, res) {
    try {
      const quiz = await quizService.getQuizByLearningMaterialId(
        req.params.learningMaterialId
      );
      if (!quiz) return res.status(404).json({ error: "Quiz not found" });
      res.status(200).json(quiz);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve quiz" });
    }
  }

  // Fetch quiz questions for a course
  async getQuizByCourse(req, res) {
    const { courseId } = req.params;

    try {
      const questions = await quizService.getQuizQuestions(courseId);
      // console.log(questions);
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async checkAttempt(req, res) {
    const { quizId } = req.params;
    const userId = req.user.id;
    // console.log(quizId, userId);
    const attempt = await quizService.checkQuizAttempt(
      parseInt(userId),
      parseInt(quizId)
    );
    if (attempt) {
      return res.json({ attempted: true, score: attempt.score });
    }
    return res.json({ attempted: false });
  }

  // Save quiz result
  async saveQuizResult(req, res) {
    const { quizId, score, totalScore } = req.body;
    const userId = req.user.id;
    try {
      const result = await quizService.saveResult({
        userId,
        quizId,
        score,
        totalScore,
      });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getQuizResults(req, res) {
    try {
      const userId = parseInt(req.params.userId);
      const results = await quizService.getQuizResults(userId);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new QuizController();
