import React, { useState } from 'react';
import {
  FaUser,
  FaEnvelope,
  FaBirthdayCake,
  FaVenusMars,
  FaDumbbell,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const [streak, setStreak] = useState(Array(7).fill(false));
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "Roshni Singh Ranjan",
    age: user?.age || "20",
    email: user?.email || "roshni@example.com",
    gender: user?.gender || "Female",
    goal: user?.goal || "Stay fit",
    location: "Ranchi, Jharkhand",
    phone: "+91-9876543210",
  });

  const handleCheckboxChange = (index) => {
    const updatedStreak = [...streak];
    updatedStreak[index] = !updatedStreak[index];
    setStreak(updatedStreak);

    const allCompleted = updatedStreak.every((day) => day);
    if (allCompleted) {
      alert("🎉 Congrats! You’ve completed your fitness goal for the entire week!");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const streakProgress = (streak.filter(Boolean).length / streak.length) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-lg border border-gray-200">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 flex items-center gap-2">
        <FaUser className="text-blue-500" /> Your Profile
      </h1>

      

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        {Object.entries(profileData).map(([key, value]) => (
          <ProfileItem
            key={key}
            icon={getIcon(key)}
            label={capitalize(key)}
            value={value}
            isEditing={isEditing}
            name={key}
            onChange={handleInputChange}
          />
        ))}
      </div>
      <button
        onClick={handleEditToggle}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition"
      >
        {isEditing ? "Save Profile" : "Edit Profile"}
      </button>

      {/* Streak Calendar */}
      <div className="bg-white p-6 rounded-md shadow-md mt-6">
        <h3 className="text-xl font-semibold text-center text-gray-700 mb-4">
          Weekly Streak Tracker
        </h3>
        <div className="flex justify-center gap-4">
          {weekDays.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <label className="text-sm text-gray-600 mb-1">{day}</label>
              <input
                type="checkbox"
                checked={streak[index]}
                onChange={() => handleCheckboxChange(index)}
                className="h-5 w-5 cursor-pointer accent-green-500"
              />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${streakProgress}%` }}
            ></div>
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            {Math.round(streakProgress)}% of your weekly goal completed
          </p>
        </div>
      </div>
    </div>
  );
}

function ProfileItem({ icon, label, value, isEditing, name, onChange }) {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300">
      <div className="text-sm text-gray-600 mb-1 flex items-center gap-2 font-semibold">
        {icon} {label}
      </div>
      {isEditing ? (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      ) : (
        <div
          className="text-gray-800 font-medium text-lg"
          title={`${label}: ${value}`}
        >
          {value}
        </div>
      )}
    </div>
  );
}

function getIcon(key) {
  switch (key) {
    case "name":
      return <FaUser />;
    case "age":
      return <FaBirthdayCake />;
    case "email":
      return <FaEnvelope />;
    case "gender":
      return <FaVenusMars />;
    case "goal":
      return <FaDumbbell />;
    case "location":
      return <FaMapMarkerAlt />;
    case "phone":
      return <FaPhoneAlt />;
    default:
      return null;
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
