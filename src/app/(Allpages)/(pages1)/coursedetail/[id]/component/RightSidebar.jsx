"use client";
import Image from "next/image";
import {
  FaCamera,
  FaFileAlt,
  FaFacebook,
  FaLinkedin,
  FaTelegramPlane,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import Link from "next/link";

export const RightSidebar = ({
  courseData,
  handleEnroll,
  isLoading,
  enrollmentMessage,
  userInfo,
}) => (
  <div className="lg:ml-8 lg:w-96 lg:sticky lg:top-8 lg:self-start">
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="relative aspect-video">
        <Image
          src={courseData?.image || "/logo.gif"}
          alt={courseData?.courseName}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="p-6 space-y-6">
        <button
          onClick={handleEnroll}
          disabled={
            isLoading ||
            userInfo?.role === "Instructor" ||
            userInfo?.role === "Admin"
          }
          className={`w-full py-4 bg-gradient-to-r from-primary to-primary-100 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-md transform hover:scale-[1.01] ${
            isLoading ||
            userInfo?.role === "Instructor" ||
            userInfo?.role === "Admin"
              ? "cursor-not-allowed"
              : ""
          }`}
        >
          {isLoading ? "Enrolling..." : "Enroll Now"}
        </button>

        {enrollmentMessage && (
          <p
            className={`text-sm font-medium ${
              enrollmentMessage.includes("success") ||
              enrollmentMessage.includes("Sent Successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {enrollmentMessage}
          </p>
        )}

        <div className="space-y-4 py-6 border-y border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Course Includes</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FaCamera className="text-primary text-xl flex-shrink-0" />
              <span className="text-gray-700">Access on all devices</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FaFileAlt className="text-primary text-xl flex-shrink-0" />
              <span className="text-gray-700">Completion Certificate</span>
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
          <h3 className="text-xl font-bold text-gray-900">Share This Course</h3>
          <div className="flex gap-3 flex-wrap">
            {[
              { icon: FaFacebook, color: "hover:bg-blue-200" },
              { icon: FaYoutube, color: "hover:bg-red-200" },
              { icon: FaInstagram, color: "hover:bg-pink-200" },
              { icon: FaTelegramPlane, color: "hover:bg-blue-200" },
              { icon: FaLinkedin, color: "hover:bg-blue-200 " },
            ].map((SocialIcon, index) => (
              <Link
                key={index}
                href="#"
                className={`p-3 rounded-full transition-colors ${SocialIcon.color} text-gray-700`}
              >
                <SocialIcon.icon className="w-6 h-6" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
