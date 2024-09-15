import CourseShowCS from "@/app/(pages)/component/courseShowCS";
import HomeFirstSection from "@/app/(pages)/component/HomeFirstSection";
import PostCSblogList from "@/app/(pages)/component/PostCS";
import SliderCOM from "@/app/(pages)/component/SliderCS";
import React from "react";

export default function Page() {
  return (
    <div className="mx-4">
      <HomeFirstSection />
      <SliderCOM />
      <PostCSblogList />
      <CourseShowCS />
    </div>
  );
}
