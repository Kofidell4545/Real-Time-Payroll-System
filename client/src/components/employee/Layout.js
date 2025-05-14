import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout = () => {
  return (
    <div className="employee-layout">
      <Sidebar />
      <main className="employee-main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
