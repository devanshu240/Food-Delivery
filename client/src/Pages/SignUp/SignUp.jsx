// Signup.js

import React, { useRef, useState } from 'react';
import './SignUp.css';
import axios from "axios";
import { Navigate } from 'react-router-dom';

const SignUp = () => {
  const role = useRef();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');

  const handleVerify = () => {
    // Send OTP verification request
    console.log('Verifying OTP:', otp);
  };

  const handleSignup = async () => {
    // Perform signup operation
    const data = {
      name: userName,
      email: email,
      password: password
    }
    console.log(data);
    try {
      if (role.current.value === "User") {
        const res = await axios.post("/api/user/signup", data);
        setUserName("");
        setEmail("");
        setPassword("");
        Navigate("/login");
      }
      else {
        const res = await axios.post("/api/admin/signup", data);
        setUserName("");
        setEmail("");
        setPassword("");
        Navigate("/login");
      }
    }
    catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="signup-form">
        <div className="form-group">
          <label htmlFor="userName">User Name:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
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
        <div className="form-group otp-section">
          <label htmlFor="otp">Enter OTP:</label>
          <div className="otp-input">
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button className="btn-verify" onClick={handleVerify}>Verify</button>
          </div>
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
        <select name='role' ref={role}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="button" className="btn-signup" onClick={handleSignup}>Sign Up</button>
      </form>
      <div className="redirect-login">
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default SignUp;
