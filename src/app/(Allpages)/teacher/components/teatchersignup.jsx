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
      UserName: formData.get("UserName"),
      FullName: formData.get("FullName"),
      Password: formData.get("Password"),
      ConfirmPassword: formData.get("ConfirmPassword"),
      Email: formData.get("Email"),
      Specialty: formData.get("Specialty"),
      Cv: formData.get("Cv"),
      PhoneNumber: formData.get("PhoneNumber"),
      DateOfBirth: formData.get("DateOfBirth"),
      Gender: formData.get("Gender"),
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
          className="inline-flex items-center text-primary hover:text-primary-100"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  UserName *
                </label>
                <input
                  type="text"
                  name="UserName"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-100"
                  placeholder=" user name for sign in"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="FullName"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-100"
                  placeholder=" full name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-100 pr-12"
                  placeholder="password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3  top-11 text-[1.2rem] text-gray-400 hover:text-primary"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="ConfirmPassword"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-100"
                  placeholder="password confirm"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-100"
                  placeholder="ex@mail.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="PhoneNumber"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-100"
                  placeholder="+123456"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="DateOfBirth"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-100"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <select
                  name="Gender"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-100"
                  required
                >
                  <option value="true">Male</option>
                  <option value="false">Female</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialty *
                </label>
                <input
                  type="text"
                  name="Specialty"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-100"
                  placeholder="it"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload CV (PDF only) *
                </label>
                <input
                  type="file"
                  name="Cv"
                  accept=".pdf"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-100 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Join Educator Network
            </button>

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
        </form>
      </div>
    </div>
  );
};

export default SignupTeacherForm;
