// src/TeacherDashboard.jsx
import React, { useState, useEffect } from "react";
import {
  FaBell,
  FaUserCircle,
  FaChartLine,
  FaClipboardList,
  FaHome,
} from "react-icons/fa";

// Import views
import Overview from "./views/Overview";
import Students from "./views/Students";
import Results from "./views/Results";
import Profile from "./views/Profile";

const TeacherDashboard = ({ user, onLogout }) => {
  const [activePage, setActivePage] = useState("overview");
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Students state (dummy example)
  const [students, setStudents] = useState({
    1: { name: "Alice", branch: "CSE", attendance: 85, score: 90 },
    2: { name: "Bob", branch: "ECE", attendance: 75, score: 80 },
    3: { name: "Charlie", branch: "ME", attendance: 60, score: 70 },
  });

  const [selectedStudent, setSelectedStudent] = useState("");
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState("");

  // 🔹 Requests state
  const [requests, setRequests] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("requests")) || [];
    setRequests(saved);
  }, []);

  // Update localStorage when requests change
  useEffect(() => {
    localStorage.setItem("requests", JSON.stringify(requests));
  }, [requests]);

  // 🔹 Approve/Reject
  const handleAction = (id, action) => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, status: action } : req
    );
    setRequests(updated);
    setSelectedRequest(null);
  };

  // 🔹 Update handler
  const handleUpdate = () => {
    if (selectedStudent) {
      setStudents((prev) => ({
        ...prev,
        [selectedStudent]: {
          ...prev[selectedStudent],
          name: name || prev[selectedStudent].name,
          attendance: attendance || prev[selectedStudent].attendance,
        },
      }));
      alert("Student updated successfully!");
      setName("");
      setAttendance("");
      setSelectedStudent("");
    }
  };

  // 🔹 Render content
  const renderContent = () => {
    if (selectedRequest) {
      // Request Details Page
      return (
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">📩 Request Details</h2>
          <p>
            <strong>Student:</strong> {selectedRequest.student}
          </p>
          <p>
            <strong>Teacher:</strong> {selectedRequest.teacher}
          </p>
          <p>
            <strong>Date:</strong> {selectedRequest.date}
          </p>
          <p>
            <strong>Message:</strong> {selectedRequest.message}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`${
                selectedRequest.status === "Approved"
                  ? "text-green-600"
                  : selectedRequest.status === "Rejected"
                  ? "text-red-600"
                  : "text-yellow-600"
              } font-semibold`}
            >
              {selectedRequest.status}
            </span>
          </p>

          {selectedRequest.status === "Pending" && (
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleAction(selectedRequest.id, "Approved")}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Approve
              </button>
              <button
                onClick={() => handleAction(selectedRequest.id, "Rejected")}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Reject
              </button>
            </div>
          )}

          <button
            onClick={() => setSelectedRequest(null)}
            className="mt-4 text-sm text-blue-600 hover:underline"
          >
            ← Back to Dashboard
          </button>
        </div>
      );
    }

    switch (activePage) {
      case "overview":
        return <Overview />;
      case "students":
        return (
          <Students
            students={students}
            selectedStudent={selectedStudent}
            setSelectedStudent={setSelectedStudent}
            name={name}
            setName={setName}
            attendance={attendance}
            setAttendance={setAttendance}
            handleUpdate={handleUpdate}
          />
        );
      case "results":
        return <Results students={students} />;
      case "profile":
        return <Profile user={user} />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-5">
        <h1 className="text-2xl font-bold mb-10 text-blue-600">
          Teacher Dashboard
        </h1>
        <ul className="space-y-4">
          <li
            className={`flex items-center cursor-pointer p-2 rounded-lg ${
              activePage === "overview"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => setActivePage("overview")}
          >
            <FaHome className="mr-2" /> Overview
          </li>
          <li
            className={`flex items-center cursor-pointer p-2 rounded-lg ${
              activePage === "students"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => setActivePage("students")}
          >
            <FaUserCircle className="mr-2" /> Students
          </li>
          <li
            className={`flex items-center cursor-pointer p-2 rounded-lg ${
              activePage === "results"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => setActivePage("results")}
          >
            <FaChartLine className="mr-2" /> Results
          </li>
          <li
            className={`flex items-center cursor-pointer p-2 rounded-lg ${
              activePage === "profile"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => setActivePage("profile")}
          >
            <FaClipboardList className="mr-2" /> Profile
          </li>
        </ul>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="flex justify-between items-center bg-white p-4 shadow">
          <h2 className="text-xl font-bold text-purple-600">
            {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
          </h2>

          <div className="flex items-center gap-6">
            {/* Notification Bell */}
            <div className="relative">
              <FaBell
                className="text-2xl text-gray-700 cursor-pointer"
                onClick={() => setShowNotifications(!showNotifications)}
              />
              {requests.filter((r) => r.status === "Pending").length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {requests.filter((r) => r.status === "Pending").length}
                </span>
              )}
            </div>

            {/* User Info */}
            <div className="flex items-center gap-2">
              <FaUserCircle className="text-3xl text-gray-600" />
              <span>{user?.name || "Teacher"}</span>
            </div>

            {/* Logout */}
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
            <h4 className="font-semibold mb-2">Requests</h4>
            <ul className="text-sm space-y-2">
              {requests.filter((r) => r.status === "Pending").length === 0 ? (
                <li className="text-gray-500">No pending requests</li>
              ) : (
                requests
                  .filter((r) => r.status === "Pending")
                  .map((req) => (
                    <li
                      key={req.id}
                      className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                      onClick={() => {
                        setSelectedRequest(req);
                        setShowNotifications(false);
                      }}
                    >
                      {req.student} - {req.message}
                    </li>
                  ))
              )}
            </ul>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">{renderContent()}</div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
