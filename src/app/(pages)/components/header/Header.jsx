import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavListCS from "./NavListCS";
import CollapseCS from "./CollapseCS";
import Search from "./Search";

export default function Header() {
  return (
    <header className="bg-white px-4 py-3 sm:px-14 sm:py-4">
      <div className="flex h-auto w-full items-center justify-between sm:justify-around lg:justify-center gap-x-2 sm:gap-x-6 flex-wrap">
        {/* logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-primary">
            <span className="sr-only">Home</span>
            <Image
              src="/logo.gif"
              alt="logo"
              width={70}
              height={70}
              className="sm:w-[6rem] sm:h-[6rem]" // Adjust size for small screens
            />
          </Link>
        </div>

        {/* search and nav */}
        <div className="hidden lg:flex justify-center gap-5 items-center">
          <Search />
          <NavListCS />
        </div>

        {/* login and signup */}
        <div className="flex items-center gap-2">
          <Link
            className="rounded-md text-sm bg-gray-100 px-3 py-2 font-semibold text-primary transition hover:text-hoverPrimary"
            href="/registration"
          >
            Login
          </Link>
          <Link
            className="block rounded-md text-base bg-primary px-3 py-2 font-semibold text-white transition hover:bg-hoverPrimary"
            href="/registration"
          >
            Create free account
          </Link>
          <CollapseCS />
        </div>
      </div>
    </header>
  );
}
