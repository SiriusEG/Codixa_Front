"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const images = [
  "/imgs/study place.jpg",
  "/imgs/im2.jpg",
  "/imgs/im4.jpg",
  "/imgs/im2.jpg",
  "/imgs/im4.jpg",
  "/imgs/study place.jpg",
];

const text = ["UI", "React", "PHP", "JavaScript", "CSS", "PHP", "JavaScript"];

const SliderCOM = () => {
  const settings = {
    infinite: true,
    speed: 900,
    slidesToShow: 3, // Show 3 images at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
  };

  return (
    <div className="relative w-[100%] p-3 rounded-lg">
      <h3 className="text-primary font-bold text-2xl p-3 ml-2 mb-3">
        Reading Blog List
      </h3>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div
            key={index}
            style={{ outline: "none" }}
            className="relative flex w-[321.52px] flex-row justify-cente"
          >
            <Image
              src={image}
              alt={`Slide ${index}`}
              width={321.52}
              height={327}
              style={{ outline: "none", width: "321.52px", height: "327px" }}
              className=" rounded-2xl mx-auto " // Apply border-radius
            />
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white opacity-70  text-black py-3 px-[5rem] rounded-3xl">
              {text[index]}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderCOM;
