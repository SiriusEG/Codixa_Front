import Image from "next/image";
import React from "react";

export default function CourseCol() {
  return (
    <div className="flex flex-col gap-4">
      <Image
        src={"/imgs/course_3.png"}
        alt="Agile Development Projects and Usability"
        width={500}
        height={500}
        className="object-cover !w-full !h-1/2"
      />
      <div className="flex flex-col items-start gap-3">
        <p className="text-sm font-semibold capitalize text-primary">
          march 13, 2014
        </p>
        <h4 className="text-lg font-semibold text-black">
          Agile Development Projects and Usability
        </h4>
        <p className="text-base text-gray-10 text-truncate text-wrap">
          Agile methods aim to overcome usability barriers in traditional
          development, but post new threats to user experience quality.
        </p>
        <ul className="flex items-center gap-2 [&_li]:bg-light-10 [&_li]:text-white [&_li]:text-sm [&_li]:font-medium [&_li]:py-1 [&_li]:px-2 [&_li]:rounded-2xl [&_li]:bg-gradient-to-bl [&_li]:from-primary [&_li]:to-secondary">
          <li>Programming</li>
          <li>Research</li>
          <li>Developments</li>
        </ul>
      </div>
    </div>
  );
}
