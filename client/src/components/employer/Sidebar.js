import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAccount, useDisconnect } from 'wagmi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faShoppingCart,
  faListAlt,
  faBox,
  faUsers,
  faPercent,
  faBook,
  faMoneyBill,
  faCog,
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
        <div className="menu-items">
          <Link to="/employer" className="menu-item">
            <FontAwesomeIcon icon={faHome} /> Dashboard
          </Link>
          
          
          
          <Link to="/employer/employees" className="menu-item">
            <FontAwesomeIcon icon={faUsers} /> List of Employees
          </Link>
          <Link to="/employer/add-employees" className="menu-item">
            <FontAwesomeIcon icon={faUsers} /> Add Employees
          </Link>

        </div>

        <div className="section-title">PAYMENTS</div>
        <div className="menu-items">
          <Link to="/employer/ledger" className="menu-item">
            <FontAwesomeIcon icon={faBook} /> Ledger
          </Link>
          <Link to="/employer/taxes" className="menu-item">
            <FontAwesomeIcon icon={faMoneyBill} /> Taxes
          </Link>
        </div>

        <div className="section-title">SYSTEM</div>
        <div className="menu-items">
          <Link to="/employer/settings" className="menu-item">
            <FontAwesomeIcon icon={faCog} /> Settings
          </Link>
          <div className="menu-item dark-mode-toggle">
            <FontAwesomeIcon icon={faMoon} />
            Dark mode
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
