import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Add as AddIcon, Delete as DeleteIcon, Send as SendIcon } from '@mui/icons-material';
import { useAccount, useContractWrite, useWaitForTransaction } from 'wagmi';
import { parseEther } from 'viem';
import contractConfig from '../../contracts/PayrollManager.json';
import './AddEmployeeForm.css';

const AddEmployeeForm = () => {
  const navigate = useNavigate();
  const { isConnected, address } = useAccount();
  const [transactionStatus, setTransactionStatus] = useState('');
  const [currentEmployeeIndex, setCurrentEmployeeIndex] = useState(0);
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

  const addEmployeeToList = () => {
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
    const employeesWithConfig = employees.map(emp => ({
      ...emp,
      paymentToken: paymentConfig.paymentToken,
      paymentFrequency: paymentConfig.paymentFrequency
    }));
    console.log('Employees to save:', employeesWithConfig);
    // Save to local storage or state management for later transaction
    localStorage.setItem('pendingEmployees', JSON.stringify(employeesWithConfig));
  };

  const { write: addEmployee, data: addEmployeeData } = useContractWrite({
    address: contractConfig.address,
    abi: contractConfig.abi,
    functionName: 'addEmployee',
  });

  const { isLoading: isAddingEmployee, isSuccess: employeeAdded } = useWaitForTransaction({
    hash: addEmployeeData?.hash,
    onSuccess() {
      setCurrentEmployeeIndex(prev => prev + 1);
      setTransactionStatus(`Successfully added employee ${currentEmployeeIndex + 1} of ${employees.length}`);
      if (currentEmployeeIndex + 1 === employees.length) {
        localStorage.removeItem('pendingEmployees');
        setTransactionStatus('All employees have been added successfully!');
      }
    },
    onError(error) {
      console.error('Transaction failed:', error);
      setTransactionStatus(`Failed to add employee ${currentEmployeeIndex + 1}: ${error.message}`);
    },
  });

  const handleTransaction = async () => {
    if (!isConnected) {
      setTransactionStatus('Please connect your wallet first');
      return;
    }

    try {
      const pendingEmployees = JSON.parse(localStorage.getItem('pendingEmployees'));
      
      if (!pendingEmployees || pendingEmployees.length === 0) {
        setTransactionStatus('No pending employees to process');
        return;
      }

      // Get the current employee to process
      const employee = pendingEmployees[currentEmployeeIndex];
      if (!employee) {
        setTransactionStatus('All employees have been processed');
        return;
      }

      setTransactionStatus(`Processing employee ${currentEmployeeIndex + 1} of ${pendingEmployees.length}...`);

      // Convert salary to wei (assuming salary is in ETH)
      const salaryInWei = parseEther(employee.salary.toString());

      // Call the contract
      addEmployee({
        args: [employee.walletAddress, salaryInWei],
      });

    } catch (error) {
      console.error('Transaction failed:', error);
      setTransactionStatus('Transaction failed: ' + error.message);
    }
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
          <button type="button" className="add-button" onClick={addEmployeeToList}>
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
          <button 
            type="button" 
            className="transaction-button" 
            onClick={handleTransaction}
            disabled={!isConnected || isAddingEmployee}
          >
            <SendIcon />
            {isAddingEmployee 
              ? `Adding Employee ${currentEmployeeIndex + 1}/${employees.length}...`
              : 'Make Transaction'
            }
          </button>
        </div>
        {transactionStatus && (
          <div className={`transaction-status ${transactionStatus.includes('failed') ? 'error' : ''}`}>
            {transactionStatus}
          </div>
        )}
      </div>
    </form>
  );
};

export default AddEmployeeForm;
