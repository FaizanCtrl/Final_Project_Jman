const fakeQuizData = {
  1: {
    courseName: "Introduction to JavaScript",
    questions: [
      {
        id: 1,
        questionText: "What is a variable in JavaScript?",
        options: ["A function", "A value", "A container for data", "An object"],
        correctOption: 2, // Index of the correct option (zero-based)
      },
      {
        id: 2,
        questionText: "Which of the following is a JavaScript data type?",
        options: ["Array", "Number", "Method", "None of the above"],
        correctOption: 1,
      },
    ],
  },
  2: {
    courseName: "React for Beginners",
    questions: [
      {
        id: 3,
        questionText: "What is JSX?",
        options: [
          "A JavaScript function",
          "A syntax extension for JavaScript",
          "A new framework",
          "None of the above",
        ],
        correctOption: 1,
      },
      {
        id: 4,
        questionText: "What is a state in React?",
        options: [
          "A way to manage data in components",
          "A CSS property",
          "An HTTP method",
          "None of the above",
        ],
        correctOption: 0,
      },
    ],
  },
  3: {
    courseName: "Node.js Crash Course",
    questions: [
      {
        id: 5,
        questionText: "What is Node.js primarily used for?",
        options: [
          "Frontend development",
          "Backend development",
          "Mobile app development",
          "None of the above",
        ],
        correctOption: 1,
      },
      {
        id: 6,
        questionText: "Which module is used to create a web server in Node.js?",
        options: ["http", "express", "fs", "path"],
        correctOption: 0,
      },
    ],
  },
};

export default fakeQuizData;
