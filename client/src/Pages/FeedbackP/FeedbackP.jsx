// FeedbackPage.js
import React, { useContext, useEffect, useState } from 'react';
import './FeedbackP.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import FeedbackCard from '../../components/FeedbackCard/FeedbackCard';
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const FeedbackP = () => {
  const Navigate = useNavigate();

  const [data, setData] = useState([]);
  const { user, setUser, feedbackArray, setFeedbackArray } = useContext(UserContext);
  const [exp, setExp] = useState(null);
  const [feedback, setFeedback] = useState();
  const [submit, setSubmit] = useState(false);

  const handleExp = (e) => {
    console.log(e.target.value);
    setExp(e.target.value);
  }
  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  }
  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    setSubmit(false);
    if (exp == null) {
      alert("please select experience then submit");
    }
    else {
      const data = {
        Name: user.name,
        Feedback: feedback,
        Experience: exp,
        role: "user"
      };
      try {
        const res = await axios.post("/api/feedback/add", data);
        if (res.data.success === true) {
          setFeedback("");
          setExp(null);
          setSubmit(true);
          setFeedbackArray([...feedbackArray, res.data.feedSaved])
        }
        else{
          alert(`${res.data.msg}`);
          setUser(null);
          Navigate("/");
        }
      }
      catch (e) {
        console.log(e);
      }
      // .then((res)=>{
      //   console.log(res);
      //   setFeedback("");
      //   setExp(null);
      //   setSubmit(true);
      //   setFeedbackArray([...feedbackArray,data])
      // })
      // .catch((e)=>{
      //   console.log(e);
      //   if(e.response.status==400){
      //     Navigate("/login");
      //   }
      // })

    }
  }

  useEffect(() => {
    axios.get("/api/feedback/list")
      .then((res) => { setFeedbackArray(res.data) })
      .catch((e) => { console.log(e) });
  }, [])

  return (
    <>
      <Navbar />
      <div className="feedback-container">
        <div className="feedback-image">
          {feedbackArray.map((ele, i) => {
            return <FeedbackCard key={i} name={ele.Name} feedback={ele.Feedback} experience={ele.Experience} />
          })}
        </div>
        <div className="feedback-form">
          <h2>Feedback Form</h2>
          <form>
            <div className="form-group">
              <label htmlFor="feedback">Feedback:</label>
              <textarea id="feedback" name="feedback" rows="5" onChange={handleFeedbackChange} value={feedback}></textarea>
            </div>
            <div className="form-group">
              <label>Experience:</label>
              <div className="tags-container">
                <label><input type="radio" name="tags" value="good" onClick={handleExp} checked={exp === "good"} required /> Good</label>
                <label><input type="radio" name="tags" value="bad" onClick={handleExp} checked={exp === "bad"} required /> Bad</label>
                <label><input type="radio" name="tags" value="poor" onClick={handleExp} checked={exp === "poor"} required /> Poor</label>
                <label><input type="radio" name="tags" value="excellent" onClick={handleExp} checked={exp === "excellent"} required /> Excellent</label>
                <label><input type="radio" name="tags" value="normal" onClick={handleExp} checked={exp === "normal"} required /> Normal</label>
              </div>
            </div>
            <button type="submit" onClick={handleSubmitFeedback}>Submit Feedback</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FeedbackP;
