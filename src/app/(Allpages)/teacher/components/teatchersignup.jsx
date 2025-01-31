"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";

const SignupTeacherForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathname = usePathname();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);

    console.log(formData);

    // Client-side validation
    if (formData.get("Password") !== formData.get("ConfirmPassword")) {
      alert("Passwords do not match!");
      setIsSubmitting(false);
      return;
    }

    const cvFile = formData.get("Cv");
    if (cvFile.type !== "application/pdf") {
      alert("Please upload a PDF file for your CV");
      setIsSubmitting(false);
      return;
    }

    try {
      // Create ordered FormData with correct field sequence
      const orderedFormData = new FormData();
      orderedFormData.append("UserName", formData.get("UserName"));
      orderedFormData.append("FullName", formData.get("FullName"));
      orderedFormData.append("Password", formData.get("Password"));
      orderedFormData.append(
        "ConfirmPassword",
        formData.get("ConfirmPassword")
      );
      orderedFormData.append("Email", formData.get("Email"));
      orderedFormData.append("Specialty", formData.get("Specialty"));
      orderedFormData.append("Cv", cvFile);
      orderedFormData.append("PhoneNumber", formData.get("PhoneNumber"));
      orderedFormData.append("DateOfBirth", formData.get("DateOfBirth"));
      orderedFormData.append("Gender", formData.get("Gender"));
      console.log(orderedFormData);

      const response = await axios.post(
        "/api/register-instructor",
        orderedFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Registration successful!");
      e.target.reset();
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error.response?.data?.message || error.message;
      alert(`Registration failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
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
          encType="multipart/form-data"
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
                  placeholder="username"
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
                  placeholder="Full Name"
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
                  placeholder="Password"
                  required
                  minLength="8"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-11 text-gray-400 hover:text-primary"
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
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
                  placeholder="Confirm Password"
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
                  pattern="\+[0-9]{11,15}"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-100"
                  placeholder="+201234567890"
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
                  placeholder="IT"
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
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary-100 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Join Educator Network"}
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
