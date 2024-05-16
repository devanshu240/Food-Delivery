// Navbar.js

import React, { useState, useContext } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import axios from "axios";


const Navbar = () => {
  const {setUser} = useContext(UserContext);
  const Navigate = useNavigate();

  const handleLogoutButton = async(e) => {
    e.preventDefault();
    const res = await axios.post("/api/user/logout",{role:"user"});
    console.log(res.status);
    if(res.status === 200){
      setUser(null);
      Navigate("/");
    }
    else{
      alert("unable to logout from user account");
    }
  };

  return (
    <nav className="navbar">
      <span className="navbar-brand">Your Website</span>
      <ul className="navbar-menu">
        <li className="nav-item"><Link to="/">Home</Link></li>
        <li className="nav-item"><Link to="/about">About</Link></li>
        <li className="nav-item"><Link to="/contact">Contact Us</Link></li>
        <li className="nav-item"><Link to="/feedback">Feedback</Link></li>
        <li className="dropdown">
        <Link to="/menu"className='dropdown-toggle'>Menu</Link>
        </li>
        <li className="nav-item">
         <button className="btn-login" onClick={handleLogoutButton}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
