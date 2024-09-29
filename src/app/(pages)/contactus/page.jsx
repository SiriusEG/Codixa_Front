import React from "react";
import LeftSec from "./components/LeftSec";
import RightSec from "./components/RightSec";

export default function page() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-6 lg:min-h-screen m-lg2:my-8">
      <LeftSec />
      <RightSec />
    </div>
  );
}
