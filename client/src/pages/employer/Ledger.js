import React, { useState, useEffect } from 'react';
import LedgerSummary from '../../components/ledger/LedgerSummary';
import TransactionTable from '../../components/ledger/TransactionTable';
import LedgerFilters from '../../components/ledger/LedgerFilters';
import './Ledger.css';

const Ledger = () => {

  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: [null, null],
    searchQuery: '',
  });
  const [summaryStats, setSummaryStats] = useState({
    monthlyTotal: 0,
    monthlyGasFees: 0,
    totalEmployeesPaid: 0,
  });

  // Fetch transactions data
  useEffect(() => {
    // TODO: Implement API call to fetch transactions
    const mockData = [
      {
        id: 1,
        date: '2025-05-13',
        batchId: 'BATCH001',
        employeeCount: 14,
        totalAmount: '28000',
        gasFees: '0.05',
        txHash: '0x1234...5678',
        employees: [
          { name: 'Joel Aidoo', wallet: '0xabc1...def1', amount: '2000' },
          { name: 'Chris Nyame', wallet: '0xabc2...def2', amount: '2000' },
          { name: 'Micheal Own', wallet: '0xabc3...def3', amount: '2000' },
          { name: 'Ransford Georg', wallet: '0xabc4...def4', amount: '2000' },
          { name: 'Clinton Mark', wallet: '0xabc5...def5', amount: '2000' },
          { name: 'Emmanuel Ameyaw', wallet: '0xabc6...def6', amount: '2000' },
          { name: 'Samuel Apka', wallet: '0xabc7...def7', amount: '2000' },
          { name: 'Angela Yawson', wallet: '0xabc8...def8', amount: '2000' },
          { name: 'Maryline Nkunim', wallet: '0xabc9...def9', amount: '2000' },
          { name: 'Charles Nii', wallet: '0xabc10...def10', amount: '2000' },
          { name: 'David Asante', wallet: '0xabc11...def11', amount: '2000' },
          { name: 'Darly Ankrah', wallet: '0xabc12...def12', amount: '2000' },
          { name: 'Francis John', wallet: '0xabc13...def13', amount: '2000' },
          { name: 'Nhyiraba Kofi', wallet: '0xabc14...def14', amount: '2000' },
        ],
      },
      // Add more mock data as needed
    ];
    setTransactions(mockData);
  }, []);

  // Update summary stats
  useEffect(() => {
    // TODO: Replace with actual calculations from API data
    setSummaryStats({
      monthlyTotal: 15000,
      monthlyGasFees: 0.15,
      totalEmployeesPaid: 15,
    });
  }, [transactions]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // TODO: Implement filter logic
  };

  return (
    <div className="ledger-page">
      <div className="ledger-content">
        <h1 className="ledger-header">Transaction Ledger</h1>
        
        <div className="ledger-panel">
          <LedgerSummary stats={summaryStats} />
        </div>
        
        <div className="ledger-panel">
          <LedgerFilters filters={filters} onFilterChange={handleFilterChange} />
        </div>
        
        <div className="ledger-panel">
          <TransactionTable transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

export default Ledger;
