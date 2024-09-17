import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavListCS from "./NavListCS";
import CollapseCS from "./CollapseCS";
import Search from "./Search";

export default function Header() {
  return (
    <header className="bg-white">
      <div className=" flex h-auto lg:max-w-fit w-full items-center gap-x-1 sm:gap-x-6 px-4 py-2 sm:px-6 lg:px-8 flex-wrap mx-auto">
        {/* logo */}
        <Link className=" text-primary mr-auto" href="/">
          <Image src="/logo.gif" alt="logo" width={50} height={50} />
        </Link>

        <div className="hidden lg:flex flex-1 justify-center gap-6 items-center ">
          {/* search bar */}
          <Search />

          {/* navList */}
          <NavListCS />
        </div>

        {/* login and signup */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            className=" rounded-md text-sm bg-gray-100 px-3  py-2.5  font-semibold text-primary transition hover:text-hoverPrimary "
            href="/registration"
          >
            Login
          </Link>

          <Link
            className="block rounded-md text-base bg-primary px-3  py-2.5  font-semibold text-white transition hover:bg-hoverPrimary"
            href="/registration"
          >
            Create free account
          </Link>
        </div>

        {/* collapse */}
        <CollapseCS />
      </div>
    </header>
  );
}
