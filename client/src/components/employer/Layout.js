import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout = () => {
  return (
    <div className="employer-layout">
      <Sidebar />
      <main className="employer-main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
