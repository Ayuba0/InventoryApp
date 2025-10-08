// src/components/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all user session data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Navigate to login page cleanly
    navigate("/login", { replace: true });
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-bold">Inventory App</h1>
      </div>

      <div className="flex items-center space-x-4">
        {user && (
          <span className="font-medium">
            {user.name} ({user.role})
          </span>
        )}
        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
