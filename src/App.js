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
     
  return (
    <div className="App">
      <h1>User List</h1>
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