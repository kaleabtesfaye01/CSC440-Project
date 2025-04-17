// src/utils/authService.js
import api from "./api";

export const login = async (data) => {
  const response = await api.post("/auth/login", data);
  const { token, refreshToken } = response.data.data;
  localStorage.setItem("accesstoken", token);
  localStorage.setItem("refreshtoken", refreshToken);
  return response.data.data.user;
};

export const register = async (data) => {
  const response = await api.post("/auth/register", data);
  const { token, refreshToken } = response.data.data;
  localStorage.setItem("accesstoken", token);
  localStorage.setItem("refreshtoken", refreshToken);
  return response.data.data.user;
};

export const refreshToken = () => {
  const stored = localStorage.getItem("refreshtoken");
  return api.post("/auth/refresh-token", {
    refreshToken: stored,
  });
};

export const loginWithGoogle = () =>
  window.open("http://localhost:3000/api/auth/google", "_self");

export const loginWithMicrosoft = () =>
  window.open("http://localhost:3000/api/auth/microsoft", "_self");

export const logout = () => {
  localStorage.removeItem("accesstoken");
  localStorage.removeItem("refreshtoken");
};
