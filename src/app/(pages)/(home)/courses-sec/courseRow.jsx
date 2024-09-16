import Image from 'next/image';
import React from 'react';

export default function CourseRow({ courseData:data }) {
  return (
    <div className="flex gap-4">
      <Image src={data.img} alt={data.title} width={500} height={500} className="!w-1/2 !h-full" />
      <div className="flex flex-col items-start gap-3">
        <p className="text-sm font-semibold capitalize text-primary">
          {data.date}
        </p>
        <h4 className="text-lg font-semibold text-black">
          {data.title}
        </h4>
        <p className="text-base text-gray-10 text-truncate text-wrap">
          {data.desc}
        </p>
        <ul className="flex items-center gap-2 [&_li]:bg-light-10 [&_li]:text-white [&_li]:text-sm [&_li]:font-medium [&_li]:py-1 [&_li]:px-2 [&_li]:rounded-2xl [&_li]:bg-gradient-to-bl [&_li]:from-primary [&_li]:to-secondary">
          {data.tags.map((tag, i) => <li key={i}>{tag}</li>)}
        </ul>
      </div>
    </div>
  );
};
