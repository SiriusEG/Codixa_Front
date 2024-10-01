import React from "react";
import Switch from "./Switch";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

const layout = ({ children }) => {
  return (
    <div className=" flex flex-col items-center justify-center w-11/12 sm:w-1/2  mt-0 bg-white sm:bg-transparent px-4 py-3 sm:p-1 z-10 sm:z-0 rounded-3xl sm:rounded-none ">
      <Link
        href="/"
        type="button"
        className="flex items-center gap-2 self-start mx-4 text-base font-medium transition duration-300 hover:text-primary hover:bg-primary/25 py-2 px-4 rounded-2xl"
      >
        <FaArrowLeft />
        Back To Home
      </Link>
      {/* upper area  */}
      <div className="flex w-full sm:w-96 flex-col items-center justify-center gap-6">
        <h4 className="text-xl text-center">
          Welcome to{" "}
          <span className="text-2xl font-bold text-center text-primary">
            Codixa
          </span>
        </h4>
        <Switch />
        <p
          style={{ marginLeft: "-15px", textAlign: "justify" }}
          className=" font-[300] text-left mt-10 w-[80%]  text-[.7rem] text-secondary"
        >
          {" "}
          Continuous learning through micro-courses or certifications keeps
          skills relevant, driving talent development in rapidly evolving
          industries.{" "}
        </p>
        {/* Form area */}
        <div className="w-full max-w-sm transition-all duration-700 ease-out transform">
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
