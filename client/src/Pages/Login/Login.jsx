import React, { useContext, useRef, useState } from 'react';
import './Login.css'; // Import CSS file for styling
import axios from 'axios';
import UserContext from "../../context/UserContext";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser, setAdmin } = useContext(UserContext);
  const role = useRef();
  const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password
    }
    try {
      if (role.current.value === "User") {
        const res = await axios.post("/api/user/login", data);
        if(res.data.success===false){
          alert(`${res.data.msg}`);
        }
        else{
          setUser(res.data.user);
          Navigate("/")
        }
      }
      else{
        const res = await axios.post("/api/admin/login",data);
        if(res.data.success===false){
          alert(`${res.data.msg}`);
        }
        else{
          setAdmin(res.data.admin);
          Navigate("/admin");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <select name="role" ref={role}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit" className="btn-login">
          Login
        </button>
      </form>
      <div className="additional-options">
        <p>Don't have an account? <a href="/signup">Sign up</a></p>
        <p>Forgot your password? <a href="/forgot-password">Reset password</a></p>
      </div>
    </div>
  );
};

export default Login;
