const teamService = require("../services/teamService");

class TeamController {
  async getTeams(req, res) {
    try {
      const teams = await teamService.getAllTeams();
      res.status(200).json(teams);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTeamsByDepartment(req, res) {
    const departmentId = req.params.departmentId
      ? parseInt(req.params.departmentId)
      : null;
    try {
      const teams = await teamService.getAllTeamsByDepartment(departmentId);
      return res.status(200).json(teams);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async createTeam(req, res) {
    try {
      const newTeam = await teamService.createTeam(req.body);
      res.status(201).json(newTeam);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateTeam(req, res) {
    const { id } = req.params;
    try {
      const updatedTeam = await teamService.updateTeam(id, req.body);
      res.status(200).json(updatedTeam);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteTeam(req, res) {
    const { id } = req.params;
    try {
      await teamService.deleteTeam(id);
      res.status(204).send(); // No content
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new TeamController();
