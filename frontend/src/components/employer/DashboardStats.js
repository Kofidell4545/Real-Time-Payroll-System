import React from 'react';
import { useAccount, useContractRead } from 'wagmi';
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from '../../config/contracts';
import './DashboardStats.css';

const DashboardStats = () => {
  const { address } = useAccount();

  const { data: employerBalance } = useContractRead({
    address: CONTRACT_ADDRESSES.PAYROLL_MANAGER,
    abi: CONTRACT_ABIS.PayrollManager,
    functionName: 'getEmployerBalance',
    args: [address],
    watch: true,
  });

  const { data: bonusBalance } = useContractRead({
    address: CONTRACT_ADDRESSES.BONUS_VAULT,
    abi: CONTRACT_ABIS.BonusVault,
    functionName: 'getEmployerBalance',
    args: [address],
    watch: true,
  });

  return (
    <div className="dashboard-stats">
      <div className="stat-card">
        <h3>Payroll Balance</h3>
        <p className="stat-value">{employerBalance ? Number(employerBalance) / 1e18 : 0} ETH</p>
      </div>

      <div className="stat-card">
        <h3>Bonus Pool</h3>
        <p className="stat-value">{bonusBalance ? Number(bonusBalance) / 1e18 : 0} ETH</p>
      </div>

      <div className="stat-card">
        <h3>Next Payout</h3>
        <p className="stat-value">In 15 days</p>
      </div>

      <div className="stat-card">
        <h3>Active Employees</h3>
        <p className="stat-value">Loading...</p>
      </div>
    </div>
  );
};

export default DashboardStats;
