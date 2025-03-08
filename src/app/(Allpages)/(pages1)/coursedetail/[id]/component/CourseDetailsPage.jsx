"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useAppSelector } from "../../../../../../../lib/hooks";
import { RightSidebar } from "./RightSidebar";
import { CommentsSection } from "./CommentsSection";
import { CourseContent } from "./CourseContent";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaUser, FaTag, FaStar } from "react-icons/fa";
import Link from "next/link";

// Star Rating Component
const StarRating = ({ totalRate, totalCount }) => {
  const averageRating =
    totalCount > 0 ? (totalRate / totalCount).toFixed(1) : 0;

  return (
    <div className="flex items-center gap-2 mt-4">
      <div className="flex">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <FaStar
              key={i}
              className={`text-xl ${
                i < Math.floor(averageRating)
                  ? "text-yellow-500"
                  : "text-gray-400"
              }`}
            />
          ))}
      </div>
      <div className="text-sm text-gray-300">
        {averageRating} ({totalCount} reviews)
      </div>
    </div>
  );
};

// Main Component
const CourseDetailsPage = () => {
  const params = useParams();
  const [courseData, setCourseData] = useState(null);
  const [activeTab, setActiveTab] = useState("Overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrollmentMessage, setEnrollmentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo } = useAppSelector((state) => state.user);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(
          `https://codixa.runasp.net/api/Courses/CourseDetails/${params.id}`
        );

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        setCourseData({
          ...data,
          image: data.courseCardPhotoPath
            ? `https://codixa.runasp.net/${data.courseCardPhotoPath.replace(
                /\\/g,
                "/"
              )}`
            : "/logo.gif",
          totalCount: data.feedBacks?.length || 0,
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    params?.id && fetchCourseDetails();
  }, [params.id]);

  const handleEnroll = async () => {
    const token = localStorage.getItem("token");
    if (!token) return setEnrollmentMessage("You need to sign in first.");

    setIsLoading(true);
    setEnrollmentMessage("");

    try {
      const response = await fetch(
        `https://codixa.runasp.net/api/Student/StudentRequestToEnrollCourse/${params.id}`,
        { method: "POST", headers: { Authorization: `Bearer ${token}` } }
      );

      const contentType = response.headers.get("content-type");
      let errorMessage = "Failed to enroll";

      if (!response.ok) {
        if (contentType?.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          errorMessage = await response.text();
        }
        throw new Error(errorMessage);
      }

      setEnrollmentMessage("Request Sent Successfully");
    } catch (error) {
      console.error("Enrollment error:", error);
      setEnrollmentMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) return <SkeletonLoader />;
  if (error) return <ErrorComponent error={error} />;

  return (
    <>
      <HeroSection courseData={courseData} />

      <section className="container mx-auto px-4 py-8 lg:py-12 flex flex-col lg:flex-row lg:justify-around gap-8">
        <MainContent
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          courseData={courseData}
        />

        <RightSidebar
          courseData={courseData}
          handleEnroll={handleEnroll}
          isLoading={isLoading}
          enrollmentMessage={enrollmentMessage}
          userInfo={userInfo}
        />
      </section>
    </>
  );
};

const HeroSection = ({ courseData }) => (
  <section
    className="relative h-[400px] w-full overflow-hidden bg-gray-900"
    style={{
      backgroundImage: `url(${courseData?.image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-50" />
    <div className="container mx-auto px-4 py-16 relative z-10">
      <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
        {courseData?.courseName}
      </h1>
      <p className="text-lg text-gray-300 max-w-2xl mb-4">
        {courseData?.courseDescription}
      </p>
      <StarRating
        totalRate={courseData?.totalRate}
        totalCount={courseData?.totalCount}
      />
      <div className="mt-6 flex flex-wrap gap-4 text-gray-300">
        <div className="flex items-center gap-2">
          <FaUser className="text-xl text-primary" />
          <span>Instructor: {courseData?.insrtuctorName}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaTag className="text-xl text-primary" />
          <span>Category: {courseData?.categoryName}</span>
        </div>
      </div>
    </div>
  </section>
);

const MainContent = ({ activeTab, setActiveTab, courseData }) => {
  const params = useParams();

  return (
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
          <CourseContent sections={courseData?.sections} />
        </div>
      )}

      {activeTab === "Comments" && (
        <CommentsSection
          feedbacks={courseData.feedBacks}
          courseId={params.id}
        />
      )}
    </div>
  );
};

const SkeletonLoader = () => (
  <section className="container mx-auto px-4 py-8 lg:py-12 flex flex-col lg:flex-row gap-8">
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

const ErrorComponent = ({ error }) => (
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

export default dynamic(() => Promise.resolve(CourseDetailsPage), {
  ssr: false,
});
