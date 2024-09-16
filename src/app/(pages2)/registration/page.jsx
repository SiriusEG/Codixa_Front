"use client";
import React, { useState } from "react";
import LoginRegisterSwitch from "./switch";
import FormComponent from "./Form";
import Image from "next/image";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

function Page() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleSwitch = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div className="  w-full ">
      <div className="flex flex-col sm:flex-row  items-center">
        <div className="sm:w-1/2 w-full relative">
          {" "}
          <Image
            src="/learnmore.jpg"
            alt="teacher"
            width={800}
            height={500}
            className=" h-[40%] w-full sm:h-screen"
          />
          <div className="absolute inset-0 bg-black opacity-30" />
          <div className=" absolute bottom-[50%] left-5">
            <h1 className="text-[60px] text-white font-bold text-left pt-10">
              <span className="text-[70px] text-primary">C</span>odixa
            </h1>
            <p className="text-white backdrop-blur-sm text-center text-xl font-semibold p-[25px] rounded-md relative right-4 ">
              <FaQuoteLeft className="text-black  mb-2 " />
              Learning is not a destination, but a continuous journey. The more
              you seek to improve, the further you discover you can go. Growth
              happens when you embrace the process, not just the goal.
              <FaQuoteRight className="text-black right-0 absolute" />
            </p>
          </div>
        </div>
        <div className=" flex flex-col items-center justify-center w-1/2 mt-[-100px] sm:mt-0 bg-white sm:bg-transparent px-4 py-3 sm:p-1 z-10 sm:z-0 rounded-3xl sm:rounded-none ">
          {/* upper area  */}
          <div className="flex w-96 flex-col items-center justify-center">
            <h4 className="text-xl text-center  mb-5">
              Welcome to{" "}
              <span className="text-2xl font-bold text-center text-primary">
                Codixa
              </span>
            </h4>
            <LoginRegisterSwitch
              setIsLogin={setIsLogin}
              isLogin={isLogin}
              toggleSwitch={toggleSwitch}
            />
            <p
              style={{ marginLeft: "-15px" }}
              className=" font-[300] text-left mt-10 w-[80%]  text-[11px] text-secondary"
            >
              {" "}
              Continuous learning through micro-courses or certifications keeps
              skills relevant, driving talent development in rapidly evolving
              industries.{" "}
            </p>
            {/* Form area */}
            <FormComponent setIsLogin={setIsLogin} isLogin={isLogin} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
// margin-top: -100px;
//     background-color: #fff;
//     z-index: 10;
//     border-radius: 26px;
//     padding: 12px;
