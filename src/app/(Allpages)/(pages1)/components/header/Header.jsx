import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavListCS from "./NavListCS";
import CollapseCS from "./CollapseCS";
import UserLogMenuCS from "./UserLogMenuCS";

export default function Header() {
  return (
    <header className=" bg-white">
      <div className="flex h-auto w-full items-center justify-between flex-wrap px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-primary">
            <span className="sr-only">Home</span>
            <Image
              src="/logo.gif"
              alt="logo"
              width={70}
              height={70}
              className="sm:w-20" // Adjust size for small screens
            />
          </Link>
        </div>

        {/* Navigation Links (Hidden on Small Screens) */}
        <div className="hidden sm:flex justify-center gap-6 items-center ">
          {" "}
          {/* flex-1 */}
          <NavListCS />
        </div>

        {/* User Menu & Hamburger Menu for Small Screens */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* User Log Menu */}
          <UserLogMenuCS />

          {/* Hamburger Menu (Visible on Small Screens) */}
          <div className=" sm:hidden">
            <CollapseCS />
          </div>
        </div>
      </div>
    </header>
  );
}
