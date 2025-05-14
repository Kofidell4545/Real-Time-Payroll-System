import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import Header from '../components/Header';
import GetStartedCards from '../components/GetStartedCards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faLaptopCode, faHeadset, faStore, faHospital, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import './LandingPage.css';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';

const LandingPage = () => {
  const navigate = useNavigate();
  const { isConnected } = useAccount() || {};
  
  const [showGetStarted, setShowGetStarted] = useState(false);
  
  const handleConnect = (userType) => {
    if (isConnected) {
      navigate(`/${userType}`);
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
            <button className="learn-more" onClick={() => navigate('/learn')}>
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
          <div className="feature-card">
            <div className="feature-icon">🌐</div>
            <h3>Global Accessibility</h3>
            <p>Access your payroll system from anywhere, manage your workforce globally</p>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="results-section" id="results">
        <div className="section-header">
          <h2>Results</h2>
          <p>Real impact for businesses and employees</p>
        </div>
        <div className="results-grid">
          <div className="result-card">
            <h3>Reduced Global Payroll Complexity</h3>
            <div className="result-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
              </svg>
            </div>
            <p>Businesses now seamlessly pay over 10,000 employees and freelancers globally—with zero delays and no reliance on banks or middlemen.</p>
          </div>
          <div className="result-card">
            <h3>Empowered Employees with Financial Freedom</h3>
            <div className="result-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M2 12h20" strokeLinecap="round" />
              </svg>
            </div>
            <p>Workers stream their salaries in real time and instantly invest or save a portion through integrated DeFi tools—no more waiting for payday.</p>
          </div>
          <div className="result-card">
            <h3>Full Transparency & Audit-Ready Records</h3>
            <div className="result-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" strokeLinecap="round" />
              </svg>
            </div>
            <p>Companies report a 100% reduction in payroll disputes thanks to immutable, on-chain payment records and automated compliance.</p>
          </div>
        </div>
      </div>

      <Testimonials />

          <div className="gradient-blur top-right"></div>
          <div className="gradient-blur bottom-left"></div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default LandingPage;
