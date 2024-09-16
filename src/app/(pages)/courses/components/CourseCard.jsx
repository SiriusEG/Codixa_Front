import Image from "next/image";
import React from "react";
import { FaPenFancy } from "react-icons/fa";
import { CiTimer } from "react-icons/ci";
import Link from "next/link";

function CourseCard({ element: course }) {
  function calculateDiscountedPrice(originalPrice, discountPercentage) {
    const discount = discountPercentage / 100;
    const finalPrice = originalPrice * (1 - discount);
    return finalPrice;
  }

  return (
    <div className=" w-[374px] flex flex-col gap-8 p-6  rounded-xl shadow-xl bg-white ">
      <Image
        width={1500}
        height={1000}
        src={course.img}
        alt={`${course.name} image`}
        className="w-[334px] h-[236px] rounded-2xl"
      />

      <div className="flex items-center justify-between text-gray-500">
        <p className="text-sm">
          <FaPenFancy className="inline" /> {course.category}
        </p>

        <p className="text-sm">
          <CiTimer className="inline" /> {course.time}
        </p>
      </div>

      <Link href="#">
        <h5 className="mb-2 text-2xl font-medium  tracking-tight text-gray-900 ">
          {course.name}
        </h5>
      </Link>

      <p className="mb-2 text-lg font-normal  tracking-tight text-gray-900 ">
        {course.desc}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={course.ownerImg}
            alt={course.owner}
            className="w-5 h-5 rounded-full"
          />

          <p>{course.owner}</p>
        </div>

        <div className="flex items-center gap-2">
          <del className="text-base font-light italic text-gray-500">
            ${course.price}
          </del>
          <p className="text-2xl font-bold  text-primary">
            ${calculateDiscountedPrice(course.price, course.discountPercentage)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;

// width: 374px;
// height: 610.96px;
// top: 2167.41px;
// left: 456px;
// gap: 0px;
// opacity: 0px;
