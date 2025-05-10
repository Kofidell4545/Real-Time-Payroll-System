import React from 'react';
import AddEmployeeForm from '../../components/employer/AddEmployeeForm';
import { Box, Container, Typography } from '@mui/material';
import '../../styles/PageLayout.css';

const AddEmployeesPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Add Employees</h1>
      </div>
      <div className="page-content">
        <AddEmployeeForm />
      </div>
    </div>
  );
};

export default AddEmployeesPage;
