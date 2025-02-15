"use client";
import { useState, useEffect } from "react";
import { FaPlusCircle, FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import CourseModal from "./components/CourseModal";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, [currentPage]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`/api/courses?page=${currentPage}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch courses");
      const data = await response.json();
      setCourses(data.courses);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching courses:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirmation = (courseId) => {
    setCourseToDelete(courseId);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    setShowDeleteModal(false);
    if (!courseToDelete) return;

    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch("/api/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId: courseToDelete }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete course");
      }

      await fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
      alert(error.message);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-800">Your Courses</h1>
          <p className="text-gray-600 mt-2">Manage and track your courses</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-primary-100 text-white rounded-lg flex items-center hover:bg-primary-110 transition-colors"
        >
          <FaPlusCircle className="mr-2" />
          Create New Course
        </button>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center my-6 gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 rounded ${
              currentPage === page
                ? "bg-primary-100 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader size={50} color={"#4A90E2"} />
        </div>
      ) : (
        /* Courses Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.courseId}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="relative">
                <img
                  src={
                    course.courseCardPhotoPath
                      ? `https://codixa.runasp.net/${course.courseCardPhotoPath.replace(
                          /\\/g,
                          "/"
                        )}`
                      : "/placeholder.jpg"
                  }
                  alt={course.courseName}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{course.courseName}</h3>
                  <p className="text-sm text-gray-600">{course.categoryName}</p>
                  <p className="text-gray-700 text-sm mt-2 line-clamp-3">
                    {course.courseDescription}
                  </p>
                  <p
                    className={`mt-2 text-sm font-semibold ${
                      course.isPublished ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {course.isPublished ? "Published" : "Unpublished"}
                  </p>
                  <div className="flex justify-between items-center border-t pt-4 mt-4 gap-2">
                    <Link
                      href={`/coursemanage/${course.courseId}`}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center transition-colors flex-1 justify-center"
                    >
                      <FaEdit className="mr-2" />
                      Manage
                    </Link>
                    <button
                      onClick={() => handleDeleteConfirmation(course.courseId)}
                      className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg flex items-center transition-colors flex-1 justify-center"
                    >
                      <FaTrash className="mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && courses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No courses found</p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Delete Course</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this course? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Course Creation/Edit Modal */}
      {isModalOpen && (
        <CourseModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            fetchCourses();
          }}
        />
      )}
    </div>
  );
}

export default Courses;
