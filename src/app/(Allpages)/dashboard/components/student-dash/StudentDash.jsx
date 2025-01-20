"use client";
import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../../../../lib/hooks"; // Adjust the path if needed
import { useRouter } from "next/navigation";
import { logout } from "../../../../../../lib/reducers/auth/logInSlice";
import {
  AiOutlineHome,
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
  AiOutlineSetting,
  AiOutlineLogout,
} from "react-icons/ai";
import { MdOutlineSchool, MdAssignment } from "react-icons/md";
import { BsGraphUp, BsBook } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";
import { LuExpand, LuShrink } from "react-icons/lu";

const StudentDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("overview");
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const { userInfo } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    await dispatch(logout());
    window.location.reload();
    router.push("/");
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "overview":
        return (
          <div>Your overall progress and recent activity will appear here.</div>
        );
      case "courses":
        return <div>Your enrolled courses will be listed here.</div>;
      case "assignments":
        return (
          <div>Your assignments and submissions will be displayed here.</div>
        );
      case "progress":
        return <div>Your progress tracking and reports will appear here.</div>;
      case "teachers":
        return (
          <div>
            List of available teachers and their contact info will be shown
            here.
          </div>
        );
      case "settings":
        return <div>Account and dashboard settings can be modified here.</div>;
      default:
        return <div>Welcome to your Student Dashboard!</div>;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarExpanded ? "w-72" : "w-20"
        } bg-blue-600 text-white py-8 pl-4 min-h-screen transition-all duration-300 relative`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setSidebarExpanded(!isSidebarExpanded)}
          className="absolute top-2 border-white border-2 right-[-1rem] bg-blue-600 rounded-full p-1 text-xl text-white focus:outline-none"
        >
          {isSidebarExpanded ? <LuShrink /> : <LuExpand />}
        </button>

        {/* Profile Section */}
        <div className="mb-8 flex flex-col mr-4 items-center">
          <img
            src="https://i.pinimg.com/236x/a4/67/5a/a4675ada509320a63ebc2172c352ef9f.jpg"
            alt="Profile"
            className="w-12 h-12 rounded-full border-2 border-gray-600 mb-4"
          />
          {isSidebarExpanded && (
            <>
              <h2 className="text-lg font-semibold">
                {userInfo?.name || "Student Name"}
              </h2>
              <p className="text-sm text-gray-400">
                {userInfo?.email || "student@example.com"}
              </p>
            </>
          )}
        </div>

        {/* Menu Items */}
        <ul className="space-y-6">
          {[
            { name: "Overview", id: "overview", icon: <BsGraphUp /> },
            { name: "Courses", id: "courses", icon: <BsBook /> },
            { name: "Assignments", id: "assignments", icon: <MdAssignment /> },
            { name: "Progress", id: "progress", icon: <MdOutlineSchool /> },
            { name: "Teachers", id: "teachers", icon: <FaChalkboardTeacher /> },
            { name: "Settings", id: "settings", icon: <AiOutlineSetting /> },
          ].map((item) => (
            <li
              key={item.id}
              className={`flex items-center space-x-4 p-3 rounded-l-md cursor-pointer transition-all duration-300 ${
                activeMenu === item.id
                  ? "bg-gray-100 text-black"
                  : "hover:bg-gray-100 hover:text-black"
              }`}
              onClick={() => setActiveMenu(item.id)}
            >
              <span className="text-2xl">{item.icon}</span>
              {isSidebarExpanded && (
                <span className="font-medium">{item.name}</span>
              )}
            </li>
          ))}

          {/* Navigate Home */}
          <li
            className="flex items-center space-x-4 p-3 rounded-l-md cursor-pointer hover:bg-gray-100 hover:text-black transition-all duration-300"
            onClick={() => router.push("/")}
          >
            <AiOutlineHome className="text-2xl" />
            {isSidebarExpanded && <span className="font-medium">Home</span>}
          </li>

          {/* Logout */}
          <li
            className="flex items-center space-x-4 p-3 rounded-l-md cursor-pointer hover:bg-red-600 hover:text-white transition-all duration-300"
            onClick={handleLogout}
          >
            <AiOutlineLogout className="text-2xl" />
            {isSidebarExpanded && <span className="font-medium">Logout</span>}
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-5">
          {activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)}
        </h1>
        <div>{renderContent()}</div>
      </div>
    </div>
  );
};

export default StudentDashboard;
