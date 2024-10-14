// UserSessionController.js
const UserSessionService = require("../services/UserSessionService");

class UserSessionController {
  async logSession(req, res) {
    const { userId, duration } = req.body; // Get userId and duration from the request body
    // console.log(userId, duration);
    try {
      const session = await UserSessionService.updateSessionDuration(
        userId,
        duration
      );
      res.status(200).json(session);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while logging the session." });
    }
  }
}

module.exports = new UserSessionController();
