// src/views/Students.jsx
import React from "react";

const Students = ({
  students,
  selectedStudent,
  setSelectedStudent,
  name,
  setName,
  attendance,
  setAttendance,
  handleUpdate,
}) => {
  const studentKeys = Object.keys(students);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Students</h2>
      <div className="space-y-4">
        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="">Select Student</option>
          {studentKeys.map((key) => (
            <option key={key} value={key}>
              {students[key].name}
            </option>
          ))}
        </select>

        {selectedStudent && (
          <div className="space-y-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-purple-300"
            />
            <input
              type="number"
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
              placeholder="Attendance"
              className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-purple-300"
            />
            <button
              onClick={handleUpdate}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition w-full"
            >
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;
