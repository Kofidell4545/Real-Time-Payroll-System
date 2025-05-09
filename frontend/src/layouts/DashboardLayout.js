import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import './DashboardLayout.css';

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <Navigation />
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
