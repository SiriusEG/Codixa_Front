"use client";
import Link from "next/link";
import React, { useState } from "react";

const ForgotPassword = () => {
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
    <div className=" flex justify-center  ">
      <div className="flex w-96 flex-col items-left ">
        <div className="flex flex-col justify-start">
          <h4 className="text-2xl text-left text-primary mb-10">
            Reset Your Password
          </h4>
          <p
            style={{ textAlign: "justify" }}
            className="font-[300] w-full text-[.7rem] text-secondary"
          >
            Continuous learning through micro-courses or certifications keeps
            skills relevant, driving talent development in rapidly evolving
            industries.
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
            <Link href="/registration/login" className="text-sm text-cyan-600">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
