import React from "react";
import { FiHome, FiCalendar, FiClock, FiSettings, FiBell, FiUser } from "react-icons/fi";

export default function Home() {
  // Dummy data for demonstration
  const upcomingAppointments = [
    { id: 1, client: "John Doe", time: "10:00 AM", date: "2025-04-07", type: "Consultation" },
    { id: 2, client: "Jane Smith", time: "2:30 PM", date: "2025-04-07", type: "Follow-up" },
  ];

  const notifications = [
    { id: 1, message: "New booking request from Alice", time: "5m ago" },
    { id: 2, message: "Reminder: Update availability", time: "1h ago" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">Smart Booking</span>
            </div>

            {/* Navigation Menu */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="flex items-center text-gray-900 hover:text-blue-600">
                <FiHome className="mr-2" /> Dashboard
              </a>
              <a href="#" className="flex items-center text-gray-500 hover:text-blue-600">
                <FiClock className="mr-2" /> Appointments
              </a>
              <a href="#" className="flex items-center text-gray-500 hover:text-blue-600">
                <FiCalendar className="mr-2" /> Calendar
              </a>
              <a href="#" className="flex items-center text-gray-500 hover:text-blue-600">
                <FiSettings className="mr-2" /> Settings
              </a>
            </nav>

            {/* User Profile */}
            <div className="flex items-center space-x-4">
              <button className="relative text-gray-500 hover:text-blue-600">
                <FiBell className="w-6 h-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
              </button>
              <div className="flex items-center space-x-2">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
                  alt="User"
                />
                <span className="text-sm font-medium text-gray-700">User</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Appointments */}
            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h2>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{appointment.client}</h3>
                      <p className="text-sm text-gray-500">{appointment.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
                      <p className="text-sm text-gray-500">{appointment.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Calendar View */}
            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Calendar</h2>
              <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Calendar Integration Coming Soon</p>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Availability Status */}
            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Availability Status</h2>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Currently Available</span>
                <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                  Online
                </button>
              </div>
            </section>

            {/* Smart Scheduling Assistant */}
            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Smart Assistant</h2>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Schedule New Appointment
              </button>
            </section>

            {/* Notifications */}
            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h2>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <FiBell className="h-5 w-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            © 2025 Smart Booking System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
