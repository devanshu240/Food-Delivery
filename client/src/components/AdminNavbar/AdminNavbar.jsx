// AdminNavbar.jsx

import React, { useContext } from 'react';
import './AdminNavbar.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import UserContext from '../../context/UserContext';

const AdminNavbar = () => {
    const {admin, setAdmin} = useContext(UserContext)
    const Navigate = useNavigate();
    const handleLogout = async()=>{
        const res = await axios.post("/api/admin/logout",{role:"admin"});
        console.log(res);
        if(res.status===200){
            setAdmin(null);
            Navigate("/");
        }
        else{
            alert("unable to logout");
        }
    }
    return (
        <nav className="admin-navbar">
            <div className="nav-brand">
                <h2>Admin Panel</h2>
            </div>
            <ul className="nav-links">
                <li><Link to="/admin">Home</Link></li>
                <li><Link to="/admin/feedback">Feedback</Link></li>
                <li><Link to="/admin/products">Products</Link></li>
                <li><Link to="/admin/Booked/Table">Booked Tables</Link></li>
                {/* <li><Link to="#">Delete</Link></li> */}
                <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
        </nav>
    );
}

export default AdminNavbar;
