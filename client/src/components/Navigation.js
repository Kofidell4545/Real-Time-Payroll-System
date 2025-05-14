import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ConnectKitButton } from 'connectkit';
import { useAccount } from 'wagmi';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();
  const { isConnected } = useAccount();

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link to="/">PayrollBase</Link>
      </div>
      
      <div className="nav-links">
        {isConnected && (
          <>
            {location.pathname.includes('/employer') && (
              <Link to="/employer" className="nav-link">Dashboard</Link>
            )}
            {location.pathname.includes('/employee') && (
              <Link to="/employee" className="nav-link">Dashboard</Link>
            )}
          </>
        )}
      </div>

      <div className="nav-wallet">
        <ConnectKitButton />
      </div>
    </nav>
  );
};

export default Navigation;
