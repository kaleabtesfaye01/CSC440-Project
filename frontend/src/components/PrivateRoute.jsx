// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Layout from "../components/Layout"; // import Layout

const PrivateRoute = ({ children }) => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Wrap children in Layout
  return <Layout>{children}</Layout>;
};

export default PrivateRoute;
