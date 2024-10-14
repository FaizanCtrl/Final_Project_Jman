// services/FeedbackService.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class FeedbackService {
  async getAverageFeedback(userId) {
    const averageFeedbacks = await prisma.feedback.groupBy({
      by: ['courseId'],
      _avg: {
        rating: true,
      },
      where: {
        userId: parseInt(userId),
      },
    });

    const results = await Promise.all(
      averageFeedbacks.map(async (feedback) => {
        const course = await prisma.course.findUnique({
          where: { id: feedback.courseId },
          select: { name: true },
        });
        return {
          courseId: feedback.courseId,
          averageRating: feedback._avg.rating,
          courseName: course.name,
        };
      })
    );

    return results;
  }
}

module.exports = new FeedbackService();
