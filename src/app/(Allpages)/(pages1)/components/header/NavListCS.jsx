"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavListCS() {
  const pathname = usePathname();

  const navList = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Courses",
      path: "/courses",
    },
    {
      name: "About Us",
      path: "/aboutus",
    },

    {
      name: "Contact",
      path: "/contactus",
    },
  ];

  return (
    <nav aria-label="Global" className="w-full">
      <ul className="flex w-full items-center gap-4 text-md flex-col justify-center sm:flex-row">
        {navList.map((item) => (
          <li
            key={item.path}
            className={`transition text-center rounded-lg w-full sm:w-[6rem] hover:bg-slate-200 ${
              pathname === item.path ? "bg-slate-200" : "text-gray-400"
            }`}
          >
            <Link
              href={item.path}
              className={`transition font-semibold text-sm py-2 px-1 inline-block w-full hover:text-primary ${
                pathname === item.path ? "text-primary" : "text-gray-500"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
