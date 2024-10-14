// controllers/authController.js
const authService = require("../services/authService");

class AuthController {
  async register(req, res) {
    try {
      const { email, password, name, departmentId, teamId } = req.body;

      // validation
      if (!email || !email.includes("@")) {
        return res.status(400).json({ error: "Invalid email format" });
      }
      if (!password || password.length < 6) {
        return res
          .status(400)
          .json({ error: "Password must be at least 6 characters long" });
      }
      if (!name) {
        return res.status(400).json({ error: "Name is required" });
      }
      if (!departmentId || isNaN(departmentId)) {
        return res
          .status(400)
          .json({ error: "Department ID must be a valid number" });
      }
      if (!teamId || isNaN(teamId)) {
        return res
          .status(400)
          .json({ error: "Team ID must be a valid number" });
      }

      const user = await authService.register(
        name,
        email,
        password,
        parseInt(departmentId),
        parseInt(teamId)
      );
      res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const userResponse = await authService.login(email, password);
      res.status(200).json(userResponse);
    } catch (error) {
      if (error.message === "Invalid credentials") {
        return res.status(401).send("Invalid credentials");
      }
      res.status(500).json({ error: error.message });
    }
  }
}

// Export an instance of AuthController
module.exports = new AuthController();
