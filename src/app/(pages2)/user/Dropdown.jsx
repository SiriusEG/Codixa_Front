"use client";
import React, { useState } from "react";
import { FaBars, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

const DropdownMenu = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible((prevState) => !prevState);
  };

  return (
    <div className="relative">
      {/* Menu Icon */}
      <button
        onClick={toggleDropdown}
        className="p-2 text-2xl text-gray-600 flex justify-between items-center hover:text-primary focus:outline-none"
      >
        <FaBars />
      </button>

      {/* Dropdown Menu */}
      {isDropdownVisible && (
        <div className="absolute top-[2.5rem] left-[-10rem] bg-white shadow-lg rounded-lg py-2 w-64 z-50">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-primary/25 hover:text-primary transition rounded-t-lg"
          >
            <FaArrowLeft />
            Back To Home
          </Link>
          <Link
            href="/teacher"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-primary/25 hover:text-primary transition rounded-b-lg"
          >
            Sign Up as Teacher?
          </Link>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
