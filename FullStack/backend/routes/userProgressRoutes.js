const express = require("express");
const router = express.Router();
const userProgressController = require("../controllers/userProgressController");

router.post("/", userProgressController.trackProgress);
router.get("/:userId/:learningMaterialId", userProgressController.getProgress);

module.exports = router;
