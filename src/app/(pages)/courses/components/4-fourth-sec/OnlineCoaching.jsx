import React from "react";

function OnlineCoaching() {
  return (
    <section className="py-8 px-2 ph:px-4 sm:px-6 md:px-8 lg:px-10  text-white text-center flex-items-center justify-center">
      <div className="px-6 md:px-10 lg:px-16 flex items-center flex-col justify-center gap-8 py-10 rounded-2xl bg-primary-100">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold">
          Online coaching lessons for remote learning.
        </h3>

        <p className="font-normal text-md md:text-lg lg:text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempos Lorem ipsum dolor sitamet, consectetur adipiscing elit,
          sed do eiusmod tempor
        </p>

        <button className="px-4 py-3 bg-primary hover:bg-secondary rounded-lg">
          Start learning now
        </button>
      </div>
    </section>
  );
}

export default OnlineCoaching;
