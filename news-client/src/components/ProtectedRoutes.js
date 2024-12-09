import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useLogger } from '../utils/logger';
import { API_ENDPOINTS } from '../service/api-endpoints';

const ProtectedRoutes = () => {
  const { isLoggedIn } = useLogger();

  if (!!isLoggedIn) {
    return <Outlet />;
  } else {
    return <Navigate to={API_ENDPOINTS.login} />;
  }
};

export default ProtectedRoutes;
