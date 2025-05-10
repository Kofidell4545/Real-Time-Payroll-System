import React from 'react';
import { ConnectKitButton } from 'connectkit';
import './Header.css';

const Header = () => {


  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <a href="/" className="logo-text">RT Payroll</a>
        </div>
        <nav className="nav-links">
          <a href="/" className="nav-link">Home</a>
          <a href="#how-it-works" className="nav-link">How it Works</a>
          <a href="#results" className="nav-link">Results</a>
          <a href="#testimonials" className="nav-link">Testimonials</a>
        </nav>
        <div className="wallet-section">
          <ConnectKitButton />
        </div>
      </div>
    </header>
  );
};

export default Header;