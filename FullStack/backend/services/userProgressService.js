const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class UserProgressService {
  async trackProgress(data) {
    return await prisma.userProgress.create({ data });
  }

  async getProgressByUserAndMaterial(userId, learningMaterialId) {
    return await prisma.userProgress.findUnique({
      where: { userId_learningMaterialId: { userId, learningMaterialId } },
    });
  }

}

module.exports = new UserProgressService();
