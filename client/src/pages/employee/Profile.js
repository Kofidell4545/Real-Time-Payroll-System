import React from 'react';
import { Typography } from '@mui/material';
import './EmployeePages.css';

const Profile = () => {
  return (
    <div className="profile-page">
      <Typography variant="h4" style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '2rem' }}>
        Profile Settings
      </Typography>
      <Typography variant="body1" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
        Profile settings coming soon...
      </Typography>
    </div>
  );
};

export default Profile;
