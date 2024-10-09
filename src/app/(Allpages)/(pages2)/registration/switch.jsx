"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Switch = () => {
  const pathname = usePathname();

  return (
    <div className="relative flex items-center justify-center bg-primary rounded-full w-72 h-12 p-1 cursor-pointer">
      {/* Background bar that moves */}
      <div
        className={`absolute h-9 w-[45%] rounded-full transition-transform duration-500 ease-in-out bg-secondary ${
          pathname === "/registration/login"
            ? "-translate-x-1/2"
            : "translate-x-1/2"
        }`}
      />

      {/* Login Text */}
      <Link
        href={"login"}
        className={`z-10 w-1/2 text-center text-white ${
          pathname === "/registration/login" ? "" : "opacity-70"
        }`}
      >
        Login
      </Link>

      {/* Register Text */}
      <Link
        href={"signup"}
        className={`z-10 w-1/2 text-center text-white ${
          pathname === "/registration/login" ? "opacity-70" : ""
        }`}
      >
        Register
      </Link>
    </div>
  );
};

export default Switch;
