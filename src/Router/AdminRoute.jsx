import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <span className="loading loading-bars loading-xl"></span>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }}  />;
  }

  if (role !== "admin") {
    // Logged in but not admin
    return <Navigate to="/forbidden" />;
  }

  return children;
};

export default AdminRoute;
