const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class QuizService {
  async createQuiz(data) {
    return await prisma.quiz.create({ data });
  }

  async getQuizByLearningMaterialId(learningMaterialId) {
    return await prisma.quiz.findUnique({
      where: { learningMaterialId: Number(learningMaterialId) },
      include: { questions: true },
    });
  }

  // Fetch quiz questions by course ID
  async getQuizQuestions(courseId) {
    console.log(courseId);
    return prisma.quiz.findFirst({
      where: { courseId: parseInt(courseId) },
      include: {
        questions: true,
      },
    });
  }

  async checkQuizAttempt(userId, quizId) {
    return await prisma.result.findUnique({
      where: {
        userId_quizId: {
          userId: userId,
          quizId: quizId,
        },
      },
    });
  }
  // Save quiz result
  async saveResult({ userId, quizId, score, totalScore }) {
    return prisma.result.create({
      data: {
        userId,
        quizId,
        score,
        totalScore,
      },
    });
  }
  async getQuizResults(userId) {
    return await prisma.result.findMany({
      where: { userId },
      include: {
        quiz: {
          include: {
            course: true,
          },
        },
      }, // Include quiz details if needed
    });
  }
}

module.exports = new QuizService();
