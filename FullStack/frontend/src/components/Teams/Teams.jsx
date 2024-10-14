import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../api";
const Teams = (props) => {
  const [teams, setTeams] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [currentTeam, setCurrentTeam] = useState({
    id: null,
    name: "",
    description: "",
    designationId: "",
  });

  // Fetch Teams from backend
  const fetchTeams = async () => {
    try {
      const response = await api.get("http://localhost:3001/api/teams");
      setTeams(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch departments from backend
  const fetchDepartments = async () => {
    try {
      const response = await api.get("http://localhost:3001/api/departments");
      setDepartments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTeams();
    fetchDepartments();
  }, []);

  // Handle adding a new Team
  const handleAddTeam = () => {
    setModalMode("add");
    setCurrentTeam({ id: null, name: "" });
    setShowModal(true);
  };

  // Handle editing a Team
  const handleEditTeam = (Team) => {
    setModalMode("edit");
    setCurrentTeam(Team);
    setShowModal(true);
  };

  // Handle form input changes
  const handleChange = (e) => {
    setCurrentTeam({
      ...currentTeam,
      [e.target.name]: e.target.value,
    });
  };

  // Handle saving a Team (add or edit)
  const handleSaveTeam = async () => {
    try {
      if (modalMode === "add") {
        await api.post("http://localhost:3001/api/Teams/create", currentTeam);
        props.showToast({ success: "Teams Added Successfully" });
      } else if (modalMode === "edit") {
        await api.put(
          `http://localhost:3001/api/Teams/${currentTeam.id}/update`,
          currentTeam
        );
        props.showToast({ success: "Teams Edited Successfully" });
      }
      fetchTeams();
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Teams</h1>
      <Button variant="primary" onClick={handleAddTeam}>
        Add Team
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((Team) => (
            <tr key={Team.id}>
              <td>{Team.id}</td>
              <td>{Team.name}</td>
              <td>{Team.department.name}</td>
              <td>
                <Button variant="warning" onClick={() => handleEditTeam(Team)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} centered onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalMode === "add" ? "Add Team" : "Edit Team"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentTeam.name}
                onChange={handleChange}
              />
            </Form.Group>
            {/* <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={currentTeam.description}
                onChange={handleChange}
              />
            </Form.Group> */}
            <Form.Group className="mt-3">
              <Form.Label>Department</Form.Label>
              <Form.Select
                name="departmentId"
                value={currentTeam.department}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveTeam}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Teams;
