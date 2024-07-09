import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  element: JSX.Element;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, path }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" />;
  }
  console.log(path);

  const canAccessPage = user?.allowPages?.includes(path);
  console.log(canAccessPage);

  if (!canAccessPage) {
    return <Navigate to="/unauthorized" />;
  }

  return element;
};

export default PrivateRoute;
