"use client";
export default function Header({ courseName }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">
          {courseName || "Course Management"}
        </h1>
        <div className="flex items-center gap-4">
          {/* Add any header buttons or controls here */}
        </div>
      </div>
    </header>
  );
}
