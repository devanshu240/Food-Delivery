import React from 'react';
import './FeedbackCard.css';

const FeedbackCard = ({ name, feedback, experience }) => {
  return (
    <div className="feedback-card">
      <div className="feedback-card-name">{name}</div>
      <div className="feedback-card-feedback">{feedback}</div>
      <div className="feedback-card-experience">
        <div className="feedback-card-owl">
          {/* <div className="feedback-card-eyes"></div> */}
          <div className="feedback-card-beak">{experience}</div>
        </div>
        {/* <div className="feedback-card-experience-text">good</div> */}
      </div>
    </div>
  );
};

export default FeedbackCard;
