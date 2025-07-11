"use client";
import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../../../../lib/hooks"; // Adjust path if necessary
import { useRouter } from "next/navigation";

import {
  AiOutlineSetting,
  AiOutlineLogout,
  AiOutlineHome,
} from "react-icons/ai";
import { SiCoursera } from "react-icons/si";
import { LuExpand, LuShrink } from "react-icons/lu";
import { logout } from "../../../../../../lib/reducers/auth/logInSlice";
import Courses from "./Courses";
import ChangePassword from "./ChangePassword";
import EditProfile from "./EditProfile";
import { RiProfileFill } from "react-icons/ri";
import { MdPassword } from "react-icons/md";

const InstructorDashboard = () => {
  // Initialize state from sessionStorage with instructor-specific keys
  const [activeMenu, setActiveMenu] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("activeMenuInstructorDash");
      return saved || "dashboard";
    }
    return "dashboard";
  });

  const [isSidebarExpanded, setSidebarExpanded] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("isSidebarExpandedInstructorDash");
      return saved ? JSON.parse(saved) : true;
    }
    return true;
  });

  const { userInfo } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Save activeMenu to sessionStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("activeMenuInstructorDash", activeMenu);
    }
  }, [activeMenu]);

  // Save isSidebarExpanded to sessionStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "isSidebarExpandedInstructorDash",
        JSON.stringify(isSidebarExpanded)
      );
    }
  }, [isSidebarExpanded]);

  const handleLogout = async () => {
    // Clear instructor-specific sessionStorage items on logout
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("activeMenuInstructorDash");
      sessionStorage.removeItem("isSidebarExpandedInstructorDash");
    }
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
      case "changepassword":
        return <ChangePassword />;
      case "editprofile":
        return <EditProfile />;
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
          <div className="relative">
            {userInfo?.ProfilePicturePath === "null" ||
            !userInfo?.ProfilePicturePath ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-600 text-sm font-medium">
                  {userInfo?.name?.charAt(0)?.toUpperCase() || "?"}
                </span>
              </div>
            ) : (
              <img
                src={`https://codixa.runasp.net/${userInfo.ProfilePicturePath}`}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            )}
          </div>
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
              name: "Edit Profile",
              id: "editprofile",
              icon: <RiProfileFill />,
            },
            {
              name: "Change Password",
              id: "changepassword",
              icon: <MdPassword />,
            },
            // { name: "Settings", id: "settings", icon: <AiOutlineSetting /> },
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
