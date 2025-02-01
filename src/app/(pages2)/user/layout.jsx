import React from "react";
import Switch from "./switch";

const layout = ({ children }) => {
  return (
    <div className="relative">
      <div className="  flex flex-col overflow-hidden items-center justify-center  mt-0 bg-white sm:bg-transparent px-4 py-3 sm:p-1 z-10 sm:z-0 rounded-3xl sm:rounded-none ">
        {/* upper area  */}
        <div className="  flex w-full  flex-col items-center justify-center gap-6">
          <h4 className="text-[2rem] text-center">
            Welcome to{" "}
            <span className="text-[2.5rem] font-bold text-center text-primary">
              Codixa
            </span>
          </h4>
          <Switch />
          <p
            style={{ marginLeft: "-15px", textAlign: "justify" }}
            className=" font-[300] text-left mt-4 w-[80%]  text-[.7rem] text-secondary"
          >
            {" "}
            Continuous learning through micro-courses or certifications keeps
            skills relevant, driving talent development in rapidly evolving
            industries.{" "}
          </p>
          {/* Form area */}
          <div className="w-full transition-all duration-700 ease-out transform">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;
