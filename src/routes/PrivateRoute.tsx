import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  element: JSX.Element;
  permission: boolean | undefined;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, permission }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  if (!permission) {
    return <Navigate to="/unauthorized" />;
  }

  return element;
};

export default PrivateRoute;
