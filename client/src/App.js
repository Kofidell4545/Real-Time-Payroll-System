import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LearnMore from './pages/LearnMore';
import { WagmiConfig } from 'wagmi';
import { config } from './config/wagmi';

// Pages
import LandingPage from './pages/LandingPage';
import EmployerDashboard from './pages/employer/Dashboard';

// Components
import ProtectedRoute from './components/ProtectedRoute';

// Styles
import './styles/index.css';

function App() {
  return (
    <WagmiConfig config={config}>
      <Router>
        <div className="app">
          <main className="main-content">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/learn-more" element={<LearnMore />} />
              <Route
                path="/employer/*"
                element={
                  <ProtectedRoute>
                    <EmployerDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </WagmiConfig>
  );
}

export default App;
