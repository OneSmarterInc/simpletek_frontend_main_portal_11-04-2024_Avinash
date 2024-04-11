import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuthenticated = JSON.parse(localStorage.getItem("token")) || null; // Adjust based on your authentication mechanism

  if(isAuthenticated !== null)
  {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;