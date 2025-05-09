import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';
import { config } from './config/wagmi';

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
  return (
    <div className="app">
      <WagmiConfig config={config}>
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
      </WagmiConfig>
    </div>
  );
}

export default App;
