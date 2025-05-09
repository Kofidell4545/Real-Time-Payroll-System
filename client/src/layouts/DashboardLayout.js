import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Sidebar from '../components/employer/Sidebar';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const location = useLocation();
  const isEmployerRoute = location.pathname.startsWith('/employer');

  return (
    <div className="dashboard-layout">
      {isEmployerRoute ? <Sidebar /> : <Navigation />}
      <div className={`dashboard-content ${isEmployerRoute ? 'with-sidebar' : ''}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
