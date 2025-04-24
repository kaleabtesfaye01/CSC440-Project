import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom"; // Use react-router-dom for Link

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      {/* Logo + Name */}
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 mr-2">
          <img
            src="https://www.svgrepo.com/show/499773/calendar.svg"
            alt="Smart Booking logo"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>
        <span className="font-bold text-lg text-gray-900 dark:text-white">
          Smart Booking
        </span>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        {/* Calendar Link */}
        <Link to="/calendar" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
          Calendar
        </Link>

        {/* User and Logout */}
        {user && (
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Hello, {user.firstname}
          </span>
        )}
        <button
          onClick={handleLogout}
          className="text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 px-3 py-1 rounded-md transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
