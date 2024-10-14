const express = require("express");
const app = express();
const cors = require("cors"); // Import cors
const courseRoutes = require("./routes/courseRoutes");
const learningMaterialRoutes = require("./routes/learningMaterialRoutes");
const quizRoutes = require("./routes/quizRoutes");
const userProgressRoutes = require("./routes/userProgressRoutes");
const userSessionRoutes = require("./routes/userSessionRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const teamRoutes = require("./routes/teamRoutes");
const authRoutes = require("./routes/authRoutes");
const bodyParser = require("body-parser");
const userRoutes = require('./routes/userRoutes')
const feedbackRoutes = require('./routes/feedbackRoutes')
const metricsRoutes = require('./routes/metricRoutes')
const { authenticate, isAdmin } = require("./middleware/authMiddleware");
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Use authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", authenticate, courseRoutes);
app.use("/api/learning-materials", authenticate, learningMaterialRoutes);
app.use("/api/quizzes", authenticate, quizRoutes);
app.use("/api/user-progress", authenticate, userProgressRoutes);
app.use("/api/user-sessions", userSessionRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/teams",  teamRoutes);
app.use("/api/quiz", authenticate, quizRoutes);
app.use('/api/users', userRoutes);
app.use('/api/metrics', metricsRoutes);
app.use('/api/feedback', authenticate, feedbackRoutes); // Register feedback routes
// Use the user session routes
// app.use('/api/user-sessions',authenticate, userSessionRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
