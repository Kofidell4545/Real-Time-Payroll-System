import React, { useState } from 'react';
import {
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
  FormControl,
  InputLabel
} from '@mui/material';
import './EmployerPages.css';

const AddEmployees = () => {
  const [paymentToken, setPaymentToken] = useState('ETH');
  const [paymentFrequency, setPaymentFrequency] = useState('Monthly');
  const [employees, setEmployees] = useState([{
    name: '',
    email: '',
    walletAddress: '',
    monthlySalary: ''
  }]);

  const handleAddEmployee = () => {
    setEmployees([...employees, {
      name: '',
      email: '',
      walletAddress: '',
      monthlySalary: ''
    }]);
  };

  const handleEmployeeChange = (index, field, value) => {
    const newEmployees = [...employees];
    newEmployees[index][field] = value;
    setEmployees(newEmployees);
  };

  const handleDeleteEmployee = (index) => {
    if (employees.length > 1) {
      const newEmployees = employees.filter((_, i) => i !== index);
      setEmployees(newEmployees);
    }
  };

  return (
    <div className="add-employees-page">
      <Typography variant="h4" className="page-title">
        Add Employees
      </Typography>

      <div className="config-section">
        <Typography variant="h6" className="section-title">
          Payment Configuration
        </Typography>
        <div className="payment-config">
          <FormControl className="config-select">
            <InputLabel>Payment Token</InputLabel>
            <Select
              value={paymentToken}
              onChange={(e) => setPaymentToken(e.target.value)}
              label="Payment Token"
            >
              <MenuItem value="ETH">ETH</MenuItem>
              <MenuItem value="USDC">USDC</MenuItem>
              <MenuItem value="DAI">DAI</MenuItem>
            </Select>
          </FormControl>

          <FormControl className="config-select">
            <InputLabel>Payment Frequency</InputLabel>
            <Select
              value={paymentFrequency}
              onChange={(e) => setPaymentFrequency(e.target.value)}
              label="Payment Frequency"
            >
              <MenuItem value="Monthly">Monthly</MenuItem>
              <MenuItem value="Bi-weekly">Bi-weekly</MenuItem>
              <MenuItem value="Weekly">Weekly</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="employees-section">
        <Typography variant="h6" className="section-title">
          Employee Details
        </Typography>
        {employees.map((employee, index) => (
          <div key={index} className="employee-details-container">
            <div className="employee-header">
              <Button
                variant="text"
                color="error"
                onClick={() => handleDeleteEmployee(index)}
                className="delete-btn"
                disabled={employees.length === 1}
              >
                Delete
              </Button>
            </div>
            <div className="employee-details">
              <TextField
                fullWidth
                label="Employee Name"
                value={employee.name}
                onChange={(e) => handleEmployeeChange(index, 'name', e.target.value)}
                className="employee-input"
              />
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={employee.email}
                onChange={(e) => handleEmployeeChange(index, 'email', e.target.value)}
                className="employee-input"
              />
              <TextField
                fullWidth
                label="Wallet Address"
                value={employee.walletAddress}
                onChange={(e) => handleEmployeeChange(index, 'walletAddress', e.target.value)}
                className="employee-input"
              />
              <TextField
                fullWidth
                label="Monthly Salary"
                type="number"
                value={employee.monthlySalary}
                onChange={(e) => handleEmployeeChange(index, 'monthlySalary', e.target.value)}
                className="employee-input"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="form-actions">
        <Button
          variant="contained"
          color="success"
          onClick={handleAddEmployee}
          className="add-employee-btn"
        >
          + Add Another Employee
        </Button>
        <div className="right-actions">
          <Button
            variant="outlined"
            color="primary"
            className="cancel-btn"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="save-btn"
          >
            Save All
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="transaction-btn"
          >
            ➜ Make Transaction
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployees;
