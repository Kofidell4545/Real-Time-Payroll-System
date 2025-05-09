import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAccount } from 'wagmi';

const ProtectedRoute = ({ children }) => {
  const { isConnected, isLoading } = useAccount();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isConnected) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
