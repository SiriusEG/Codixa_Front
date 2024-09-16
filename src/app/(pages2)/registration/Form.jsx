"use client";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const FormComponent = ({ setIsLogin, isLogin }) => {
  const [show, setshow] = useState(false);
  const showpass = () => {
    setshow(!show);
  };
  const [show2, setshow2] = useState(false);
  const showpass2 = () => {
    setshow2(!show2);
  };
  const haveaccount = () => {
    setIsLogin(true);
  };

  return (
    <div className="w-full max-w-sm">
      {isLogin ? (
        // Login form
        <form className=" rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-3">
            <label
              className="block font-semibold ml-[-10px] text-black text-sm  mb-3"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className=" appearance-none placeholder:opacity-50 border border-primary py-3 rounded-3xl w-full px-3 mb-3 text-gray-900 leading-tight outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder=" username"
            />
          </div>
          <div className="mb-3 relative">
            <label
              className="block font-semibold ml-[-10px] text-black text-sm  mb-3"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className=" appearance-none placeholder:opacity-50 border border-primary py-3 rounded-3xl w-full px-3 mb-3 text-gray-900 leading-tight outline-none focus:shadow-outline"
              id="password"
              type={show2 ? "text" : "password"}
              placeholder="password"
            />
            {show2 ? (
              <FaEye
                className="right-[1%] absolute w-[49px] bottom-[31%] cursor-pointer"
                onClick={showpass2}
              />
            ) : (
              <FaEyeSlash
                className="right-[1%] absolute w-[49px] bottom-[31%] cursor-pointer"
                onClick={showpass2}
              />
            )}
          </div>
          <div className=" flex  justify-between mt-[-5%] mb-7">
            <div className=" flex items-center gap-1">
              <input type="checkbox" name="Remember" id="remember" />
              <label
                className="text-gray-600 text-[10px] hover:text-gray-900"
                htmlFor="remember"
              >
                Remember me!{" "}
              </label>
            </div>
            <a href="#" className="  text-[10px]  text-cyan-600">
              {" "}
              Forget Password?
            </a>
          </div>
          <div className="flex  justify-center">
            <button
              className="bg-primary  w-[150px]  text-white font-semibold py-2 px-5 rounded-3xl outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      ) : (
        // Registration form
        <form className="bg-white  rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block font-semibold ml-[-10px] text-black text-sm  mb-3"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className=" appearance-none placeholder:opacity-50 border border-primary py-3 rounded-3xl w-full px-3 mb-3 text-gray-900 leading-tight outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label
              className="block font-semibold ml-[-10px] text-black text-sm  mb-3"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className=" appearance-none placeholder:opacity-50 border border-primary py-3 rounded-3xl w-full px-3 mb-3 text-gray-900 leading-tight outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4 relative">
            <label
              className="block font-semibold ml-[-10px] text-black text-sm  mb-3"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className=" appearance-none placeholder:opacity-50 border border-primary py-3 rounded-3xl w-full px-3 mb-3 text-gray-900 leading-tight outline-none focus:shadow-outline"
              type={show ? "text" : "password"}
              placeholder="password"
            />
            {show ? (
              <FaEye
                className="right-[1%] absolute w-[49px] bottom-[31%] cursor-pointer"
                onClick={showpass}
              />
            ) : (
              <FaEyeSlash
                className="right-[1%] absolute w-[49px] bottom-[31%] cursor-pointer"
                onClick={showpass}
              />
            )}
          </div>
          {/* confirm pass */}
          {/* <div className="mb-6">
            <label
              className="block font-semibold ml-[-10px] text-black text-sm  mb-3"
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <input
              className="shadow appearance-none placeholder:opacity-50 border border-primary py-3 rounded-3xl w-full px-4 mb-3 text-gray-900 leading-tight outline-none focus:shadow-outline"
              id="confirm-password"
              type="password"
              placeholder="password"
            />
          </div> */}
          <div className=" flex justify-between mt-[-5%] mb-7">
            <div className=" flex items-center gap-1">
              <input type="checkbox" name="Remember" id="remember" />
              <label
                className="text-gray-600 text-[10px] hover:text-gray-900"
                htmlFor="remember"
              >
                Remember me!{" "}
              </label>
            </div>
            <a
              className="  text-[10px]   cursor-pointer text-cyan-600"
              onClick={haveaccount}
            >
              {" "}
              have Account?
            </a>
          </div>
          <div className="flex  justify-center">
            <button
              className="bg-primary  w-[150px]  text-white font-semibold py-2 px-5 rounded-3xl outline-none focus:shadow-outline"
              type="submit"
            >
              Rgister
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default FormComponent;
