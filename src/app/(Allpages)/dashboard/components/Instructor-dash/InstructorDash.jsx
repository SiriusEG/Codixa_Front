"use client";
import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../../../../lib/hooks"; // Adjust path if necessary
import { useRouter } from "next/navigation";

import {
  AiOutlineSetting,
  AiOutlineLogout,
  AiOutlineHome,
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
} from "react-icons/ai";
import { SiCoursera } from "react-icons/si";
import { TbReportAnalytics } from "react-icons/tb";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { LuExpand, LuShrink } from "react-icons/lu";
import { logout } from "../../../../../../lib/reducers/auth/logInSlice";
import Courses from "./Courses";

const InstructorDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);
  const { userInfo } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleLogout = async () => {
    await dispatch(logout());
    router.replace("/");
    setTimeout(() => {
      window.location.href = "/";
    }, 100);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "courses":
        return (
          <div>
            <Courses />
          </div>
        );
      case "students":
        return <div>Student Interactions Content</div>;
      case "reports":
        return <div>Reports and Analytics Content</div>;
      default:
        return <div>Instructor Dashboard Content</div>;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarExpanded ? "w-72" : "w-20"
        } bg-primary-100 text-white py-8 pl-4 min-h-screen transition-all duration-300 relative`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setSidebarExpanded(!isSidebarExpanded)}
          className="absolute top-2 border-white border-2 right-[-1rem] bg-primary-100 rounded-full p-1 text-xl text-white focus:outline-none"
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
                {userInfo?.name || "Instructor Name"}
              </h2>
              <p className="text-sm text-gray-400">
                {userInfo?.role || "Instructor"}
              </p>
              <p className="text-sm text-gray-400">alex.johnson@gmail.com</p>
            </>
          )}
        </div>

        {/* Menu Items */}
        <ul className="space-y-6">
          {[
            { name: "Dashboard", id: "dashboard", icon: <AiOutlineHome /> },
            { name: "Courses", id: "courses", icon: <SiCoursera /> },
            {
              name: "Students",
              id: "students",
              icon: <LiaChalkboardTeacherSolid />,
            },
            { name: "Reports", id: "reports", icon: <TbReportAnalytics /> },

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
          <div onClick={() => router.push("/")}>
            <li
              className="flex items-center space-x-4 p-3 rounded-l-md cursor-pointer hover:bg-red-600 hover:text-white transition-all duration-300"
              onClick={handleLogout}
            >
              <AiOutlineLogout className="text-2xl" />
              {isSidebarExpanded && <span className="font-medium">Logout</span>}
            </li>
          </div>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 bg-gray-100 min-h-screen">
        <div>{renderContent()}</div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
