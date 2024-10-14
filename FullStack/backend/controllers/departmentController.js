const departmentService = require("../services/departmentService");

class DepartmentController {
  async getDepartments(req, res) {
    try {
      const departments = await departmentService.getAllDepartments();
      res.status(200).json(departments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createDepartment(req, res) {
    try {
      const newDepartment = await departmentService.createDepartment(req.body);
      res.status(201).json(newDepartment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateDepartment(req, res) {
    const { id, name } = req.body;
    try {
      const updatedDepartment = await departmentService.updateDepartment(
        id,
        name
      );
      res.status(200).json(updatedDepartment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteDepartment(req, res) {
    const { id } = req.params;
    try {
      await departmentService.deleteDepartment(id);
      res.status(204).send(); // No content
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new DepartmentController();
