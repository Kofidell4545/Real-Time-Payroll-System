import React from 'react';
import './Dashboard.css';

const EmployeeDashboard = () => {
  return (
    <div className="employee-dashboard">
      <div className="dashboard-header">
        <h1>Employee Dashboard</h1>
        <div className="user-info">
          <span className="welcome-text">Welcome back, Employee</span>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Current Balance</h3>
          <div className="balance-amount">$2,450.00</div>
          <div className="balance-info">
            <span className="info-label">Next Payment:</span>
            <span className="info-value">May 15, 2025</span>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Payment History</h3>
          <div className="payment-list">
            <div className="payment-item">
              <span className="payment-date">Apr 30, 2025</span>
              <span className="payment-amount">$2,450.00</span>
            </div>
            <div className="payment-item">
              <span className="payment-date">Mar 31, 2025</span>
              <span className="payment-amount">$2,450.00</span>
            </div>
            <div className="payment-item">
              <span className="payment-date">Feb 28, 2025</span>
              <span className="payment-amount">$2,450.00</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <button className="action-btn">Request Advance</button>
            <button className="action-btn">View Pay Stubs</button>
            <button className="action-btn">Update Info</button>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Benefits Overview</h3>
          <div className="benefits-list">
            <div className="benefit-item">
              <span className="benefit-name">Health Insurance</span>
              <span className="benefit-status active">Active</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-name">401(k)</span>
              <span className="benefit-status active">Active</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-name">Dental Coverage</span>
              <span className="benefit-status active">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
