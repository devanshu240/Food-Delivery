// Header.js
import React from 'react';
import './Header.css'; // Import CSS file for styling

const Header = () => {
  return (
    <header className="header">
      <div className="left-section">
        <div className="restaurant-info">
          <h1>Restaurant Name</h1>
          {/* <p>Enjoy the finest dishes crafted with passion and care.</p> */}
            {/* <p>Experience culinary delights that will tantalize your taste buds.</p> */}
            <p>Indulge in a feast of flavors that will leave you craving for more.</p>
        </div>
        <div className="food-cards">
          <div className="food-card">
            <img src="../../../public/images/menu-1.jpg" alt="Dish 1" />
            <p>Dish 1</p>
          </div>
          <div className="food-card">
            <img src="../../../public/images/menu-2.jpg" alt="Dish 2" />
            <p>Dish 2</p>
          </div>
          <div className="food-card">
            <img src="../../../public/images/menu-3.jpg" alt="Dish 3" />
            <p>Dish 3</p>
          </div>
        </div>
        <button className="book-table-btn">Book a Table</button>
      </div>
      <div className="right-section">
        <img src="../../../public/images/bg_5.jpg" alt="Dish 4" />
      </div>
    </header>
  );
}

export default Header;
