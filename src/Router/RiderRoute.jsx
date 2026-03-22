import React from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import { useLocation } from 'react-router';

const RiderRoute = ({children}) => {
    const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <span className="loading loading-bars loading-xl"></span>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }}  />;
  }

  if (role !== "rider") {
    // Logged in but not admin
    return <Navigate to="/forbidden" />;
  }

    return children;
};

export default RiderRoute;