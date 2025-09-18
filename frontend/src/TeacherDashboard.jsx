// src/TeacherDashboard.jsx
import React, { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FaBell, FaUserCircle } from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TeacherDashboard = ({ user, onLogout }) => {
  const [students, setStudents] = useState({});
  const [pendingRequests, setPendingRequests] = useState([]);
  const [history, setHistory] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("studentData")) || {};
    if (Object.keys(stored).length === 0) {
      const initialData = {
        student1: { name: "Ravi Kumar", branch: "CSE", attendance: 80, score: 90, status: "approved" },
        student2: { name: "Priya Singh", branch: "ECE", attendance: 65, score: 55, status: "approved" },
        student3: { name: "Amit Verma", branch: "ME", attendance: 50, score: 45, status: "pending" },
        student4: { name: "Neha Sharma", branch: "CSE", attendance: 95, score: 98, status: "approved" },
        student5: { name: "Karan Patel", branch: "EEE", attendance: 40, score: 35, status: "pending" },
      };
      localStorage.setItem("studentData", JSON.stringify(initialData));
      setStudents(initialData);
      setPendingRequests(Object.values(initialData).filter((s) => s.status === "pending"));
    } else {
      setStudents(stored);
      setPendingRequests(Object.values(stored).filter((s) => s.status === "pending"));
    }
  }, []);

  // Approve or Reject Requests
  const handleRequest = (student, action) => {
    const updatedStudents = { ...students };
    Object.keys(updatedStudents).forEach((key) => {
      if (updatedStudents[key].name === student.name) {
        updatedStudents[key].status = action;
      }
    });

    setStudents(updatedStudents);
    localStorage.setItem("studentData", JSON.stringify(updatedStudents));

    setPendingRequests(Object.values(updatedStudents).filter((s) => s.status === "pending"));

    setHistory([...history, { ...student, status: action }]);
  };

  // Chart Data
  const attendanceData = {
    labels: Object.values(students).map((s) => s.name),
    datasets: [
      {
        label: "Attendance %",
        data: Object.values(students).map((s) => s.attendance),
        backgroundColor: "#60a5fa",
      },
    ],
  };

  const scoresData = {
    labels: Object.values(students).map((s) => s.name),
    datasets: [
      {
        label: "Scores",
        data: Object.values(students).map((s) => s.score),
        backgroundColor: "#facc15",
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="flex justify-between items-center bg-white p-4 shadow">
        <h2 className="text-2xl font-bold text-purple-600">Teacher's Dashboard</h2>
        <div className="flex items-center gap-6">
          <div className="relative">
            <FaBell
              className="text-2xl text-gray-700 cursor-pointer"
              onClick={() => setShowNotifications(!showNotifications)}
            />
            {pendingRequests.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {pendingRequests.length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <FaUserCircle className="text-3xl text-gray-600" />
            <span>{user?.name || "Teacher"}</span>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Notifications dropdown */}
      {showNotifications && (
        <div className="absolute right-10 top-16 bg-white shadow rounded p-4 w-64 z-10">
          <h4 className="font-semibold mb-2">Pending Requests</h4>
          {pendingRequests.length === 0 ? (
            <p className="text-sm text-gray-500">No pending requests</p>
          ) : (
            pendingRequests.map((s, i) => (
              <div key={i} className="border-b py-2 text-sm">
                {s.name} ({s.branch})
              </div>
            ))
          )}
        </div>
      )}

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded shadow h-64">
            <h4 className="font-semibold mb-4">Attendance Overview</h4>
            <Bar data={attendanceData} options={{ responsive: true }} />
          </div>
          <div className="bg-white p-6 rounded shadow h-64">
            <h4 className="font-semibold mb-4">Scores Overview</h4>
            <Bar data={scoresData} options={{ responsive: true }} />
          </div>
        </div>

        {/* Pending Requests */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-bold mb-4">Pending Student Requests</h3>
          {pendingRequests.length === 0 ? (
            <p>No pending requests</p>
          ) : (
            pendingRequests.map((s, i) => (
              <div
                key={i}
                className="flex justify-between items-center border-b py-2"
              >
                <span>
                  {s.name} - {s.branch}
                </span>
                <div className="space-x-2">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => handleRequest(s, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleRequest(s, "rejected")}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* History Section */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-bold mb-4">Approval / Rejection History</h3>
          {history.length === 0 ? (
            <p>No history available</p>
          ) : (
            history.map((s, i) => (
              <div key={i} className="border-b py-2">
                {s.name} - {s.branch} ➝{" "}
                <span
                  className={`font-semibold ${
                    s.status === "approved" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {s.status}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Student Profiles */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-bold mb-4">Student Profiles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.values(students).map((s, i) => (
              <div
                key={i}
                className="p-4 border rounded cursor-pointer hover:bg-gray-50"
                onClick={() => setSelectedStudent(s)}
              >
                <p className="font-semibold">{s.name}</p>
                <p className="text-sm text-gray-600">{s.branch}</p>
              </div>
            ))}
          </div>
          {selectedStudent && (
            <div className="mt-4 p-4 border rounded bg-gray-50">
              <h4 className="font-bold">{selectedStudent.name}</h4>
              <p>Branch: {selectedStudent.branch}</p>
              <p>Attendance: {selectedStudent.attendance}%</p>
              <p>Score: {selectedStudent.score}</p>
              <p>Status: {selectedStudent.status}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
