// controllers/FeedbackController.js
const feedbackService = require('../services/feedbackService');

class FeedbackController {
  async getAverageFeedback(req, res) {
    const  userId  = req.user.id;

    try {
      const results = await feedbackService.getAverageFeedback(userId);
      res.status(200).json(results);
    } catch (error) {
      console.error("Error fetching average feedback:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new FeedbackController();
