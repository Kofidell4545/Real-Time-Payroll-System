import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { mainnet, base } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { WalletProvider } from './contexts/WalletContext';

// Pages
import LandingPage from './pages/LandingPage';
import EmployerDashboard from './pages/employer/Dashboard';
import EmployeeDashboard from './pages/employee/Dashboard';
import AddEmployeesPage from './pages/employer/AddEmployeesPage';
import LearnMore from './pages/LearnMore';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

// Components
import ProtectedRoute from './components/ProtectedRoute';

// Styles
import './styles/index.css';
import './App.css';

function App() {
  const config = createConfig(
    getDefaultConfig({
      appName: 'Real Time Payroll System',
      chains: [base, mainnet],
      walletConnectProjectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID || '',
    })
  );

  return (
    <div className="app">
      <WagmiConfig config={config}>
        <ConnectKitProvider theme="auto">
          <WalletProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/learn-more" element={<LearnMore />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route path="/employer" element={<EmployerDashboard />} />
              <Route path="/employer/add-employees" element={<AddEmployeesPage />} />
              <Route path="/employee" element={<EmployeeDashboard />} />
            </Route>
          </Routes>
        </Router>
          </WalletProvider>
        </ConnectKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default App;
