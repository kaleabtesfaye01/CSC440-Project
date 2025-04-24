// src/components/CalendarBooking.jsx
import React, { useState } from 'react';

const CalendarBooking = ({ selectedDate }) => {
  const [timeSlot, setTimeSlot] = useState('');
  const [bookingStatus, setBookingStatus] = useState(null);

  // Example of available time slots (could be fetched from an API based on the selected date)
  const availableSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM'];

  const handleTimeSelect = (slot) => {
    setTimeSlot(slot);
  };

  const handleBooking = () => {
    if (timeSlot) {
      // Simulate booking submission (you could replace this with an API call)
      setBookingStatus(`Your appointment has been booked for ${selectedDate.toDateString()} at ${timeSlot}`);
    } else {
      setBookingStatus('Please select a time slot.');
    }
  };

  return (
    <div className="booking-container">
      <h2>Book an Appointment on {selectedDate.toDateString()}</h2>

      <div className="time-slots">
        <h3>Available Time Slots:</h3>
        <ul>
          {availableSlots.map((slot, index) => (
            <li key={index}>
              <button
                onClick={() => handleTimeSelect(slot)}
                className={timeSlot === slot ? 'selected' : ''}
              >
                {slot}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={handleBooking}>Book Appointment</button>

      {bookingStatus && <p className="booking-status">{bookingStatus}</p>}
    </div>
  );
};

export default CalendarBooking;
