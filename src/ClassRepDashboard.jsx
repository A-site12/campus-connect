import React, { useState, useEffect } from "react";

const ClassRepDashboard = ({ user, onLogout }) => {
  const [studentData, setStudentData] = useState({});
  const [selectedStudent, setSelectedStudent] = useState("");
  const [post, setPost] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("studentData")) || {};
    setStudentData(stored);
  }, []);

  const handleSubmitForApproval = () => {
    if (!selectedStudent || !post.trim()) return alert("Select student & write post");

    const pending = JSON.parse(localStorage.getItem("pendingPosts")) || [];
    pending.push({
      student: selectedStudent,
      text: post,
      submittedBy: user.username,
      date: new Date().toLocaleString(),
    });

    localStorage.setItem("pendingPosts", JSON.stringify(pending));
    setPost("");
    alert("Post sent to Teacher1 for approval!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Class Rep Dashboard</h1>
        <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-3">Submit Post for Approval</h2>
        <select value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)} className="w-full p-2 mb-3 border rounded">
          <option value="">Select student</option>
          {Object.keys(studentData).map(s => (
            <option key={s} value={s}>{studentData[s].name}</option>
          ))}
        </select>
        <textarea placeholder="Write post..." value={post} onChange={e => setPost(e.target.value)} className="w-full p-2 mb-3 border rounded" rows="3"/>
        <button onClick={handleSubmitForApproval} className="bg-blue-500 text-white px-4 py-2 rounded">Submit for Approval</button>
      </div>
    </div>
  );
};

export default ClassRepDashboard;
