"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  FaCamera,
  FaFacebook,
  FaFileAlt,
  FaInstagram,
  FaLinkedin,
  FaTelegramPlane,
  FaYoutube,
  FaCheck,
  FaUser,
  FaTag,
} from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io5";
import { BsGraphUp } from "react-icons/bs";
import Link from "next/link";
import { useParams } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import dynamic from "next/dynamic";

const CourseDetailsPage = () => {
  const params = useParams();
  const [courseData, setCourseData] = useState(null);
  const [activeTab, setActiveTab] = useState("Overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrollmentMessage, setEnrollmentMessage] = useState(""); // Line Added
  const [isLoading, setIsLoading] = useState(false); // Line Added

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(
          `https://codixa.runasp.net/api/Courses/CourseDetails/${params.id}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Map API response fields to match your code's expected structure
        const mappedData = {
          title: data.courseName || "No Title",
          description: data.courseDescription || "No Description",
          image: data.courseCardPhotoPath
            ? `https://codixa.runasp.net/${data.courseCardPhotoPath.replace(
                /\\/g,
                "/"
              )}`
            : "/logo.gif",
          categoryName: data.categoryName || "Uncategorized",
          instructorName: data.insrtuctorName || "Unknown Instructor",
          sectionCount: data.sectionCount || 0,
          totalRate: data.totalRate || 0,
          features: ["Feature 1", "Feature 2", "Feature 3"], // Example static features
          comments: [], // Example static comments
        };

        setCourseData(mappedData);
      } catch (error) {
        console.error("Error fetching course details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) fetchCourseDetails();
  }, [params.id]);

  const handleEnroll = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      setEnrollmentMessage("You need to sign in first.");
      return;
    }

    setIsLoading(true);
    setEnrollmentMessage("");

    try {
      const url = `https://codixa.runasp.net/api/Student/StudentRequestToEnrollCourse/${params.id}`;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      console.log("Request URL:", url);
      console.log("Request Headers:", headers);

      const response = await fetch(url, {
        method: "POST",
        headers,
      });

      console.log("Response Status:", response.status);

      // Check if the response is successful (status code 2xx)
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        let errorMessage;

        // Parse the error message from the response
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.message || "Failed to enroll.";
        } else {
          errorMessage = await response.text(); // Fallback to plain text
        }

        throw new Error(errorMessage); // Throw the error to be caught in the catch block
      }

      // Handle successful response
      const contentType = response.headers.get("content-type");
      let result;

      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        result = { message: await response.text() };
      }

      setEnrollmentMessage(result.message || "Request Sent Successfully");
    } catch (error) {
      console.error("Error enrolling in course:", error);
      setEnrollmentMessage(error.message || "Failed to enroll.");
    } finally {
      setIsLoading(false);
    }
  };
  if (loading) {
    return (
      <section className="container mx-auto px-4 py-8 lg:py-12 flex flex-col lg:flex-row gap-8">
        {/* Skeleton Loader for Main Content */}
        <div className="flex-1 lg:max-w-3xl">
          <Skeleton height={40} width={200} className="mb-8" />
          <Skeleton count={5} className="mb-6" />
          <div className="space-y-4">
            <Skeleton height={30} width={150} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} height={80} />
              ))}
            </div>
          </div>
        </div>

        {/* Skeleton Loader for Sidebar */}
        <div className="lg:w-96">
          <Skeleton height={200} className="mb-6" />
          <div className="space-y-4">
            <Skeleton height={50} />
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} height={60} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-500 p-4">
        <h2 className="text-2xl font-bold mb-4">Error Loading Course</h2>
        <p className="text-center">{error}</p>
        <Link
          href="/courses"
          className="mt-4 px-6 py-3 bg-gradient-to-r from-primary to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity shadow-md"
        >
          Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-[400px] w-full overflow-hidden bg-gray-900"
        style={{
          backgroundImage: `url(${courseData?.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            {courseData?.title}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            {courseData?.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-gray-300">
            <div className="flex items-center gap-2">
              <FaUser className="text-xl text-primary" />
              <span>Instructor: {courseData?.instructorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaTag className="text-xl text-primary" />
              <span>Category: {courseData?.categoryName}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="container mx-auto px-4 py-8 lg:py-12 flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 lg:max-w-3xl">
          <div className="flex gap-4 mb-8 border-b border-gray-200">
            {["Overview", "Comments"].map((tab) => (
              <button
                key={tab}
                className={`pb-4 px-1 relative ${
                  activeTab === tab
                    ? "text-primary font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-primary"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "Overview" && (
            <div className="space-y-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                {courseData?.title}
              </h1>

              <div className="prose max-w-none text-gray-600 leading-relaxed">
                {courseData?.description}
              </div>

              {courseData?.features?.length > 0 && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Course Features
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {courseData.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start p-4 bg-gray-50 rounded-lg"
                      >
                        <FaCheck className="text-primary mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "Comments" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Student Feedback
              </h2>
              {courseData?.comments?.length > 0 ? (
                courseData.comments.map((comment, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                        {comment.author[0]}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {comment.author}
                        </h3>
                        <p className="text-sm text-gray-500">Student</p>
                      </div>
                    </div>
                    <p className="text-gray-600 pl-[52px]">{comment.text}</p>
                  </div>
                ))
              ) : (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-gray-500">
                  No comments yet. Be the first to share your experience!
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar Section */}
        <div className="lg:w-96 lg:sticky lg:top-8 h-fit">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="relative aspect-video">
              <Image
                src={courseData?.image || "/logo.gif"}
                alt={courseData?.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="p-6 space-y-6">
              <button
                onClick={handleEnroll} // Line Changed
                disabled={isLoading} // Line Added
                className={`w-full py-4 bg-gradient-to-r from-primary to-blue-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-md transform hover:scale-[1.01] ${
                  isLoading ? "opacity-50 cursor-not-allowed" : "" // Line Added
                }`}
              >
                {isLoading ? "Enrolling..." : "Enroll Now"} {/* Line Changed */}
              </button>

              {enrollmentMessage && (
                <p
                  className={`text-sm font-medium ${
                    enrollmentMessage.includes("success") ||
                    enrollmentMessage.includes("Sent Successfully")
                      ? "text-green-600"
                      : "text-red-600"
                  }`} // Line Changed
                >
                  {enrollmentMessage} {/* Line Changed */}
                </p>
              )}

              <div className="space-y-4 py-6 border-y border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">
                  Course Includes
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FaCamera className="text-primary text-xl flex-shrink-0" />
                    <span className="text-gray-700">Access on all devices</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FaFileAlt className="text-primary text-xl flex-shrink-0" />
                    <span className="text-gray-700">
                      Completion Certificate
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <BsGraphUp className="text-primary text-xl flex-shrink-0" />
                    <span className="text-gray-700">
                      {courseData?.sectionCount || 0} Sections
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Course Details
                </h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex items-center gap-2">
                    <FaUser className="text-primary" />
                    <span>Instructor: {courseData?.instructorName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaTag className="text-primary" />
                    <span>Category: {courseData?.categoryName}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Share This Course
                </h3>
                <div className="flex gap-3 flex-wrap">
                  {[
                    { icon: IoLogoTwitter, color: "hover:bg-blue-100" },
                    { icon: FaFacebook, color: "hover:bg-blue-100" },
                    { icon: FaYoutube, color: "hover:bg-red-100" },
                    { icon: FaInstagram, color: "hover:bg-pink-100" },
                    { icon: FaTelegramPlane, color: "hover:bg-blue-100" },
                    { icon: FaLinkedin, color: "hover:bg-blue-100" },
                  ].map((SocialIcon, index) => (
                    <Link
                      key={index}
                      href="#"
                      className={`p-3 rounded-full transition-colors ${SocialIcon.color} text-gray-700 hover:text-primary`}
                    >
                      <SocialIcon.icon className="w-6 h-6" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default dynamic(() => Promise.resolve(CourseDetailsPage), {
  ssr: false,
});
