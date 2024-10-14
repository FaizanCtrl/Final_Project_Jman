const learningMaterialService = require("../services/learningMaterialService");

class LearningMaterialController {
  async createLearningMaterial(req, res) {
    try {
      const learningMaterial =
        await learningMaterialService.createLearningMaterial(req.body);
      res.status(201).json(learningMaterial);
    } catch (error) {
      res.status(500).json({ error: "Failed to create learning material" });
    }
  }

  async getLearningMaterial(req, res) {
    const { courseId, learningMaterialId } = req.params;

    try {
      const material = await learningMaterialService.getLearningMaterial(
        courseId,
        learningMaterialId
      );
      res.json(material);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  async markAsComplete(req, res) {
    const { courseId, learningMaterialId } = req.params;
    console.log("req", req.user.id);
    const userId = req.user.id; // Expect userId in request body
    console.log(
      "userId:",
      userId,
      "learningMaterialId:",
      learningMaterialId,
      courseId
    );

    try {
      const progress = await learningMaterialService.markAsComplete(
        courseId,
        learningMaterialId,
        userId
      );
      res.json(progress);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new LearningMaterialController();
