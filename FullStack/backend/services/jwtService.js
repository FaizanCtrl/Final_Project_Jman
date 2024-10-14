const jwt = require("jsonwebtoken");
require("dotenv").config();

class JwtService {
  generateToken(employee) {
    return jwt.sign(
      { id: employee.id, email: employee.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}

module.exports = new JwtService();
