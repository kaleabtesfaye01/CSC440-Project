import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Smart Booking System. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
