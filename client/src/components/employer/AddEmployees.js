import React, { useState } from 'react';
import { useContractWrite } from 'wagmi';
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from '../../config/contracts';
import './AddEmployees.css';

const EmployeeCard = ({ employee, onChange, onDelete }) => {
  return (
    <div className="employee-card">
      <div className="card-header">
        <h3>Software Engineer</h3>
        {onDelete && (
          <button className="delete-btn" onClick={onDelete}>×</button>
        )}
      </div>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          value={employee.name}
          onChange={(e) => onChange({ ...employee, name: e.target.value })}
          placeholder="Employee name"
        />
      </div>
      <div className="form-group">
        <label>Wallet Address</label>
        <input
          type="text"
          value={employee.walletAddress}
          onChange={(e) => onChange({ ...employee, walletAddress: e.target.value })}
          placeholder="0x..."
        />
      </div>
      <div className="form-group">
        <label>Amount</label>
        <input
          type="number"
          step="0.01"
          value={employee.amount}
          onChange={(e) => onChange({ ...employee, amount: e.target.value })}
          placeholder="Amount in ETH"
        />
      </div>
    </div>
  );
};

const AddEmployees = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: '', walletAddress: '', amount: '' }
  ]);
  const [error, setError] = useState('');

  const { write: addEmployee } = useContractWrite({
    address: CONTRACT_ADDRESSES.PAYROLL_MANAGER,
    abi: CONTRACT_ABIS.PayrollManager,
    functionName: 'addEmployee',
  });

  const handleAddCard = () => {
    const newId = Math.max(...employees.map(emp => emp.id)) + 1;
    setEmployees([...employees, { id: newId, name: '', walletAddress: '', amount: '' }]);
  };

  const handleEmployeeChange = (id, updatedEmployee) => {
    setEmployees(employees.map(emp => 
      emp.id === id ? { ...updatedEmployee, id } : emp
    ));
  };

  const handleDeleteCard = (id) => {
    if (employees.length > 1) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const validateEmployee = (employee) => {
    if (!employee.name.trim()) return 'Name is required';
    if (!employee.walletAddress.match(/^0x[a-fA-F0-9]{40}$/)) return 'Invalid wallet address';
    if (!employee.amount || isNaN(employee.amount) || parseFloat(employee.amount) <= 0) return 'Invalid amount';
    return null;
  };

  const handleSave = async () => {
    setError('');
    
    for (const employee of employees) {
      const validationError = validateEmployee(employee);
      if (validationError) {
        setError(`Error for ${employee.name || 'unnamed employee'}: ${validationError}`);
        return;
      }
    }

    for (const employee of employees) {
      try {
        const amountInWei = window.BigInt(Math.floor(parseFloat(employee.amount) * 1e18).toString());
        await addEmployee?.({ args: [employee.walletAddress, amountInWei] });
      } catch (err) {
        console.error(`Error adding employee ${employee.name}:`, err);
        setError(`Failed to add employee ${employee.name}`);
        return;
      }
    }

    // Clear all cards except one
    setEmployees([{ id: 1, name: '', walletAddress: '', amount: '' }]);
  };

  return (
    <div className="add-employees-container">
      <div className="cards-container">
        {employees.map(employee => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            onChange={(updated) => handleEmployeeChange(employee.id, updated)}
            onDelete={employees.length > 1 ? () => handleDeleteCard(employee.id) : null}
          />
        ))}
      </div>
      
      {error && <div className="error">{error}</div>}
      
      <div className="button-container">
        <button className="save-btn" onClick={handleSave}>Save</button>
        <button className="add-btn" onClick={handleAddCard}>Add</button>
      </div>
    </div>
  );
};

export default AddEmployees;
