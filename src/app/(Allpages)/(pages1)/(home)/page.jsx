// import CourseShowCS from "@/app/(pages)/(home)/courseShowCS";
import React from "react";
import CoursesSec from "./components/courses-sec/coursesSec";
import HomeFirstSection from "./components/HomeFirstSection";
import SliderCOM from "./components/SliderCS";
import PostCSblogList from "./components/PostCS";

export default function Page() {
  return (
    <div className="mx-4">
      <HomeFirstSection />
      <SliderCOM />
      <PostCSblogList />
      <CoursesSec />
    </div>
  );
}
