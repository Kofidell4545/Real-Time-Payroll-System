import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ethLogo from '../../assets/eth-logo.svg';
import usdcLogo from '../../assets/usdc-logo.svg';
import './PriceTracker.css';

const PriceTracker = () => {
  const [prices, setPrices] = useState({
    ethereum: { usd: 0, usd_24h_change: 0 },
    usdc: { usd: 0, usd_24h_change: 0 }
  });

  const fetchPrices = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,usd-coin&vs_currencies=usd&include_24hr_change=true'
      );
      const data = await response.json();
      setPrices({
        ethereum: {
          usd: data.ethereum.usd,
          usd_24h_change: data.ethereum.usd_24h_change
        },
        usdc: {
          usd: data['usd-coin'].usd,
          usd_24h_change: data['usd-coin'].usd_24h_change
        }
      });
    } catch (error) {
      console.error('Error fetching prices:', error);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="price-tracker">
      <div className="price-card eth">
        <div className="token-info">
          <img src={ethLogo} alt="ETH" className="token-icon" />
          <div className="token-name">ETH</div>
        </div>
        <div className="price-info">
          <div className="current-price">${prices.ethereum.usd.toLocaleString()}</div>
          <div className={`price-change ${prices.ethereum.usd_24h_change >= 0 ? 'positive' : 'negative'}`}>
            {prices.ethereum.usd_24h_change >= 0 ? '↑' : '↓'}
            {Math.abs(prices.ethereum.usd_24h_change).toFixed(2)}%
          </div>
        </div>
      </div>

      <div className="price-card usdc">
        <div className="token-info">
          <img src={usdcLogo} alt="USDC" className="token-icon" />
          <div className="token-name">USDC</div>
        </div>
        <div className="price-info">
          <div className="current-price">${prices.usdc.usd.toLocaleString()}</div>
          <div className={`price-change ${prices.usdc.usd_24h_change >= 0 ? 'positive' : 'negative'}`}>
            {prices.usdc.usd_24h_change >= 0 ? '↑' : '↓'}
            {Math.abs(prices.usdc.usd_24h_change).toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceTracker;
