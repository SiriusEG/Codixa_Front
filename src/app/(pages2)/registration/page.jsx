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
      <div className="flex flex-row">
        <div className="w-1/2 relative">
          {" "}
          <Image
            src="/learnmore.jpg"
            alt="teacher"
            width={800}
            height={500}
            style={{ width: "100%", height: "100vh" }}
          />
          <div className="absolute inset-0 bg-black opacity-30" />
          <div className=" absolute bottom-[50%] left-5">
            <h1 className="text-[60px] text-white font-bold text-left pt-10">
              <span className="text-[70px] text-primary">C</span>odixa
            </h1>
            <p className="text-white text-center text-xl font-semibold pt-[20px] relative right-4 ">
              <FaQuoteLeft className="text-black  mb-2 " />
              Learning is not a destination, but a continuous journey. The more
              you seek to improve, the further you discover you can go. Growth
              happens when you embrace the process, not just the goal.
              <FaQuoteRight className="text-black right-0 absolute" />
            </p>
          </div>
        </div>
        <div className=" flex flex-col items-center justify-center w-1/2 ">
          {/* upper area  */}
          <div className="flex flex-col items-center">
            <h4 className="text-2xl font-semibold text-center  mb-5">
              Welcome to{" "}
              <span className="text-3xl ml-2 font-bold text-center text-primary">
                Codixa
              </span>
            </h4>
            <LoginRegisterSwitch
              setIsLogin={setIsLogin}
              isLogin={isLogin}
              toggleSwitch={toggleSwitch}
            />
            <p className=" font-thin text-left mt-10 w-96 text-sm text-secondary">
              {" "}
              Continuous learning through micro-courses or certifications keeps
              skills relevant, driving talent development in rapidly evolving
              industries.{" "}
            </p>
            {/* Form area */}
            <FormComponent isLogin={isLogin} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
