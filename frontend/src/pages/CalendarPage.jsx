import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="h-screen w-screen flex flex-col bg-white dark:bg-gray-900">
      {/* Calendar Header */}
      <header className="p-4 border-b dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          My Calendar
        </h1>
      </header>

      {/* Full-screen Calendar */}
      <div className="flex-1 overflow-hidden">
        <Calendar
          onChange={setDate}
          value={date}
          view="month"
          className="h-full w-full"
          tileClassName={({ date, view }) =>
            view === 'month' ? 'hover:bg-gray-100 dark:hover:bg-gray-800' : null
          }
        />
      </div>
    </div>
  );
};

export default CalendarPage;

