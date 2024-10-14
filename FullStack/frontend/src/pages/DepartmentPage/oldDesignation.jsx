import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
const DesignationPage = () => {
  const [designations, setDesignations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [currentDesignation, setCurrentDesignation] = useState({
    id: null,
    name: "",
  });

  const fetchDesignations = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/designation");

      console.log(response);
      setDesignations(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDesignations();
  }, []);

  const handleAddDesignation = () => {
    setModalMode("add");
    setCurrentDesignation({ id: null, name: "" });
    setShowModal(true);
  };

  const handleEditDesignation = (designation) => {
    setModalMode("edit");
    setCurrentDesignation(designation);
    setShowModal(true);
  };

  const handleDeleteDesignation = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/designation/${id}`);
      fetchDesignations();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setCurrentDesignation({
      ...currentDesignation,
      name: e.target.value,
    });
  };

  const handleSaveDesignation = async () => {
    try {
      if (modalMode === "add") {
        await axios.post(
          "http://localhost:3001/api/designation",
          currentDesignation
        );
      } else if (modalMode === "edit") {
        await axios.put(
          `http://localhost:3001/api/designation/${currentDesignation.id}`,
          currentDesignation
        );
      }
      fetchDesignations();
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleAddDesignation = () => {
  //   setCurrentDesignation({ name: "" });
  //   setShowModal(true);
  // };

  // const handleEditDesignation = (designation) => {
  //   setCurrentDesignation(designation);
  //   setShowModal(true);
  // };

  // const handleSaveDesignation = () => {
  //   if (currentDesignation.id) {
  //     setDesignations((prevDesignations) =>
  //       prevDesignations.some((d) => d.id === currentDesignation.id)
  //         ? prevDesignations.map((d) =>
  //             d.id === currentDesignation.id ? currentDesignation : d
  //           )
  //         : [...prevDesignations, currentDesignation]
  //     );
  //   } else {
  //     setDesignations((prevDesignations) => [
  //       ...prevDesignations,
  //       { ...currentDesignation, id: Date.now() },
  //     ]);
  //   }
  //   setShowModal(false);
  //   setCurrentDesignation({ id: null, name: "" });
  // };

  // const handleChange = (e) => {
  //   setCurrentDesignation({ ...currentDesignation, name: e.target.value });
  // };

  return (
    <div className="container mt-4">
      <h1>Designation</h1>
      <Button variant="primary" onClick={handleAddDesignation}>
        Add Designation
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
          {designations.map((designation) => (
            <tr key={designation.id}>
              <td>{designation.id}</td>
              <td>{designation.name}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEditDesignation(designation)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} centered onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Designation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentDesignation ? currentDesignation.name : ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveDesignation}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DesignationPage;
