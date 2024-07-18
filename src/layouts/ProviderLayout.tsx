import React from "react";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";

const ProviderLayout: React.FC = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default ProviderLayout;
