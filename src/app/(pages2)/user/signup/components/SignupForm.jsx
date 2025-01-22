"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignupForm = () => {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  const showPass = () => setShow(!show);

  return (
    <div
      className={`${
        pathname == "/user/signup" ? "opacity-100" : "opacity-0"
      } transition-all duration-300 ease-in-out p-8`}
    >
      <form className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-100"
              id="username"
              type="text"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-100"
              id="email"
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-100 pr-12"
              type={show ? "text" : "password"}
              placeholder="Create password"
            />
            <button
              type="button"
              onClick={showPass}
              className="absolute right-3 top-11 text-[1.2rem] text-gray-400 hover:text-primary"
            >
              {show ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="Remember"
              id="remember"
              className="w-4 h-4 border-gray-300 rounded focus:ring-primary"
            />
            <label
              className="text-sm text-gray-600 hover:text-gray-900"
              htmlFor="remember"
            >
              Remember me
            </label>
          </div>
          <Link
            href="/user/login"
            className="text-sm text-primary hover:text-primary-100"
          >
            Have an account?
          </Link>
        </div>

        <button
          className="w-full bg-primary hover:bg-primary-100 text-white py-3 rounded-lg font-semibold transition-colors"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
