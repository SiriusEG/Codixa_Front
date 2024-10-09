import React from 'react';
import CourseRow from './courseRow';
import CourseCol from './courseCol';

export default function CoursesSec() {
  const rowCourses = [
    {
      id: 1,
      img: "/imgs/course_1.png",
      date: "november 16, 2014",
      title: "Three Pillars of Users Delight",
      desc: "Delight can be experienced viscerally, behaviourally, and reflectively. A great design is ...",
      tags: ["Research", "UI UX"],
    },
    {
      id: 2,
      img: "/imgs/course_2.png",
      date: "september 24, 2017",
      title: "UX Mapping Methods",
      desc: "Visual-design principles can be applied consistently throughout the process of creating a polished UX map...",
      tags: ["Research", "UI Design"],
    },
  ];

  return (
    <section className="my-12">
      <div className="container flex items-center gap-6 m-lg2:flex-col-reverse m-lg2:gap-14">
        <div className="flex flex-col gap-6 w-1/2 m-lg2:w-full">
          {rowCourses.map(course => <CourseRow courseData={course} key={course.id} />)}
        </div>
        <CourseCol />
      </div>
    </section>
  );
};
