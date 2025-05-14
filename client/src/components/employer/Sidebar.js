import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAccount, useDisconnect } from 'wagmi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUsers,
  faBook,
  faUser,
  faMoon,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { disconnect } = useDisconnect();
  const { address } = useAccount();

  const handleLogout = () => {
    disconnect();
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-content">
        <div className="logo-section">
          <h1>RT.PayRoll</h1>
        </div>

        <div className="menu-section">
          <div className="menu-items">
            <Link to="/employer" className="menu-item">
              <FontAwesomeIcon icon={faHome} />
              <span>Dashboard</span>
            </Link>
            
            <Link to="/employer/add-employees" className="menu-item">
              <FontAwesomeIcon icon={faUsers} />
              <span>Add Employees</span>
            </Link>

            <Link to="/employer/ledger" className="menu-item">
              <FontAwesomeIcon icon={faBook} />
              <span>Ledger</span>
            </Link>

            <Link to="/employer/profile" className="menu-item">
              <FontAwesomeIcon icon={faUser} />
              <span>Profile</span>
            </Link>
          </div>

          <div className="theme-toggle">
            <div className="menu-item dark-mode-toggle">
              <FontAwesomeIcon icon={faMoon} />
              <span>Dark mode</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="user-profile">
        <div className="profile-info">
          <div className="profile-details">
            <div className="profile-name">{`${address.slice(0, 6)}...${address.slice(-4)}`}</div>
            <div className="profile-role">Connected Wallet</div>
          </div>
        </div>
        <button onClick={handleLogout} className="logout-button">
          <FontAwesomeIcon icon={faSignOutAlt} /> Disconnect
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
