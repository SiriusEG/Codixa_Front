"use client";

import React, { useState } from "react";
import NavListCS from "./NavListCS";
import Search from "./Search";
import { IoMenu } from "react-icons/io5";
import { FaX } from "react-icons/fa6";

function CollapseCS() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="block rounded bg-gray-100 transition-all delay-500 p-3 text-gray-600 hover:text-gray-600/75 custom2:hidden"
      >
        <FaX className={!isOpen ? "hidden" : ""} />
        <IoMenu className={isOpen ? "hidden" : ""} />
      </button>

      {
        <div
          className={`fixed top-0 left-0 w-full flex justify-center items-start z-50 transition-all duration-700 ${
            isOpen ? "max-h-screen" : "max-h-0"
          }  `}
        >
          <div
            className={`relative bg-white rounded-lg shadow-lg w-11/12 sm:w-3/4 lg:w-1/2 transform transition-all duration-700 overflow-hidden ${
              isOpen ? "max-h-96 p-7" : "max-h-0 p-0"
            }`}
          >
            {/* Close Icon */}
            <button
              onClick={() => setIsOpen(false)}
              className={`absolute top-2 right-2 text-xl ${
                isOpen ? "block" : "hidden"
              } text-white bg-red-800 p-2 rounded-full`}
            >
              <FaX />
            </button>

            {/* Modal Content */}
            <div
              className={`flex flex-col gap-4 items-center transition-opacity duration-500 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              <Search />
              <NavListCS />
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default CollapseCS;
