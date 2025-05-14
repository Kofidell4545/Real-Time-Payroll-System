import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../../components/employee/Layout';
import Overview from './Overview';
import Analytics from './Analytics';
import Lending from './Lending';
import Insurance from './Insurance';
import History from './History';
import Profile from './Profile';

import './Dashboard.css';

const EmployeeDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Overview />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="lending" element={<Lending />} />
        <Route path="insurance" element={<Insurance />} />
        <Route path="history" element={<History />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default EmployeeDashboard;
