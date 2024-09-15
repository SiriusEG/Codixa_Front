"use client";

import React from "react";

const courses = [
  {
    id: 1,
    image:
      "https://i.pinimg.com/564x/bc/e4/cd/bce4cd39bc29b28192f3bdccea342a3b.jpg",
    date: "November 16, 2014",
    title: "Three Pillars of User Delight",
    description:
      "Delight can be experienced viscerally, behaviourally, and reflectively. A great design is ...",
    tags: ["Research", "UI UX"],
  },
  {
    id: 2,
    image:
      "https://i.pinimg.com/564x/d3/d5/a3/d3d5a3e259ee8ca212d85f07e92c16cd.jpg",
    date: "September 24, 2017",
    title: "UX Mapping Methods",
    description:
      "Visual-design principles can be applied consistently throughout the process of creating a polished UX map...",
    tags: ["Research", "UI Design"],
  },
  {
    id: 3,
    image:
      "https://i.pinimg.com/564x/05/3b/c6/053bc6114fcc054b3985c050fdcba094.jpg",
    date: "March 13, 2014",
    title: "Agile Development Projects and Usability",
    description:
      "Agile methods aim to overcome usability barriers in traditional development, but pose new threats to user experience quality.",
    tags: ["Programming", "Research", "Developments"],
  },
];

const CourseShowCS = () => {
  return (
    <div className="flex flex-row justify-center gap-4 py-7  px-10 ">
      {/* Left column: shows two courses */}
      <div className="flex flex-col gap-4 w-full ">
        {courses.slice(0, 2).map((course) => (
          <div
            key={course.id}
            className="bg-white flex flex-row  border-primary border-[1px] rounded-2xl overflow-hidden  transition-transform transform  relative"
          >
            <div className="relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-[600px] h-[300px] object-cover rounded-r-3xl rounded-l-2xl"
                style={{ borderTop: "2px solid #27131385" }}
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-green-600">{course.date}</p>
              <h2 className="text-xl font-bold mb-3">{course.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {course.description}
              </p>
              <div className="flex flex-wrap space-x-2">
                {course.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-primary to-secondary text-white px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right column: shows one course */}
      <div className="flex w-2/3  border-primary border-[1px] rounded-xl">
        <div
          key={courses[2].id}
          className="bg-white shadow-lg rounded-[10px] overflow-hidden pb-4 transition-transform transform  hover:shadow-xl duration-500 relative"
        >
          <div className="relative">
            <img
              src={courses[2].image}
              alt={courses[2].title}
              className="w-full h-[300px] object-cover rounded-b-3xl"
            />
          </div>
          <div className="p-4">
            <p className="text-sm text-green-600">{courses[2].date}</p>
            <h2 className="text-xl font-bold mb-3">{courses[2].title}</h2>
            <p className="text-gray-600 mb-4 line-clamp-3">
              {courses[2].description}
            </p>
            <div className="flex flex-wrap space-x-2">
              {courses[2].tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-primary to-secondary text-white px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseShowCS;
