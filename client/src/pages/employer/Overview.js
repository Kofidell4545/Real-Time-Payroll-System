import React from 'react';
import DashboardStats from '../../components/employer/DashboardStats';
import './EmployerPages.css';

const Overview = () => {
  return (
    <div className="overview-page">
      <h1 className="page-title">Dashboard Overview</h1>
      <div className="dashboard-content">
        <DashboardStats />
      </div>
    </div>
  );
};

export default Overview;
