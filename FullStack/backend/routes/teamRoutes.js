const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");
const { authenticate, isAdmin } = require("../middleware/authMiddleware");
// Get all teams
router.get("/", teamController.getTeams);
router.get("/:departmentId", teamController.getTeamsByDepartment);

// Create a new team
router.post("/create", authenticate, teamController.createTeam);

// Update a team by ID
router.put("/:id/update", authenticate, teamController.updateTeam);

// Delete a team by ID
router.delete("/:id/delete", authenticate, teamController.deleteTeam);

module.exports = router;
