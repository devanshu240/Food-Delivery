import React from 'react';
import './Chefs.css'; // Import CSS file for styling

const Chefs = () => {
  return (
    <div className="chef-container">
      <div className="chef-heading">
        <h1><span className="unique-text">Chef</span></h1>
        <h2>Our Chefs</h2>
      </div>
      <div className="chef-cards">
        {/* Card 1 */}
        <div className="chef-card">
          <div className="chef-img">
            <img src="../../../public/images/chef-1.jpg" alt="Chef 1" />
          </div>
          <div className="chef-details">
            <h3>Name: John Doe</h3>
            <p>Position: Head Chef</p>
            <p>Social Media: @john_doe</p>
          </div>
        </div>
        {/* Card 2 */}
        <div className="chef-card">
          <div className="chef-img">
            <img src="../../../public/images/chef-2.jpg" alt="Chef 2" />
          </div>
          <div className="chef-details">
            <h3>Name: Jane Smith</h3>
            <p>Position: Sous Chef</p>
            <p>Social Media: @jane_smith</p>
          </div>
        </div>
        {/* Chef 3 */}
        <div className="chef-card">
          <div className="chef-img">
            <img src="../../../public/images/chef-3.jpg" alt="Chef 2" />
          </div>
          <div className="chef-details">
            <h3>Name: Jane Smith</h3>
            <p>Position: Sous Chef</p>
            <p>Social Media: @jane_smith</p>
          </div>
        </div>
        {/* chef 4 */}
        <div className="chef-card">
          <div className="chef-img">
            <img src="../../../public/images/chef-4.jpg" alt="Chef 2" />
          </div>
          <div className="chef-details">
            <h3>Name: Jane Smith</h3>
            <p>Position: Sous Chef</p>
            <p>Social Media: @jane_smith</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chefs;
