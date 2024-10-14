import React, { useState, useEffect } from "react";
import { Form, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const usersData = [
  { id: 1, name: "Alice", department: "Sales", team: "Team A" },
  { id: 2, name: "Bob", department: "Marketing", team: "Team B" },
  { id: 3, name: "Charlie", department: "Engineering", team: "Team A" },
  { id: 4, name: "David", department: "Sales", team: "Team B" },
  { id: 5, name: "Eve", department: "Marketing", team: "Team A" },
];

const UserList = () => {
  // const [selectedDepartment, setSelectedDepartment] = useState("");
  // const [selectedTeam, setSelectedTeam] = useState("");
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [departmentList, setDepartmentList] = useState([]);
  const [department, setDepartment] = useState(null);
  const [team, setTeam] = useState(null);
  const [teamsList, setTeamsList] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
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
    fetchUsers();
  }, []);

  // Fetch Teams based on department ID
  useEffect(() => {
    const fetchTeamsByDepartment = async () => {
      if (department) {
        try {
          const response = await api.get(`/teams/${department}`);
          setTeamsList(response.data);
        } catch (error) {
          console.log(error);
        }
      } else {
        setTeamsList([]); // Clear teams if no department is selected
      }
    };
    fetchTeamsByDepartment();
  }, [department]); // Fetch teams whenever the selected department ID changes

  const filteredUsers = users.filter((user) => {
    const matchesDepartment =
      !department || parseInt(user.department.id) == department;
    const matchesTeam = !team || user.team.id == team;
    return matchesDepartment && matchesTeam;
  });

  const handleViewDetails = (id) => {
    navigate(`/user/${id}`); // Use navigate for navigation
  };

  return (
    <div>
      <h2>User List</h2>
      <Form>
        <Form.Group controlId="department">
          <Form.Label>Department</Form.Label>
          <Form.Control
            as="select"
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setTeam(null);
            }}
          >
            <option value="">All Departments</option>
            {departmentList.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="team">
          <Form.Label>Team</Form.Label>
          <Form.Control
            as="select"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
          >
            <option value="">All Teams</option>
            {teamsList.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Team</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user?.id}>
                <td>{user?.id}</td>
                <td>{user.name}</td>
                <td>{user?.department?.name}</td>
                <td>{user?.team?.name}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleViewDetails(user.id)}
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default UserList;
