// components/CourseManagement/Header.js
"use client";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Managing:{" "}
          <span className="text-primary-100">FarLand Frontend Course</span>
        </h1>
      </div>
    </header>
  );
}
