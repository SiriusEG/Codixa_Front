// components/CourseManagement/index.js
"use client";

import { useState } from "react";
import Header from "./Header";
import SidebarNavigation from "./SidebarNavigation";
import CurriculumTab from "./CurriculumTab";
import AnalyticsTab from "./analytics";

export default function CourseManagement() {
  const [activeTab, setActiveTab] = useState("curriculum");
  const [sections, setSections] = useState([]); // Initial sections data

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        <SidebarNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1">
          {activeTab === "curriculum" && (
            <CurriculumTab sections={sections} setSections={setSections} />
          )}
          {activeTab === "analytics" && <AnalyticsTab />}
        </main>
      </div>
    </div>
  );
}
