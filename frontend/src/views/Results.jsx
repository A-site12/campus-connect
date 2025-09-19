// src/views/Results.jsx
import React, { useState } from "react";

const Results = () => {
  // ✅ Predefined students with results
  const studentResults = {
    mahi: { name: "Mahi", branch: "CSE", score: 85 },
    aryan: { name: "Aryan", branch: "ECE", score: 78 },
    devesh: { name: "Devesh", branch: "IT", score: 92 },
    pushkar: { name: "Pushkar", branch: "ME", score: 74 },
    dev: { name: "Dev", branch: "CSE", score: 88 },
  };

  const [selectedStudent, setSelectedStudent] = useState("");

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Student Results</h2>

      {/* 🔹 Dropdown to select student */}
      <select
        value={selectedStudent}
        onChange={(e) => setSelectedStudent(e.target.value)}
        className="border rounded px-3 py-2 w-full md:w-1/2"
      >
        <option value="">Select Student</option>
        {Object.keys(studentResults).map((id) => (
          <option key={id} value={id}>
            {studentResults[id].name}
          </option>
        ))}
      </select>

      {/* 🔹 Show selected student’s result */}
      {selectedStudent && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            {studentResults[selectedStudent].name} - Result
          </h3>
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Name</th>
                <th className="border p-2">Branch</th>
                <th className="border p-2">Score</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">
                  {studentResults[selectedStudent].name}
                </td>
                <td className="border p-2">
                  {studentResults[selectedStudent].branch}
                </td>
                <td className="border p-2">
                  {studentResults[selectedStudent].score}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Results;
