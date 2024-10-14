const { PrismaClient } = require("@prisma/client");
const faker = require("faker");

const prisma = new PrismaClient();

const seedDatabase = async () => {
  // Create Departments
  const departments = await Promise.all(
    Array.from({ length: 3 }).map(() =>
      prisma.department.create({
        data: {
          name: faker.commerce.department(),
        },
      })
    )
  );

  // Create Teams
  const teams = await Promise.all(
    Array.from({ length: 5 }).map(() =>
      prisma.team.create({
        data: {
          name: faker.commerce.productName(),
          departmentId: faker.random.arrayElement(departments).id,
        },
      })
    )
  );

  // Create Users
  const users = await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.user.create({
        data: {
          name: faker.name.findName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          isAdmin: faker.random.boolean(),
          departmentId: faker.random.arrayElement(departments).id,
          teamId: faker.random.arrayElement(teams).id,
        },
      })
    )
  );

  // Create Courses
  const courses = await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.course.create({
        data: {
          name: faker.company.bs(),
          content: faker.lorem.paragraph(),
          teamId: faker.random.arrayElement(teams).id,
        },
      })
    )
  );

  // Create Learning Materials
  const learningMaterials = await Promise.all(
    Array.from({ length: 20 }).map(() =>
      prisma.learningMaterial.create({
        data: {
          title: faker.lorem.words(3),
          type: "article",
          content: faker.lorem.paragraph(),
          courseId: faker.random.arrayElement(courses).id,
        },
      })
    )
  );

  // Create Quizzes
  const quizzes = await Promise.all(
    Array.from({ length: 5 }).map(() =>
      prisma.quiz.create({
        data: {
          courseId: faker.random.arrayElement(courses).id,
        },
      })
    )
  );

  // Create Questions
  await Promise.all(
    quizzes.map((quiz) =>
      Promise.all(
        Array.from({ length: 4 }).map(() =>
          prisma.question.create({
            data: {
              quizId: quiz.id,
              questionText: faker.lorem.sentence(),
              answerA: faker.lorem.word(),
              answerB: faker.lorem.word(),
              answerC: faker.lorem.word(),
              answerD: faker.lorem.word(),
              correctAnswer: faker.random.number({ min: 0, max: 3 }),
            },
          })
        )
      )
    )
  );

  // Create User Progress
  await Promise.all(
    users.map((user) =>
      Promise.all(
        learningMaterials.map((material) =>
          prisma.userProgress.create({
            data: {
              userId: user.id,
              learningMaterialId: material.id,
              completed: faker.random.boolean(),
              completedAt: faker.random.boolean() ? faker.date.recent() : null,
            },
          })
        )
      )
    )
  );

  // Create Results
  await Promise.all(
    users.map((user) =>
      Promise.all(
        quizzes.map((quiz) =>
          prisma.result.create({
            data: {
              userId: user.id,
              quizId: quiz.id,
              score: faker.random.number({ min: 0, max: 100 }),
              totalScore: 100,
            },
          })
        )
      )
    )
  );

  // Create Feedbacks
  await Promise.all(
    users.map((user) =>
      Promise.all(
        courses.map((course) =>
          prisma.feedback.create({
            data: {
              content: faker.lorem.sentence(),
              rating: faker.random.number({ min: 1, max: 5 }),
              userId: user.id,
              courseId: course.id,
            },
          })
        )
      )
    )
  );

  // Create Posts
  await Promise.all(
    users.map((user) =>
      Promise.all(
        courses.map((course) =>
          prisma.post.create({
            data: {
              content: faker.lorem.paragraph(),
              userId: user.id,
              courseId: course.id,
            },
          })
        )
      )
    )
  );

  // Create User Sessions
  await Promise.all(
    users.map((user) =>
      prisma.userSession.create({
        data: {
          userId: user.id,
          startTime: faker.date.recent(),
          endTime: faker.random.boolean() ? faker.date.recent() : null,
          duration: faker.random.number({ min: 60, max: 3600 }), // duration in seconds
        },
      })
    )
  );

  console.log("Database seeding completed!");
};

seedDatabase()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
