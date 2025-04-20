import React, { useState } from "react";
import { CalendarDays, Clock, User, X } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../components/PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const allSlots = [
  {
    id: 1,
    date: "2025-04-21",
    time: "09:00 AM",
    price: 20,
    person: "Dr. Alice",
  },
  { id: 2, date: "2025-04-22", time: "10:30 AM", price: 25, person: "Dr. Bob" },
  {
    id: 3,
    date: "2025-04-23",
    time: "02:00 PM",
    price: 15,
    person: "Dr. Alice",
  },
  {
    id: 4,
    date: "2025-04-24",
    time: "03:00 PM",
    price: 18,
    person: "Dr. Carol",
  },
  { id: 5, date: "2025-04-25", time: "11:00 AM", price: 30, person: "Dr. Bob" },
  {
    id: 6,
    date: "2025-04-26",
    time: "01:00 PM",
    price: 22,
    person: "Dr. Alice",
  },
  {
    id: 7,
    date: "2025-04-27",
    time: "04:00 PM",
    price: 17,
    person: "Dr. Carol",
  },
  { id: 8, date: "2025-04-28", time: "09:30 AM", price: 24, person: "Dr. Bob" },
  {
    id: 9,
    date: "2025-04-29",
    time: "11:45 AM",
    price: 28,
    person: "Dr. Alice",
  },
  {
    id: 10,
    date: "2025-04-30",
    time: "11:00 AM",
    price: 30,
    person: "Dr. Carol",
  },
  {
    id: 11,
    date: "2025-05-01",
    time: "10:00 AM",
    price: 26,
    person: "Dr. Bob",
  },
  {
    id: 12,
    date: "2025-05-02",
    time: "03:15 PM",
    price: 19,
    person: "Dr. Alice",
  },
  {
    id: 13,
    date: "2025-05-03",
    time: "01:00 PM",
    price: 10,
    person: "Dr. Carol",
  },
];

const uniquePeople = [...new Set(allSlots.map((slot) => slot.person))];

export default function AvailableAppointments() {
  const [filter, setFilter] = useState("all");
  const [selectedPerson, setSelectedPerson] = useState("all");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [customDate, setCustomDate] = useState("");

  const now = new Date();
  const filteredSlots = allSlots.filter((slot) => {
    const slotDate = new Date(slot.date);

    // Time filter
    if (filter === "week") {
      const endOfWeek = new Date();
      endOfWeek.setDate(now.getDate() + 7);
      if (!(slotDate >= now && slotDate <= endOfWeek)) return false;
    } else if (filter === "month") {
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      if (!(slotDate >= now && slotDate <= endOfMonth)) return false;
    } else if (filter === "custom" && customDate) {
      const selectedDate = new Date(customDate);
      if (
        slotDate.getFullYear() !== selectedDate.getFullYear() ||
        slotDate.getMonth() !== selectedDate.getMonth() ||
        slotDate.getDate() !== selectedDate.getDate()
      )
        return false;
    }

    // Person filter
    if (selectedPerson !== "all" && slot.person !== selectedPerson) {
      return false;
    }

    return true;
  });

  return (
    <div className="w-full px-6 sm:px-12 py-10 flex justify-center bg-gray-50 min-h-screen">
      <div className="w-full max-w-7xl">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Available Appointment Slots
          </h1>

          {/* Time & Date Filter */}
          <div className="space-x-2 flex flex-wrap justify-center mb-4">
            {["all", "week", "month"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filter === f
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {f === "all"
                  ? "All"
                  : f === "week"
                  ? "This Week"
                  : "This Month"}
              </button>
            ))}
            <input
              type="date"
              value={customDate}
              onChange={(e) => {
                setCustomDate(e.target.value);
                setFilter("custom");
              }}
              className="px-4 py-2 rounded-full text-sm font-medium border border-gray-300"
            />
          </div>

          {/* Person Filter */}
          <div className="mb-4">
            <label className="mr-2 font-medium text-gray-700">
              Filter by Person:
            </label>
            <div className="relative inline-block">
              <select
                value={selectedPerson}
                onChange={(e) => setSelectedPerson(e.target.value)}
                className="appearance-none px-4 py-2 pr-10 rounded-full border border-gray-300 text-sm bg-white text-gray-800"
              >
                <option value="all">All</option>
                {uniquePeople.map((person) => (
                  <option key={person} value={person}>
                    {person}
                  </option>
                ))}
              </select>
              {/* Custom dropdown arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Slots Display */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredSlots.length === 0 ? (
            <p className="text-gray-500 col-span-full">
              No available slots for this filter.
            </p>
          ) : (
            filteredSlots.map((slot) => (
              <div
                key={slot.id}
                className="bg-white shadow-md hover:shadow-lg transition-all duration-200 rounded-xl p-6 flex flex-col justify-between border border-gray-100"
              >
                <div className="mb-4 space-y-2">
                  <div className="flex items-center text-blue-600 font-semibold text-lg">
                    <Clock className="w-5 h-5 mr-2" />
                    {slot.time}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <CalendarDays className="w-5 h-5 mr-2" />
                    {slot.date}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <User className="w-5 h-5 mr-2" />
                    {slot.person}
                  </div>
                  <div className="text-gray-700">
                    Price: <span className="font-semibold">${slot.price}</span>
                  </div>
                </div>
                <button
                  className="mt-4 w-full px-4 py-2 text-sm font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  onClick={() => {
                    setSelectedSlot(slot);
                    setShowPayment(true);
                  }}
                >
                  Book Now
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedSlot && showPayment && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative animate-fade-in">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => {
                setShowPayment(false);
                setSelectedSlot(null);
              }}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Confirm Your Appointment
            </h2>
            <p className="mb-2 text-gray-700">
              <span className="font-medium">Date:</span> {selectedSlot.date}
            </p>
            <p className="mb-2 text-gray-700">
              <span className="font-medium">Time:</span> {selectedSlot.time}
            </p>
            <p className="mb-2 text-gray-700">
              <span className="font-medium">With:</span> {selectedSlot.person}
            </p>
            <p className="mb-4 text-gray-700">
              <span className="font-medium">Amount:</span> ${selectedSlot.price}
            </p>
            <p className="mb-6 text-gray-600">
              Enter your card details to confirm payment.
            </p>
            <Elements stripe={stripePromise}>
              <PaymentForm
                amount={selectedSlot.price}
                onClose={() => {
                  setShowPayment(false);
                  setSelectedSlot(null);
                }}
              />
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
}
