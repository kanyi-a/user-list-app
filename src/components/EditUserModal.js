// EditUserModal.js
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

function EditUserModal({ user, show, onClose, onUpdate }) {
  const handleInputChange = (e, key) => {
    const { value } = e.target;
    onUpdate({ ...user, [key]: value });
  };

  const handleSubmit = () => {
    onUpdate(user);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={user.name}
              onChange={(e) => handleInputChange(e, "name")}
              required
            />
          </Form.Group>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={user.username}
              onChange={(e) => handleInputChange(e, "username")}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={user.email}
              onChange={(e) => handleInputChange(e, "email")}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Phone number"
              value={user.phone}
              onChange={(e) => handleInputChange(e, "phone")}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCompany">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter company name"
              value={user.company.name}
              onChange={(e) => handleInputChange(e, "company")}
              required
            />
          </Form.Group>
          <Form.Group controlId="formStreet">
            <Form.Label>Street</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter street"
              value={user.address.street}
              onChange={(e) => handleInputChange(e, "address")}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditUserModal;
