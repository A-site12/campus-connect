// src/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const users = [
  { username: "teacher1", password: "teach123", role: "teacher", name: "Teacher One" },
  { username: "teacher2", password: "teach456", role: "teacher", name: "Teacher Two" },
  { username: "classrep", password: "rep123", role: "classrep", name: "Class Rep" },
  { username: "student1", password: "stud111", role: "student", name: "Student One" },
  { username: "student2", password: "stud222", role: "student", name: "Student Two" },
  { username: "student3", password: "stud333", role: "student", name: "Student Three" },
  { username: "student4", password: "stud444", role: "student", name: "Student Four" },
];

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(foundUser));
      
      // Call onLogin to update state in App.jsx
      onLogin(foundUser);

      // Redirect to dashboard
      navigate("/dashboard");
    } else {
      setError("Invalid username or password ❌");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-3 p-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-3 p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
