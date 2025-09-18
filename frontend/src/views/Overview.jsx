// src/views/Overview.jsx
import React, { useState } from "react";

const Overview = () => {
  const totalStudents = 120;
  const upcomingClasses = 3;
  const pendingAssignments = 5;
  const notifications = 2;

  // State for schedule
  const [todaySchedule, setTodaySchedule] = useState([
    { time: "10:00 AM", subject: "Data Structures", room: "204" },
    { time: "1:00 PM", subject: "Algorithms", room: "105" },
  ]);
  const [isEditingSchedule, setIsEditingSchedule] = useState(false);
  const [newScheduleItem, setNewScheduleItem] = useState({
    time: "",
    subject: "",
    room: "",
  });

  // State for announcements
  const [announcements, setAnnouncements] = useState([
    "Midterm exams scheduled from Oct 15.",
    "Submit your research papers by Oct 10.",
  ]);
  const [isEditingAnnouncements, setIsEditingAnnouncements] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState("");

  // State for profile
  const [profile, setProfile] = useState({
    name: "Dr. John Smith",
    department: "Department of Computer Science",
    email: "john.smith@college.edu",
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setNewScheduleItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addScheduleItem = () => {
    if (newScheduleItem.time && newScheduleItem.subject && newScheduleItem.room) {
      setTodaySchedule([...todaySchedule, newScheduleItem]);
      setNewScheduleItem({ time: "", subject: "", room: "" });
    } else {
      alert("Please fill all fields.");
    }
  };

  const removeScheduleItem = (index) => {
    const updated = todaySchedule.filter((_, i) => i !== index);
    setTodaySchedule(updated);
  };

  const handleAnnouncementChange = (e) => {
    setNewAnnouncement(e.target.value);
  };

  const addAnnouncement = () => {
    if (newAnnouncement.trim() !== "") {
      setAnnouncements([...announcements, newAnnouncement.trim()]);
      setNewAnnouncement("");
    } else {
      alert("Please enter announcement text.");
    }
  };

  const removeAnnouncement = (index) => {
    const updated = announcements.filter((_, i) => i !== index);
    setAnnouncements(updated);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveProfile = () => {
    setIsEditingProfile(false);
    alert("Profile updated successfully!");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Overview</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow-sm">
          <p className="text-gray-500">Total Students</p>
          <p className="text-2xl font-bold">{totalStudents}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-sm">
          <p className="text-gray-500">Upcoming Classes</p>
          <p className="text-2xl font-bold">{upcomingClasses}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-sm">
          <p className="text-gray-500">Assignments Pending</p>
          <p className="text-2xl font-bold">{pendingAssignments}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-sm">
          <p className="text-gray-500">Notifications</p>
          <p className="text-2xl font-bold">{notifications}</p>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white p-6 rounded shadow-sm mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Today's Schedule</h3>
          <button
            onClick={() => setIsEditingSchedule(!isEditingSchedule)}
            className="text-sm text-purple-600 hover:underline"
          >
            {isEditingSchedule ? "Done" : "Edit"}
          </button>
        </div>
        <ul className="space-y-2 text-gray-600">
          {todaySchedule.map((item, index) => (
            <li key={index} className="flex justify-between items-center">
              {item.time} - {item.subject} - Room {item.room}
              {isEditingSchedule && (
                <button
                  onClick={() => removeScheduleItem(index)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
        {isEditingSchedule && (
          <div className="mt-4 space-y-2">
            <input
              type="text"
              name="time"
              value={newScheduleItem.time}
              onChange={handleScheduleChange}
              placeholder="Time"
              className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-purple-300"
            />
            <input
              type="text"
              name="subject"
              value={newScheduleItem.subject}
              onChange={handleScheduleChange}
              placeholder="Subject"
              className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-purple-300"
            />
            <input
              type="text"
              name="room"
              value={newScheduleItem.room}
              onChange={handleScheduleChange}
              placeholder="Room"
              className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-purple-300"
            />
            <button
              onClick={addScheduleItem}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-full"
            >
              Add Schedule
            </button>
          </div>
        )}
      </div>

      {/* Announcements */}
      <div className="bg-white p-6 rounded shadow-sm mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Announcements</h3>
          <button
            onClick={() => setIsEditingAnnouncements(!isEditingAnnouncements)}
            className="text-sm text-purple-600 hover:underline"
          >
            {isEditingAnnouncements ? "Done" : "Edit"}
          </button>
        </div>
        <ul className="space-y-2 text-gray-600">
          {announcements.map((note, index) => (
            <li key={index} className="flex justify-between items-center">
              {note}
              {isEditingAnnouncements && (
                <button
                  onClick={() => removeAnnouncement(index)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
        {isEditingAnnouncements && (
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={newAnnouncement}
              onChange={handleAnnouncementChange}
              placeholder="New announcement"
              className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-purple-300"
            />
            <button
              onClick={addAnnouncement}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Add
            </button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded shadow-sm mb-6">
        <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
        <div className="flex gap-4 flex-wrap">
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Manage Students</button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Create Assignment</button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Upload Materials</button>
        </div>
      </div>

      {/* Teacher Info with Edit Option */}
      <div className="bg-white p-6 rounded shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Your Profile</h3>
          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="text-sm text-purple-600 hover:underline"
          >
            {isEditingProfile ? "Done" : "Edit"}
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-purple-100 text-purple-600 p-3 rounded-full text-2xl">T</div>
          <div className="flex-1">
            {isEditingProfile ? (
              <div className="space-y-2">
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  placeholder="Name"
                  className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-purple-300"
                />
                <input
                  type="text"
                  name="department"
                  value={profile.department}
                  onChange={handleProfileChange}
                  placeholder="Department"
                  className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-purple-300"
                />
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  placeholder="Email"
                  className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-purple-300"
                />
                <button
                  onClick={saveProfile}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
                >
                  Save
                </button>
              </div>
            ) : (
              <div>
                <p className="font-bold">{profile.name}</p>
                <p className="text-gray-500">{profile.department}</p>
                <p className="text-gray-500">{profile.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
