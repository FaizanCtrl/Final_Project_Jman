const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JwtService = require("./jwtService");
const prisma = new PrismaClient();

class AuthService {
  async verifyToken(token) {
    if (!token) {
      throw new Error("No token provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async register(name, email, password, departmentId, teamId) {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User already exists with this email.");
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database using Prisma
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        departmentId: departmentId,
        teamId: teamId
      },
    });

    return { id: user.id, email: user.email };
  }

  async login(email, password) {
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Check if the user exists and if the password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }

    // Generate a JWT token
    const token = JwtService.generateToken(user);

    // Return user details along with the token
    return { token,id: user.id, isAdmin: user.isAdmin, name: user.name };
  }
}

module.exports = new AuthService();
