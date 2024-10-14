const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class LearningMaterialService {
  async createLearningMaterial(data) {
    return await prisma.learningMaterial.create({ data });
  }

  async getLearningMaterialsByCourseId(courseId) {
    return await prisma.learningMaterial.findMany({
      where: { courseId: Number(courseId) },
    });
  }

  async getLearningMaterial(courseId, learningMaterialId) {
    try {
      const material = await prisma.learningMaterial.findUnique({
        where: {
          id: parseInt(learningMaterialId),
        },
        include: {
          progress: {
            where: {
              userId: parseInt(courseId), // Assuming courseId is being used as userId here
            },
          },
        },
      });
      return material;
    } catch (error) {
      console.error("Error fetching learning material:", error);
      throw new Error("Failed to fetch learning material");
    }
  }
  async markAsComplete(courseId, learningMaterialId, userId) {
    try {
      // Validate that the userId and learningMaterialId are integers
      const userIdInt = parseInt(userId);
      const learningMaterialIdInt = parseInt(learningMaterialId);

      // Ensure both userId and learningMaterialId are valid
      if (isNaN(userIdInt) || isNaN(learningMaterialIdInt)) {
        throw new Error("Invalid user ID or learning material ID");
      }

      const progress = await prisma.userProgress.upsert({
        where: {
          userId_learningMaterialId: {
            userId: userIdInt,
            learningMaterialId: learningMaterialIdInt,
          },
        },
        update: {
          completed: true,
          completedAt: new Date(),
        },
        create: {
          userId: userIdInt,
          learningMaterialId: learningMaterialIdInt,
          completed: true,
          completedAt: new Date(),
        },
      });

      return progress;
    } catch (error) {
      console.error("Error marking learning material as complete:", error);
      throw new Error("Failed to mark as complete");
    }
  }
}

module.exports = new LearningMaterialService();
