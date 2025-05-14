import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';
import { ConnectKitProvider } from 'connectkit';
import { WalletProvider } from './contexts/WalletContext';
import { config } from './config/wagmi';

// Pages
import LandingPage from './pages/LandingPage';
import EmployerDashboard from './pages/employer/Dashboard';
import EmployeeDashboard from './pages/employee/Dashboard';
import LearnMore from './pages/LearnMore';

// Styles
import './styles/index.css';

function App() {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider theme="dark">
        <WalletProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/learn" element={<LearnMore />} />
              <Route path="/employer/*" element={<EmployerDashboard />} />
              <Route path="/employee/*" element={<EmployeeDashboard />} />
            </Routes>
          </Router>
        </WalletProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default App;
