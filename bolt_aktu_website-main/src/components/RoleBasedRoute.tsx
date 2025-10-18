import React, { useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface RoleBasedRouteProps {
  children: React.ReactNode;
  allowedRoles: ('user' | 'admin')[];
  redirectTo?: string;
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
  children,
  allowedRoles,
  redirectTo = '/dashboard'
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const hasRedirectedRef = useRef(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    if (!hasRedirectedRef.current) {
      hasRedirectedRef.current = true;
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return null;
  }

  // Normalize role strings
  const normalizedRole = user.role?.trim().toLowerCase();
  const normalizedAllowed = allowedRoles.map(r => r.toLowerCase());

  if (!normalizedRole || !normalizedAllowed.includes(normalizedRole)) {
    if (!hasRedirectedRef.current) {
      hasRedirectedRef.current = true;
      return <Navigate to={redirectTo} replace />;
    }
    return null;
  }

  hasRedirectedRef.current = false;

  return <>{children}</>;
};

export default RoleBasedRoute;
