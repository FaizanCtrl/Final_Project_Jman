

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import Filters from "../Filters/Filters"; // Assuming this component exists
import Metrics from "../Metrics/Metrics"; // Assuming this component exists

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [departmentList, setDepartmentList] = useState([]);
  const [error, setError] = useState("");
  const [metricsData, setMetricsData] = useState([]);
  const [teamsList, setTeamsList] = useState([]);
  // const [filteredTeams, setFilteredTeams] = useState([]);
  const navigate = useNavigate();
  //
  const fetchMetrics = async () => {
    console.log("metrics", selectedDepartment, selectedTeam);
    try {
      const response = await api.get("/metrics", {
        params: {
          departmentId: selectedDepartment,
          teamId: selectedTeam,
        },
      });
      setMetricsData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await api.get("/departments");
        setDepartmentList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDepartment();
    fetchMetrics();
  }, []);

  // Fetch Teams based on department ID
  useEffect(() => {
    const fetchTeamsByDepartment = async () => {
      if (selectedDepartment) {
        try {
          const response = await api.get(`/teams/${selectedDepartment}`);
          setTeamsList(response.data);
        } catch (error) {
          console.log(error);
        }
      } else {
        setTeamsList([]); // Clear teams if no department is selected
      }
    };
    fetchTeamsByDepartment();
    fetchMetrics();
  }, [selectedDepartment]); // Fetch teams whenever the selected department ID changes

  useEffect(() => {
    // const fetchMetrics = async () => {
    // console.log(selectedDepartment, selectedTeam);
    // };
    fetchMetrics();
  }, [selectedDepartment, selectedTeam]); // Fetch teams whenever the selected department ID changes

  //
  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await api.get("http://localhost:3001/api/departments");
      setDepartments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await api.get("http://localhost:3001/api/teams");
      setTeams(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchUsers();
    fetchDepartments();
    fetchTeams();
  }, []);

  const totalUsers = users.length;
  const totalDepartments = departments.length;
  // return <h1>Hello</h1>;
  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text className="display-4">{totalUsers}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Total Departments</Card.Title>
              <Card.Text className="display-4">{totalDepartments}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Total Teams</Card.Title>
              <Card.Text className="display-4">{teams.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>User List</Card.Title>
              <div style={{ maxHeight: "300px", overflow: "auto" }}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Department</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          {user.department ? user.department.name : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <Button
                variant="primary"
                className="mt-3"
                onClick={() => navigate("/users")}
              >
                View All Users
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Department List</Card.Title>
              <div style={{ maxHeight: "300px", overflow: "auto" }}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departments.map((department) => (
                      <tr key={department.id}>
                        <td>{department.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <Button
                variant="primary"
                className="mt-3"
                onClick={() => navigate("/departments")}
              >
                View All Departments
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Team List</Card.Title>
              <div style={{ maxHeight: "300px", overflow: "auto" }}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams.map((team) => (
                      <tr key={team.id}>
                        <td>{team.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <Button
                variant="primary"
                className="mt-3"
                onClick={() => navigate("/teams")}
              >
                View All Teams
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <div className="mb-3">
          <select
            id="department"
            value={selectedDepartment}
            onChange={(e) => {
              setError("");
              setSelectedDepartment(e.target.value);
              setSelectedTeam(null);
            }}
            className="form-control p-2"
          >
            <option value="">Select Department</option>
            {departmentList.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <select
            id="team"
            value={selectedTeam}
            onChange={(e) => {
              setError("");
              setSelectedTeam(e.target.value);
            }}
            className="form-control p-2"
          >
            <option value="">Select Team</option>
            {teamsList.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        {/* <Filters
          departments={departments}
          onFilterChange={handleFilterChange}
          teams={teams}
        /> */}
        <Metrics data={metricsData} />
      </Row>
    </Container>
  );
};

export default Dashboard;
