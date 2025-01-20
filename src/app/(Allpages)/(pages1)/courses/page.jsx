import React from "react";
import MostViewing from "./components/6-sixth-sec/MostViewing";
import Filters from "./components/filters";
import SearchResultCard from "./components/srearchCardResult";

function Page() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row flex-grow bg-primary-background ">
        {/* Left Side: Categories & Query */}
        <Filters />
        {/* Right Side: Query Results */}
        <SearchResultCard />
      </div>

      {/* Most Viewing Section */}
      <div className="">
        <MostViewing />
      </div>
    </div>
  );
}

export default Page;
