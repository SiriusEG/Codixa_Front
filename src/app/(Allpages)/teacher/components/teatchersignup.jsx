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
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [passwordError, setPasswordError] = useState("");
  const pathname = usePathname();

  const validatePassword = (password) => {
    const errors = [];
    if (!/[A-Z]/.test(password)) errors.push("one uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("one lowercase letter");
    if (!/[0-9]/.test(password)) errors.push("one number");
    if (!/[!@#$%^&*]/.test(password)) errors.push("one special character (!@#$%^&*)");
    if (password.length < 8) errors.push("minimum 8 characters");
    
    return errors;
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    const errors = validatePassword(password);
    if (errors.length > 0) {
      setPasswordError(`Password must contain: ${errors.join(", ")}`);
    } else {
      setPasswordError("");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    const password = e.target.Password.value;
    const confirmPassword = e.target.ConfirmPassword.value;
    const cvFile = e.target.Cv.files[0];
    const photoFile = e.target.Photo.files[0];

    // Client-side validations
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setIsSubmitting(false);
      return;
    }

    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      setError(`Password must contain: ${passwordErrors.join(", ")}`);
      setIsSubmitting(false);
      return;
    }

    if (!cvFile) {
      setError("CV file is required");
      setIsSubmitting(false);
      return;
    }

    if (cvFile.type !== "application/pdf") {
      setError("Please upload a PDF file for your CV");
      setIsSubmitting(false);
      return;
    }

    // Construct form data in specified order
    formData.append("UserName", e.target.UserName.value);
    formData.append("FullName", e.target.FullName.value);
    formData.append("Password", password);
    formData.append("ConfirmPassword", confirmPassword);
    formData.append("Email", e.target.Email.value);
    formData.append("Specialty", e.target.Specialty.value);
    formData.append("Cv", cvFile);
    formData.append("PhoneNumber", e.target.PhoneNumber.value);
    formData.append("DateOfBirth", e.target.DateOfBirth.value);
    formData.append("Gender", e.target.Gender.value);
    if (photoFile) {
      formData.append("Photo", photoFile);
    }

    try {
      const response = await axios.post(
        "/api/auth/REGESTinsturctor",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data?.success) {
        setSuccess("Registration successful! Please check your email for verification.");
        e.target.reset();
        setImagePreview(null);
      } else {
        throw new Error(response.data?.error || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError(
        error.response?.data?.error?.message ||
        error.response?.data?.error ||
        error.message ||
        "Connection error. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${pathname === "/teacher" ? "opacity-100" : "opacity-0"} h-screen overflow-hidden flex`}>
      {/* Image Section */}
      <div className="hidden lg:block w-1/2 h-full relative">
        <img
          src="https://i.pinimg.com/736x/2c/aa/4f/2caa4ff3f1616fe5ff03b01a05e81cb3.jpg"
          alt="Teaching Inspiration"
          className="w-full h-full object-cover shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)]"
        />
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 h-full bg-gray-50 px-8 flex flex-col relative overflow-y-auto">
        <Link href="/" className="sticky top-4 left-4 inline-flex items-center text-primary hover:text-primary-100 transition-colors">
          <IoArrowBack className="mr-1" />
          <span className="text-sm">Home</span>
        </Link>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto w-full py-8">
          <div className=" top-0 bg-gray-50 pt-4 pb-6 z-10">
            <h1 className="text-3xl font-bold text-primary text-center">
              Educator Registration
            </h1>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                ⚠️ {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mt-4 px-4 py-1 bg-green-50 text-green-700 rounded-lg border border-green-200">
                ✔️ {success}
              </div>
            )}

            {/* Image Preview */}
            {imagePreview && (
              <div className="flex justify-center mt-4">
                <div className="relative w-24 h-24">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary">
                    <img
                      src={imagePreview}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6 mt-6">
            {/* Username and Full Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username *
                </label>
                <input
                  type="text"
                  name="UserName"
                  className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-100"
                  placeholder="username"
                  required
                  minLength="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="FullName"
                  className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-100"
                  placeholder="fullname"
                  required
                />
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="Password"
                  className={`w-full px-4 py-1 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-100 pr-12 
                    ${passwordError ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="••••••••"
                  required
                  minLength="8"
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-400 hover:text-primary transition-colors"
                >
                  {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                </button>
                {passwordError && (
                  <p className="mt-1 text-xs text-red-600">
                    {passwordError}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="ConfirmPassword"
                  className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-100"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Email and Specialty */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="Email"
                  className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-100"
                  placeholder="examle@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specialty *
                </label>
                <input
                  type="text"
                  name="Specialty"
                  className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-100"
                  placeholder="your specailty"
                  required
                />
              </div>
            </div>

            {/* CV Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload CV (PDF only) *
              </label>
              <input
                type="file"
                name="Cv"
                accept=".pdf"
                className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30 transition-colors cursor-pointer"
                required
              />
            </div>

            {/* Phone Number and Date of Birth */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="text"
                  name="PhoneNumber"
                  pattern="\+?\d{10,15}"
                  className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-100"
                  placeholder="+201234567890"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="DateOfBirth"
                  className="w-full cursor-pointer px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-100"
                  required
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender *
              </label>
              <select
                name="Gender"
                className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-100 bg-white"
                required
              >
                <option value="true">Male</option>
                <option value="false">Female</option>
              </select>
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Photo
              </label>
              <input
                type="file"
                name="Photo"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30 transition-colors cursor-pointer"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary-100 text-white py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Join Educator Network"
              )}
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <Link
                href="/user/login"
                className="text-primary hover:text-primary-100 font-semibold transition-colors"
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
