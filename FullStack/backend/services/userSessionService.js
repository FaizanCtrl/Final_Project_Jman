// UserSessionService.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class UserSessionService {
  async createSession(userId, duration) {
    return await prisma.userSession.create({
      data: {
        userId,
        duration,
      },
    });
  }

  async updateSessionDuration(userId, duration) {
    // Check if a session already exists for the user
    const existingSession = await prisma.userSession.findFirst({
      where: { userId },
    });

    if (existingSession) {
      // Add the new duration to the existing duration
      const updatedDuration = existingSession.duration + duration;

      return await prisma.userSession.update({
        where: { id: existingSession.id },
        data: { duration: updatedDuration }, // Update to the new total duration
      });
    }

    // If no existing session, create a new one
    return await prisma.userSession.create({
      data: {
        userId,
        duration, // Store the initial duration
      },
    });
  }
}

module.exports = new UserSessionService();
