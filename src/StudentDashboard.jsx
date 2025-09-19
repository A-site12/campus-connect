import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaClipboardList,
  FaChartLine,
  FaUser,
  FaBell,
  FaPaperPlane,
  FaEdit,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import StudentOverview from "./views/StudentOverview";
import MockTests from "./views/MockTests";
import StudentResults from "./views/StudentResults";
import StudentProfile from "./views/StudentProfile";

const StudentDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  // Teachers list
  const [teachers] = useState(["Mr. Sharma", "Ms. Gupta", "Dr. Reddy"]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [requestText, setRequestText] = useState("");
  const [requestHistory, setRequestHistory] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // Load requests from localStorage
  useEffect(() => {
    const allRequests = JSON.parse(localStorage.getItem("requests")) || [];
    if (user?.name) {
      const myRequests = allRequests.filter((r) => r.student === user.name);
      setRequestHistory(myRequests);
    }
  }, [user]);

  // Save/update request
  const handleRequest = () => {
    if (!selectedTeacher || !requestText.trim() || !user?.name) return;

    const allRequests = JSON.parse(localStorage.getItem("requests")) || [];

    if (editingIndex !== null) {
      // Update existing request
      const updatedAll = allRequests.map((req, idx) =>
        req.student === user.name && idx === editingIndex
          ? { ...req, teacher: selectedTeacher, message: requestText }
          : req
      );
      localStorage.setItem("requests", JSON.stringify(updatedAll));
      setEditingIndex(null);
    } else {
      // Create new request
      const newReq = {
        id: Date.now(),
        student: user.name,
        teacher: selectedTeacher,
        message: requestText,
        status: "Pending",
        date: new Date().toLocaleString(),
      };
      allRequests.push(newReq);
      localStorage.setItem("requests", JSON.stringify(allRequests));
    }

    // Refresh history
    const refreshed = JSON.parse(localStorage.getItem("requests")) || [];
    setRequestHistory(refreshed.filter((r) => r.student === user.name));

    setSelectedTeacher("");
    setRequestText("");
  };

  const handleLogout = () => {
    localStorage.removeItem("studentToken"); // keep requests safe
    if (onLogout) onLogout();
    navigate("/login"); // redirect to login
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col justify-between">
        <div>
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-indigo-600">
              Student Panel
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {user?.name || "Student"}
            </p>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${
                activeTab === "overview"
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-indigo-100 text-gray-700"
              }`}
            >
              <FaHome /> Overview
            </button>
            <button
              onClick={() => setActiveTab("mocktests")}
              className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${
                activeTab === "mocktests"
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-indigo-100 text-gray-700"
              }`}
            >
              <FaClipboardList /> Mock Tests
            </button>
            <button
              onClick={() => setActiveTab("results")}
              className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${
                activeTab === "results"
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-indigo-100 text-gray-700"
              }`}
            >
              <FaChartLine /> Results
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${
                activeTab === "profile"
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-indigo-100 text-gray-700"
              }`}
            >
              <FaUser /> Profile
            </button>
          </nav>
        </div>

        {/* Logout */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="flex justify-between items-center bg-white p-4 shadow">
          <h1 className="text-xl font-semibold text-gray-700">
            {activeTab === "overview" && "Overview"}
            {activeTab === "mocktests" && "Mock Tests"}
            {activeTab === "results" && "Results"}
            {activeTab === "profile" && "Profile"}
          </h1>
          <button className="relative">
            <FaBell className="text-gray-600 text-xl" />
            {requestHistory.filter((r) => r.status === "Pending").length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {requestHistory.filter((r) => r.status === "Pending").length}
              </span>
            )}
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "overview" && (
            <>
              <StudentOverview />

              {/* Send Request */}
              <div className="bg-white p-6 rounded-xl shadow mt-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FaPaperPlane className="text-indigo-600" /> Send Request
                </h3>
                <div className="flex flex-col gap-4">
                  <select
                    value={selectedTeacher}
                    onChange={(e) => setSelectedTeacher(e.target.value)}
                    className="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
                  >
                    <option value="">Select Teacher</option>
                    {teachers.map((t, i) => (
                      <option key={i} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <textarea
                    value={requestText}
                    onChange={(e) => setRequestText(e.target.value)}
                    placeholder="Write your request details here..."
                    className="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400 min-h-[80px]"
                  />
                  <button
                    onClick={handleRequest}
                    className="self-start bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
                  >
                    {editingIndex !== null ? "Update Request" : "Send Request"}
                  </button>
                </div>

                {/* History */}
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-2">
                    Request History
                  </h4>
                  {requestHistory.length > 0 ? (
                    <ul className="space-y-3">
                      {requestHistory.map((req, i) => (
                        <li
                          key={req.id}
                          className="flex justify-between items-start p-3 border rounded-lg bg-gray-50"
                        >
                          <div>
                            <p className="font-medium">{req.teacher}</p>
                            <p className="text-sm text-gray-600">
                              {req.message}
                            </p>
                            <p className="text-xs text-gray-400">{req.date}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span
                              className={`px-3 py-1 text-sm rounded-full ${
                                req.status === "Approved"
                                  ? "bg-green-100 text-green-600"
                                  : req.status === "Rejected"
                                  ? "bg-red-100 text-red-600"
                                  : "bg-yellow-100 text-yellow-600"
                              }`}
                            >
                              {req.status}
                            </span>
                            {req.status === "Pending" && (
                              <button
                                onClick={() => {
                                  setSelectedTeacher(req.teacher);
                                  setRequestText(req.message);
                                  setEditingIndex(i);
                                }}
                                className="text-indigo-600 hover:text-indigo-800"
                              >
                                <FaEdit />
                              </button>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No requests yet.</p>
                  )}
                </div>
              </div>
            </>
          )}

          {activeTab === "mocktests" && <MockTests />}
          {activeTab === "results" && <StudentResults />}
          {activeTab === "profile" && <StudentProfile user={user} />}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
