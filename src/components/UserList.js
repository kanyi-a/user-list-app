import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const UserList = ({ users, handleEdit, handleDelete }) => {
  return (
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
          <th>Action</th>
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
                <FaTrash style={{ color: "red" }} />
              </div>
              <div className="btn btn-success" onClick={() => handleEdit(user)}>
                <FaEdit /> {/* Edit icon */}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
