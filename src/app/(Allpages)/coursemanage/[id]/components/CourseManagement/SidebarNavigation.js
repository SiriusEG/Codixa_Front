// components/CourseManagement/SidebarNavigation.js
"use client";

import {
  FaChalkboardTeacher,
  FaDollarSign,
  FaTag,
  FaChartLine,
  FaFileAlt,
  FaUsers,
  FaCertificate,
  FaArrowLeft,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function SidebarNavigation({ activeTab, setActiveTab }) {
  const router = useRouter();
  const tabs = [
    // Keep original tabs array unchanged
    {
      id: "curriculum",
      icon: <FaChalkboardTeacher />,
      label: "Curriculum",
    },
    {
      id: "students",
      icon: <FaUsers />,
      label: "Students",
    },
    {
      id: "analytics",
      icon: <FaChartLine />,
      label: "Analytics",
    },
    {
      id: "resources",
      icon: <FaFileAlt />,
      label: "Resources",
    },

    {
      id: "certificates",
      icon: <FaCertificate />,
      label: "Certificates",
    },
  ];

  return (
    <nav className="w-64 h-full flex flex-col">
      {/* Original Navigation Items (unchanged) */}
      <div className="space-y-1 flex-grow overflow-y-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center px-4 py-3.5 rounded-lg transition-colors
              ${
                activeTab === tab.id
                  ? "bg-purple-100 text-primary-100 font-semibold"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
          >
            <span className="mr-3 text-lg">{tab.icon}</span>
            <span className="text-sm">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* New Back Button Added Below */}
      <div className="border-t pt-2">
        <button
          onClick={() => router.push("/dashboard")}
          className="w-full flex items-center px-4 py-3.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <span className="mr-3 text-lg">
            <FaArrowLeft />
          </span>
          <span className="text-sm">Back to Dashboard</span>
        </button>
      </div>
    </nav>
  );
}
