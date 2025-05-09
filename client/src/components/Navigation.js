import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import './Navigation.css';

const Navigation = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });
  const { disconnect } = useDisconnect();
  const location = useLocation();

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
        {isConnected ? (
          <div className="wallet-info">
            <span className="wallet-address">
              {`${address.slice(0, 6)}...${address.slice(-4)}`}
            </span>
            <button onClick={() => disconnect()} className="disconnect-button">
              Disconnect
            </button>
          </div>
        ) : (
          <button onClick={() => connect()} className="connect-button">
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
