import React, { useState } from "react";
import { CalendarDays, Clock, X } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../components/PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const allSlots = [
  { id: 1, date: "2025-04-21", time: "09:00 AM", price: 20 },
  { id: 2, date: "2025-04-22", time: "10:30 AM", price: 25 },
  { id: 3, date: "2025-04-23", time: "2:00 PM", price: 15 },
  { id: 4, date: "2025-04-30", time: "11:00 AM", price: 30 },
  { id: 5, date: "2025-05-10", time: "01:00 PM", price: 10 },
];

export default function AvailableAppointments() {
  const [filter, setFilter] = useState("all");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  const now = new Date();
  const filteredSlots = allSlots.filter((slot) => {
    const slotDate = new Date(slot.date);
    if (filter === "week") {
      const endOfWeek = new Date();
      endOfWeek.setDate(now.getDate() + 7);
      return slotDate >= now && slotDate <= endOfWeek;
    } else if (filter === "month") {
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return slotDate >= now && slotDate <= endOfMonth;
    }
    return true;
  });

  return (
    <div className="w-full px-6 sm:px-12 py-10 flex justify-center bg-gray-50 min-h-screen">
      <div className="w-full max-w-7xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Available Appointment Slots
        </h1>

        <div className="mb-8 space-x-2">
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
              {f === "all" ? "All" : f === "week" ? "This Week" : "This Month"}
            </button>
          ))}
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
