"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
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

  const validateForm = (formData) => {
    const password = formData.get('password');
    const passwordErrors = validatePassword(password);
    
    if (passwordErrors.length > 0) {
      return `Password must contain: ${passwordErrors.join(", ")}`;
    }
    
    if (formData.get('password') !== formData.get('confirmPassword')) {
      return "Passwords do not match!";
    }
    if (!/^\+?\d{10,15}$/.test(formData.get('phoneNumber'))) {
      return "Invalid phone number format (10-15 digits with optional + prefix)";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    
    formData.append('userName', e.target.username.value.trim());
    formData.append('fullName', e.target.fullName.value.trim());
    formData.append('password', e.target.password.value);
    formData.append('confirmPassword', e.target.confirmPassword.value);
    formData.append('email', e.target.email.value.trim());
    formData.append('phoneNumber', e.target.phoneNumber.value.trim());
    formData.append('dateOfBirth', e.target.dateOfBirth.value);
    formData.append('gender', e.target.gender.value === "Male");
    
    if (e.target.Photo.files[0]) {
      formData.append('Photo', e.target.Photo.files[0]);
    }

    const validationError = validateForm(formData);
    if (validationError) {
      setError(validationError);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register-student", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess("Registration successful! You can now login to your account.");
        e.target.reset();
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setError(result.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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

  return (
    <div className={`${pathname === "/user/signup" ? "opacity-100" : "opacity-0"} px-4`}>
      {success && (
        <div className="p-4 mb-4 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
          {success}
        </div>
      )}
      
      {error && (
        <div className="p-4 mb-4 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
          {error}
        </div>
      )}

      {imagePreview && (
        <div className="flex justify-center mb-4">
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

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 px-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username *
            </label>
            <input
              name="username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              type="text"
              required
              minLength="3"
            />
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              name="fullName"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              type="text"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              name="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              type="email"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              name="phoneNumber"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              type="tel"
              placeholder="+201012345678"
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth *
            </label>
            <input
              name="dateOfBirth"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              type="date"
              required
              max={new Date().toISOString().split("T")[0]}
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender *
            </label>
            <select
              name="gender"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Password field with live validation */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <input
              name="password"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary pr-12 
                ${passwordError ? 'border-red-500' : 'border-gray-300'}`}
              type={showPassword ? "text" : "password"}
              required
              minLength="8"
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-11 text-gray-500 hover:text-primary"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {passwordError && (
              <p className="mt-1 text-xs text-red-600">
                {passwordError}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password *
            </label>
            <input
              name="confirmPassword"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              type="password"
              required
            />
          </div>

          {/* Modified Photo input field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Photo
            </label>
            <input
              name="Photo"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <p className="mt-1 text-xs text-gray-500">
              Choose a profile picture to display
            </p>
          </div>
        </div>

        <div className="space-y-4 mt-6">
          <button
            className="w-full bg-primary hover:bg-primary-100 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
            type="submit"
            disabled={isSubmitting || passwordError}
          >
            {isSubmitting ? "Registering..." : "Create Account"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/user/login" className="text-primary hover:text-primary-100 font-semibold">
              Login here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
