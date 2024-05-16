// SectionComponent.jsx

import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="section">
      <div className="left-section">
        <img src="../../../public/images/about.jpg" alt="Restaurant" className="full-height-img" />
      </div>
      <div className="right-section">
        <div className="about-section">
          <h2><span className="bold-text">Welcome to Kusina Restaurant.</span></h2>
          <p>
            On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and 
            everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country. 
            A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts 
            of sentences fly into your mouth.
          </p>
        </div>
        <div className="special-recipe">
          <h2>Special Recipe</h2>
          <div className="dish-container">
            <div className="dish-card">
              <img src="../../../public/images/lunch-4.jpg" alt="Dish 1" className="dish-img" />
              <p><span>Dish 1</span></p>
            </div>
            <div className="dish-card">
              <img src="../../../public/images/lunch-1.jpg" alt="Dish 2" className="dish-img" />
              <p><span>Dish 1</span></p>
            </div>
            <div className="dish-card">
              <img src="../../../public/images/lunch-3.jpg" alt="Dish 3" className="dish-img" />
              <p><span>Dish 1</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
