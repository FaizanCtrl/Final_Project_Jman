const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");
const { authenticate } = require("../middleware/authMiddleware");
// Get all departments
router.get("/", departmentController.getDepartments);

// Create a new department
router.post("/create", authenticate, departmentController.createDepartment);

// Update a department by ID
router.put("/:id/update", authenticate, departmentController.updateDepartment);

// Delete a department by ID
router.delete(
  "/:id/delete",
  authenticate,
  departmentController.deleteDepartment
);

module.exports = router;
