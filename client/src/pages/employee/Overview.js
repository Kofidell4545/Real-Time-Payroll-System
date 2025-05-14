import React, { useState } from 'react';
import { Typography, Switch, Slider } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import './Overview.css';

const Overview = () => {
  const [lendingPercentage, setLendingPercentage] = useState(0);
  const [insuranceEnabled, setInsuranceEnabled] = useState(false);

  // Mock data for salary history chart
  const salaryData = [
    { date: '2025-01', amount: 2450 },
    { date: '2025-02', amount: 2450 },
    { date: '2025-03', amount: 2450 },
    { date: '2025-04', amount: 2450 },
    { date: '2025-05', amount: 2450 },
  ];

  const handleLendingChange = (event, newValue) => {
    setLendingPercentage(newValue);
  };

  const handleInsuranceToggle = () => {
    setInsuranceEnabled(!insuranceEnabled);
  };

  return (
    <div className="overview-page">
      <div className="dashboard-header">
        <Typography variant="h4" className="header-title">
          Overview
        </Typography>
        <div className="header-stats">
          <div className="stat-item">
            <Typography variant="body2" className="stat-label">Current Balance</Typography>
            <Typography variant="h4" className="stat-value">$2,450.00</Typography>
          </div>
          <div className="stat-item">
            <Typography variant="body2" className="stat-label">Next Payment</Typography>
            <Typography variant="h6" className="stat-value">May 15, 2025</Typography>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Salary History Card */}
        <div className="dashboard-card salary-history">
          <div className="card-header">
            <Typography variant="h6">Salary History</Typography>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={salaryData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#18969b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#18969b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis />
                <RechartsTooltip />
                <Area type="monotone" dataKey="amount" stroke="#18969b" fillOpacity={1} fill="url(#colorAmount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="transaction-list">
            {salaryData.map((item, index) => (
              <div key={index} className="transaction-item">
                <span className="transaction-date">{item.date}</span>
                <span className="transaction-amount">${item.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Compound Lending Card */}
        <div className="dashboard-card lending-card">
          <div className="card-header">
            <Typography variant="h6">
              <FontAwesomeIcon icon={faPiggyBank} className="card-icon" />
              Compound Lending
            </Typography>
            <div className="apy-badge">4.2% APY</div>
          </div>
          <div className="card-content">
            <Typography variant="body2" className="description">
              Earn interest by lending a portion of your salary through Compound protocol.
            </Typography>
            <div className="lending-controls">
              <Typography variant="body2">Percentage to Lend: {lendingPercentage}%</Typography>
              <Slider
                value={lendingPercentage}
                onChange={handleLendingChange}
                aria-labelledby="lending-slider"
                valueLabelDisplay="auto"
                step={5}
                marks
                min={0}
                max={100}
              />
            </div>
            <div className="lending-stats">
              <div className="stat">
                <Typography variant="body2">Currently Lending</Typography>
                <Typography variant="h6">${(2450 * lendingPercentage / 100).toFixed(2)}</Typography>
              </div>
              <div className="stat">
                <Typography variant="body2">Interest Earned</Typography>
                <Typography variant="h6">$12.45</Typography>
              </div>
            </div>
          </div>
        </div>

        {/* Insurance Card */}
        <div className="dashboard-card insurance-card">
          <div className="card-header">
            <Typography variant="h6">
              <FontAwesomeIcon icon={faShieldAlt} className="card-icon" />
              Salary Protection
            </Typography>
            <Switch
              checked={insuranceEnabled}
              onChange={handleInsuranceToggle}
              color="primary"
            />
          </div>
          <div className="card-content">
            <Typography variant="body2" className="description">
              Protect your salary flow with InsurAce protocol coverage.
            </Typography>
            <div className="insurance-details">
              <div className="detail-item">
                <Typography variant="body2">Coverage Amount</Typography>
                <Typography variant="h6">$2,450.00</Typography>
              </div>
              <div className="detail-item">
                <Typography variant="body2">Monthly Premium</Typography>
                <Typography variant="h6">$12.25</Typography>
              </div>
              <div className="detail-item">
                <Typography variant="body2">Status</Typography>
                <span className={`status-badge ${insuranceEnabled ? 'active' : 'inactive'}`}>
                  {insuranceEnabled ? 'Protected' : 'Not Protected'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
