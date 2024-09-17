"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle your password reset logic here
    console.log("Password reset request sent for:", email);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col h-screen sm:flex-row justify-center items-center">
        {/* Left Image Section */}
        <div className="sm:w-1/2 w-full hidden sm:block relative">
          <Image
            src="/learnmore.jpg"
            alt="teacher"
            width={800}
            height={500}
            className="h-[40%] w-full sm:h-screen"
          />
          <div className="absolute inset-0 bg-black opacity-30" />
          <div className="absolute bottom-[50%] left-5">
            <h1 className="text-[60px] text-white font-bold text-left pt-10">
              <span className="text-[70px] text-primary">C</span>odixa
            </h1>
            <p className="text-white backdrop-blur-sm text-center text-xl font-semibold p-[25px] rounded-md relative right-4">
              <FaQuoteLeft className="text-black mb-2" />
              Learning is not a destination, but a continuous journey. The more
              you seek to improve, the further you discover you can go. Growth
              happens when you embrace the process, not just the goal.
              <FaQuoteRight className="text-black right-0 absolute" />
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex flex-col items-center justify-center w-1/2 sm:mt-0 bg-white sm:bg-transparent px-4 py-3 sm:p-1 z-10 sm:z-0 rounded-3xl sm:rounded-none box-content">
          <div className="flex w-96 flex-col items-left justify-center">
            <div className="flex flex-col justify-start">
              <h4 className="text-2xl text-left text-primary mb-10">
                Reset Your Password
              </h4>
              <p
                style={{ textAlign: "justify" }}
                className="font-[300] w-full text-[.7rem] text-secondary"
              >
                Continuous learning through micro-courses or certifications
                keeps skills relevant, driving talent development in rapidly
                evolving industries.
              </p>
            </div>

            {/* Forget Password Form */}
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-sm flex flex-col items-start bg-white pt-6 pb-8 mb-4 rounded-3xl"
            >
              <div className="mb-4 w-full">
                <label
                  className="block font-semibold text-black text-sm mb-2"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="appearance-none border border-primary rounded-3xl w-full py-3 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="flex items-center justify-center">
                <button
                  className="bg-primary text-white font-semibold py-2 px-5 rounded-3xl hover:bg-primary-dark focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Reset Password
                </button>
              </div>

              <div className="mt-6 text-center">
                <a href="/registration" className="text-sm text-cyan-600">
                  Back to Login
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
