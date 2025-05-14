import React from 'react';
import { Typography } from '@mui/material';
import './EmployeePages.css';

const History = () => {
  return (
    <div className="history-page">
      <Typography variant="h4" style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '2rem' }}>
        Transaction History
      </Typography>
      <Typography variant="body1" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
        Detailed transaction history coming soon...
      </Typography>
    </div>
  );
};

export default History;
