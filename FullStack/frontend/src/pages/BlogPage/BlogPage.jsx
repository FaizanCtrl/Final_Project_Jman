import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import api from "../../api";

const BlogPage = ({ userId }) => {
  const { courseId, learningMaterialId } = useParams();
  const [learningMaterial, setLearningMaterial] = useState(null);
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLearningMaterial = async () => {
      try {
        const response = await api.get(
          `learning-materials/courses/${courseId}/learningMaterial/${learningMaterialId}`
        );
        setLearningMaterial(response.data);
        console.log(response.data);
        // Check if the user has completed the material
        const userProgress = response.data.progress.find(
          (p) => p.userId === parseInt(userId)
        );
        setCompleted(userProgress ? userProgress.completed : false);
      } catch (error) {
        console.error("Error fetching learning material:", error);
      }
    };

    fetchLearningMaterial();
  }, [courseId, learningMaterialId, userId]);

  const handleMarkComplete = async () => {
    try {
      const response = await api.post(
        `learning-materials/courses/${courseId}/learningMaterial/${learningMaterialId}/complete`,
        { completed: true }
      );
      console.log("Marked as complete:", response.data);
      setCompleted(true); // Update the completion status in the UI
    } catch (error) {
      console.error("Error marking as complete:", error);
    }
  };

  if (!learningMaterial) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3">
        Back
      </Button>
      <Card className="text-center" style={{ width: "80%", margin: "0 auto" }}>
        <Card.Body>
          <Card.Title>{learningMaterial.title}</Card.Title>
          <Card.Text>{learningMaterial.content}</Card.Text>
          {/* Add any additional content here based on the learning material type */}
        </Card.Body>
      </Card>
      <div className="text-end mt-3">
        <Button
          variant="primary"
          onClick={handleMarkComplete}
          disabled={completed} // Disable button if already marked complete
        >
          {completed ? "Completed" : "Mark as Complete"}
        </Button>
      </div>
    </div>
  );
};

export default BlogPage;
