"use client";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

const DropdownMenu = () => {
  return (
    <div className="flex justify-between w-full px-4">
      <Link
        href="/"
        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-primary/10 hover:text-primary transition rounded-lg"
      >
        <FaArrowLeft />
        Back To Home
      </Link>
      <Link
        href="/teacher"
        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-primary/10 hover:text-primary transition rounded-lg"
      >
        Sign Up as Teacher?
      </Link>
    </div>
  );
};

export default DropdownMenu;
