import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAccount, useDisconnect } from 'wagmi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faChartLine,
  faPiggyBank,
  faShieldAlt,
  faHistory,
  faUser,
  faMoon,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const location = useLocation();

  const handleLogout = () => {
    disconnect();
  };

  const menuItems = [
    {
      title: 'Overview',
      path: '/employee',
      icon: faHome,
      section: 'main'
    },
    {
      title: 'Analytics',
      path: '/employee/analytics',
      icon: faChartLine,
      section: 'main'
    },
    {
      title: 'Lending',
      path: '/employee/lending',
      icon: faPiggyBank,
      section: 'defi'
    },
    {
      title: 'Insurance',
      path: '/employee/insurance',
      icon: faShieldAlt,
      section: 'defi'
    },
    {
      title: 'History',
      path: '/employee/history',
      icon: faHistory,
      section: 'defi'
    },
    {
      title: 'Profile',
      path: '/employee/profile',
      icon: faUser,
      section: 'system'
    }
  ];

  const renderMenuSection = (section, title) => {
    const sectionItems = menuItems.filter(item => item.section === section);
    
    return sectionItems.length > 0 && (
      <div key={section}>
        {title && <div className="section-title">{title}</div>}
        <div className="menu-items">
          {sectionItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <FontAwesomeIcon icon={item.icon} />
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-content">
        <div className="logo-section">
          <h1>PayFlow</h1>
          <p className="logo-subtitle">Employee Portal</p>
        </div>

        <div className="menu-section">
          {renderMenuSection('main')}
          {renderMenuSection('defi', 'DEFI TOOLS')}
          {renderMenuSection('system', 'SETTINGS')}

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
            <div className="profile-name">{address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not Connected'}</div>
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
