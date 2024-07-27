import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { AllowPages } from "../types/AllowPages";

interface PrivateRouteProps {
  element: JSX.Element;
  requiredPermission: keyof AllowPages["pages"] | undefined;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element,
  requiredPermission,
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Yuklanmoqda...</div>;
  }

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  if (requiredPermission && !user.pages[requiredPermission]) {
    return <Navigate to="/unauthorized" />;
  }

  return element;
};

export default PrivateRoute;
