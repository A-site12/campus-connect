import React, { useEffect, useState } from "react";
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
import { FaBell, FaUserCircle, FaChartLine, FaClipboardList, FaHome } from "react-icons/fa";

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

const StudentDashboard = ({ user, onLogout }) => {
  const [data, setData] = useState({});
  const quotes = [
    "Believe you can and you're halfway there.",
    "Don't watch the clock; do what it does. Keep going.",
    "The harder you work for something, the greater you'll feel when you achieve it.",
    "Dream it. Wish it. Do it.",
    "Success is not for the lazy.",
    "Your limitation—it’s only your imagination.",
    "Push yourself, because no one else is going to do it for you."
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("studentData")) || {};
    if (stored[user.username]) setData(stored[user.username]);
  }, [user.username]);

  const attendanceData = {
    labels: ["Attended", "Absent"],
    datasets: [{
      label: "Attendance",
      data: [
        data.mockTests?.filter(t => t.attended).length || 0,
        data.mockTests?.filter(t => !t.attended).length || 0
      ],
      backgroundColor: ["#4ade80", "#f87171"],
      borderColor: ["#22c55e", "#ef4444"],
      borderWidth: 1
    }]
  };

  const scoreData = {
    labels: data.mockTests?.map(t => t.date) || [],
    datasets: [
      {
        label: "Monthly Test",
        data: data.mockTests?.map(t => t.monthlyScore || 0) || [],
        backgroundColor: "#60a5fa"
      },
      {
        label: "Quiz",
        data: data.mockTests?.map(t => t.quizScore || 0) || [],
        backgroundColor: "#facc15"
      },
      {
        label: "Assignment",
        data: data.mockTests?.map(t => t.assignmentScore || 0) || [],
        backgroundColor: "#34d399"
      },
      {
        label: "Practical",
        data: data.mockTests?.map(t => t.practicalScore || 0) || [],
        backgroundColor: "#f472b6"
      },
      {
        label: "Attendance",
        data: data.mockTests?.map(t => (t.attended ? 100 : 0)) || [],
        backgroundColor: "#4ade80"
      }
    ]
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom"
      }
    }
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top"
      },
      tooltip: {
        mode: "index",
        intersect: false
      }
    },
    scales: {
      x: {
        stacked: false,
        title: {
          display: true,
          text: "Test Dates"
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Scores"
        }
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-8 text-purple-600">Student Dashboard</h2>
          <nav className="space-y-4 text-gray-700 mb-6">
            <a href="#" className="flex items-center gap-3 p-2 rounded hover:bg-purple-100"><FaHome /> Overview</a>
            <a href="#" className="flex items-center gap-3 p-2 rounded hover:bg-purple-100"><FaClipboardList /> Mock Tests</a>
            <a href="#" className="flex items-center gap-3 p-2 rounded hover:bg-purple-100"><FaChartLine /> Results</a>
            <a href="#" className="flex items-center gap-3 p-2 rounded hover:bg-purple-100"><FaUserCircle /> Profile</a>
          </nav>

          {/* Motivational Quote Section */}
          <div className="bg-purple-50 p-4 rounded shadow text-sm text-gray-700">
            <h4 className="font-semibold mb-2">💡 Motivation</h4>
            <p className="italic">"{randomQuote}"</p>
          </div>
        </div>
        <button onClick={onLogout} className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">Logout</button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded shadow">
          <input type="text" placeholder="Search..." className="border rounded px-3 py-2 w-1/3" />
          <div className="flex items-center gap-4">
            <FaBell className="text-gray-600 cursor-pointer" />
            <div className="flex items-center gap-2 cursor-pointer">
              <FaUserCircle className="text-3xl text-gray-600" />
              <span>{data.name || "Student"}</span>
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="mb-6 bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-2">Welcome, {data.name || "Student"}</h1>
          <p className="text-gray-600">Here’s your latest academic information.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <h4 className="text-gray-500 text-sm">Attendance</h4>
            <p className="text-2xl font-bold">{data.attendance || 0}%</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h4 className="text-gray-500 text-sm">Mock Tests</h4>
            <p className="text-2xl font-bold">{data.mockTests?.length || 0}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h4 className="text-gray-500 text-sm">Posts</h4>
            <p className="text-2xl font-bold">{data.posts?.length || 0}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded shadow h-80">
            <h4 className="text-lg font-semibold mb-3">Attendance Overview</h4>
            {data.mockTests?.length > 0 ? (
              <Pie data={attendanceData} options={pieOptions} />
            ) : (
              <p className="text-gray-500">No attendance data available.</p>
            )}
          </div>

          <div className="bg-white p-6 rounded shadow h-[500px]">
            <h4 className="text-lg font-semibold mb-3">Academic Overview</h4>
            {data.mockTests?.length > 0 ? (
              <Bar data={scoreData} options={barOptions} />
            ) : (
              <p className="text-gray-500">No academic data available.</p>
            )}
          </div>
        </div>

        {/* Posts Section */}
        <div className="bg-white p-6 rounded shadow mt-6">
          <h3 className="text-xl font-semibold mb-4">Posts</h3>
          {data.posts?.length > 0 ? (
            <ul className="space-y-4">
              {data.posts.map((post, i) => (
                <li key={i} className="border rounded p-4 hover:bg-gray-50">
                  <p>{post.text}</p>
                  <p className="text-sm text-gray-500 mt-2">By {post.submittedBy} on {post.date}</p>
                </li>
              ))}
            </ul>
          ) : <p className="text-gray-500">No posts yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
