"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function NavListCS() {
  const pathname = usePathname();

  return (
    <nav aria-label="Global">
      <ul className="flex items-center gap-6 text-sm flex-col lg:flex-row">
        <li>
          <Link
            href="/"
            className={`${
              pathname === "/" ? "text-primary" : "text-gray-500"
            } transition hover:text-secondary font-semibold `}
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            href="/courses"
            className={`${
              pathname === "/courses" ? "text-primary" : "text-gray-500"
            } transition hover:text-secondary font-semibold `}
          >
            Courses
          </Link>
        </li>

        <li>
          <Link
            href="/aboutus"
            className={`${
              pathname === "/aboutus" ? "text-primary" : "text-gray-500"
            } transition hover:text-secondary font-semibold `}
          >
            About us
          </Link>
        </li>

        <li>
          <Link
            href="/blog"
            className={`${
              pathname === "/blog" ? "text-primary" : "text-gray-500"
            } transition hover:text-secondary font-semibold `}
          >
            Blog
          </Link>
        </li>

        <li>
          <Link
            href="/contactus"
            className={`${
              pathname === "/contactus" ? "text-primary" : "text-gray-500"
            } transition hover:text-secondary font-semibold `}
          >
            Contact us
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavListCS;
