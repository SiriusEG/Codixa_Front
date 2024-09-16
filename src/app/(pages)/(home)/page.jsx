// import CourseShowCS from "@/app/(pages)/(home)/courseShowCS";
import HomeFirstSection from "@/app/(pages)/(home)/components/HomeFirstSection";
import PostCSblogList from "@/app/(pages)/(home)/components/PostCS";
import SliderCOM from "@/app/(pages)/(home)/components/SliderCS";
import React from "react";
import CoursesSec from "./components/courses-sec/coursesSec";

export default function Page() {
  return (
    <div className="mx-4">
      <HomeFirstSection />
      <SliderCOM />
      <PostCSblogList />
      {/* <CourseShowCS /> */}
      <CoursesSec />
    </div>
  );
}
