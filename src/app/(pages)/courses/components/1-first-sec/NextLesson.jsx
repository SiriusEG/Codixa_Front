import Link from "next/link";
import React from "react";
import SwiperCS from "../SwiperCS";

const dummyMyCourses = [
  {
    id: 0,
    name: "AWS certified solutions architect",
    img: "/imgs/im2.jpg",
    owner: "vira",
    ownerImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNxwXzJPUqr_4HCGrEvuKYFCzvs6MVyThyzA&s",
    totalLessons: 7,
    completedLessons: 5,
  },
  {
    id: 1,
    name: "AWS certified solutions architect",
    img: "/imgs/im4.jpg",
    owner: "vira",
    ownerImg: "/imgs/study place.jpg",
    totalLessons: 7,
    completedLessons: 5,
  },
  {
    id: 2,
    name: "AWS certified solutions architect",
    img: "/imgs/study place.jpg",
    owner: "vira",
    ownerImg: "/imgs/study place.jpg",
    totalLessons: 7,
    completedLessons: 5,
  },
  {
    id: 3,
    name: "AWS certified solutions architect",
    img: "/imgs/im2.jpg",
    owner: "vira",
    ownerImg: "/imgs/study place.jpg",
    totalLessons: 7,
    completedLessons: 5,
  },
  {
    id: 4,
    name: "AWS certified solutions architect",
    img: "/imgs/im4.jpg",
    owner: "vira",
    ownerImg: "/imgs/study place.jpg",
    totalLessons: 7,
    completedLessons: 5,
  },
  {
    id: 5,
    name: "AWS certified solutions architect",
    img: "/imgs/study place.jpg",
    owner: "vira",
    ownerImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNxwXzJPUqr_4HCGrEvuKYFCzvs6MVyThyzA&s",
    totalLessons: 7,
    completedLessons: 5,
  },
];

function NextLesson() {
  return (
    <section className="bg-primary-background flex flex-col gap-3 py-6">
      <div className="flex justify-between px-2 md:px-6 lg:px-8">
        <h2 className="text-2xl lg:text-xl font-semibold">
          Welcome back, ready for your next lesson?
        </h2>

        <Link
          href="/courseshistory"
          className="text-primary hover:text-primary-100"
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
