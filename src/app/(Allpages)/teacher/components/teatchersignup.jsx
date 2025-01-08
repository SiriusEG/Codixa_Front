"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

const SignupTeacherForm = () => {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  const showPass = () => setShow(!show);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      age: formData.get("age"),
      specialty: formData.get("specialty"),
      cv: formData.get("cv"),
      courses: formData.get("courses"),
    };

    // Send the data to the admin's API for approval
    fetch("/api/admin/approve-teacher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          alert("Your application has been submitted for approval.");
        } else {
          alert("Failed to submit application.");
        }
      })
      .catch((error) => {
        console.error("Error submitting application:", error);
      });
  };

  return (
    <div
      className={`${
        pathname === "/teacher" ? "opacity-100 translate-y-0" : "opacity-0"
      } transition-all duration-300 ease-in-out p-6`}
    >
      {/* Return to Home Button */}
      <Link href="/">
        <div className="flex items-center text-primary font-semibold text-lg cursor-pointer hover:text-cyan-600 mb-6">
          <IoArrowBack className="mr-2" />
          Return to Home
        </div>
      </Link>

      <form
        className="rounded-lg shadow-lg p-8 bg-white max-w-xl mx-auto border border-gray-300"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center text-primary mb-6">
          welcome Teacher!
        </h2>

        <div className="mb-4">
          <label
            className="block font-semibold text-gray-700 text-sm mb-3"
            htmlFor="username"
          >
            Teacher Name
          </label>
          <input
            className="appearance-none border border-gray-300 rounded-full w-full px-4 py-3 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            id="username"
            name="username"
            type="text"
            placeholder="Enter your Name"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block font-semibold text-gray-700 text-sm mb-3"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="appearance-none border border-gray-300 rounded-full w-full px-4 py-3 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4 relative">
          <label
            className="block font-semibold text-gray-700 text-sm mb-3"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="appearance-none border border-gray-300 rounded-full w-full px-4 py-3 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            id="password"
            name="password"
            type={show ? "text" : "password"}
            placeholder="Password"
            required
          />
          {show ? (
            <FaEye
              className="absolute right-4 top-[2.9rem] text-gray-500 cursor-pointer"
              onClick={showPass}
            />
          ) : (
            <FaEyeSlash
              className="absolute right-4 top-[2.9rem] text-gray-500 cursor-pointer"
              onClick={showPass}
            />
          )}
        </div>

        <div className="mb-4">
          <label
            className="block font-semibold text-gray-700 text-sm mb-3"
            htmlFor="age"
          >
            Age
          </label>
          <input
            className="appearance-none border border-gray-300 rounded-full w-full px-4 py-3 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            id="age"
            name="age"
            type="number"
            placeholder="Enter your age"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block font-semibold text-gray-700 text-sm mb-3"
            htmlFor="specialty"
          >
            Specialty
          </label>
          <input
            className="appearance-none border border-gray-300 rounded-full w-full px-4 py-3 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            id="specialty"
            name="specialty"
            type="text"
            placeholder="Enter your specialty"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block font-semibold text-gray-700 text-sm mb-3"
            htmlFor="cv"
          >
            Upload CV
          </label>
          <input
            className="appearance-none border border-gray-300 rounded-full w-full px-4 py-3 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            id="cv"
            name="cv"
            type="file"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block font-semibold text-gray-700 text-sm mb-3"
            htmlFor="courses"
          >
            Courses
          </label>
          <textarea
            className="appearance-none border border-gray-300 rounded-lg w-full px-4 py-3 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            id="courses"
            name="courses"
            placeholder="List the courses you can teach"
            rows="4"
            required
          />
        </div>

        <div className="flex justify-center items-center flex-col space-y-4 mt-6">
          <button
            className="bg-primary hover:bg-primary-100 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300"
            type="submit"
          >
            Send Request
          </button>
          <Link
            href="/user/login"
            className="text-[1rem] font-semibold cursor-pointer text-primary hover:underline"
          >
            Have an account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignupTeacherForm;
