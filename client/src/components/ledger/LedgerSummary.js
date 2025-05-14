import React from 'react';
import { Grid, Paper, Box, Typography, useTheme } from '@mui/material';
import { AccountBalanceWallet, LocalGasStation, People } from '@mui/icons-material';

const SummaryCard = ({ title, value, icon, color }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        height: '100%',
        background: `linear-gradient(135deg, ${color}30, ${color}15)`,
        border: `1px solid ${color}50`,
        backdropFilter: 'blur(10px)',
        borderRadius: 2,
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box
          sx={{
            p: 1,
            borderRadius: 1,
            backgroundColor: `${color}40`,
            display: 'flex',
          }}
        >
          {icon}
        </Box>
      </Box>
      <Typography variant="h6" sx={{ mb: 1, color: '#fff', opacity: 0.8 }}>
        {title}
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#fff' }}>
        {value}
      </Typography>
    </Paper>
  );
};

const LedgerSummary = ({ stats }) => {
  const theme = useTheme();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <SummaryCard
          title="Total Sent This Month"
          value={`$${stats.monthlyTotal.toLocaleString()}`}
          icon={<AccountBalanceWallet sx={{ color: theme.palette.primary.main }} />}
          color={theme.palette.primary.main}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <SummaryCard
          title="Total Gas Fees"
          value={`${stats.monthlyGasFees} ETH`}
          icon={<LocalGasStation sx={{ color: theme.palette.secondary.main }} />}
          color={theme.palette.secondary.main}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <SummaryCard
          title="Employees Paid"
          value={stats.totalEmployeesPaid}
          icon={<People sx={{ color: theme.palette.success.main }} />}
          color={theme.palette.success.main}
        />
      </Grid>
    </Grid>
  );
};

export default LedgerSummary;
