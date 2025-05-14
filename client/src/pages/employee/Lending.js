import React, { useState } from 'react';
import { Typography, Slider } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPiggyBank, faChartLine, faCoins } from '@fortawesome/free-solid-svg-icons';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import './EmployeePages.css';

const Lending = () => {
  const [lendingPercentage, setLendingPercentage] = useState(0);

  // Mock data for interest earned chart
  const interestData = [
    { date: '2025-01', amount: 10.50 },
    { date: '2025-02', amount: 22.75 },
    { date: '2025-03', amount: 35.20 },
    { date: '2025-04', amount: 48.90 },
    { date: '2025-05', amount: 62.45 },
  ];

  const handleLendingChange = (event, newValue) => {
    setLendingPercentage(newValue);
  };

  return (
    <div className="lending-page">
      <Typography variant="h4" className="page-title">
        <FontAwesomeIcon icon={faPiggyBank} className="title-icon" />
        Compound Lending
      </Typography>

      <div className="lending-grid">
        {/* Main Lending Card */}
        <div className="dashboard-card main-lending-card">
          <div className="card-header">
            <Typography variant="h6">
              <FontAwesomeIcon icon={faCoins} className="card-icon" />
              Lending Overview
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
                <Typography variant="h6">$62.45</Typography>
              </div>
            </div>
          </div>
        </div>

        {/* Interest History Card */}
        <div className="dashboard-card interest-history-card">
          <div className="card-header">
            <Typography variant="h6">
              <FontAwesomeIcon icon={faChartLine} className="card-icon" />
              Interest History
            </Typography>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={interestData}>
                <defs>
                  <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#18969b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#18969b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#18969b" 
                  fillOpacity={1} 
                  fill="url(#colorInterest)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="interest-list">
            {interestData.map((item, index) => (
              <div key={index} className="interest-item">
                <span className="interest-date">{item.date}</span>
                <span className="interest-amount">+${item.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lending;
