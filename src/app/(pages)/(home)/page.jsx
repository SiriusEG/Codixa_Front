import CourseShowCS from "@/app/(pages)/(home)/courseShowCS";
import HomeFirstSection from "@/app/(pages)/(home)/HomeFirstSection";
import PostCSblogList from "@/app/(pages)/(home)/PostCS";
import SliderCOM from "@/app/(pages)/(home)/SliderCS";
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
