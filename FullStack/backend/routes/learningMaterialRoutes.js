const express = require("express");
const router = express.Router();
const learningMaterialController = require("../controllers/learningMaterialController");

// router.post("/", learningMaterialController.createLearningMaterial);
// router.get("/:courseId", learningMaterialController.getLearningMaterials);
// router.post('/courses/:courseId/learningMaterial/:learningMaterialId/complete', learningMaterialController.markAsComplete);

router.get('/courses/:courseId/learningMaterial/:learningMaterialId', learningMaterialController.getLearningMaterial);
router.post('/courses/:courseId/learningMaterial/:learningMaterialId/complete', learningMaterialController.markAsComplete);

module.exports = router;
