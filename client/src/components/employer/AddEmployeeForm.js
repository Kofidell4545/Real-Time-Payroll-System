import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import './AddEmployeeForm.css';

const AddEmployeeForm = () => {
  const navigate = useNavigate();
  const [paymentConfig, setPaymentConfig] = useState({
    paymentToken: 'ETH',
    paymentFrequency: 'monthly'
  });

  const [employees, setEmployees] = useState([{
    id: Date.now(),
    name: '',
    email: '',
    walletAddress: '',
    salary: ''
  }]);

  const handleChange = (id, e) => {
    setEmployees(employees.map(emp => 
      emp.id === id ? { ...emp, [e.target.name]: e.target.value } : emp
    ));
  };

  const handleConfigChange = (e) => {
    setPaymentConfig({
      ...paymentConfig,
      [e.target.name]: e.target.value
    });
  };

  const addEmployee = () => {
    setEmployees([...employees, {
      id: Date.now(),
      name: '',
      email: '',
      walletAddress: '',
      salary: ''
    }]);
  };

  const removeEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add employees to blockchain/database
    const employeesWithConfig = employees.map(emp => ({
      ...emp,
      paymentToken: paymentConfig.paymentToken,
      paymentFrequency: paymentConfig.paymentFrequency
    }));
    console.log('Employees to save:', employeesWithConfig);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="payment-config">
        <h2>Payment Configuration</h2>
        <div className="config-grid">
          <div className="form-field">
            <label>Payment Token</label>
            <select
              name="paymentToken"
              value={paymentConfig.paymentToken}
              onChange={handleConfigChange}
              required
            >
              <option value="ETH">ETH</option>
              <option value="USDC">USDC</option>
            </select>
          </div>

          <div className="form-field">
            <label>Payment Frequency</label>
            <select
              name="paymentFrequency"
              value={paymentConfig.paymentFrequency}
              onChange={handleConfigChange}
              required
            >
              <option value="weekly">Weekly</option>
              <option value="biweekly">Bi-weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>
      </div>

      <div className="employees-list">
        <h2>Employee Details</h2>
        {employees.map((employee, index) => (
          <div key={employee.id} className="employee-card">
            {employees.length > 1 && (
              <button 
                type="button" 
                className="remove-button"
                onClick={() => removeEmployee(employee.id)}
              >
                <DeleteIcon />
              </button>
            )}
            
            <div className="form-grid">
              <div className="form-field">
                <label>Employee Name</label>
                <input
                  type="text"
                  name="name"
                  value={employee.name}
                  onChange={(e) => handleChange(employee.id, e)}
                  required
                />
              </div>

              <div className="form-field">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={employee.email}
                  onChange={(e) => handleChange(employee.id, e)}
                  required
                />
              </div>

              <div className="form-field">
                <label>Wallet Address</label>
                <input
                  type="text"
                  name="walletAddress"
                  value={employee.walletAddress}
                  onChange={(e) => handleChange(employee.id, e)}
                  required
                />
              </div>

              <div className="form-field">
                <label>Monthly Salary</label>
                <input
                  type="number"
                  name="salary"
                  value={employee.salary}
                  onChange={(e) => handleChange(employee.id, e)}
                  required
                />
              </div>


            </div>
          </div>
        ))}
      </div>

      <div className="form-actions">
        <div className="form-actions-left">
          <button type="button" className="add-button" onClick={addEmployee}>
            <AddIcon /> Add Another Employee
          </button>
        </div>
        <div className="form-actions-right">
          <button type="button" className="cancel-button" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit" className="save-button">
            Save All
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddEmployeeForm;
