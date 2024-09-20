"use client";
import React, { useState } from "react";
import LoginRegisterSwitch from "./switch";
import FormComponent from "./Form";
import Image from "next/image";
import { FaArrowLeft, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import Link from "next/link";

function Page() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleSwitch = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div className="  w-full ">
      <div className="flex flex-col sm:flex-row h-screen justify-center  items-center">
        <div className="sm:w-1/2 w-full relative hidden sm:block">
          {" "}
          <Image
            src="/learnmore.jpg"
            alt="teacher"
            width={800}
            height={500}
            className=" h-2/5 w-full sm:h-screen"
          />
          <div className="absolute inset-0 bg-black opacity-30" />
          <div className=" absolute bottom-1/2 left-5">
            <h1 className="text-6xl text-white font-bold text-left pt-10">
              <span className="text-7xl text-primary">C</span>odixa
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
        <div className=" flex flex-col items-center justify-center w-11/12 sm:w-1/2  mt-0 bg-white sm:bg-transparent px-4 py-3 sm:p-1 z-10 sm:z-0 rounded-3xl sm:rounded-none ">
          <Link href='/' type="button" className="flex items-center gap-2 self-start mx-4 text-base font-medium transition duration-300 hover:text-primary hover:bg-primary/25 py-2 px-4 rounded-2xl"><FaArrowLeft />Back To Home</Link>
          {/* upper area  */}
          <div className="flex w-full sm:w-96 flex-col items-center justify-center gap-6">
            <h4 className="text-xl text-center">
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
              style={{ marginLeft: "-15px", textAlign: "justify" }}
              className=" font-[300] text-left mt-10 w-[80%]  text-[.7rem] text-secondary"
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
