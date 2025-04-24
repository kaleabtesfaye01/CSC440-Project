import React from "react";
import { Routes, Route } from "react-router-dom"; // Use 'react-router-dom' for React Router v6+
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/Home";
import CalendarPage from "./pages/CalendarPage"; // Import the Calendar page

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        {/* Make the /calendar page public */}
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </>
  );
}

export default App;
