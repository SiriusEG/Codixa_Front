import React from "react";
import { FaChartColumn, FaRocket } from "react-icons/fa6";
import { TbLamp } from "react-icons/tb";

export default function page() {
  const cardsData = [
    {
      id: 1,
      icon: FaRocket,
      title: "Lorem Ipsum is simply",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab voluptas excepturi quam deleniti nihil? Odit!",
    },
    {
      id: 2,
      icon: TbLamp,
      title: "Lorem Ipsum is simply",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab voluptas excepturi quam deleniti nihil? Odit!",
    },
    {
      id: 3,
      icon: FaChartColumn,
      title: "Lorem Ipsum is simply",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab voluptas excepturi quam deleniti nihil? Odit!",
    },
  ];

  return (
    <div className="flex flex-col justify-around items-center text-center min-h-screen px-16 py-10 lg:pb-20 lg:pt-4 gap-6">
      <h2 className="font-semibold text-4xl text-primary">WHO WE ARE</h2>

      <p className="text-2xl font-normal text-gray-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea tempore
        laudantium at, assumenda velit itaque rem, labore adipisci facere ipsa
        hic distinctio dolorem, sequi nemo.
      </p>

      <div className="flex flex-wrap w-full justify-around items-center text-gray-100 gap-y-12 gap-x-8">
        {cardsData.map((card) => (
          <div
            key={card.id}
            className="w-88 min-h-[23rem] flex flex-col rounded-3xl py-10 px-8 bg-primary gap-8 items-center justify-between relative after:absolute after:bottom-0 after:bg-gray-300 after:h-3 after:w-4/5 after:rounded-3xl"
          >
            <card.icon className="text-4xl" />
            <h4 className="font-extrabold text-2xl">{card.title}</h4>
            <p className="font-normal text-lg">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
