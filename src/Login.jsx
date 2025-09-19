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
      localStorage.setItem("user", JSON.stringify(foundUser));
      onLogin(foundUser);
      navigate("/dashboard");
    } else {
      setError("Invalid username or password ❌");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side Illustration */}
      <div className="hidden md:flex w-1/2 bg-white items-center justify-center p-10">
        <img
          src="https://undraw.co/api/illustrations/secure-login.svg"
          alt="Login Illustration"
          className="max-w-md"
        />
      </div>

      {/* Right Side Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gradient-to-r from-purple-600 to-blue-500">
        <div className="bg-white rounded-2xl shadow-lg p-10 w-96">
          <h2 className="text-3xl font-bold text-center mb-6 text-purple-600">
            Welcome!
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <div className="flex gap-3">
              <button
                type="submit"
                className="w-1/2 bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition"
              >
                Sign In
              </button>
              <button
                type="button"
                className="w-1/2 border border-purple-600 text-purple-600 p-3 rounded-lg hover:bg-purple-50 transition"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
