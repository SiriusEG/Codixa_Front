"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "swiper/css";
import UnCompletedCourseCard from "./first-sec/UnCompletedCourseCard";

//the object of cards type
const cardsName = {
  unCompletedCourse: UnCompletedCourseCard,
};

function SwiperCS({ slides, componentName }) {
  const swiperRef = useRef(null); //catch the swiper to control the slide in buttons

  const [isBeginning, setIsBeginning] = useState(true); //check if the slider in the begging to disable the button
  const [isEnd, setIsEnd] = useState(false); //check if the slider in the end to disable the button

  const SelectedComponent = cardsName[componentName];

  return (
    <div className="relative w-full  mx-auto">
      {/* Swiper slider */}
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView="auto"
        spaceBetween={20}
        loop={false}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        direction="horizontal"
        onReachEnd={() => setIsEnd(true)}
        onReachBeginning={() => setIsBeginning(true)}
        className="!py-8 !px-3 md:!px-6"
      >
        {slides.map((element, index) => (
          <SwiperSlide key={index} className="!w-auto">
            {<SelectedComponent element={element} />}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Control buttons below the slider */}
      <div className="flex justify-end items-center gap-4 mt-4 me-4 md:me-10">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className={`px-2 py-2  text-white rounded-[0.200rem] transition ${
            isBeginning
              ? "bg-gray-400 cursor-not-allowed"
              : "hover:bg-hoverPrimary bg-primary"
          }`}
          disabled={isBeginning}
        >
          <FaAngleLeft />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className={`px-2 py-2  text-white rounded-[0.200rem] transition ${
            isEnd
              ? "bg-gray-400 cursor-not-allowed"
              : "hover:bg-hoverPrimary bg-primary"
          }`}
          disabled={isEnd}
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
}

export default SwiperCS;
