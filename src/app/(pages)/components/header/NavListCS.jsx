"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function NavListCS() {
  const pathname = usePathname();

  // Function to determine active class
  const getActiveClass = (path) =>
    pathname === path ? "text-primary bg-slate-200" : "text-gray-500";

  return (
    <nav aria-label="Global" className="w-full">
      <ul className="flex w-full items-center gap-4 text-md flex-col justify-center lg:w-[40rem] lg:flex-row">
        <li
          className={`transition text-center hover:text-hoverPrimary rounded-lg py-2 px-1 font-normal w-[100%] ${getActiveClass(
            "/"
          )}`}
        >
          <Link
            href="/"
            className={`transition  hover:text-hoverPrimary font-semibold py-2 px-1  w-[100%] ${
              pathname === "/" ? "text-primary" : "text-gray-500"
            }`}
          >
            Home
          </Link>
        </li>

        <li
          className={`transition text-center hover:text-hoverPrimary rounded-lg  py-2 px-1 font-semibold w-[100%] ${getActiveClass(
            "/courses"
          )}`}
        >
          <Link
            href="/courses"
            className={`transition hover:text-hoverPrimary font-semibold ${
              pathname === "/courses" ? "text-primary" : "text-gray-500"
            }`}
          >
            Courses
          </Link>
        </li>

        <li
          className={`transition text-center hover:text-hoverPrimary rounded-lg  py-2 px-1 font-semibold w-[100%] ${getActiveClass(
            "/aboutus"
          )}`}
        >
          <Link
            href="/aboutus"
            className={`transition lg:w-fit hover:text-hoverPrimary font-semibold ${
              pathname === "/aboutus" ? "text-primary" : "text-gray-500"
            }`}
          >
            About us
          </Link>
        </li>

        <li
          className={`transition text-center hover:text-hoverPrimary rounded-lg  py-2 px-1 font-semibold w-[100%] ${getActiveClass(
            "/blog"
          )}`}
        >
          <Link
            href="/blog"
            className={`transition hover:text-hoverPrimary font-semibold ${
              pathname === "/blog" ? "text-primary" : "text-gray-500"
            }`}
          >
            Blog
          </Link>
        </li>

        <li
          className={`transition text-center hover:text-hoverPrimary rounded-lg  py-2 px-1 font-semibold w-[100%] ${getActiveClass(
            "/contactus"
          )}`}
        >
          <Link
            href="/contactus"
            className={`transition hover:text-hoverPrimary font-semibold ${
              pathname === "/contactus" ? "text-primary" : "text-gray-500"
            }`}
          >
            Contact us
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavListCS;
