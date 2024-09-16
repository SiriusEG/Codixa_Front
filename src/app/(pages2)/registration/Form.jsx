"use client";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const FormComponent = ({ setIsLogin, isLogin }) => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const showPass = () => setShow(!show);
  const showPass2 = () => setShow2(!show2);

  const haveAccount = () => {
    setIsLogin(true);
  };

  return (
    <div className="w-full max-w-sm transition-all duration-700 ease-out transform">
      {/* Animate transition between forms */}
      <div
        className={`${
          isLogin ? "opacity-100 " : "opacity-0 "
        } transition-all duration-300 ease-in-out`}
      >
        {/* Login Form */}
        {isLogin && (
          <form className="rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-3">
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
                placeholder="Username"
              />
            </div>
            <div className="mb-3 relative">
              <label
                className="block font-semibold text-black text-sm mb-3"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="appearance-none placeholder-opacity-50 border border-primary py-3 rounded-3xl w-full px-3 mb-3 text-gray-900 leading-tight outline-none focus:shadow-outline"
                id="password"
                type={show2 ? "text" : "password"}
                placeholder="Password"
              />
              {show2 ? (
                <FaEye
                  className="right-[1%] absolute w-[49px] bottom-[31%] cursor-pointer"
                  onClick={showPass2}
                />
              ) : (
                <FaEyeSlash
                  className="right-[1%] absolute w-[49px] bottom-[31%] cursor-pointer"
                  onClick={showPass2}
                />
              )}
            </div>
            <div className="flex justify-between mt-[-5%] mb-7">
              <div className="flex items-center gap-1">
                <input type="checkbox" name="Remember" id="remember" />
                <label
                  className="text-gray-600 text-[10px] hover:text-gray-900"
                  htmlFor="remember"
                >
                  Remember me!
                </label>
              </div>
              <a href="#" className="text-[10px] text-cyan-600">
                Forget Password?
              </a>
            </div>
            <div className="flex justify-center">
              <button
                className="bg-primary w-[150px] text-white font-semibold py-2 px-5 rounded-3xl outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Registration Form */}
      <div
        className={`${
          !isLogin ? "opacity-100 translate-y-0" : "opacity-0 "
        } transition-all duration-300 ease-in-out`}
      >
        {!isLogin && (
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
                  className="text-gray-600 text-[10px] hover:text-gray-900"
                  htmlFor="remember"
                >
                  Remember me!
                </label>
              </div>
              <a
                className="text-[10px] cursor-pointer text-cyan-600"
                onClick={haveAccount}
              >
                Have an account?
              </a>
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
        )}
      </div>
    </div>
  );
};

export default FormComponent;
