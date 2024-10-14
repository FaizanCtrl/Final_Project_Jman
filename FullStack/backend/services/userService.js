const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id: Number(id) },
    include: {
      department: true,
      team: true,
      Result: true,
      Post: true,
      Feedback: true,
      UserProgress: {
        include: {
          learningMaterial: true,
        },
      },
      UserSession: true,
      // Include courses and learning materials
      team: {
        include: {
          Course: {
            include: {
              learningMaterials: {
                include: {
                  progress: {
                    where: {
                      userId: Number(id),
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
};

exports.getAllUser = async () => {
  return await prisma.user.findMany({
    include: {
      department: true,
      team: true,
    },
  });
};

// Additional service functions for courses, quizzes, and feedback can be added similarly.
