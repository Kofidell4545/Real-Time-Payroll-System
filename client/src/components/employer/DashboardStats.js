import React, { useState } from 'react';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import PriceTracker from './PriceTracker';
import './DashboardStats.css';

const DashboardStats = () => {
  const [timeRange, setTimeRange] = useState('24H');
  const setSelectedMetric = useState('all')[1];

  const generateDetailedChartData = (days) => {
    const data = [];
    const now = new Date();
    for (let i = 0; i < days * 24; i++) {
      const time = new Date(now - (days * 24 - i) * 3600 * 1000);
      data.push({
        time: time.toISOString(),
        employees: 150 + Math.floor(Math.random() * 20),
        payroll: 240000 + Math.floor(Math.random() * 20000),
        gas: 0.005 + Math.random() * 0.001 // Gas value around $0.5 with small variations
      });
    }
    return data;
  };

  const mockChartData = [
    { time: '00:00', eth: 13.2, bnb: 12.1, matic: 6.8 },
    { time: '04:00', eth: 13.8, bnb: 12.4, matic: 6.5 },
    { time: '08:00', eth: 13.4, bnb: 12.8, matic: 6.3 },
    { time: '12:00', eth: 13.6, bnb: 12.7, matic: 6.2 },
    { time: '16:00', eth: 14.1, bnb: 13.0, matic: 6.1 },
    { time: '20:00', eth: 13.9, bnb: 12.9, matic: 6.0 },
    { time: '24:00', eth: 14.2, bnb: 13.2, matic: 5.9 },
  ];

  const detailedChartData = generateDetailedChartData(7);

  const payrollMetrics = [
    {
      title: 'Total Employees',
      value: '156',
      change: '+6.25%',
      trend: 'up',
      chart: mockChartData.map(d => ({ time: d.time, value: d.eth })),
      color: '#8884d8'
    },
    {
      title: 'Monthly Payroll',
      value: '$247,892',
      change: '+5.67%',
      trend: 'up',
      chart: mockChartData.map(d => ({ time: d.time, value: d.bnb })),
      color: '#F3BA2F'
    },
    {
      title: 'Gas Spent',
      value: '$0.5',
      change: '-1.89%',
      trend: 'down',
      chart: mockChartData.map(d => ({ time: d.time, value: d.matic })),
      color: '#8247E5'
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="time-filters">
          <button className={timeRange === '24H' ? 'active' : ''} onClick={() => setTimeRange('24H')}>24H</button>
          <button className={timeRange === '7D' ? 'active' : ''} onClick={() => setTimeRange('7D')}>7D</button>
          <button className={timeRange === '30D' ? 'active' : ''} onClick={() => setTimeRange('30D')}>30D</button>
        </div>
      </div>

      <PriceTracker />

      <div className="metrics-grid">
        {payrollMetrics.map((metric, index) => (
          <div key={index} className="metric-card" onClick={() => setSelectedMetric(index)}>
            <div className="metric-header">
              <div className="metric-title">{metric.title}</div>
              <div className={`metric-trend ${metric.trend}`}>
                <span>{metric.change}</span>
                {metric.trend === 'up' ? <TrendingUp /> : <TrendingDown />}
              </div>
            </div>
            
            <div className="metric-value">{metric.value}</div>
            
            <div className="metric-chart">
              <ResponsiveContainer width="100%" height={100}>
                <AreaChart data={metric.chart} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={metric.color} stopOpacity={0.2} />
                      <stop offset="100%" stopColor={metric.color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke={metric.color} 
                    fill={`url(#gradient-${index})`} 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>

      <div className="detail-section">
        <div className="detail-header">
          <h3>Detailed Analytics</h3>
          <div className="chart-controls">
            <div className="chart-type-selector">
              <button className="chart-type-btn active">Employees</button>
              <button className="chart-type-btn">Payroll</button>
              <button className="chart-type-btn">Gas</button>
            </div>
            <div className="detail-filters">
              <button className="filter-btn">Export</button>
              <button className="filter-btn">Filter</button>
            </div>
          </div>
        </div>

        <div className="main-chart">
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={detailedChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorEmployees" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="time" 
                tickFormatter={(time) => new Date(time).toLocaleDateString()}
                stroke="#666"
              />
              <YAxis stroke="#666" />
              <RechartsTooltip 
                contentStyle={{ background: '#1a1a1a', border: '1px solid #333' }}
                labelStyle={{ color: '#999' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area
                type="monotone"
                dataKey="employees"
                stroke="#8884d8"
                fill="url(#colorEmployees)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="performance-metrics">
          <div className="metric-box">
            <div className="metric-label">Average Employees</div>
            <div className="metric-value">156</div>
            <div className="metric-period">This week</div>
          </div>
          
          <div className="metric-box">
            <div className="metric-label">Total Payroll</div>
            <div className="metric-value">$247,892</div>
            <div className="metric-change positive">+2.3%</div>
          </div>
          
          <div className="metric-box">
            <div className="metric-label">Success Rate</div>
            <div className="metric-value">99.8%</div>
            <div className="metric-period">All time</div>
          </div>
          
          <div className="metric-box">
            <div className="metric-label">Gas Optimization</div>
            <div className="metric-value">2.23%</div>
            <div className="metric-period">vs. Last week</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
