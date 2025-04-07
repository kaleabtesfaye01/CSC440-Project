import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router";
import { FiHome, FiCalendar, FiClock, FiSettings, FiBell, FiLogOut } from "react-icons/fi";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left section with logo */}
        <div className="w-1/4">
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 mr-2">
              <img
                src="https://www.svgrepo.com/show/499773/calendar.svg"
                alt="Smart Booking logo"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
            <span className="text-2xl font-bold text-blue-600">
              Smart Booking
            </span>
          </Link>
        </div>

        {/* Center section with navigation */}
        <div className="flex-1 flex justify-center">
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="flex items-center text-gray-900 hover:text-blue-600">
              <FiHome className="mr-2" /> Dashboard
            </Link>
            <Link to="/appointments" className="flex items-center text-gray-500 hover:text-blue-600">
              <FiClock className="mr-2" /> Appointments
            </Link>
            <Link to="/calendar" className="flex items-center text-gray-500 hover:text-blue-600">
              <FiCalendar className="mr-2" /> Calendar
            </Link>
            <Link to="/settings" className="flex items-center text-gray-500 hover:text-blue-600">
              <FiSettings className="mr-2" /> Settings
            </Link>
          </nav>
        </div>

        {/* Right section with user profile */}
        <div className="w-1/4 flex justify-end">
          <div className="flex items-center space-x-4">
            <button className="relative text-gray-500 hover:text-blue-600">
              <FiBell className="w-6 h-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
            </button>
            <div className="flex items-center space-x-2">
              <img
                className="h-8 w-8 rounded-full"
                src={`https://ui-avatars.com/api/?name=${user?.firstname || 'User'}&background=0D8ABC&color=fff`}
                alt={user?.firstname || 'User'}
              />
              {user && (
                <span className="text-sm font-medium text-gray-700">
                  {user.firstname}
                </span>
              )}
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition"
                title="Logout"
              >
                <FiLogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
