import React, { useState, useEffect } from "react";
import {
  Accordion,
  Card,
  ProgressBar,
  Tab,
  Tabs,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../../api"; // Adjust the import based on your API utility
import "./CoursePage.css";
import { useUser } from "../../context/UserContext";
const CoursePage = (props) => {
  const [courseData, setCourseData] = useState([]);
  const [feedbackContent, setFeedbackContent] = useState("");
  const [feedbackRating, setFeedbackRating] = useState(0); // State for rating
  const { user } = useUser();
  const currentUserId = user.id; // Replace this with actual user ID from context or props

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/courses/user");
        setCourseData(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleSubmit = async (e, courseId) => {
    e.preventDefault();
    try {
      const response = await api.post(
        `http://localhost:3001/api/courses/${courseId}/feedback`,
        { content: feedbackContent, rating: feedbackRating } // Include rating
      );
      console.log("Feedback submitted:", response.data);
      props.showToast({ success: "Feedback submitted" });
      setFeedbackContent("");
      setFeedbackRating(0); // Reset rating after submission
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  const getCompletionPercentage = (course) => {
    const completedMaterials = course.learningMaterials.filter((material) =>
      material.progress.some((p) => p.userId === currentUserId && p.completed)
    ).length;
    return (completedMaterials / course.learningMaterials.length) * 100;
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Courses</h1>
      <Accordion>
        {courseData.map((course, index) => (
          <Accordion.Item eventKey={index.toString()} key={course.id}>
            <Accordion.Header className="d-flex justify-content-between align-items-center">
              <span>{course.name}</span>
              <div style={{ flexGrow: 1 }} />
              <div style={{ width: "200px", marginRight: "1rem" }}>
                <ProgressBar
                  now={getCompletionPercentage(course)}
                  label={`${Math.round(getCompletionPercentage(course))}%`}
                />
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <Tabs defaultActiveKey="materials" className="mb-3">
                <Tab eventKey="materials" title="Materials">
                  {course.learningMaterials.map((material) => {
                    const isCompleted = material.progress.some(
                      (p) => p.userId === currentUserId && p.completed
                    );

                    return (
                      <Link
                        to={`/courses/${course.id}/${material.id}`}
                        key={material.id}
                        style={{ textDecoration: "none" }}
                      >
                        <Card className="mb-3 hover-card">
                          <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">
                              <Card.Title>{material.title}</Card.Title>
                              <Badge
                                pill
                                bg={isCompleted ? "success" : "warning"}
                              >
                                {isCompleted ? "Completed" : "Not Completed"}
                              </Badge>
                            </div>
                          </Card.Body>
                        </Card>
                      </Link>
                    );
                  })}
                </Tab>

                <Tab eventKey="quiz" title="Quiz">
                  <div>
                    <h5>Course Quiz for {course.name}</h5>
                    <p>This section will contain the quiz for the course.</p>
                    <Link to={`/quiz/${course.id}`} className="btn btn-success">
                      Take Quiz
                    </Link>
                  </div>
                </Tab>

                <Tab eventKey="feedback" title="Feedback">
                  <div>
                    <h5>Feedback for {course.name}</h5>
                    <p>Leave your feedback about the course here.</p>
                    <form onSubmit={(e) => handleSubmit(e, course.id)}>
                      <div className="mb-3">
                        <textarea
                          className="form-control"
                          placeholder="Your feedback"
                          rows="3"
                          value={feedbackContent}
                          onChange={(e) => setFeedbackContent(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Rating:</label>
                        <div>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <label key={star} style={{ cursor: "pointer" }}>
                              <input
                                type="radio"
                                value={star}
                                checked={feedbackRating === star}
                                onChange={() => {
                                  console.log("Selected Rating:", star); // Debugging
                                  setFeedbackRating(star);
                                }}
                                style={{ display: "none" }}
                              />
                              <span
                                className={`star ${
                                  star <= feedbackRating ? "filled" : ""
                                }`}
                              >
                                &#9733;
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Submit Feedback
                      </button>
                    </form>
                  </div>
                </Tab>

                <Tab eventKey="discussion" title="Discussion">
                  <div>
                    <h5>Discussion for {course.name}</h5>
                    <p>Join the discussion or start a new thread.</p>
                    <Link
                      to={`/discussion/${course.id}`}
                      className="btn btn-success"
                    >
                      Go to Discussion page
                    </Link>
                  </div>
                </Tab>
              </Tabs>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default CoursePage;
