import React, { useState, useEffect } from 'react';
import { useAccount, useContractRead, useContractWrite } from 'wagmi';
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from '../../config/contracts';
import { supabase } from '../../utils/supabase';
import './EmployeeList.css';

const EmployeeList = () => {
  const { address } = useAccount();
  const [employees, setEmployees] = useState([]);

  // Function to fetch employee metadata from Supabase
  const fetchEmployeeMetadata = async (employeeAddress) => {
    const { data, error } = await supabase
      .from('user_metadata')
      .select('name, email, role')
      .eq('wallet_address', employeeAddress)
      .single();

    if (error) return null;
    return data;
  };

  // Function to fetch employee details from smart contract
  const getEmployeeDetails = async (employeeAddress) => {
    const { data } = await useContractRead({
      address: CONTRACT_ADDRESSES.PAYROLL_MANAGER,
      abi: CONTRACT_ABIS.PayrollManager,
      functionName: 'getEmployeeDetails',
      args: [address, employeeAddress],
    });

    return data;
  };

  // Pay salary function
  const { write: paySalary } = useContractWrite({
    address: CONTRACT_ADDRESSES.PAYROLL_MANAGER,
    abi: CONTRACT_ABIS.PayrollManager,
    functionName: 'paySalary',
  });

  const handlePaySalary = (employeeAddress) => {
    paySalary?.({ args: [employeeAddress] });
  };

  return (
    <div className="employee-list">
      <div className="list-header">
        <div>Employee</div>
        <div>Salary (ETH)</div>
        <div>Last Payment</div>
        <div>Status</div>
        <div>Actions</div>
      </div>

      <div className="list-body">
        {employees.map((employee) => (
          <div key={employee.address} className="list-item">
            <div className="employee-info">
              <span className="employee-name">{employee.name || 'Unknown'}</span>
              <span className="employee-address">{employee.address}</span>
            </div>
            <div>{employee.salary} ETH</div>
            <div>{new Date(employee.lastPayment * 1000).toLocaleDateString()}</div>
            <div>
              <span className={`status ${employee.active ? 'active' : 'inactive'}`}>
                {employee.active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="actions">
              <button
                onClick={() => handlePaySalary(employee.address)}
                disabled={!employee.active}
              >
                Pay Salary
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
