"use client";
import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../../../../lib/hooks"; // Adjust the path as necessary
import { useRouter } from "next/navigation";
import { TbStatusChange } from "react-icons/tb";
import { SiCoursera } from "react-icons/si";
import { TbReportAnalytics } from "react-icons/tb";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { LuExpand } from "react-icons/lu";
import { LuShrink } from "react-icons/lu";
import { FaTags } from "react-icons/fa";

import {
  AiOutlineSetting,
  AiOutlineLogout,
  AiOutlineHome,
} from "react-icons/ai";
import { logout } from "../../../../../../lib/reducers/auth/logInSlice";
import Status from "./status";
import InstructorRequests from "./InstructorRequests";
import AdminControl from "./AdminControl";
import CategoryManagement from "./CategoryManagement";
import TeacherManagement from "./TeacherManagement";
import StudentManagement from "./StudentManagement";
import { GiTeacher } from "react-icons/gi";
import { IoMan } from "react-icons/io5";

const AdminDashboard = () => {
  // Initialize state from sessionStorage with admin-specific keys
  const [activeMenu, setActiveMenu] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("activeMenuAdminDash");
      return saved || "statics";
    }
    return "statics";
  });

  const [isSidebarExpanded, setSidebarExpanded] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("isSidebarExpandedAdminDash");
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
      sessionStorage.setItem("activeMenuAdminDash", activeMenu);
    }
  }, [activeMenu]);

  // Save isSidebarExpanded to sessionStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "isSidebarExpandedAdminDash",
        JSON.stringify(isSidebarExpanded)
      );
    }
  }, [isSidebarExpanded]);

  const handleLogout = async () => {
    // Clear admin-specific sessionStorage items on logout
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("activeMenuAdminDash");
      sessionStorage.removeItem("isSidebarExpandedAdminDash");
    }
    await dispatch(logout());
    router.replace("/");
    setTimeout(() => {
      window.location.href = "/";
    }, 100);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "statics":
        return (
          <div>
            <Status />
          </div>
        );

      case "teachercontrol":
        return (
          <div>
            <InstructorRequests />;
          </div>
        );
      case "teachers":
        return (
          <div>
            <TeacherManagement />
          </div>
        );
      case "students":
        return (
          <div>
            <StudentManagement />
          </div>
        );
      case "admincontrol":
        return (
          <div>
            <AdminControl />
          </div>
        );
      case "categories":
        return (
          <div>
            <CategoryManagement />
          </div>
        );
      case "courses":
        return <div>Courses Content</div>;
      // case "settings":
      //   return <div>Settings Content</div>;
      default:
        return (
          <div>
            <Status />
          </div>
        );
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
            {userInfo?.ProfilePicturePath &&
            userInfo.ProfilePicturePath !== "null" ? (
              <img
                src={`https://codixa.runasp.net/${userInfo.ProfilePicturePath}`}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-600 text-sm font-medium">
                  {userInfo?.name?.charAt(0)?.toUpperCase() || "?"}
                </span>
              </div>
            )}
          </div>
          {isSidebarExpanded && (
            <>
              <h2 className="text-lg font-semibold">
                {userInfo?.name || "John Doe"}
              </h2>
              <p className="text-sm text-gray-400">
                {userInfo?.role || "Admin"}
              </p>
            </>
          )}
        </div>

        {/* Menu Items */}
        <ul className="space-y-6">
          {[
            { name: "Statics", id: "statics", icon: <TbStatusChange /> },
            {
              name: "Teacher Control",
              id: "teachercontrol",
              icon: <LiaChalkboardTeacherSolid />,
            },
            {
              name: "Teachers",
              id: "teachers",
              icon: <GiTeacher />,
            },
            {
              name: "Students",
              id: "students",
              icon: <IoMan />,
            },
            {
              name: "Admin Control",
              id: "admincontrol",
              icon: <AiOutlineSetting />,
            },
            { name: "Categories", id: "categories", icon: <FaTags /> },
            { name: "Courses", id: "courses", icon: <SiCoursera /> },
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
      <div className="flex-1 p-2 bg-gray-50 min-h-screen max-w-full overflow-x-hidden">
        <div>{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
