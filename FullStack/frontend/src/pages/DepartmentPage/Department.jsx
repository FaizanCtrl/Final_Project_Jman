import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../api";

const DepartmentPage = (props) => {
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [currentDepartment, setcurrentDepartment] = useState({
    id: null,
    name: "",
  });

  const fetchDepartments = async () => {
    try {
      const response = await api.get("http://localhost:3001/api/departments");
      setDepartments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleAddDepartment = () => {
    setModalMode("add");
    setcurrentDepartment({ id: null, name: "" });
    setShowModal(true);
  };

  const handleEditDepartment = (department) => {
    setModalMode("edit");
    setcurrentDepartment(department);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setcurrentDepartment({
      ...currentDepartment,
      name: e.target.value,
    });
  };

  const handleSaveDepartment = async () => {
    try {
      if (modalMode === "add") {
        await api.post(
          "http://localhost:3001/api/departments/create",
          currentDepartment
        );
        props.showToast({ success: "Department Added" });
      } else if (modalMode === "edit") {
        await api.put(
          `http://localhost:3001/api/departments/${currentDepartment.id}/update`,
          currentDepartment
        );
        props.showToast({ success: "department Edited Successfully" });
      }
      fetchDepartments();
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Department</h1>
      <Button variant="primary" onClick={handleAddDepartment}>
        Add Department
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <td>{department.id}</td>
              <td>{department.name}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEditDepartment(department)}
                >
                  Edit
                </Button>
                {/* <Button
                  variant="danger"
                  onClick={() => handleDeletedepartment(department.id)}
                  className="ms-2"
                >
                  Delete
                </Button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} centered onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalMode === "add" ? "Add department" : "Edit department"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentDepartment.name}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveDepartment}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DepartmentPage;
