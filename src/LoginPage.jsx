// src/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import users from "./accounts";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      onLogin(user);
      navigate("/dashboard");
    } else {
      setError("Invalid username or password ❌");
    }
  };

  return (
   <div className="flex h-screen">
  {/* Left Illustration */}
  <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-50">
    <img
      src="/images/image.png" // ✅ Image stored in campus-connect/public/images/
      alt="Login Illustration"
      className="w-[950px] h-auto max-w-full rounded-xl shadow-lg"
    />
  </div>



      {/* Right Form Section */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gradient-to-r from-purple-600 to-blue-500">
        <div className="bg-white p-10 rounded-2xl shadow-xl w-96">
          <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">
            Welcome!
          </h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            {error && (
              <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
            )}

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

export default LoginPage;
