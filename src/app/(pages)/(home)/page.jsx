import React from "react";
import HomeFirstSection from "./components/HomeFirstSection";
import SliderCOM from "./components/SliderCS";
import PostCSblogList from "./components/PostCS";

export default function page() {
  return (
    <div className="mx-4">
      <HomeFirstSection />
      <SliderCOM />
      <PostCSblogList />
    </div>
  );
}
