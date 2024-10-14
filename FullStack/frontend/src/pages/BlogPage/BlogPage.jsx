// // import React, { useState, useEffect } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { Card, Button } from "react-bootstrap";
// // import api from "../../api";

// // const generateFakeLearningMaterial = (courseId, learningMaterialId) => {
// //   return {
// //     id: learningMaterialId,
// //     title: `Learning Material ${learningMaterialId} for Course ${courseId}`,
// //     content: `This is the content for learning material ${learningMaterialId} of course ${courseId}.`,
// //     completed: false,
// //   };
// // };

// // const BlogPage = () => {
// //   const { courseId, learningMaterialId } = useParams(); // Get course ID and learning material ID from the route
// //   const [learningMaterial, setLearningMaterial] = useState(null);
// //   const [completed, setCompleted] = useState(false);
// //   const navigate = useNavigate(); // Initialize useNavigate

// //   // // Fetch the learning material details on component mount
// //   // useEffect(() => {
// //   //   const fetchLearningMaterial = async () => {
// //   //     try {
// //   //       const response = await api.get(
// //   //         `/courses/${courseId}/learningMaterial/${learningMaterialId}`
// //   //       );
// //   //       setLearningMaterial(response.data);
// //   //       setCompleted(response.data.completed); // Set the completion status
// //   //     } catch (error) {
// //   //       console.error("Error fetching learning material:", error);
// //   //     }
// //   //   };
// //   //   fetchLearningMaterial();
// //   // }, [courseId, learningMaterialId]);

// //   // Fetch the learning material details on component mount
// //   useEffect(() => {
// //     const fetchLearningMaterial = async () => {
// //       // Instead of fetching, generate fake data
// //       const fakeData = generateFakeLearningMaterial(
// //         courseId,
// //         learningMaterialId
// //       );
// //       setLearningMaterial(fakeData);
// //       setCompleted(fakeData.completed); // Set the completion status
// //     };
// //     fetchLearningMaterial();
// //   }, [courseId, learningMaterialId]);

// //   const handleMarkComplete = async () => {
// //     try {
// //       const response = await api.post(
// //         `/courses/${courseId}/learningMaterial/${learningMaterialId}/complete`,
// //         {
// //           completed: true,
// //         }
// //       );
// //       console.log("Marked as complete:", response.data);
// //       setCompleted(true); // Update the completion status in the UI
// //     } catch (error) {
// //       console.error("Error marking as complete:", error);
// //     }
// //   };

// //   if (!learningMaterial) return <p>Loading...</p>;

// //   return (
// //     <div className="container mt-5">
// //       <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3">
// //         Back
// //       </Button>
// //       <Card>
// //         <Card.Body>
// //           <Card.Title>{learningMaterial.title}</Card.Title>
// //           <Card.Text>{learningMaterial.content}</Card.Text>
// //           <Button
// //             variant="primary"
// //             onClick={handleMarkComplete}
// //             disabled={completed} // Disable the button if already marked complete
// //           >
// //             {completed ? "Completed" : "Mark as Complete"}
// //           </Button>
// //         </Card.Body>
// //       </Card>
// //     </div>
// //   );
// // };

// // export default BlogPage;


// // // youtube videos
// // import React, { useState, useEffect } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { Card, Button } from "react-bootstrap";
// // import api from "../../api";

// // const generateFakeLearningMaterial = (courseId, learningMaterialId) => {
// //   return {
// //     id: learningMaterialId,
// //     title: `Learning Material ${learningMaterialId} for Course ${courseId}`,
// //     videoUrl: `https://www.youtube.com/embed/dQw4w9WgXcQ`, // Example video URL
// //     completed: false,
// //   };
// // };

// // const BlogPage = () => {
// //   const { courseId, learningMaterialId } = useParams();
// //   const [learningMaterial, setLearningMaterial] = useState(null);
// //   const [completed, setCompleted] = useState(false);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchLearningMaterial = async () => {
// //       const fakeData = generateFakeLearningMaterial(courseId, learningMaterialId);
// //       setLearningMaterial(fakeData);
// //       setCompleted(fakeData.completed);
// //     };
// //     fetchLearningMaterial();
// //   }, [courseId, learningMaterialId]);

// //   const handleMarkComplete = async () => {
// //     try {
// //       const response = await api.post(
// //         `/courses/${courseId}/learningMaterial/${learningMaterialId}/complete`,
// //         {
// //           completed: true,
// //         }
// //       );
// //       console.log("Marked as complete:", response.data);
// //       setCompleted(true);
// //     } catch (error) {
// //       console.error("Error marking as complete:", error);
// //     }
// //   };

// //   if (!learningMaterial) return <p>Loading...</p>;

// //   return (
// //     <div className="container mt-5">
// //       <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3">
// //         Back
// //       </Button>
// //       <Card className="text-center" style={{ width: '80%', margin: '0 auto' }}>
// //         <Card.Body>
// //           <Card.Title>{learningMaterial.title}</Card.Title>
// //           {/* YouTube video embed */}
// //           <div className="embed-responsive embed-responsive-16by9 mb-3">
// //             <iframe
// //               className="embed-responsive-item"
// //               src={learningMaterial.videoUrl}
// //               title={learningMaterial.title}
// //               allowFullScreen
// //               style={{ width: '100%', height: '400px' }} // Increase the height of the video
// //             />
// //           </div>
// //         </Card.Body>
// //       </Card>
// //       <div className="text-end mt-3">
// //         <Button
// //           variant="primary"
// //           onClick={handleMarkComplete}
// //           disabled={completed}
// //         >
// //           {completed ? "Completed" : "Mark as Complete"}
// //         </Button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BlogPage;

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Card, Button } from "react-bootstrap";
// import api from "../../api";

// const BlogPage = ({ userId }) => {
//   const { courseId, learningMaterialId } = useParams();
//   const [learningMaterial, setLearningMaterial] = useState(null);
//   const [completed, setCompleted] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchLearningMaterial = async () => {
//       try {
//         const response = await api.get(`learning-materials/courses/${courseId}/learningMaterial/${learningMaterialId}`);
//         setLearningMaterial(response.data);
//         // Check if the user has completed the material
//         const userProgress = response.data.progress.find(p => p.userId === parseInt(userId));
//         setCompleted(userProgress ? userProgress.completed : false);
//       } catch (error) {
//         console.error("Error fetching learning material:", error);
//       }
//     };
//     fetchLearningMaterial();
//   }, [courseId, learningMaterialId, userId]);

//   const handleMarkComplete = async () => {
//     try {
//       const response = await api.post(
//         `learning-materials/courses/${courseId}/learningMaterial/${learningMaterialId}/complete`
//       );
//       console.log("Marked as complete:", response.data);
//       setCompleted(true);
//     } catch (error) {
//       console.error("Error marking as complete:", error);
//     }
//   };

//   if (!learningMaterial) return <p>Loading...</p>;

//   return (
//     <div className="container mt-5">
//       <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3">
//         Back
//       </Button>
//       <Card className="text-center" style={{ width: '80%', margin: '0 auto' }}>
//         <Card.Body>
//           <Card.Title>{learningMaterial.title}</Card.Title>
//           <div className="embed-responsive embed-responsive-16by9 mb-3">
//             <iframe
//               className="embed-responsive-item"
//               src={learningMaterial.videoUrl} // Ensure this exists in your database
//               title={learningMaterial.title}
//               allowFullScreen
//               style={{ width: '100%', height: '400px' }}
//             />
//           </div>
//         </Card.Body>
//       </Card>
//       <div className="text-end mt-3">
//         <Button
//           variant="primary"
//           onClick={handleMarkComplete}
//           disabled={completed}
//         >
//           {completed ? "Completed" : "Mark as Complete"}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default BlogPage;

////////////////////////////////////


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
        const response = await api.get(`learning-materials/courses/${courseId}/learningMaterial/${learningMaterialId}`);
        setLearningMaterial(response.data);
        console.log(response.data)
        // Check if the user has completed the material
        const userProgress = response.data.progress.find(p => p.userId === parseInt(userId));
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
      <Card className="text-center" style={{ width: '80%', margin: '0 auto' }}>
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
