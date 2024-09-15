import Link from "next/link";
import React from "react";
import SwiperCS from "./SwiperCS";

const dummyMyCourses = [
  {
    id: 0,
    name: "AWS certified solutions architect",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNxwXzJPUqr_4HCGrEvuKYFCzvs6MVyThyzA&s",
    owner: "vira",
    ownerImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNxwXzJPUqr_4HCGrEvuKYFCzvs6MVyThyzA&s",
    totalLessons: 7,
    completedLessons: 5,
  },
  {
    id: 1,
    name: "AWS certified solutions architect",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNxwXzJPUqr_4HCGrEvuKYFCzvs6MVyThyzA&s",
    owner: "vira",
    ownerImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNxwXzJPUqr_4HCGrEvuKYFCzvs6MVyThyzA&s",
    totalLessons: 7,
    completedLessons: 5,
  },
  {
    id: 2,
    name: "AWS certified solutions architect",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNxwXzJPUqr_4HCGrEvuKYFCzvs6MVyThyzA&s",
    owner: "vira",
    ownerImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNxwXzJPUqr_4HCGrEvuKYFCzvs6MVyThyzA&s",
    totalLessons: 7,
    completedLessons: 5,
  },
  {
    id: 3,
    name: "AWS certified solutions architect",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNxwXzJPUqr_4HCGrEvuKYFCzvs6MVyThyzA&s",
    owner: "vira",
    ownerImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNxwXzJPUqr_4HCGrEvuKYFCzvs6MVyThyzA&s",
    totalLessons: 7,
    completedLessons: 5,
  },
  {
    id: 4,
    name: "AWS certified solutions architect",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNxwXzJPUqr_4HCGrEvuKYFCzvs6MVyThyzA&s",
    owner: "vira",
    ownerImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNxwXzJPUqr_4HCGrEvuKYFCzvs6MVyThyzA&s",
    totalLessons: 7,
    completedLessons: 5,
  },
  {
    id: 5,
    name: "AWS certified solutions architect",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNxwXzJPUqr_4HCGrEvuKYFCzvs6MVyThyzA&s",
    owner: "vira",
    ownerImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNxwXzJPUqr_4HCGrEvuKYFCzvs6MVyThyzA&s",
    totalLessons: 7,
    completedLessons: 5,
  },
];

function NextLesson() {
  return (
    <section className="bg-secondaryBackground flex flex-col gap-3 py-6">
      <div className="flex justify-between px-2 md:px-6 lg:px-8">
        <h2 className="text-md lg:text-xl font-semibold">
          Welcome back, ready for your next lesson?
        </h2>

        <Link
          href="/courseshistory"
          className="text-primary hover:text-hoverPrimary"
        >
          View history{" "}
        </Link>
      </div>

      <div>
        <SwiperCS slides={dummyMyCourses} componentName="unCompletedCourse" />
      </div>
    </section>
  );
}

export default NextLesson;
