"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "swiper/css";
import UnCompletedCourseCard from "./1-first-sec/UnCompletedCourseCard";
import CourseCard from "./CourseCard";

// Object for mapping component types
const cardsName = {
  unCompletedCourse: UnCompletedCourseCard,
  normalCourse: CourseCard,
};

function SwiperCS({ slides, componentName, hideBtns = false }) {
  const swiperRef = useRef(null); // Reference to control Swiper slides
  const [isBeginning, setIsBeginning] = useState(true); // Check if at beginning of slides
  const [isEnd, setIsEnd] = useState(false); // Check if at end of slides

  const SelectedComponent = cardsName[componentName];

  return (
    <div className="relative w-full mx-auto">
      {/* Swiper slider */}
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={1} // Default for small screens
        spaceBetween={20}
        loop={false}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
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
      <div
        style={{ display: hideBtns ? "none" : "flex" }}
        className=" justify-end items-center gap-4 mt-4 me-4 md:me-10"
      >
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className={`px-2 py-2  text-white rounded-[0.200rem] transition ${
            isBeginning
              ? "bg-gray-400 cursor-not-allowed"
              : "hover:bg-primary-100 bg-primary"
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
              : "hover:bg-primary-100 bg-primary"
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
