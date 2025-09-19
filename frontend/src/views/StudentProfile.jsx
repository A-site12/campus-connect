// src/views/StudentProfile.jsx
import React, { useState } from "react";

const StudentProfile = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    roll: "STU12345",
    email: "johndoe@example.com",
    branch: "Computer Science",
    year: "3rd Year",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("✅ Profile updated successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-800">👤 Student Profile</h2>

      {/* Profile Card */}
      <div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-6">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-3xl font-bold">
          {profile.name.charAt(0)}
        </div>

        {/* Info */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {profile.name}
          </h3>
          <p className="text-gray-500">🎓 {profile.branch}</p>
          <p className="text-gray-500">📅 {profile.year}</p>
        </div>
      </div>

      {/* Editable Info */}
      <div className="bg-gray-50 p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">Profile Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={profile.name}
            disabled={!isEditing}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
          />
          <input
            type="text"
            name="roll"
            value={profile.roll}
            disabled
            className="p-3 border rounded-lg bg-gray-100"
          />
          <input
            type="email"
            name="email"
            value={profile.email}
            disabled={!isEditing}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
          />
          <input
            type="text"
            name="branch"
            value={profile.branch}
            disabled={!isEditing}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
          />
          <input
            type="text"
            name="year"
            value={profile.year}
            disabled={!isEditing}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
