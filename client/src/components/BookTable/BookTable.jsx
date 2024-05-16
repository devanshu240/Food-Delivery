
import React, { useContext, useEffect, useState } from 'react';
import './BookTable.css';
import Model from "react-modal";
import axios from "axios";
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const BookTable = () => {
  const Navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [personCount, setPersonCount] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [min, setMin] = useState(5);
  const [sec, setSec] = useState(0);
  const [verifyPanel, setVerifyPanel] = useState(false);
  const [otp, setOTP] = useState("");
  const [one, setOne] = useState("");
  const [two, setTwo] = useState("");
  const [three, setThree] = useState("");
  const [four, setFour] = useState("");
  const [five, setFive] = useState("");
  const [answer, setAnswer] = useState(null);
  const [startTimer, setStartTimer] = useState(false);
  const [checkAvailability, setCheckAvailability] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [notConfirmed, setNotConfirmed] = useState(false);

  useEffect(() => {
    let interval;
    if (startTimer) {
      interval = setInterval(() => {
        if (min === 0 && sec === 0) {
          clearInterval(interval);
          setVerifyPanel(false);
          setStartTimer(false);
        }
        else if (answer === true || answer === false) {
          setTimeout(() => {
            clearInterval(interval);
            setVerifyPanel(false);
            setAnswer(null);
            setStartTimer(false);
          }, 1);
        }
        else if (sec === 0) {
          setMin(min - 1);
          setSec(59);
        } else {
          setSec(sec - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTimer, min, sec]);

  useEffect(() => {
    if (checkAvailability) {
      const CheckAvailability = async () => {
        const userId = user._id;
        const data = {
          name, email, phone, personCount, startTime, endTime, userId
        }
        const result = await axios.post("/api/user/create/reservation", data);
        if (result.data.success === true) {
          setConfirmed(true);
          setName("");
          setEmail("");
          setPhone("")
          setPersonCount("")
          setStartTime("")
          setEndTime("")
        }
        else {
          setNotConfirmed(true);
          alert(`${result.data.msg}`);
        }
        setCheckAvailability(false);
      }
      CheckAvailability();
    }
  }, [checkAvailability]);

  const handleVerifyButton = () => {
    const userOTP = one + two + three + four + five;
    if (userOTP === otp) {
      setAnswer(true);
      setCheckAvailability(true);
    } else {
      setAnswer(false);
    }
  };

  const VerifyUserEmailByOTP = async (Email) => {
    const data = { email: email, role: "user" }
    const res = await axios.post("/api/user/email/verification", data);
    if (res.data.success === false) {
      alert(`${res.data.msg}`);
      return -1;
    }
    return res.data.OTP;
  }

  const handleReservation = async (e) => {
    e.preventDefault();
    const res = await VerifyUserEmailByOTP(email);
    console.log(res);
    if (res === -1) {
      setUser(null);
      Navigate("/");
    }
    // else{
    // console.log(res);
    setOTP(res);
    setVerifyPanel(true);
    setStartTimer(true);
    // }
  }

  return (
    <div className="book-table">
      <div className="book-table-chef-img">
        <img className='chefImg' src="../../../public/images/chef-4.jpg" alt="Chef" />
      </div>
      <div className="reservation-form">
        <h2 className="heading">Book a Table</h2>
        <h3 className="sub-heading">Make a Reservation</h3>
        <form onSubmit={handleReservation}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input type="tel" id="phone" name="phone" required value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="persons">Number of Persons:</label>
            <input type="number" id="persons" name="persons" required value={personCount} onChange={(e) => setPersonCount(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="time">Start Time</label>
            <input type="time" id="time" name="time" required value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="time">End Time</label>
            <input type="time" id="time" name="time" required value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </div>
          <button type="submit" className="reservation-btn">Make a Reservation</button>
        </form>
      </div>
      <Model isOpen={verifyPanel} style={{
        overlay: {
          background: "light grey",
          opacity: ""
        },
        content: {
          width: "300px",
          height: "300px",
          top: "30%",
          left: "35%",
          backgroundColor: "white",
          borderRadius: "8px",
        }
      }}>
        <div className="Reservation-container">
          <h2>Enter OTP</h2>
          <div className="Reservation-otp-input">
            <input type="text" maxLength="1" onChange={(e) => { setOne(e.target.value) }} className="reservation-otp" />
            <input type="text" maxLength="1" onChange={(e) => { setTwo(e.target.value) }} className="reservation-otp" />
            <input type="text" maxLength="1" onChange={(e) => { setThree(e.target.value) }} className="reservation-otp" />
            <input type="text" maxLength="1" onChange={(e) => { setFour(e.target.value) }} className="reservation-otp" />
            <input type="text" maxLength="1" onChange={(e) => { setFive(e.target.value) }} className="reservation-otp" />
          </div>
          <button className="Reservation-verify" onClick={handleVerifyButton}>Verify</button>
          <span>Time Remain: <a>{min}:{sec}</a></span>
          <span className='Reservation-answer'>{(answer != null) ? (answer === true) ? "Verified" : "Wrong" : ""}</span>
        </div>
      </Model>
      <Model isOpen={confirmed} onRequestClose={() => { setConfirmed(false) }} style={{
        overlay: {
          background: "light grey",
          opacity: ""
        },
        content: {
          width: "300px",
          height: "300px",
          top: "30%",
          left: "35%",
          backgroundColor: "white",
          borderRadius: "8px",
        }
      }}>
        <img src='public/images/verified.jpg' width={250} height={250} />
      </Model>
      <Model isOpen={notConfirmed} onRequestClose={() => { setNotConfirmed(false) }} style={{
        overlay: {
          background: "light grey",
          opacity: ""
        },
        content: {
          width: "300px",
          height: "300px",
          top: "30%",
          left: "35%",
          backgroundColor: "white",
          borderRadius: "8px",
        }
      }}>
        <img src='public/images/wrong.jpg' width={250} height={250} />
      </Model>
    </div>
  );
};

export default BookTable;

