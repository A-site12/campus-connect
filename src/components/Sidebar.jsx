// src/components/Sidebar.jsx
import React from "react";

const Sidebar = () => {
  const quotes = [
    "Believe you can and you're halfway there.",
    "Don't watch the clock; do what it does. Keep going.",
    "The harder you work for something, the greater you'll feel when you achieve it.",
    "Dream it. Wish it. Do it.",
    "Success is not for the lazy.",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4">
      {/* Navigation items */}
      <nav className="flex flex-col space-y-2 mb-6">
        <a href="#" className="hover:bg-gray-700 p-2 rounded">Overview</a>
        <a href="#" className="hover:bg-gray-700 p-2 rounded">Assignments</a>
        <a href="#" className="hover:bg-gray-700 p-2 rounded">Schedule</a>
        <a href="#" className="hover:bg-gray-700 p-2 rounded">Profile</a>
      </nav>

      {/* Motivational Quotes Section */}
      <div className="mt-auto bg-gray-700 p-4 rounded">
        <h3 className="text-sm font-semibold mb-2">💡 Motivation</h3>
        <p className="text-xs italic">{randomQuote}</p>
      </div>
    </div>
  );
};

export default Sidebar;
