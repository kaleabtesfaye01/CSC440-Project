import React from "react";
import { FiBell } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const upcomingAppointments = [
    {
      id: 1,
      client: "John Doe",
      time: "10:00 AM",
      date: "2025-04-07",
      type: "Consultation",
    },
    {
      id: 2,
      client: "Jane Smith",
      time: "2:30 PM",
      date: "2025-04-07",
      type: "Follow-up",
    },
  ];

  const notifications = [
    { id: 1, message: "New booking request from Alice", time: "5m ago" },
    { id: 2, message: "Reminder: Update availability", time: "1h ago" },
  ];

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Upcoming Appointments */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Upcoming Appointments
            </h2>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {appointment.client}
                    </h3>
                    <p className="text-sm text-gray-500">{appointment.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {appointment.time}
                    </p>
                    <p className="text-sm text-gray-500">{appointment.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Calendar View */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Calendar
            </h2>
            <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Calendar Integration Coming Soon</p>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Availability Status */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Availability Status
            </h2>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Currently Available</span>
              <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                Online
              </button>
            </div>
          </section>

          {/* Available Slots */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Available Slots
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              View and manage your upcoming available times.
            </p>
            <button
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => navigate("/appointments")}
            >
              View Slots
            </button>
          </section>

          {/* Notifications */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Notifications
            </h2>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start space-x-3"
                >
                  <div className="flex-shrink-0">
                    <FiBell className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
