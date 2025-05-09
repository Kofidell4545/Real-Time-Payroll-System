import React, { useState, useEffect } from 'react';
import { useAccount, useContractRead, useContractWrite } from 'wagmi';
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from '../../config/contracts';
import { supabase } from '../../utils/supabase';
import './EmployeeList.css';

const EmployeeList = () => {
  const { address } = useAccount();
  const [employees, setEmployees] = useState([]);

  const { data: employeeData } = useContractRead({
    address: CONTRACT_ADDRESSES.PAYROLL_MANAGER,
    abi: CONTRACT_ABIS.PayrollManager,
    functionName: 'getEmployeeDetails',
    args: [address],
    enabled: !!address,
  });

  // Pay salary function
  const { write: paySalary } = useContractWrite({
    address: CONTRACT_ADDRESSES.PAYROLL_MANAGER,
    abi: CONTRACT_ABIS.PayrollManager,
    functionName: 'paySalary',
  });

  useEffect(() => {
    const fetchEmployeeMetadata = async () => {
      if (!employeeData) return;
      
      const employeeDetails = [];
      for (const emp of employeeData) {
        const { data } = await supabase
          .from('user_metadata')
          .select('name, email, role')
          .eq('wallet_address', emp.wallet)
          .single();

        employeeDetails.push({
          ...emp,
          name: data?.name || 'Unknown',
          email: data?.email,
          role: data?.role,
        });
      }
      
      setEmployees(employeeDetails);
    };

    if (employeeData) {
      fetchEmployeeMetadata();
    }
  }, [employeeData]);

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
          <div key={employee.wallet} className="list-item">
            <div className="employee-info">
              <span className="employee-name">{employee.name}</span>
              <span className="employee-address">{employee.wallet}</span>
            </div>
            <div>{Number(employee.salary) / 1e18} ETH</div>
            <div>{new Date(employee.lastPayment * 1000).toLocaleDateString()}</div>
            <div>
              <span className={`status ${employee.active ? 'active' : 'inactive'}`}>
                {employee.active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="actions">
              <button
                onClick={() => handlePaySalary(employee.wallet)}
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
