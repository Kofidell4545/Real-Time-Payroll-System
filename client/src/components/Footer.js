import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Us</h4>
          <Link to="/about">Our Story</Link>
          <Link to="/learn-more">Learn More</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-section">
          <h4>Services</h4>
          <Link to="/payroll">Payroll Management</Link>
          <Link to="/benefits">Benefits</Link>
          <Link to="/reports">Reports</Link>
        </div>
        <div className="footer-section">
          <h4>Connect</h4>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Real-Time Payroll System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;