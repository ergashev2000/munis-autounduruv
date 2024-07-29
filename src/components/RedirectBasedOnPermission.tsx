import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AllowedPages } from "../enums/Allows";

const RedirectBasedOnPermission: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/auth/login");
      } else {
        if (user.pages[AllowedPages.DASHBOARD]) {
          navigate("/dashboard");
        } else if (user.pages[AllowedPages.CARD_ACTIONS]) {
          navigate("/credit-card");
        } else if (user.pages[AllowedPages.SETTINGS]) {
          navigate("/employees");
        } else if (user.pages[AllowedPages.REPORTS]) {
          navigate("/customer-reports");
        } else {
          navigate("/unauthorized");
        }
      }
    }
  }, [loading, user]);

  if (loading) {
    return <div>Yuklanmoqda...</div>;
  }

  return null;
};

export default RedirectBasedOnPermission;
