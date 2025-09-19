// src/views/MockTests.jsx
import React, { useState } from "react";

const MockTests = () => {
  // Sample test data (can be replaced with API/localStorage later)
  const [tests] = useState([
    { id: 1, subject: "Math", date: "2025-09-10", score: 85, status: "Passed" },
    { id: 2, subject: "Physics", date: "2025-09-15", score: 42, status: "Failed" },
    { id: 3, subject: "Chemistry", date: "2025-09-25", score: null, status: "Upcoming" },
  ]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">📝 Mock Tests</h2>

      {/* Upcoming Test Card */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold">Next Test</h3>
        <p className="mt-2">
          <span className="font-bold">Chemistry</span> on{" "}
          <span className="underline">25th Sept 2025</span>
        </p>
        <p className="mt-1">Be prepared and give your best! 💯</p>
      </div>

      {/* Test History Table */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Test History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3">Subject</th>
                <th className="p-3">Date</th>
                <th className="p-3">Score</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <tr key={test.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{test.subject}</td>
                  <td className="p-3">{test.date}</td>
                  <td className="p-3">{test.score ?? "—"}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        test.status === "Passed"
                          ? "bg-green-100 text-green-700"
                          : test.status === "Failed"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {test.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MockTests;
