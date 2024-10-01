import React from "react";

function ProgressBar({ progress }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-[0.5rem]">
      
      <div
        className="bg-primary h-[0.5rem] rounded-[0.125rem] w-[80%]"
        
      ></div>
    </div>
  );
}

export default ProgressBar;
