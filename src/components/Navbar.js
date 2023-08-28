import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import './Navbar.css'

function Navbar() {
  
  return (
    <div className="navbar">
      <div className="logo-container">
        <FontAwesomeIcon icon={faUser} className="logo-icon" />
        <h1>UserList</h1>
      </div>
    </div>
  );

}
export default Navbar