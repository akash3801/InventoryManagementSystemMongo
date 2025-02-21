import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [user, setUser] = useState({
    token: sessionStorage.getItem("authToken"),
    role: sessionStorage.getItem("role")?.toLowerCase(), // Convert role to lowercase
  });

  useEffect(() => {
    const updateUser = () => {
      setUser({
        token: sessionStorage.getItem("authToken"),
        role: sessionStorage.getItem("role")?.toLowerCase(), // Convert role to lowercase
      });
    };

    window.addEventListener("storage", updateUser);
    return () => window.removeEventListener("storage", updateUser);
  }, []);

  if (!user.token) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
