import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom"; // Import Link to create navigation

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex items-center justify-center min-h-[80vh] bg-gradient-to-b from-blue-50 to-white px-4">
        <div className="text-center animate-fade-in transition">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">
            Dashboard Coming Soon
          </h1>
          <p className="text-gray-500 dark:text-gray-300 text-sm mb-6">
            We’re working on it — check back later!
          </p>

          {/* Add a link or button to navigate to the Calendar */}
          <Link to="/calendar">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-md mt-6 hover:bg-blue-600 transition">
              Go to Calendar
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}
