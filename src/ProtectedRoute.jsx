import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiresLogin }) => {
  const isLogin = localStorage.getItem("isLogin") === "true";

  if (requiresLogin && !isLogin) {
    return <Navigate to="/login-form" />;
  }

  return children;
};

export default ProtectedRoute;
