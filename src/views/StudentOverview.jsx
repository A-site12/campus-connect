// src/views/StudentOverview.jsx
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

ChartJS.register(CategoryScale, LinearScale, ArcElement, BarElement, Title, Tooltip, Legend);

const StudentOverview = () => {
  const [requests, setRequests] = useState([]);
  const [teacher, setTeacher] = useState("");
  const [message, setMessage] = useState("");

  const teachers = ["Mr. Sharma", "Ms. Gupta", "Dr. Reddy", "Prof. Khan"];

  const handleSendRequest = () => {
    if (teacher && message) {
      setRequests([
        ...requests,
        { id: Date.now(), teacher, message, status: "Pending" },
      ]);
      setTeacher("");
      setMessage("");
    }
  };

  const dataPie = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [85, 15],
        backgroundColor: ["#4CAF50", "#F44336"],
      },
    ],
  };

  const dataBar = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Scores",
        data: [75, 82, 90, 68, 88],
        backgroundColor: "#6366F1",
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-gray-500">Total Classes</h3>
          <p className="text-2xl font-bold">120</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-gray-500">Assignments Pending</h3>
          <p className="text-2xl font-bold">5</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-gray-500">Average Score</h3>
          <p className="text-2xl font-bold">82%</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-gray-500">Attendance</h3>
          <p className="text-2xl font-bold">85%</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Attendance</h3>
          <Pie data={dataPie} />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Monthly Scores</h3>
          <Bar data={dataBar} />
        </div>
      </div>

      {/* Send Request Section */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">Send Request to Teacher</h3>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <select
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
            className="flex-1 p-3 border rounded-lg"
          >
            <option value="">Select Teacher</option>
            {teachers.map((t, idx) => (
              <option key={idx} value={t}>
                {t}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Enter your request"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-3 border rounded-lg"
          />
          <button
            onClick={handleSendRequest}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
          >
            Send
          </button>
        </div>

        {/* Requests History */}
        <div className="space-y-3">
          {requests.map((req) => (
            <div
              key={req.id}
              className="p-4 border rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{req.teacher}</p>
                <p className="text-sm text-gray-500">{req.message}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  req.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : req.status === "Approved"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {req.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentOverview;
