import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useConnect, useAccount } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import './GetStartedCards.css';

const GetStartedCards = () => {
  const navigate = useNavigate();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { isConnected } = useAccount();

  const handleLogin = (path) => {
    if (!isConnected) {
      connect();
    }
    navigate(path);
  };

  return (
    <div className="get-started-cards">
      <div className="section-header">
        <h2>Choose Your Account Type</h2>
        <p>Select your role to access the dashboard</p>
      </div>
      <div className="cards-container">
        <div className="card employee-card">
          <h3>Employee</h3>
          <p className="card-subtitle">
            Access your employee dashboard to manage your payroll and benefits.
          </p>
          <button 
            className="login-btn" 
            onClick={() => handleLogin('/employee')}
          >
            {isConnected ? 'Login as Employee' : 'Connect Wallet'}
          </button>
        </div>

        <div className="card employer-card">
          <h3>Employer / Firm</h3>
          <p className="card-subtitle">
            Manage your organization's payroll and employee benefits.
          </p>
          <button 
            className="login-btn" 
            onClick={() => handleLogin('/employer')}
          >
            {isConnected ? 'Login as Employer' : 'Connect Wallet'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStartedCards;
