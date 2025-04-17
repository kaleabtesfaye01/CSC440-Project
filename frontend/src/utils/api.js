// src/utils/api.js
import axios from "axios";

console.log("Custom API instance loaded");

const BASE_URL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: Add Authorization header if token exists
api.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("accesstoken");
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor: Attempt to refresh token on 401 errors,
// but skip the refresh endpoint itself to prevent infinite loops.
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only handle 401 once per request
    if (error.response?.status === 401 && !originalRequest._retry) {
      // If this was our refresh call, bail out immediately
      if (originalRequest.url.includes("/auth/refresh-token")) {
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("refreshtoken");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshtoken");
      if (!refreshToken) {
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        // Use bare axios so we don't re‑enter these interceptors
        const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        // Adjust these to match your actual response shape:
        // — some APIs wrap tokens in `data.data`, others in `data`.
        const { accesstoken, refreshtoken } = data.data ?? data;

        localStorage.setItem("accesstoken", accesstoken);
        localStorage.setItem("refreshtoken", refreshtoken);

        // Update our instance’s default header & the original request
        api.defaults.headers.common.Authorization = `Bearer ${accesstoken}`;
        originalRequest.headers.Authorization = `Bearer ${accesstoken}`;

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh error:", refreshError);
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("refreshtoken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
