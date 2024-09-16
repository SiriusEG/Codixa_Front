import React from "react";
import { CiSearch } from "react-icons/ci";
import NavListCS from "./NavListCS";
import { IoMenu } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import CollapseCS from './CollapseCS';
import Logo from "../logo";

export default function Header() {
  return (
    <header className="bg-white">
      <div className="mx-auto flex h-24 w-screen items-center gap-6 px-4 sm:px-6 lg:px-8 ">
        <Logo width={50} height={50} className="size-12" />

        {/* search bar */}
        <div className="relative">
          <CiSearch className="text-gray-500 absolute top-2.5 grid start-2 place-content-center text-xl" />
          <input
            type="text"
            id="Search"
            placeholder="Want to learn?"
            className="rounded-lg border-2 ps-7 pe-28  py-1.5 hover:border-primary focus:border-primary outline-none"
          />

        <div>

        <div className="absolute w-24 text-primary inset-y-1 right-1">
           <select className="appearance-none block w-full bg-primary/20 rounded-md py-1 px-3 pr-8 outline-none">
              <option>Frontend</option>
               <option>Backend</option>
               <option>ui/ux</option>
          </select>
  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 ">
    <FaChevronDown className="w-4 h-4"  />
  </div>
</div>
  </div>
        </div>

        {/* navList */}
        <div className="flex flex-1 items-center justify-end md:justify-between">
        <NavListCS  />
        
    {/* collapse */}
      <CollapseCS>
      <button
        className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 lg:hidden"
      >
        <span className="sr-only">Toggle menu</span>
        <IoMenu />
      </button>
      </CollapseCS>
  </div>
      </div>
    </header>
  );
}
