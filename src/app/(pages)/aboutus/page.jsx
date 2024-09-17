import React from "react";
import { FaChartColumn, FaRocket } from "react-icons/fa6";
import { TbLamp } from "react-icons/tb";

function page() {
  return (
    <div className="flex flex-col justify-around items-center text-center min-h-screen px-16 py-10 lg:py-20 gap-16">
      <h2 className="font-semibold text-4xl text-primary">WHO WE ARE</h2>

      <p className="text-2xl font-normal text-gray-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea tempore
        laudantium at, assumenda velit itaque rem, labore adipisci facere ipsa
        hic distinctio dolorem, sequi nemo.
      </p>

      <div className="flex flex-wrap w-full justify-around items-center text-gray-100 gap-y-12 gap-x-8">
        <div className="w-[356px] min-h-[443px] flex flex-col rounded-[30px] py-10 px-8 bg-primary gap-16 items-center justify-center relative">
          <FaRocket className="text-4xl" />

          <h4 className="font-extrabold text-2xl">Lorem Ipsum is simply</h4>

          <p className="font-normal text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab voluptas
            excepturi quam deleniti nihil? Odit!
          </p>

          <div className="absolute h-3 w-[80%] rounded-[30px]  bg-gray-300 bottom-0 "></div>
        </div>

        <div className="w-[356px] min-h-[443px] flex flex-col rounded-[30px] py-10 px-8 bg-primary gap-16 items-center justify-center relative">
          <TbLamp className="text-4xl" />

          <h4 className="font-extrabold text-2xl">Lorem Ipsum is simply</h4>

          <p className="font-normal text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab voluptas
            excepturi quam deleniti nihil? Odit!
          </p>

          <div className="absolute h-3 w-[80%] rounded-[30px]  bg-gray-300 bottom-0 "></div>
        </div>

        <div className="w-[356px] min-h-[443px] flex flex-col rounded-[30px] py-10 px-8 bg-primary gap-16 items-center justify-center relative">
          <FaChartColumn className="text-4xl" />

          <h4 className="font-extrabold text-2xl">Lorem Ipsum is simply</h4>

          <p className="font-normal text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab voluptas
            excepturi quam deleniti nihil? Odit!
          </p>

          <div className="absolute h-3 w-[80%] rounded-[30px]  bg-gray-300 bottom-0 "></div>
        </div>
      </div>
    </div>
  );
}

export default page;
