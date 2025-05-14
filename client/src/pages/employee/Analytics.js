import React from 'react';
import { Typography } from '@mui/material';
import './EmployeePages.css';

const Analytics = () => {
  return (
    <div className="analytics-page">
      <Typography variant="h4" style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '2rem' }}>
        Analytics
      </Typography>
      <Typography variant="body1" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
        Analytics dashboard coming soon...
      </Typography>
    </div>
  );
};

export default Analytics;
