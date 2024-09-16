import React from "react";
import TopCategory from "./components/2-second-sec/TopCategory";
import NextLesson from "./components/1-first-sec/NextLesson";
import Recommended from "./components/3-third-sec/Recommended";
import OnlineCoaching from "./components/4-fourth-sec/OnlineCoaching";
import CoursesChoise from "./components/5-fifth-sec/CoursesChoise";
import MostViewing from "./components/6-sixth-sec/MostViewing";

function page() {
  return (
    <div className="bg-background">
      <NextLesson />
      <TopCategory />
      <Recommended />
      <OnlineCoaching />
      <CoursesChoise />
      <MostViewing />
    </div>
  );
}

export default page;
