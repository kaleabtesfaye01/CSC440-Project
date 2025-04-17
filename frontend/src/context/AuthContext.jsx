// src/context/AuthProvider.jsx
import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import * as AuthService from "../utils/authService";

const AuthContext = createContext(null);

const BASE_URL = "http://localhost:3000/api";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /** Decode a JWT and store the user object */
  const decodeAndSetUser = (token) => {
    try {
      const decoded = jwtDecode(token);
      setUser({
        id: decoded.id,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        email: decoded.email,
      });
    } catch (err) {
      console.error("Failed to decode token:", err);
    }
  };

  /** On mount: try accessToken → try refreshToken → done */
  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = localStorage.getItem("accesstoken");
      const refreshToken = localStorage.getItem("refreshtoken");

      if (accessToken) {
        decodeAndSetUser(accessToken);
        setLoading(false);
      } else if (refreshToken) {
        try {
          const { data } = await AuthService.refreshToken();
          const { token: newAccessToken, refreshToken: newRefreshToken } =
            data.data;
          localStorage.setItem("accesstoken", newAccessToken);
          localStorage.setItem("refreshtoken", newRefreshToken);
          decodeAndSetUser(newAccessToken);
        } catch (err) {
          console.error("Refresh failed:", err);
          AuthService.logout();
          setUser(null);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /** Called by OAuthCallback to inject tokens + set user immediately */
  const handleOAuthCallback = (token, refreshToken = null) => {
    localStorage.setItem("accesstoken", token);
    if (refreshToken) {
      localStorage.setItem("refreshtoken", refreshToken);
    }
    decodeAndSetUser(token);
  };

  const login = async (data) => {
    const u = await AuthService.login(data);
    setUser(u);
  };
  const register = async (data) => {
    const u = await AuthService.register(data);
    setUser(u);
  };
  const loginWithGoogle = () => AuthService.loginWithGoogle();
  const loginWithMicrosoft = () => AuthService.loginWithMicrosoft();
  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  const isAuthenticated = !loading && !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        register,
        loginWithGoogle,
        loginWithMicrosoft,
        logout,
        handleOAuthCallback, // <-- expose this
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
