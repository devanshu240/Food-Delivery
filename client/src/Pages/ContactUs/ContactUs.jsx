// ContactUs.js
import React from 'react';
import './ContactUs.css';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';

const ContactUs = () => {
  return (
    <>
    <Navbar/>
    <div className="contact-container">
      <div className="contact-image">
        <img src='../../../public/images/chef-4.jpg' alt='chef'/>
      </div>
      <div className="contact-form">
        <h2>Contact Us</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject:</label>
            <input type="text" id="subject" name="subject" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="5"></textarea>
          </div>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ContactUs;
