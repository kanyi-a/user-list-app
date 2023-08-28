// AddUserForm.js
import React, { useState } from "react";
import "./AddUserForm.css"

function AddUserForm({ onSubmit }) {
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    company: { name: "" },
    address: { street: "" },
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newUser);
  };

  return (
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
          onChange={(e) => handleNestedInputChange(e, "company", "name")}
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
          onChange={(e) => handleNestedInputChange(e, "address", "street")}
          className="form-control"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default AddUserForm;
