import Image from "next/image";
import React from "react";

function HomeFirstSection() {
  return (
    <section className="bg-primaryBackground grid grid-cols-1 lg:grid-cols-2 rounded-lg text-center md:text-start gap-12 px-6 py-12 md:px-12 md:py-20">
      <div className="flex flex-col items-start justify-center gap-6">
        <h4 className="text-xl md:text-2xl text-gray-700">
          By Themadbrains in{" "}
          <span className="text-primary font-semibold">Inspiration</span>
        </h4>

        <h2 className="text-3xl md:text-5xl font-bold text-secondary leading-snug md:leading-tight">
          Why UI should be on the radar of every mobile developer
        </h2>

        <p className="text-gray-600 text-base md:text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          earum expedita nesciunt architecto quae aliquid a soluta ipsam! Vitae
          asperiores et tempore, consectetur magni alias.
        </p>
      </div>

      <div className=" flex justify-center lg:justify-end  items-center">
        <div className="relative">
          <div className="absolute bg-transparent rounded-full border-4 border-primary -top-6 -right-0 md:right-0 w-[220px] h-[220px] md:w-[420px] md:h-[420px]"></div>
          <div className="absolute bg-transparent rounded-full border-4 border-primary -top-6 -right-8 md:right-8 w-[220px] h-[220px] md:w-[420px] md:h-[420px]"></div>
          <Image
            src="/home-first-sec.png"
            alt="first-sec-image"
            width={1500}
            height={1500}
            className="relative z-10 w-[180px] h-[180px] md:w-[400px] md:h-[350px] rounded-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default HomeFirstSection;
