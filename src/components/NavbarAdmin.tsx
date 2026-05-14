/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";

export default function NavBarAdmin() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("Tidak ada token!");
        return;
      }

      await axios.post("http://127.0.0.1:8000/api/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("token");
      document.querySelector("#logoutModal")?.classList.remove("show");
      document.querySelector(".modal-backdrop")?.remove();
      navigate("/login");
    } catch (error) {
      console.error("Error : ", error);
    }
  };
  return (
    <div className="flex justify-between items-center bg-white shadow px-6 py-3 relative">
      <form action="" className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-lg px-3 py-1 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <FaUserCircle className="text-3xl text-gray-600" />
        <span className="font-medium">Admin</span>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-14 right-6 w-48 bg-white rounded-lg shadow-lg border animate-slide-down">
          <ul className="py-2 text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              ⚙️ Settings
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              📊 Activity
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
              onClick={logout}
            >
              🚪 Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
