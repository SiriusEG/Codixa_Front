"use client";
import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../../../lib/hooks";
import { useRouter } from "next/navigation";
import { logout } from "../../../../../lib/reducers/auth/logInSlice";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { MdOutlineSchool } from "react-icons/md";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("my-courses");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { userInfo } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const response = await fetch(
          "https://codixa.runasp.net/api/Student/GetStudentCourses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch courses");
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [router]);

  const handleLogout = async () => {
    await dispatch(logout());
    router.replace("/");
    setTimeout(() => {
      window.location.href = "/";
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">My Learning</h1>

              {/* Navigation Tabs */}
              <div className="ml-8 flex space-x-8">
                {[
                  {
                    id: "my-courses",
                    name: "My Courses",
                    icon: <MdOutlineSchool className="inline-block mr-2" />,
                  },
                  {
                    id: "profile-settings",
                    name: "Profile Settings",
                    icon: <AiOutlineSetting className="inline-block mr-2" />,
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-1 pt-1 text-sm font-medium flex items-center ${
                      activeTab === tab.id
                        ? "text-primary border-b-2 border-primary"
                        : "text-gray-500 hover:text-primary-100"
                    }`}
                  >
                    {tab.icon}
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Profile Section */}
            <div className="flex items-center space-x-4">
              {/* <div className="flex items-center">
                <img
                  src={
                    userInfo?.image ||
                    "https://i.pinimg.com/236x/a4/67/5a/a4675ada509320a63ebc2172c352ef9f.jpg"
                  }
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              </div> */}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Content Area */}
        <div className="bg-white rounded-lg shadow p-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-8">{error}</div>
          ) : (
            activeTab === "my-courses" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <div
                    key={course.courseId}
                    className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
                  >
                    <div className="bg-gray-200 h-40 rounded-lg mb-4 overflow-hidden">
                      {course.coursePhoto && (
                        <img
                          src={`https://codixa.runasp.net/${course.coursePhoto.replace(
                            /\\/g,
                            "/"
                          )}`}
                          alt={course.courseName}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <h3 className="font-semibold mb-2">{course.courseName}</h3>
                    <p className="text-gray-600 text-sm">
                      {course.courseDescription}
                    </p>
                    <div className="mt-4 text-sm text-gray-500">
                      Category: {course.categoryName}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {activeTab === "profile-settings" && (
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-semibold mb-6">Profile Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={userInfo?.name || ""}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={userInfo?.email || ""}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    readOnly
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
