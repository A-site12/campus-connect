// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";
import ClassRepDashboard from "./ClassRepDashboard";

function App() {
  // Load user from localStorage if available
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Save or remove user from localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const handleLogin = (loggedInUser) => setUser(loggedInUser);

  const handleLogout = () => setUser(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />

        {user && user.role === "student" && (
          <Route path="/dashboard" element={<StudentDashboard user={user} onLogout={handleLogout} />} />
        )}
        
        {user && user.role === "teacher" && (
          <Route path="/dashboard" element={<TeacherDashboard user={user} onLogout={handleLogout} />} />
        )}
        
        {user && user.role === "classrep" && (
          <Route path="/dashboard" element={<ClassRepDashboard user={user} onLogout={handleLogout} />} />
        )}
        
        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
