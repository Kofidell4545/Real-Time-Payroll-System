import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../../components/employer/Layout';
import Overview from './Overview';
import AddEmployees from './AddEmployees';
import Ledger from './Ledger';
import Profile from './Profile';

const EmployerDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Overview />} />
        <Route path="add-employees" element={<AddEmployees />} />
        <Route path="ledger" element={<Ledger />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default EmployerDashboard;
