"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

const SignupTeacherForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const pathname = usePathname();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const teacherData = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      password: formData.get("password"),
      age: formData.get("age"),
      specialty: formData.get("specialty"),
      experience: formData.get("experience"),
      cv: formData.get("cv"),
      courses: formData.get("courses"),
    };

    console.log(teacherData);
  };

  return (
    <div
      className={`${
        pathname === "/teacher" ? "opacity-100" : "opacity-0"
      } h-screen overflow-hidden flex`}
    >
      {/* Image Section */}
      <div className="hidden lg:block w-1/2 h-full relative">
        <img
          src="https://i.pinimg.com/736x/2c/aa/4f/2caa4ff3f1616fe5ff03b01a05e81cb3.jpg"
          alt="Teaching Inspiration"
          className="w-full h-full object-cover shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)]"
        />
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 h-full bg-gray-50 p-8 flex flex-col justify-center">
        <Link
          href="/"
          className="inline-flex items-center text-primary hover:text-primary-100 "
        >
          <IoArrowBack className="mr-2" />
          Return Home
        </Link>

        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto flex flex-col justify-center h-full"
        >
          <h1 className="text-3xl font-bold text-primary mb-8 text-center">
            Educator Registration
          </h1>

          <div className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-100"
                  placeholder="Dr. Ahmed"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-100"
                  placeholder="ahmed@university.edu"
                  required
                />
              </div>
            </div>

            {/* Security Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Set a Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-100 pr-12"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-4 text-gray-400 hover:text-primary"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience *
                </label>
                <input
                  type="number"
                  name="experience"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-100"
                  placeholder="5"
                  min="1"
                  required
                />
              </div>
            </div>

            {/* Professional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age *
                </label>
                <input
                  type="number"
                  name="age"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-100"
                  placeholder="35"
                  min="21"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialty Field *
                </label>
                <input
                  type="text"
                  name="specialty"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-100"
                  placeholder="Computer Science"
                  required
                />
              </div>
            </div>

            {/* Documents */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload CV (PDF only) *
              </label>
              <input
                type="file"
                name="cv"
                accept=".pdf"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30"
                required
              />
            </div>

            {/* Teaching Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Courses You Can Teach *
              </label>
              <textarea
                name="courses"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-100"
                rows="3"
                placeholder="List courses separated by commas (e.g., Mathematics, Physics)"
                required
              ></textarea>
              <p className="text-center text-sm text-gray-600 mt-2">
                Already have an account?{" "}
                <Link
                  href="/user/login"
                  className="text-primary hover:text-primary-100 font-semibold"
                >
                  Sign In
                </Link>
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-100 mb-2 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Join Educator Network
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupTeacherForm;
