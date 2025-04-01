// src/context/AuthContext.jsx
import React, { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.email && data.password) {
          setUser({ email: data.email, firstname: "John", lastname: "Doe" });
          resolve();
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 500);
    });
  };

  const register = async (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.email && data.password && data.firstname && data.lastname) {
          setUser({
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname,
          });
          resolve();
        } else {
          reject(new Error("Registration failed"));
        }
      }, 500);
    });
  };

  const logout = () => setUser(null);
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
