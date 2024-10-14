import React, { useEffect, useState } from "react";
import { Card, Row, Col, ListGroup } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { useParams } from "react-router-dom";
import api from "../../api";

ChartJS.register(CategoryScale, LinearScale, BarElement);

const Dashboard = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const userResponse = await api.get(`/users/${id}`);
          const userData = userResponse.data;
          setUser(userData);
          // Fetch quiz results for the user
          const quizzesResponse = await api.get(`/quiz/${id}/quizzes`);
          console.log(quizzesResponse.data);
          setQuizzes(quizzesResponse.data);

          // Fetch average feedback ratings for the user
          const feedbacksResponse = await api.get(`/feedback/average-feedback`);
          setFeedbacks(feedbacksResponse.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  // Prepare course completion data
  const courseCompletionData = {
    labels: user.team.Course.map((course) => course.name),
    datasets: [
      {
        label: "Course Completion (%)",
        data: user.team.Course.map((course) => {
          const completedMaterials = course.learningMaterials.filter(
            (material) =>
              material.progress &&
              material.progress.length > 0 &&
              material.progress[0].completed
          ).length;
          return (
            (completedMaterials / course.learningMaterials.length) * 100 || 0
          );
        }),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  // Prepare quiz performance data
  const quizPerformanceData = {
    labels: quizzes.map((quiz) => `${quiz.quiz.course.name}`),
    datasets: [
      {
        label: "Quiz Scores (%)",
        data: quizzes.map((quiz) => (quiz.score / quiz.totalScore) * 100),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  // Prepare feedback ratings data
  const feedbackRatingsData = {
    labels: user.team.Course.map((course) => course.name),
    datasets: [
      {
        label: "Feedback Ratings",
        data: user.team.Course.map((course) => {
          const courseFeedback = feedbacks.find(
            (f) => f.courseId === course.id
          );
          return courseFeedback ? courseFeedback.averageRating : 0; // Default to 0 if no feedback exists
        }),
        backgroundColor: "rgba(255, 159, 64, 0.6)",
      },
    ],
  };
  function convertSeconds(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return {
      hours,
      minutes,
      seconds: remainingSeconds,
    };
  }
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Dashboard</h1>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>User Information</Card.Title>
          <Card.Text>
            <strong>Name:</strong> {user.name}
            <br />
            <strong>Department:</strong> {user.department.name}
            <br />
            <strong>Team:</strong> {user.team.name}
            <br />
            <strong>Email:</strong> {user.email}
            <br />
            <strong>Time Spent:</strong>{" "}
            {user.UserSession[0]?.duration ? (
              <>
                {Math.floor(user.UserSession[0].duration / 3600)} hours,{" "}
                {Math.floor((user.UserSession[0].duration % 3600) / 60)}{" "}
                minutes, and {user.UserSession[0].duration % 60} seconds
              </>
            ) : (
              0
            )}
          </Card.Text>
        </Card.Body>
      </Card>

      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Header>Course Completion Overview</Card.Header>
            <Card.Body>
              <Bar data={courseCompletionData} options={{ responsive: true }} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>Quiz Performance</Card.Header>
            <Card.Body>
              <Bar data={quizPerformanceData} options={{ responsive: true }} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Header>Feedback Ratings Overview</Card.Header>
            <Card.Body>
              <Bar data={feedbackRatingsData} options={{ responsive: true }} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}></Col>
      </Row>

      <h2 className="mt-5 mb-3">Recent Activity</h2>
      <ListGroup className="mb-4">
        {user.team.Course.map((course) => (
          <ListGroup.Item key={course.id}>
            <strong>{course.name}</strong>
            <ListGroup>
              {course.learningMaterials.map((material) => (
                <ListGroup.Item key={material.id}>
                  {material.title} -{" "}
                  {material.progress.length > 0 &&
                  material.progress[0].completed
                    ? "Completed"
                    : "In Progress"}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Dashboard;
