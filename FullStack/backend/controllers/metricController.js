const MetricsService = require("../services/metricService");

class MetricsController {
  async getMetrics(req, res) {
    const { departmentId, teamId } = req.query; // Read from request body
    try {
      const teamIds = teamId ? [Number(teamId)] : []; // Convert teamId to an array if present
      const metrics = await MetricsService.getMetrics(departmentId, teamIds);
      res.status(200).json(metrics);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching metrics." });
    }
  }
}

module.exports = new MetricsController();
