import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";

function Search() {
  return (
    <div className="relative">
      <CiSearch className="text-gray-500 absolute top-2.5 grid start-2 place-content-center text-xl" />
      <input
        type="text"
        id="Search"
        placeholder="Want to learn?"
        className="rounded-lg border-2 ps-7 w-[100%] xl:w-auto pe-28  py-1.5 hover:border-primary focus:border-primary outline-none"
      />

      <div>
        <div className="absolute w-24 text-primary inset-y-1 right-1">
          <select className="appearance-none block w-full bg-primary/20 rounded-md py-1 px-3 pr-8 outline-none">
            <option>Frontend</option>
            <option>Backend</option>
            <option>ui/ux</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 ">
            <FaChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
