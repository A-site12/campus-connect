// src/views/Profile.jsx
import React from "react";

const Profile = ({ user }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Teacher Profile</h2>
      <div className="bg-white shadow rounded p-6">
        <p><strong>Name:</strong> {user.name || "Teacher"}</p>
        <p><strong>Email:</strong> {user.email || "teacher@example.com"}</p>
        <p><strong>Department:</strong> {user.department || "Computer Science"}</p>
      </div>
    </div>
  );
};

export default Profile;
