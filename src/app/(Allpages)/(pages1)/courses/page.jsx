import React from "react";
import MostViewing from "./components/6-sixth-sec/MostViewing";
import SearchPage from "./components/searchPage";

function Page() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row w-screen bg-primary-background ">
        <SearchPage />
      </div>

      {/* Most Viewing Section */}
      <div className="">
        <MostViewing />
      </div>
    </div>
  );
}

export default Page;
