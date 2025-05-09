import React from 'react';
import { useAccount, useContractRead } from 'wagmi';
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from '../../config/contracts';
import DashboardStats from '../../components/employer/DashboardStats';
import EmployeeList from '../../components/employer/EmployeeList';
import PayrollActions from '../../components/employer/PayrollActions';
import './Dashboard.css';

const EmployerDashboard = () => {
  const { address } = useAccount();

  const { data: employerBalance } = useContractRead({
    address: CONTRACT_ADDRESSES.PAYROLL_MANAGER,
    abi: CONTRACT_ABIS.PayrollManager,
    functionName: 'getEmployerBalance',
    args: [address],
    watch: true,
  });

  return (
    <div className="employer-dashboard">
      <header className="dashboard-header">
        <h1>Employer Dashboard</h1>
        <div className="balance-display">
          Balance: {employerBalance ? Number(employerBalance) / 1e18 : 0} ETH
        </div>
      </header>

      <div className="dashboard-grid">
        <DashboardStats />
        
        <section className="main-content">
          <div className="actions-panel">
            <PayrollActions />
          </div>
          
          <div className="employees-panel">
            <h2>Employees</h2>
            <EmployeeList />
          </div>
        </section>
      </div>
    </div>
  );
};

export default EmployerDashboard;
