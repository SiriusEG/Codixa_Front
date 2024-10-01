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
        pathname == "/registration/signup"
          ? "opacity-100 translate-y-0"
          : "opacity-0 "
      } transition-all duration-300 ease-in-out`}
    >
      <form className="rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block font-semibold text-black text-sm mb-3"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="appearance-none placeholder-opacity-50 border border-primary py-3 rounded-3xl w-full px-3 mb-3 text-gray-900 leading-tight outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-4">
          <label
            className="block font-semibold text-black text-sm mb-3"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="appearance-none placeholder-opacity-50 border border-primary py-3 rounded-3xl w-full px-3 mb-3 text-gray-900 leading-tight outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4 relative">
          <label
            className="block font-semibold text-black text-sm mb-3"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="appearance-none placeholder-opacity-50 border border-primary py-3 rounded-3xl w-full px-3 mb-3 text-gray-900 leading-tight outline-none focus:shadow-outline"
            type={show ? "text" : "password"}
            placeholder="Password"
          />
          {show ? (
            <FaEye
              className="right-[1%] absolute w-[49px] bottom-[31%] cursor-pointer"
              onClick={showPass}
            />
          ) : (
            <FaEyeSlash
              className="right-[1%] absolute w-[49px] bottom-[31%] cursor-pointer"
              onClick={showPass}
            />
          )}
        </div>
        <div className="flex justify-between mt-[-5%] mb-7">
          <div className="flex items-center gap-1">
            <input type="checkbox" name="Remember" id="remember" />
            <label
              className="text-gray-600 text-[.8rem] hover:text-gray-900"
              htmlFor="remember"
            >
              Remember me!
            </label>
          </div>
          <Link
            href="/registration/login"
            className="text-[.8rem] cursor-pointer text-cyan-600"
          >
            Have an account?
          </Link>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-primary w-[150px] text-white font-semibold py-2 px-5 rounded-3xl outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
