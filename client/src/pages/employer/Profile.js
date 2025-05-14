import React from 'react';
import { Typography, Paper, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBuilding, faWallet } from '@fortawesome/free-solid-svg-icons';
import { useAccount } from 'wagmi';
import './EmployerPages.css';

const Profile = () => {
  const { address } = useAccount();

  return (
    <div className="profile-page">
      <Typography variant="h4" className="page-title">
        <FontAwesomeIcon icon={faUser} className="title-icon" />
        Company Profile
      </Typography>

      <div className="dashboard-card">
        <div className="card-header">
          <Typography variant="h6">
            <FontAwesomeIcon icon={faBuilding} className="card-icon" />
            Company Information
          </Typography>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper className="info-paper">
              <Typography variant="subtitle2" color="textSecondary">
                Company Name
              </Typography>
              <Typography variant="body1">
                PayFlow Inc.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className="info-paper">
              <Typography variant="subtitle2" color="textSecondary">
                Industry
              </Typography>
              <Typography variant="body1">
                Technology
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>

      <div className="dashboard-card">
        <div className="card-header">
          <Typography variant="h6">
            <FontAwesomeIcon icon={faWallet} className="card-icon" />
            Wallet Information
          </Typography>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className="info-paper">
              <Typography variant="subtitle2" color="textSecondary">
                Connected Wallet Address
              </Typography>
              <Typography variant="body1" className="wallet-address">
                {address}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className="info-paper">
              <Typography variant="subtitle2" color="textSecondary">
                Total Employees
              </Typography>
              <Typography variant="body1">
                24
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className="info-paper">
              <Typography variant="subtitle2" color="textSecondary">
                Monthly Payroll Volume
              </Typography>
              <Typography variant="body1">
                $127,450
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Profile;
