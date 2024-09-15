import React from "react";
import NextLesson from "./components/NextLesson";
import TopCategory from "./components/TopCategory";
import Recommended from "./components/Recommended";
import OnlineCoaching from "./components/OnlineCoaching";
import CoursesChoise from "./components/CoursesChoise";
import MostViewing from "./components/MostViewing";

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
