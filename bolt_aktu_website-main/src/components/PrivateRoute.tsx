import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Props interface for PrivateRoute component
 */
interface PrivateRouteProps {
  /** Child components to render if user is authenticated */
  children: React.ReactNode;
}

/**
 * PrivateRoute component that protects routes from unauthenticated access
 * 
 * This component:
 * - Shows a loading spinner while authentication state is being determined
 * - Redirects unauthenticated users to the login page
 * - Preserves the intended destination for post-login redirect
 * - Renders protected content for authenticated users
 * 
 * @param children - The protected content to render for authenticated users
 */
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while Firebase determines authentication state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if user is not authenticated
  // Pass current location as state so we can redirect back after login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
};

export default PrivateRoute;