import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useLogger } from '../utils/logger';

const ProtectedRoutes = () => {
  const { isLoggedIn } = useLogger();
  return !!isLoggedIn ? <Outlet /> : <Navigate to='/' />;
};

export default ProtectedRoutes;
