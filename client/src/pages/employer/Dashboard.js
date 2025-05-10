import React from 'react';
import DashboardStats from '../../components/employer/DashboardStats';
import './Dashboard.css';

const EmployerDashboard = () => {
  return (
    <div className="employer-dashboard">
      <div className="dashboard-content">
        <DashboardStats />
      </div>
    </div>
  );
};

export default EmployerDashboard;
