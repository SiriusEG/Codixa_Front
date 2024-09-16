import React from "react";
import TopCategory from "./components/second-sec/TopCategory";
import NextLesson from "./components/first-sec/NextLesson";
import Recommended from "./components/third-sec/Recommended";
import OnlineCoaching from "./components/fourth-sec/OnlineCoaching";
import CoursesChoise from "./components/fifth-sec/CoursesChoise";
import MostViewing from "./components/sixth-sec/MostViewing";

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
