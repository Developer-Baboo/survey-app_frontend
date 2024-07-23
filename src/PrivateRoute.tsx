// PrivateRoute.tsx

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext'; // Import AuthContext

interface PrivateRouteProps {
  children: React.ReactElement;
  roles?: string[]; // Optional roles array
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, roles }) => {
  const authContext = useContext(AuthContext); // Access AuthContext

  if (!authContext) {
    return null; // or some loading indicator
  }

  const { user, loading } = authContext;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />; // Redirect to login and replace current history entry
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/not-authorized" replace />; // Redirect to unauthorized page
  }

  return children; // Render child component if authorized
};

export default PrivateRoute;