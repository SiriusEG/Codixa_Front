"use client";
import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../../../../lib/hooks"; // Adjust the path as necessary
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; // Import motion from framer-motion
import { TbStatusChange } from "react-icons/tb"; // Icon for statics
import { BsDatabaseDash } from "react-icons/bs"; // Icon for reports
import {
  AiOutlineSetting,
  AiOutlineLogout,
  AiOutlineHome,
} from "react-icons/ai"; // Icons for settings and logout
import { logout } from "../../../../../../lib/reducers/auth/logInSlice";
import Status from "./status";

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");
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
      case "statics":
        return (
          <div>
            <Status />
          </div>
        );
      case "teachercontrol":
        return <div>Teacher Control Content</div>;
      case "reports":
        return <div>Reports Content</div>;
      case "admincontrol":
        return <div>Admin Control Content</div>;
      case "courses":
        return <div>Courses Content</div>;
      case "settings":
        return <div>Settings Content</div>;
      default:
        return <div>Dashboard Content</div>;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <motion.div
        className="w-64 bg-primary text-white py-5 pl-5 min-h-screen"
        initial={{ x: -50 }} // Sidebar initial off-screen
        animate={{ x: 0 }} // Animate into view
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="min-h-screen">
          {" "}
          <div className="mb-8 flex-center flex-col pr-5">
            <img
              src="https://via.placeholder.com/50"
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
            <h2 className="mt-4 text-lg font-semibold">{userInfo.name}</h2>
            <p className="text-sm">{userInfo.role}</p>
            <p className="text-sm">alex.johnson@gmail.com</p>
          </div>
          {/* Menu Items */}
          <ul className="space-y-4">
            {[
              { name: "Statics", id: "statics", icon: <TbStatusChange /> },
              {
                name: "Teacher Control",
                id: "teachercontrol",
                icon: <BsDatabaseDash />,
              },
              { name: "Reports", id: "reports", icon: <BsDatabaseDash /> },
              {
                name: "Admin Control",
                id: "admincontrol",
                icon: <AiOutlineSetting />,
              },
              { name: "Courses", id: "courses", icon: <BsDatabaseDash /> },
              {
                name: "Settings",
                id: "settings",
                icon: <AiOutlineSetting />,
              },
            ].map((item) => (
              <li
                key={item.id}
                className={`font-semibold cursor-pointer p-3 rounded-l-2xl flex items-center space-x-3 transition-all .3s ${
                  activeMenu === item.id
                    ? "bg-primary-background text-black "
                    : ""
                }`}
                onClick={() => setActiveMenu(item.id)}
              >
                {item.icon}
                <span>{item.name}</span>
              </li>
            ))}

            {/* Navigate Home */}
            <li
              className="font-semibold cursor-pointer p-3 rounded-l-2xl flex items-center space-x-3 transition-all .3s"
              onClick={() => router.push("/")}
            >
              <AiOutlineHome />
              <span>Home</span>
            </li>

            {/* Logout */}
            <li
              className="font-semibold cursor-pointer p-3 rounded-l-2xl flex items-center space-x-3 transition-all .3s"
              onClick={handleLogout}
            >
              <AiOutlineLogout />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      </motion.div>

      {/* Main content */}
      <motion.div
        className="flex-1 p-10 bg-primary-background min-h-screen" // Changed h-screen to h-full
        initial={{ opacity: 0 }} // Initial opacity
        animate={{ opacity: 1 }} // Animate opacity to fully visible
        transition={{ duration: 0.5 }} // Smooth transition
      >
        <h1 className="text-2xl font-bold mb-5">
          {activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)}
        </h1>
        <div>{renderContent()}</div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
