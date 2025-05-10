import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { ConnectKitButton } from 'connectkit';
import './GetStartedCards.css';

const GetStartedCards = () => {
  const navigate = useNavigate();
  const { isConnected } = useAccount();

  const handleLogin = (path) => {
    if (isConnected) {
      navigate(path);
    }
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
          {isConnected ? (
            <button onClick={() => handleLogin('/employee')} className="get-started-btn">
              Get Started
            </button>
          ) : (
            <ConnectKitButton />
          )}
        </div>

        <div className="card employer-card">
          <h3>Employer / Firm</h3>
          <p className="card-subtitle">
            Manage your organization's payroll and employee benefits.
          </p>
          {isConnected ? (
            <button onClick={() => handleLogin('/employer')} className="login-btn">
              Login as Employer
            </button>
          ) : (
            <ConnectKitButton />
          )}
        </div>
      </div>
    </div>
  );
};

export default GetStartedCards;
