import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa"; // Import the trash icon
import Modal from "react-bootstrap/Modal"; // Import Modal from react-bootstrap
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    company: { name: "" },
    address: { street: "" },
  });
  //make the form hidden
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  //handle submit to add post request
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );
      if (response.ok) {
        const addedUser = await response.json();
        setUsers([...users, addedUser]);
        setNewUser({
          name: "",
          username: "",
          email: "",
          phone: "",
          company: { name: "" },
          address: { street: "" },
        });
        setIsFormVisible(false);
      } else {
        console.error("Error adding user:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
  //handle input change

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };
  const handleNestedInputChange = (e, parentKey, childKey) => {
    const { value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [parentKey]: { ...prevUser[parentKey], [childKey]: value },
    }));
  };
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };
  //handling edit
  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleUpdate = async (updatedUser) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${updatedUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (response.ok) {
        const updatedUsers = users.map((user) =>
          user.id === selectedUser.id ? selectedUser : user
        );
        setUsers(updatedUsers);
        handleCloseModal();
      } else {
        console.error("Error updating user:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  //handling delete function
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      } else {
        console.error("Error deleting user:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  return (
    <div className="App">
      <Navbar />
      {/* <h1>User List</h1> */}
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div>
          <button className="btn btn-primary" onClick={toggleFormVisibility}>
            {isFormVisible ? "Hide Form" : "Add User"}
          </button>
          {isFormVisible && (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={newUser.username}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={newUser.phone}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="companyName">Company Name:</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={newUser.company.name}
                  onChange={(e) =>
                    handleNestedInputChange(e, "company", "name")
                  }
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="street">Street:</label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={newUser.address.street}
                  onChange={(e) =>
                    handleNestedInputChange(e, "address", "street")
                  }
                  className="form-control"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                submit
              </button>
            </form>
          )}
          <table className="table">
            <thead>
              <tr>
                <th className="row-number">#</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Street</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td className="row-number">{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.company.name}</td>
                  <td>{user.address.street}</td>
                  <td>
                    <div
                      className="btn btn-danger"
                      onClick={() => handleDelete(user.id)}
                    >
                      <FaTrash style={{ backgroundcolor: "red" }} />
                    </div>
                    <div
                      className="btn btn-success"
                      onClick={() => handleEdit(user)}
                    >
                      <FaEdit /> {/* Edit icon */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Edit Modal */}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title> Edit user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={selectedUser ? selectedUser.name : ""}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        name: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={selectedUser ? selectedUser.username : ""}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        username: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={selectedUser ? selectedUser.email : ""}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Phone number"
                    value={selectedUser ? selectedUser.phone : ""}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        phone: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formCompany">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={selectedUser ? selectedUser.company.name : ""}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        company: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formStreet">
                  <Form.Label>Street</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter street"
                    value={selectedUser ? selectedUser.company.name : ""}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        address: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => handleUpdate(selectedUser)}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
}
export default App;
