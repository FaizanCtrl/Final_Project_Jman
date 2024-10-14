const userProgressService = require("../services/userProgressService");

class UserProgressController {
  async trackProgress(req, res) {
    try {
      const progress = await userProgressService.trackProgress(req.body);
      res.status(201).json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to track progress" });
    }
  }

  async getProgress(req, res) {
    try {
      const progress = await userProgressService.getProgressByUserAndMaterial(
        req.params.userId,
        req.params.learningMaterialId
      );
      if (!progress)
        return res.status(404).json({ error: "Progress not found" });
      res.status(200).json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve progress" });
    }
  }
}

module.exports = new UserProgressController();
