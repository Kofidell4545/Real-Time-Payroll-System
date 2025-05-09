import React from 'react';
import { useConnect } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import './Header.css';

const Header = () => {
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });

  const handleConnectWallet = () => {
    connect();
  };

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
          <button 
            className="connect-wallet-btn" 
            onClick={handleConnectWallet}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;