// src/views/StudentResults.jsx
import React, { useState } from "react";

const StudentResults = () => {
  // Sample result data (can later come from API or localStorage)
  const [results] = useState([
    { id: 1, subject: "Mathematics", score: 92, grade: "A" },
    { id: 2, subject: "Physics", score: 74, grade: "B" },
    { id: 3, subject: "Chemistry", score: 58, grade: "C" },
    { id: 4, subject: "English", score: 85, grade: "A" },
  ]);

  // Quick stats
  const scores = results.map((r) => r.score);
  const bestScore = Math.max(...scores);
  const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const lowestScore = Math.min(...scores);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">📊 Results</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-100 p-4 rounded-xl shadow-md text-center">
          <h3 className="text-lg font-semibold text-green-700">Best Score</h3>
          <p className="text-2xl font-bold">{bestScore}%</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-xl shadow-md text-center">
          <h3 className="text-lg font-semibold text-blue-700">Average Score</h3>
          <p className="text-2xl font-bold">{avgScore}%</p>
        </div>
        <div className="bg-red-100 p-4 rounded-xl shadow-md text-center">
          <h3 className="text-lg font-semibold text-red-700">Lowest Score</h3>
          <p className="text-2xl font-bold">{lowestScore}%</p>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Subject-wise Results</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3">Subject</th>
                <th className="p-3">Score</th>
                <th className="p-3">Grade</th>
              </tr>
            </thead>
            <tbody>
              {results.map((res) => (
                <tr key={res.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{res.subject}</td>
                  <td className="p-3">{res.score}%</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        res.grade === "A"
                          ? "bg-green-100 text-green-700"
                          : res.grade === "B"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {res.grade}
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

export default StudentResults;
