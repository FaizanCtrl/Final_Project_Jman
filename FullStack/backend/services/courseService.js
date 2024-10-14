const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class CourseService {
  async createCourse(data) {
    return await prisma.course.create({ data });
  }

  async getAllCourses() {
    return await prisma.course.findMany();
  }

  async getCourseById(id) {
    return await prisma.course.findUnique({
      where: { id: Number(id) },
      include: { learningMaterials: true },
    });
  }

  async createPost(courseId, userId, content) {
    // Create a new post associated with a course

    const post = await prisma.post.create({
      data: {
        courseId: courseId,
        userId: userId,
        content: content,
      },
    });
    return post;
  }

  async getAllPosts(courseId) {
    try {
      const posts = await prisma.post.findMany({
        where: { courseId },
        include: { user: true }, // Assuming you want to include user details
      });
      return posts;
    } catch (error) {
      throw new Error("Error fetching posts: " + error.message);
    }
  }

  async createFeedback(courseId, userId, content, rating) {
    try {
      const feedback = await prisma.feedback.create({
        data: {
          courseId: parseInt(courseId, 10), // Ensure courseId is an integer
          userId: parseInt(userId, 10), // Ensure userId is an integer
          content: content,
          rating: rating,
        },
      });
      return feedback;
    } catch (error) {
      throw new Error("Error creating feedback: " + error.message);
    }
  }

  async getCoursesByUserId(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        team: {
          include: {
            Course: {
              include: {
                learningMaterials: {
                  include: {
                    progress: true,
                  },
                },
              },
            }, // Include courses from the user's team
          },
        },
      },
    });

    if (!user || !user.team) {
      throw new Error("User or team not found");
    }

    return user.team.Course; // Return courses associated with the user's team
  }
}

module.exports = new CourseService();
