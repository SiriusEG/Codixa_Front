"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "./Header";
import SidebarNavigation from "./SidebarNavigation";
import CurriculumTab from "./CurriculumTab";
import AnalyticsTab from "./analytics";
import Studentreq from "./studentreq/Studentreq";
import CourseInfo from "./courseInfo";
import { useToast } from "../context/ToastContext";

export default function CourseManagement() {
  const { id } = useParams();

  // Initialize activeTab from sessionStorage with instructor-specific key
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("activeTabManageInstructor");
      return saved || "course info";
    }
    return "course info";
  });

  const [sections, setSections] = useState([]);
  const [courseData, setCourseData] = useState(null);
  const { addToast } = useToast();

  // Save activeTab to sessionStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("activeTabManageInstructor", activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchCourseData();
  }, [id]);

  const fetchCourseData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/crs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch course");
      const data = await response.json();
      setCourseData(data);
    } catch (error) {
      addToast(error.message, "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header courseName={courseData?.courseName} />

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        <SidebarNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1">
          {activeTab === "curriculum" && (
            <CurriculumTab
              sections={sections}
              courseId={id}
              setSections={setSections}
            />
          )}
          {activeTab === "analytics" && <AnalyticsTab />}
          {activeTab === "course info" && courseData && (
            <CourseInfo courseData={courseData} refreshData={fetchCourseData} />
          )}
          {activeTab === "students" && <Studentreq courseId={id} />}
        </main>
      </div>
    </div>
  );
}
