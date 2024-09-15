"use client";
import React, { useState } from "react";
import LoginRegisterSwitch from "./switch";
import FormComponent from "./Form";

function Page() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleSwitch = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div className=" grid place-content-center py-[50px]">
      <div className="flex flex-row">
        <div>
          {" "}
          <img src="/learn-light.jpg" alt="teacher" width={550} height={500} />
        </div>
        <div className=" flex flex-col items-center w-[700px] ">
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
