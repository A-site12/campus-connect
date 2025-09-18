// src/views/Results.jsx
import React from "react";

const Results = ({ students }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Student Results</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Branch</th>
            <th className="border p-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(students).map((key) => (
            <tr key={key}>
              <td className="border p-2">{students[key].name}</td>
              <td className="border p-2">{students[key].branch}</td>
              <td className="border p-2">{students[key].score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Results;
