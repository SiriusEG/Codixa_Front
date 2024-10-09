import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavListCS from "./NavListCS";
import CollapseCS from "./CollapseCS";
import Search from "./Search";
import UserLogMenuCS from "./UserLogMenuCS";

export default function Header() {
  return (
    <header className="bg-white ">
      <div className="flex h-auto w-full items-center justify-between sm:justify-around lg:justify-between sm:gap-4 gap-x-2 flex-wrap px-4 py-2 sm:px-6 lg:px-8">
        {" "}
        {/* lg:max-w-fit */}
        {/* logo */}
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
        {/* search and nav */}
        <div className="hidden custom2:flex justify-center gap-6 items-center ">
          {" "}
          {/* flex-1 */}
          <Search />
          <NavListCS />
        </div>
        {/* login and sign up */}
        <div className="flex items-center gap-2 sm:gap-4">
          <UserLogMenuCS />
          <CollapseCS />
        </div>
      </div>
    </header>
  );
}
