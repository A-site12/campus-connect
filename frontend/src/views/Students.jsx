// src/views/Students.jsx
import React, { useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Students = () => {
  const [students, setStudents] = useState({
    1: { name: "Alice Johnson", branch: "CSE", score: 88, attendance: 90 },
    2: { name: "Bob Smith", branch: "ECE", score: 75, attendance: 80 },
  });

  const [selectedStudent, setSelectedStudent] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    branch: "",
    score: "",
    attendance: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Select student
  const handleSelectStudent = (id) => {
    setSelectedStudent(id);
    setFormData({
      name: students[id].name || "",
      branch: students[id].branch || "",
      score: students[id].score || "",
      attendance: students[id].attendance || "",
    });
    setIsAdding(false);
  };

  // Add student
  const handleAddStudent = () => {
    if (!formData.name || !formData.branch) {
      alert("⚠️ Please fill all fields");
      return;
    }
    const newId = Date.now().toString();
    setStudents({
      ...students,
      [newId]: {
        name: formData.name,
        branch: formData.branch,
        score: Number(formData.score) || 0,
        attendance: Number(formData.attendance) || 0,
      },
    });
    setFormData({ name: "", branch: "", score: "", attendance: "" });
    setIsAdding(false);
    alert("✅ Student added!");
  };

  // Update student
  const handleUpdateStudent = () => {
    if (!selectedStudent) return;
    setStudents({
      ...students,
      [selectedStudent]: {
        ...students[selectedStudent],
        name: formData.name,
        branch: formData.branch,
        score: Number(formData.score) || 0,
        attendance: Number(formData.attendance) || 0,
      },
    });
    alert("✏️ Student profile updated!");
  };

  // Delete student
  const handleDeleteStudent = () => {
    if (!selectedStudent) return;
    const updated = { ...students };
    delete updated[selectedStudent];
    setStudents(updated);
    setSelectedStudent("");
    setFormData({ name: "", branch: "", score: "", attendance: "" });
    alert("🗑️ Student removed!");
  };

  // Chart Data
  const attendanceData = {
    labels: ["Present %", "Absent %"],
    datasets: [
      {
        data: selectedStudent
          ? [students[selectedStudent].attendance, 100 - students[selectedStudent].attendance]
          : [0, 100],
        backgroundColor: ["#4CAF50", "#F44336"],
      },
    ],
  };

  const scoreData = {
    labels: ["Score"],
    datasets: [
      {
        label: "Academic Score",
        data: selectedStudent ? [students[selectedStudent].score] : [0],
        backgroundColor: "#3B82F6",
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">🎓 Manage Students</h2>

      {/* Student Selector + Add New */}
      <div className="bg-white shadow rounded p-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <select
          value={selectedStudent}
          onChange={(e) => handleSelectStudent(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-1/2"
        >
          <option value="">Select Student</option>
          {Object.keys(students).map((id) => (
            <option key={id} value={id}>
              {students[id].name}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            setIsAdding(true);
            setSelectedStudent("");
            setFormData({ name: "", branch: "", score: "", attendance: "" });
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          ➕ Add New Student
        </button>
      </div>

      {/* Student Form */}
      {(selectedStudent || isAdding) && (
        <div className="bg-white shadow rounded p-6 space-y-4">
          <h3 className="text-lg font-semibold">
            {isAdding ? "➕ Add Student" : "✏️ Edit Student"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="border rounded px-3 py-2 w-full"
            />
            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              placeholder="Branch"
              className="border rounded px-3 py-2 w-full"
            />
            <input
              type="number"
              name="score"
              value={formData.score}
              onChange={handleChange}
              placeholder="Score"
              className="border rounded px-3 py-2 w-full"
            />
            <input
              type="number"
              name="attendance"
              value={formData.attendance}
              onChange={handleChange}
              placeholder="Attendance %"
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          <div className="flex gap-3">
            {isAdding ? (
              <button
                onClick={handleAddStudent}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save Student
              </button>
            ) : (
              <>
                <button
                  onClick={handleUpdateStudent}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Update Student
                </button>
                <button
                  onClick={handleDeleteStudent}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Student Details + Charts */}
      {selectedStudent && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Student Profile */}
          <div className="bg-white shadow rounded p-6">
            <h3 className="text-lg font-semibold mb-3">📋 Student Details</h3>
            <p><strong>Name:</strong> {students[selectedStudent].name}</p>
            <p><strong>Branch:</strong> {students[selectedStudent].branch}</p>
            <p><strong>Score:</strong> {students[selectedStudent].score}</p>
            <p><strong>Attendance:</strong> {students[selectedStudent].attendance}%</p>
          </div>

          {/* Charts */}
          <div className="bg-white shadow rounded p-6">
            <h3 className="text-lg font-semibold mb-4 text-center">📊 Performance</h3>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <div className="w-64 h-64">
                <h4 className="text-center mb-2 font-semibold">Attendance</h4>
                <Pie data={attendanceData} />
              </div>
              <div className="w-64 h-64">
                <h4 className="text-center mb-2 font-semibold">Score</h4>
                <Bar
                  data={scoreData}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
