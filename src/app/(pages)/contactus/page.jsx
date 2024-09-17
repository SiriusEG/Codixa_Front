import React from "react";
import LeftSec from "./components/LeftSec";
import RightSec from "./components/RightSec";

function page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-6 min-h-screen">
      <LeftSec />
      <RightSec />
    </div>
  );
}

export default page;
