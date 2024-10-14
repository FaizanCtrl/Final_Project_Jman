const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class MetricsService {
  async getMetrics(departmentId, teamIds) {
    try {
      const whereConditions = {};

      if (departmentId) {
        whereConditions.departmentId = Number(departmentId);
      }

      if (teamIds.length > 0) {
        whereConditions.id = { in: teamIds };
      }

      const teams = await prisma.team.findMany({
        where: whereConditions,
        include: {
          users: true, // Include users
          Course: {
            include: {
              learningMaterials: {
                include: {
                  progress: true,
                },
              },
              Quiz: {
                include: {
                  Result: true,
                },
              },
              Feedback: true,
            },
          },
        },
      });

      return this.calculateMetrics(teams);
    } catch (error) {
      console.error("Error fetching metrics:", error);
      throw new Error("Failed to fetch metrics");
    }
  }

  calculateMetrics(teams) {
    // If no teams, return empty metrics
    if (teams.length === 0) return [];

    return teams.map((team) => {
      const courses = team.Course.map((course) => {
        const totalLearningMaterials = course.learningMaterials.length;
        const totalUsers = team.users.length; // Now this should work

        // Count total completions across all users for the course
        let totalCompletedMaterials = 0;

        // Loop through each user in the team
        for (const user of team.users) {
          // Count how many materials this user has completed
          const completedByUser = course.learningMaterials.reduce(
            (count, material) => {
              const progressEntry = material.progress.find(
                (p) => p.userId === user.id
              );
              return count + (progressEntry && progressEntry.completed ? 1 : 0);
            },
            0
          );

          totalCompletedMaterials += completedByUser; // Accumulate the count
        }

        // Calculate overall completion rate
        const completionRate =
          totalUsers > 0 && totalLearningMaterials > 0
            ? (totalCompletedMaterials /
                (totalUsers * totalLearningMaterials)) *
              100
            : 0;

        const totalScore = course.Quiz.reduce(
          (sum, quiz) =>
            sum +
            quiz.Result.reduce((quizSum, result) => quizSum + result.score, 0),
          0
        );

        const totalResults = course.Quiz.reduce(
          (sum, quiz) => sum + quiz.Result.length,
          0
        );

        const averageScore = totalResults ? totalScore / totalResults : 0;

        const totalRating = course.Feedback.reduce(
          (sum, feedback) => sum + feedback.rating,
          0
        );
        const averageRating = course.Feedback.length
          ? totalRating / course.Feedback.length
          : 0;

        return {
          id: course.id,
          name: course.name,
          completionRate,
          averageScore,
          averageRating,
        };
      });

      return {
        teamId: team.id,
        courses,
      };
    });
  }
}

module.exports = new MetricsService();
