import React, { useState } from 'react';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { parseEther } from 'ethers/lib/utils';
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from '../../config/contracts';
import './PayrollActions.css';

const PayrollActions = () => {
  const { address } = useAccount();
  const [amount, setAmount] = useState('');
  const [employeeAddress, setEmployeeAddress] = useState('');
  const [salary, setSalary] = useState('');

  const { config: depositConfig } = usePrepareContractWrite({
    address: CONTRACT_ADDRESSES.PAYROLL_MANAGER,
    abi: CONTRACT_ABIS.PayrollManager,
    functionName: 'depositFunds',
    value: amount ? parseEther(amount) : undefined,
  });

  const { write: deposit } = useContractWrite(depositConfig);

  const { config: addEmployeeConfig } = usePrepareContractWrite({
    address: CONTRACT_ADDRESSES.PAYROLL_MANAGER,
    abi: CONTRACT_ABIS.PayrollManager,
    functionName: 'addEmployee',
    args: [employeeAddress, salary ? parseEther(salary) : undefined],
  });

  const { write: addEmployee } = useContractWrite(addEmployeeConfig);

  const handleDeposit = (e) => {
    e.preventDefault();
    if (!amount) return;
    deposit?.();
    setAmount('');
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!employeeAddress || !salary) return;
    addEmployee?.();
    setEmployeeAddress('');
    setSalary('');
  };

  return (
    <div className="payroll-actions">
      <div className="action-card">
        <h3>Deposit Funds</h3>
        <form onSubmit={handleDeposit}>
          <div className="form-group">
            <label htmlFor="amount">Amount (ETH)</label>
            <input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
            />
          </div>
          <button type="submit" disabled={!deposit}>
            Deposit
          </button>
        </form>
      </div>

      <div className="action-card">
        <h3>Add Employee</h3>
        <form onSubmit={handleAddEmployee}>
          <div className="form-group">
            <label htmlFor="employeeAddress">Employee Address</label>
            <input
              id="employeeAddress"
              type="text"
              value={employeeAddress}
              onChange={(e) => setEmployeeAddress(e.target.value)}
              placeholder="0x..."
            />
          </div>
          <div className="form-group">
            <label htmlFor="salary">Monthly Salary (ETH)</label>
            <input
              id="salary"
              type="number"
              step="0.01"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="0.00"
            />
          </div>
          <button type="submit" disabled={!addEmployee}>
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default PayrollActions;
