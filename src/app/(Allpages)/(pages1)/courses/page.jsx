import React from "react";
import MostViewing from "./components/6-sixth-sec/MostViewing";

function Page() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      {/* Top Section */}
      <div className="flex flex-grow">
        {/* Left Side: Categories & Query */}
        <div className="w-1/3 bg-gray-100 p-6 my-4">
          <h2 className="font-bold text-lg mb-4">Categories</h2>
          <div className="mt-6">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search query..."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="w-full mt-3 bg-primary text-white py-2 rounded-md hover:bg-primary-dark">
              Search
            </button>
          </div>

          {/* Categories - Two Columns */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            {/* Category Item */}
            <div>
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-primary mt-1"
                />
                <div>
                  <span className="font-semibold">Artificial Intelligence</span>
                  <p className="text-sm text-gray-500">
                    Explore AI models, neural networks, and robotics.
                  </p>
                </div>
              </label>
            </div>
            <div>
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-primary mt-1"
                />
                <div>
                  <span className="font-semibold">Data Science</span>
                  <p className="text-sm text-gray-500">
                    Learn data analysis, visualization, and machine learning.
                  </p>
                </div>
              </label>
            </div>
            <div>
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-primary mt-1"
                />
                <div>
                  <span className="font-semibold">Software Engineering</span>
                  <p className="text-sm text-gray-500">
                    Dive into software design, testing, and development.
                  </p>
                </div>
              </label>
            </div>
            <div>
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-primary mt-1"
                />
                <div>
                  <span className="font-semibold">Cybersecurity</span>
                  <p className="text-sm text-gray-500">
                    Understand online security, cryptography, and network
                    safety.
                  </p>
                </div>
              </label>
            </div>
            <div>
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-primary mt-1"
                />
                <div>
                  <span className="font-semibold">Machine Learning</span>
                  <p className="text-sm text-gray-500">
                    Study predictive modeling and advanced ML algorithms.
                  </p>
                </div>
              </label>
            </div>
            <div>
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-primary mt-1"
                />
                <div>
                  <span className="font-semibold">Computer Networks</span>
                  <p className="text-sm text-gray-500">
                    Learn about network architecture and communication
                    protocols.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Side: Query Results */}
        <div className="w-2/3 bg-white p-6">
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
      <div className="bg-gray-200">
        <MostViewing />
      </div>
    </div>
  );
}

export default Page;
