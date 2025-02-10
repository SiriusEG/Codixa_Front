// pages/courses.js
import { useState } from "react";
import { FaSearch, FaPlusCircle, FaEdit } from "react-icons/fa";
import Link from "next/link";
import CourseModal from "./components/CourseModal";

function Courses() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "FarLand Frontend Ultimate Course",
      image:
        "https://i.pinimg.com/236x/75/87/df/7587df77ef521cf98057d0028ee983f1.jpg",
      earnings: "$2,450",
      students: 245,
      description: "For a local business...",
      status: "Published",
      lastUpdated: "Today",
      lessons: 24,
      duration: "18.5 hours",
    },
    // Add more initial courses if needed
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCourseAdded = (newCourse) => {
    // Update courses list; note: newCourse structure depends on the external API response.
    setCourses((prevCourses) => [
      ...prevCourses,
      { ...newCourse, id: prevCourses.length + 1 },
    ]);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-800">Your Courses</h1>
          <p className="text-gray-600 mt-2">
            Manage and track your course performance
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-primary-100 text-white rounded-lg flex items-center transition-colors"
        >
          <FaPlusCircle className="mr-2" />
          Create New Course
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="relative">
              <img
                src={course.image || "/placeholder.jpg"}
                alt={course.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{course.title}</h3>
                <p className="text-sm text-gray-600">
                  {course.students} students enrolled
                </p>
                <div className="flex justify-between items-center border-t pt-4">
                  <Link
                    href={`coursemanage/${course.id}`}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center transition-colors"
                  >
                    <FaEdit className="mr-2" />
                    Manage Course
                  </Link>
                  <span className="text-sm text-gray-500">
                    {course.lastUpdated}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Course Modal */}
      {isModalOpen && (
        <CourseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCourseAdded={handleCourseAdded}
        />
      )}
    </div>
  );
}

export default Courses;
