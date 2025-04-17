// src/pages/OAuthCallback.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router"; // ← correct import
import { useAuth } from "../hooks/useAuth";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const { handleOAuthCallback, isAuthenticated } = useAuth();

  // 1) On mount, pull the token out and inject it into context+storage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const refreshToken = params.get("refreshToken"); // if your backend provides one
    console.log("OAuthCallback: token", refreshToken);

    if (token) {
      handleOAuthCallback(token, refreshToken);
      // clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      // no token at all → send them back to login
      navigate("/login", { replace: true });
    }
  }, [handleOAuthCallback, navigate]);

  // 2) Once `isAuthenticated` flips true, THEN navigate home
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Processing authentication…</p>
    </div>
  );
};

export default OAuthCallback;
