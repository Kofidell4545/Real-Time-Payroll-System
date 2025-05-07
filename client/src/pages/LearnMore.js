import React, { useEffect } from 'react';
import './LearnMore.css';
import { ReactComponent as GlobalWorkforce } from '../assets/global-workforce.svg';
import { ReactComponent as ComparisonOld } from '../assets/comparison-old.svg';
import { ReactComponent as ComparisonNew } from '../assets/comparison-new.svg';
import { ReactComponent as BaseNetwork } from '../assets/base-network.svg';
import { ReactComponent as Timeline } from '../assets/timeline.svg';
import { ReactComponent as ChecklistIcon } from '../assets/checklist.svg';

const LearnMore = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="learn-more-page">
      <section className="what-is animate-on-scroll fade-in">
        <div className="content">
          <h2>What is This Platform?</h2>
          <p>
            A decentralized HR and payroll solution that enables employers to pay
            thousands of workers instantly and globally using the Base blockchain —
            with drastically reduced transaction fees.
          </p>
        </div>
        <div className="visual">
          <GlobalWorkforce className="illustration" />
        </div>
      </section>

      <section className="problem-solve animate-on-scroll slide-up">
        <div className="content">
          <h2>What Problem Does It Solve?</h2>
          <p>
            Traditional payroll systems are expensive, slow, and constrained by
            borders. Freelancers and remote workers often wait days for
            international payments. Employers lose millions annually to
            intermediaries and outdated compliance systems.
          </p>
        </div>
        <div className="comparison">
          <div className="old-system">
            <ComparisonOld className="illustration" />
            <span>Traditional System</span>
          </div>
          <div className="new-system">
            <ComparisonNew className="illustration" />
            <span>Blockchain Solution</span>
          </div>
        </div>
      </section>

      <section className="why-base animate-on-scroll">
        <div className="content">
          <h2>Why Base?</h2>
          <p>
            Base is fast, cost-efficient, and scalable — ideal for automating
            payroll. With its mission to onboard 8 billion people into the
            blockchain economy, Base is built to serve the global workforce.
          </p>
        </div>
        <div className="network-visual">
          <BaseNetwork className="network-animation" />
        </div>
      </section>

      <section className="how-works animate-on-scroll">
        <h2>How It Works</h2>
        <div className="timeline">
          <Timeline className="timeline-illustration" />
          <div className="steps">
            <div className="step">
              <h3>1. Onboarding</h3>
              <p>Employers onboard and configure payroll settings.</p>
            </div>
            <div className="step">
              <h3>2. Payment</h3>
              <p>Salaries are streamed in real-time or sent in bulk via stablecoins.</p>
            </div>
            <div className="step">
              <h3>3. Receipt & Investment</h3>
              <p>Workers receive payments instantly and can auto-invest through DeFi tools.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="stands-out animate-on-scroll">
        <h2>Why It Stands Out</h2>
        <div className="benefits">
          <div className="benefit-item">
            <ChecklistIcon className="check-icon" />
            <span>Cut operational costs</span>
          </div>
          <div className="benefit-item">
            <ChecklistIcon className="check-icon" />
            <span>Real-time or scheduled payments</span>
          </div>
          <div className="benefit-item">
            <ChecklistIcon className="check-icon" />
            <span>Salary streaming capabilities</span>
          </div>
          <div className="benefit-item">
            <ChecklistIcon className="check-icon" />
            <span>Integrated DeFi savings/investments</span>
          </div>
          <div className="benefit-item">
            <ChecklistIcon className="check-icon" />
            <span>One-click mass payouts</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LearnMore;
