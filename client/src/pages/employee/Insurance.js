import React, { useState } from 'react';
import { Typography, Switch, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faFileContract, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import './EmployeePages.css';

const Insurance = () => {
  const [insuranceEnabled, setInsuranceEnabled] = useState(false);

  // Mock data for coverage history
  const coverageData = [
    { date: '2025-01', premium: 12.25, coverage: 2450 },
    { date: '2025-02', premium: 12.25, coverage: 2450 },
    { date: '2025-03', premium: 12.25, coverage: 2450 },
    { date: '2025-04', premium: 12.25, coverage: 2450 },
    { date: '2025-05', premium: 12.25, coverage: 2450 },
  ];

  const handleInsuranceToggle = () => {
    setInsuranceEnabled(!insuranceEnabled);
  };

  return (
    <div className="insurance-page">
      <Typography variant="h4" className="page-title">
        <FontAwesomeIcon icon={faShieldAlt} className="title-icon" />
        Salary Protection
      </Typography>

      <div className="insurance-grid">
        {/* Main Insurance Card */}
        <div className="dashboard-card main-insurance-card">
          <div className="card-header">
            <Typography variant="h6">
              <FontAwesomeIcon icon={faFileContract} className="card-icon" />
              Coverage Overview
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
            <div className="insurance-actions">
              <Button 
                variant="contained" 
                color="primary"
                disabled={!insuranceEnabled}
                fullWidth
              >
                View Policy Details
              </Button>
            </div>
          </div>
        </div>

        {/* Coverage History Card */}
        <div className="dashboard-card coverage-history-card">
          <div className="card-header">
            <Typography variant="h6">
              <FontAwesomeIcon icon={faChartLine} className="card-icon" />
              Coverage History
            </Typography>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={coverageData}>
                <defs>
                  <linearGradient id="colorCoverage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#18969b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#18969b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="coverage" 
                  stroke="#18969b" 
                  fillOpacity={1} 
                  fill="url(#colorCoverage)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="coverage-list">
            {coverageData.map((item, index) => (
              <div key={index} className="coverage-item">
                <span className="coverage-date">{item.date}</span>
                <div className="coverage-details">
                  <span className="coverage-amount">${item.coverage}</span>
                  <span className="coverage-premium">-${item.premium}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insurance;
