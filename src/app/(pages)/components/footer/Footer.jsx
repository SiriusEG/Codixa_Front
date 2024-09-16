import React from "react";
import SocialLinks from "./socialLinks";
// import "./footer.css";
import LeftFooter from "./leftFooter";
import Logo from "../logo";

export default function Footer() {
  return (
    <footer className="bg-primary-100">
      <div className="container py-20 flex flex-col gap-16 *:w-full">
        <div className="flex items-start justify-around m-lg:flex-col">
          <div className="flex items-start justify-around gap-6 m-lg:w-full m-lg:mb-12">
            <Logo className="w-24" />
            <div className="flex flex-col items-start justify-evenly gap-2">
              <h2 className="text-5xl font-semibold text-white">Codixa</h2>
              <h4 className="text-light-10 text-base">
                Top learning experiences that create more talent in the world.
              </h4>
            </div>
          </div>
          <LeftFooter />
        </div>
        <div className="flex items-center justify-between gap-8 ph:flex-col ph:items-start">
          <p className="text-gray-10 text-base">
            &copy; 2024 SiriusEG. All rights reserved.
          </p>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
