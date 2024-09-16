"use client";

import React, { useState } from "react";
import NavListCS from "./NavListCS";
import Search from "./Search";
import { IoMenu } from "react-icons/io5";
import { FaX } from "react-icons/fa6";

function CollapseCS() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="block rounded bg-gray-100 p-3 text-gray-600 hover:text-gray-600/75 lg:hidden"
      >
        <FaX className={!isOpen && "hidden"} />
        <IoMenu className={isOpen && "hidden"} />
      </button>

      <div
        className={`lg:hidden flex gap-4 items-center flex-col duration-300 basis-full ${
          isOpen ? "h-auto py-4" : "h-0 py-0"
        } overflow-hidden`}
      >
        <NavListCS />

        <Search />
      </div>
    </>
  );
}

export default CollapseCS;
