import Footer from "@/component/footer/footer";
import Header from "@/component/header/header";
import Slider from "@/component/slider/Slider";
import React from "react";

function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Header />
      <Slider />
      <Footer />
    </div>
  );
}

export default Home;
