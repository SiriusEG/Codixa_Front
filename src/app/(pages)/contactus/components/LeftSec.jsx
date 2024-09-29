import Image from "next/image";
import React from "react";

export default function LeftSec() {
  const Circle = ({ className='' }) => (<span className={`bg-primary/35 rounded-full inline-block absolute ${className}`}></span>);
  const Star = ({ className='' }) => (<span className={`clip-star bg-primary/35 size-10 absolute animate-spin-slow ${className}`}></span>)

  return (
    <div className="col-span-1 w-full relative flex-center m-lg2:hidden">
      <Image
        src="imgs/contactArrow.svg"
        alt="Contact Arrow"
        width={350}
        height={350}
        className="z-10 animate-pulse"
      />
      <Circle className="size-32 translate-x-[-40%] translate-y-[20%]" />
      <Circle className="size-48 right-[13%] top-[7%]" />
      <Circle className="size-15 left-[10%] top-0" />
      <Circle className="size-15 left-[50%] top-[-30%]" />
      <Circle className="size-7 left-[30%] top-[-10%] animate-ping" />
      <Circle className="size-32 bottom-[-25%] left-[60%]" />
      <Circle className="size-7 left-[30%] bottom-[-20%] animate-ping" />
      <Star className="top-[-16%] right-[16%]" />
      <Star className="bottom-[12%] left-[20%]" />
      <Star className="bottom-[43%] left-[56%]" />
    </div>
  );
}
