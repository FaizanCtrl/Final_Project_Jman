import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Form } from "react-bootstrap";
import api from "../../api";

const QuizPage = (props) => {
  const { courseId } = useParams(); // Get course ID from the route
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [attempted, setAttempted] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await api.get(`/quiz/${courseId}`);
        setQuiz(response.data.questions);

        console.log(response);
        // Check if the user has already attempted the quiz
        const resultResponse = await api.get(
          `/quiz/result/${response.data.id}`
        ); // Adjust the endpoint as needed
        console.log(resultResponse.data);
        if (resultResponse.data.attempted) {
          setScore(resultResponse.data.score); // Assuming the response contains the score
          setAttempted(true);
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, [courseId]);

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let calculatedScore = 0;

    // Calculate score
    quiz.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);

    try {
      await api.post("/quiz/result", {
        quizId: quiz[0].quizId,
        score: calculatedScore,
        totalScore: quiz.length,
      });
      props.showToast({ success: "Result saved successfully" });
      setAttempted(true); // Set attempted to true to show result after saving
    } catch (error) {
      console.error("Error saving result:", error);
    }
  };

  return (
    <div className="container mt-5">
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3">
        Back
      </Button>

      {attempted ? (
        <div className="mt-4">
          <h3>
            You have already attempted the quiz.
            <br />
            Your Score: {score}/{quiz.length}
          </h3>
        </div>
      ) : quiz.length ? (
        <Form onSubmit={handleSubmit}>
          <h1 className="mb-4">Quiz:</h1>
          {quiz.map((question) => (
            <Card className="mb-4" key={question.id}>
              <Card.Body>
                <Card.Title>{question.questionText}</Card.Title>
                <Form.Group>
                  <Form.Check
                    type="radio"
                    label={question.answerA}
                    name={`question-${question.id}`}
                    onChange={() => handleAnswer(question.id, 1)}
                  />
                  <Form.Check
                    type="radio"
                    label={question.answerB}
                    name={`question-${question.id}`}
                    onChange={() => handleAnswer(question.id, 2)}
                  />
                  <Form.Check
                    type="radio"
                    label={question.answerC}
                    name={`question-${question.id}`}
                    onChange={() => handleAnswer(question.id, 3)}
                  />
                  <Form.Check
                    type="radio"
                    label={question.answerD}
                    name={`question-${question.id}`}
                    onChange={() => handleAnswer(question.id, 4)}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          ))}
          <Button type="submit" variant="primary">
            Submit Quiz
          </Button>
        </Form>
      ) : (
        <Card.Title>There is no question assigned for this quiz</Card.Title>
      )}
    </div>
  );
};

export default QuizPage;
