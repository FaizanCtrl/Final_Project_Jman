import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
// import UserProfile from "../UserProfile";
// import MySkills from "../UserSkills";
import axios from "axios";
import api from "../../api"; // Import the axios instance
// import SkillsToAcquire from "../SkillsToAcquire";

const UserDashboard = () => {
  // const userId = 1;
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [skillsToAcquire, setSkillsToAcquire] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data
        const userResponse = await api.get(`/user/user`);
        setUser(userResponse.data);

        const skillsResponse = await api.get("/userSkill/skill");
        setSkills(skillsResponse.data);

        // get all skills reltated to user designation
        const allSkillsOfDesignationResponse = await api.get("/user/skills");
        setAllSkills(allSkillsOfDesignationResponse.data.skills);
      } catch (err) {
        setError(err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const sTA = allSkills.filter((skill) => !skills.includes(skill.name));
    setSkillsToAcquire(sTA);
  }, [allSkills]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container fluid className="p-4 h-100">
      <Row>
        <Col md={4}>
          {/* <UserProfile user={user} /> */}
        </Col>
        <Col md={8}>
          {/* <MySkills skills={skills} /> */}
          {/* <SkillsToAcquire skillsToAcquire={skillsToAcquire} /> */}
        </Col>
      </Row>
    </Container>
  );
};

export default UserDashboard;
