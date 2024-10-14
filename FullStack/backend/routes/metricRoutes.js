// metricsRoutes.js

const express = require("express");
const MetricsController = require("../controllers/metricController");

const router = express.Router();

// Route to get metrics by department
router.get("/", (req, res) => MetricsController.getMetrics(req, res));

module.exports = router;
