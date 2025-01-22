"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Switch = () => {
  const pathname = usePathname();

  return (
    <div className="relative flex items-center justify-between bg-primary rounded-[14px] w-[24rem] h-15 p-2 cursor-pointer">
      {/* Moving background */}
      <div
        className={`absolute h-12 w-[calc(50%-0.5rem)] rounded-[12px] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] bg-primary-100 ${
          pathname === "/user/login" ? "translate-x-0" : "translate-x-full"
        }`}
      />

      {/* Login Link */}
      <Link
        href="/user/login"
        className={`z-10 flex-1 text-center text-base font-semibold transition-colors py-3 ${
          pathname === "/user/login" ? "text-white" : "text-white/80"
        }`}
      >
        Login
      </Link>

      {/* Register Link */}
      <Link
        href="/user/signup"
        className={`z-10 flex-1 text-center text-base font-semibold transition-colors py-3 ${
          pathname === "/user/login" ? "text-white/80" : "text-white"
        }`}
      >
        Register
      </Link>
    </div>
  );
};

export default Switch;
