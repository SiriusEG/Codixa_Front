import Footer from "@/component/Footer";
import Header from "@/component/Header";
import Slider from "@/component/Slider";
import React from "react";
function page() {
  return (
    <div>
      <h1 className="text-3xl font-bold ">Hello world!</h1>
      <Header />
      <Slider />
      <Footer />
    </div>
  );
}

export default page;
