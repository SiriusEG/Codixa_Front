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
        className="block rounded bg-gray-100 transition-all delay-500 p-3 text-gray-600 hover:text-gray-600/75 lg:hidden"
      >
        <FaX className={!isOpen ? "hidden" : ""} />
        <IoMenu className={isOpen ? "hidden" : ""} />
      </button>

      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-start z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        >
          <div
            className={`relative bg-white p-7 rounded-lg shadow-lg w-11/12 sm:w-3/4 lg:w-1/2 transform transition-transform duration-500 ${
              isOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }`}
          >
            {/* Close Icon */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-xl text-white bg-red-800 p-2 rounded-full"
            >
              <FaX />
            </button>

            {/* Modal Content */}
            <div className="flex flex-col gap-4 items-center">
              <Search />
              <NavListCS />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CollapseCS;
