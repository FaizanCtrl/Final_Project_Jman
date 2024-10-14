const authService = require("../services/authService");
const jwtService = require("../services/jwtService");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    // const decoded = jwtService.verifyToken(token);
    const user = await authService.verifyToken(token);
    req.user = user; // Attach the user to the request object
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token", message: error.message });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ error: "Access denied" });
  }
};

module.exports = { authenticate, isAdmin };
