import React, { useState, useEffect } from "react";
import "./App.css";

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

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
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
  return (
    <div className="App">
 <h1>User List</h1>
      <button
        className="btn btn-primary"
        onClick={toggleFormVisibility}
      >
        {isFormVisible ? 'Hide Form' : 'Add User'}
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;