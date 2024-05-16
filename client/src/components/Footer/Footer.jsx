import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-info">
          <h3>Kusina</h3>
          <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
        </div>
        <div className="footer-hours">
          <h4>Open Hours</h4>
          <ul>
            <li><strong>Monday:</strong> 9:00 - 24:00</li>
            <li><strong>Tuesday:</strong> 9:00 - 24:00</li>
            <li><strong>Wednesday:</strong> 9:00 - 24:00</li>
            <li><strong>Thursday:</strong> 9:00 - 24:00</li>
            <li><strong>Friday:</strong> 9:00 - 02:00</li>
            <li><strong>Saturday:</strong> 9:00 - 02:00</li>
            <li><strong>Sunday:</strong> Closed</li>
          </ul>
        </div>
        <div className="footer-newsletter">
          <h4>Newsletter</h4>
          <p>Far far away, behind the word mountains, far from the countries.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
