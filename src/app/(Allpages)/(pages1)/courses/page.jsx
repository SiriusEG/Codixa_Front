import React from "react";
import MostViewing from "./components/6-sixth-sec/MostViewing";
import Filters from "./components/filters";

function Page() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      {/* Top Section */}
      <div className="flex flex-grow bg-primary-background ">
        {/* Left Side: Categories & Query */}
        <Filters />
        {/* Right Side: Query Results */}
        <div className="w-full border-l-[1.5px] border-l-#F2EED7 p-6">
          <h2 className="font-bold text-lg mb-4">Query Results</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Example Result Items */}
            <div className="p-4 border rounded-md">Result 1</div>
            <div className="p-4 border rounded-md">Result 2</div>
            <div className="p-4 border rounded-md">Result 3</div>
            <div className="p-4 border rounded-md">Result 4</div>
          </div>
        </div>
      </div>

      {/* Most Viewing Section */}
      <div className="">
        <MostViewing />
      </div>
    </div>
  );
}

export default Page;
