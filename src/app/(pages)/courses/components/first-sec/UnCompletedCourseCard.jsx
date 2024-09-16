import Link from "next/link";
import React from "react";

function UnCompletedCourseCard({ element: course }) {
  return (
    <div className="max-w-sm min-w-[300px] flex flex-col gap-4 p-6  rounded-xl shadow-xl bg-white ">
      <img src={course.img} alt={`${course.name} image`} className="w-full" />
      <Link href="#">
        <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 ">
          {course.name}
        </h5>
      </Link>

      <div className="flex items-center gap-2">
        <img
          src={course.ownerImg}
          alt={course.owner}
          className="w-5 h-5 rounded-full"
        />

        <p>{course.owner}</p>
      </div>

      <div className="w-full bg-gray-300 rounded-full h-2.5 ">
        <div
          style={{
            width: `${Math.floor(
              (course.completedLessons / course.totalLessons) * 100
            )}%`,
          }}
          className="bg-primary h-2.5 rounded-full "
        ></div>
      </div>

      <h6 className="text-gray-500 text-xs text-end">
        Lessons {course.completedLessons} of {course.totalLessons}
      </h6>
    </div>
  );
}

export default UnCompletedCourseCard;
