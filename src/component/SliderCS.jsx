"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNxwXzJPUqr_4HCGrEvuKYFCzvs6MVyThyzA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNxwXzJPUqr_4HCGrEvuKYFCzvs6MVyThyzA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNxwXzJPUqr_4HCGrEvuKYFCzvs6MVyThyzA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNxwXzJPUqr_4HCGrEvuKYFCzvs6MVyThyzA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNxwXzJPUqr_4HCGrEvuKYFCzvs6MVyThyzA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNxwXzJPUqr_4HCGrEvuKYFCzvs6MVyThyzA&s",
];

const text = ["UI", "React", "PHP", "JavaScript", "CSS", "PHP", "JavaScript"];

const SliderCOM = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 images at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
  };

  return (
    <div className="relative max-w-6xl mx-auto p-3 rounded-lg">
      <h3 className="text-primary font-bold text-2xl p-3 ml-2 mb-3">
        Reading Blog List
      </h3>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div
            key={index}
            className="relative px-2" // Adds horizontal padding between images
          >
            <img
              src={image}
              alt={`Slide ${index}`}
              className="w-full h-auto rounded-lg" // Apply border-radius
            />
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white p-2 rounded">
              {text[index]}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderCOM;
