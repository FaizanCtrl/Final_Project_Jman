import React, { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import api from "../../api"; // Import your API functions for making backend calls
import { useParams, useNavigate } from "react-router-dom";

const DiscussionPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const { courseId } = useParams();
  // Fetch initial posts when the component loads
  const navigate = useNavigate();
  const fetchPosts = async () => {
    try {
      const response = await api.get(`/courses/${courseId}/posts`);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching discussions:", error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [courseId]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (!newPost) return;

    try {
      const response = await api.post(`/courses/${courseId}/posts`, {
        content: newPost,
      });
      setNewPost(""); // Clear the input field
      fetchPosts();
    } catch (error) {
      console.error("Error posting discussion:", error);
    }
  };

  return (
    <div className="container mt-5">
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3">
        Back
      </Button>
      <h2>Discussion for Course {courseId}</h2>

      {/* Discussion Posts */}
      <div className="mb-4">
        {posts.map((post) => (
          <Card className="mb-3" key={post.id}>
            <Card.Body>
              <Card.Title>{post.userName}</Card.Title>
              <Card.Text>{post.content}</Card.Text>
              <Card.Footer className="text-muted">
                Posted by {post.user.name} on{" "}
                {new Date(post.createdAt).toLocaleString()}
              </Card.Footer>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* New Post Form */}
      <Form onSubmit={handlePostSubmit}>
        <Form.Group controlId="newPost">
          <Form.Label>Post a new message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Type your message here..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Post
        </Button>
      </Form>
    </div>
  );
};

export default DiscussionPage;
