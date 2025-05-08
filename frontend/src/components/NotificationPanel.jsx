import React, { useEffect, useState } from "react";
import {
  TimerIcon,
  AlarmClockIcon,
  DollarSignIcon,
  CheckCircleIcon,
} from "lucide-react";

const dummyReminders = [
  {
    _id: "1",
    email: "demo@example.com",
    client: "John Doe",
    title: "Consultation",
    appointmentTime: new Date(Date.now() + 1000 * 60 * 30), // 30 mins
    interval: 30,
    sent: false,
    paid: true,
  },
  {
    _id: "2",
    email: "demo@example.com",
    client: "Jane Smith",
    title: "Follow-up",
    appointmentTime: new Date(Date.now() + 1000 * 60 * 5), // 5 mins
    interval: 5,
    sent: false,
    paid: false,
  },
];

export default function NotificationPanel() {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    setReminders(dummyReminders);

    const intervalId = setInterval(() => {
      setReminders((prev) => [...prev]); // triggers re-render
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleMarkAsSent = (id) => {
    setReminders((prev) =>
      prev.map((reminder) =>
        reminder._id === id ? { ...reminder, sent: true } : reminder
      )
    );
  };

  return (
    <div className="space-y-4">
      {reminders.length === 0 ? (
        <p className="text-sm text-gray-500">No upcoming reminders.</p>
      ) : (
        reminders.map((reminder) => {
          const timeLeft = Math.max(
            0,
            Math.floor(
              (new Date(reminder.appointmentTime).getTime() - Date.now()) / 1000
            )
          );

          const minutes = Math.floor(timeLeft / 60);
          const seconds = timeLeft % 60;

          return (
            <div
              key={reminder._id}
              className="flex justify-between items-start bg-gray-50 p-4 rounded-xl shadow-sm"
            >
              <div className="flex space-x-3 items-start">
                <div className="pt-1">
                  {reminder.paid ? (
                    <DollarSignIcon className="w-6 h-6 text-green-600 animate-bounce" aria-label="Paid" />
                  ) : (
                    <AlarmClockIcon className="w-6 h-6 text-yellow-500 animate-pulse" aria-label="Unpaid" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {reminder.client} — {reminder.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Reminder in {reminder.interval} mins
                  </p>
                  <p className="text-xs text-gray-500">
                    Time Left: {minutes}:{seconds.toString().padStart(2, "0")}
                  </p>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full font-medium ${
                      reminder.paid ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {reminder.paid ? "Paid" : "Unpaid"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <TimerIcon className="w-5 h-5 text-blue-500 mb-2" />
                {reminder.sent ? (
                  <span className="text-xs text-green-600 flex items-center space-x-1">
                    <CheckCircleIcon className="w-4 h-4" /> <span>Sent</span>
                  </span>
                ) : (
                  <button
                    onClick={() => handleMarkAsSent(reminder._id)}
                    className="mt-1 text-xs text-blue-600 hover:underline"
                  >
                    Mark as Sent
                  </button>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
