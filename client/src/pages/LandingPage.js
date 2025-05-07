import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount, useConnect } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import Header from '../components/Header';
import GetStartedCards from '../components/GetStartedCards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faLaptopCode, faHeadset, faStore, faHospital, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });
  const [showGetStarted, setShowGetStarted] = useState(false);
  
  const handleConnect = (userType) => {
    if (!isConnected) {
      connect();
    } else {
      navigate(userType === 'employer' ? '/employer' : '/employee');
    }
  };

  const handleEmailContinue = (userType) => {
    navigate(userType === 'employer' ? '/employer/email-signup' : '/employee/email-signup');
  };

  const handleGetStarted = () => {
    setShowGetStarted(true);
  };

  return (
    <div className="landing-page">
      {showGetStarted ? (
        <GetStartedCards
          onConnectWallet={handleConnect}
          onEmailContinue={handleEmailContinue}
        />
      ) : (
        <>
          <Header />

      {/* Hero Section */}
      <div className="hero-section">
        <div className="highlight-badge">
          <span className="highlight-icon">↗</span> Lower Costs, Higher Revenue
        </div>
        <div className="hero-content">
          <h1>
          Your HR and payroll in one software.
            <br />
            <span className="subtitle-text">Maximize Every Impression</span>
          </h1>
          <p className="hero-subtitle">
          Save millions yearly while sending salaries faster — let your team get paid instantly and invest 🌱 effortlessly
          </p>
          <div className="hero-buttons">
            <button className="get-started" onClick={handleGetStarted}>
              Get Started
            </button>
            <button className="learn-more" onClick={() => navigate('/learn-more')}>
              Learn more
            </button>
          </div>
        </div>
      </div>

      {/* Trusted By Section */}
      <div className="trusted-section">
        <p>Trusted by businesses of all sizes worldwide</p>
        <div className="trusted-logos">
          <div className="logo-item">
            <FontAwesomeIcon icon={faCamera} className="logo-icon" />
            <span>Creative & Media</span>
          </div>
          <div className="logo-item">
            <FontAwesomeIcon icon={faLaptopCode} className="logo-icon" />
            <span>Tech Startups</span>
          </div>
          <div className="logo-item">
            <FontAwesomeIcon icon={faHeadset} className="logo-icon" />
            <span>BPO Firms</span>
          </div>
          <div className="logo-item">
            <FontAwesomeIcon icon={faStore} className="logo-icon" />
            <span>Retail</span>
          </div>
          <div className="logo-item">
            <FontAwesomeIcon icon={faHospital} className="logo-icon" />
            <span>Healthcare</span>
          </div>
          <div className="logo-item">
            <FontAwesomeIcon icon={faGraduationCap} className="logo-icon" />
            <span>Education</span>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section" id="how-it-works">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Our platform streamlines your payroll process from start to finish</p>
        </div>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Real-Time Processing</h3>
            <p>Process thousands of payments in seconds with our blockchain technology</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Reliable</h3>
            <p>End-to-end encryption and immutable transaction records</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Cost Effective</h3>
            <p>Save up to 80% on transaction fees compared to traditional systems</p>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="results-section" id="results">
        <div className="section-header">
          <h2>Results</h2>
          <p>What our platform can do for your business</p>
        </div>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">99.9%</div>
            <p>Payment Success Rate</p>
          </div>
          <div className="stat-card">
            <div className="stat-number">80%</div>
            <p>Cost Reduction</p>
          </div>
          <div className="stat-card">
            <div className="stat-number">3x</div>
            <p>Faster Processing</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section" id="testimonials">
        <div className="section-header">
          <h2>Testimonials</h2>
          <p>What our clients say about us</p>
        </div>
        <div className="testimonial-card">
          <p className="testimonial-text">
            "RT Payroll System has revolutionized how we manage our global workforce. The real-time payment capabilities and cost savings are game-changing."
          </p>
          <div className="testimonial-author">
            <div className="author-name">Jane Smith</div>
            <div className="author-title">CFO, Tech Innovations Inc.</div>
          </div>
        </div>
      </div>

      {/* Wave Background */}
          <div className="wave-background"></div>
          <div className="gradient-blur top-right"></div>
          <div className="gradient-blur bottom-left"></div>
        </>
      )}
    </div>
  );
};

export default LandingPage;
