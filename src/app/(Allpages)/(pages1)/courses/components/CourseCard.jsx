"use client";
import Image from "next/image";
import React from "react";
import { FaPenFancy } from "react-icons/fa";
import { CiTimer } from "react-icons/ci";
import Link from "next/link";

export default function CourseCard({ element: course }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      className="w-[374px] h-[610px] flex flex-col justify-between p-6 rounded-xl shadow-xl bg-white overflow-hidden"
    >
      {/* -------- TOP PART -------- */}
      <div>
        {/* image */}
        <div className="w-full h-[236px] rounded-2xl overflow-hidden flex-shrink-0">
          <Image
            src={course.img}
            width={1500}
            height={1000}
            alt={`${course.name} image`}
            className="w-full h-full object-cover"
          />
        </div>
        {/* meta */}
        <div className="flex justify-between text-gray-500 mt-3">
          <p className="text-sm">
            <FaPenFancy className="inline" /> {course.category}
          </p>
          <p className="text-sm">
            <CiTimer className="inline" /> {course.time}
          </p>
        </div>
        {/* title */}
        <h5 className="text-2xl font-medium tracking-tight text-gray-900 line-clamp-2 mt-2">
          {course.name}
        </h5>
        {/* description */}
        <p className="text-lg text-gray-900 line-clamp-2 mt-2">{course.desc}</p>
        {/* owner */}
        <div className="flex items-center gap-2 mt-2">
          <img
            src={course.ownerImg}
            alt={course.owner}
            className="w-5 h-5 rounded-full"
          />
          <p className="text-sm">{course.owner}</p>
        </div>
      </div>
      {/* -------- FIXED FOOTER -------- */}
      <Link
        href={`coursedetail/${course.id}`}
        className="block w-full py-3 bg-primary text-white rounded-xl font-semibold text-center transition-colors duration-300 hover:bg-primary-100"
      >
        View Course
      </Link>
    </div>
  );
}
