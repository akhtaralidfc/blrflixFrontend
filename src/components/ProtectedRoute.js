import React from 'react';
import { Navigate } from 'react-router-dom';
// import AuthService from '../services/authService';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const user = localStorage.getItem('userToken') || null
  return user ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
