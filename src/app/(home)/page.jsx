import CourseShowCS from "@/component/courseShowCS";
import HomeFirstSection from "@/component/HomeFirstSection";
import PostCSblogList from "@/component/PostCS";
import SliderCOM from "@/component/SliderCS";
import React from "react";

export default function page() {
  return (
    <div className="mx-4">
      <HomeFirstSection />
      <SliderCOM />
      <PostCSblogList />
      <CourseShowCS />
    </div>
  );
}
