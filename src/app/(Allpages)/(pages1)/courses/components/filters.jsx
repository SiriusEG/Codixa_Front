"use client";
import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";

const Filters = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const sections = [
    {
      title: "Topic",
      items: ["[Front-end]", "Programming", "Personal Development"],
    },
    {
      title: "Level",
      items: ["Beginner", "Intermediate", "Expert", "All Level"],
    },
    {
      title: "Language",
      items: ["English", "Mandarin", "Arabic", "Francais"],
    },
    { title: "Price", items: ["Paid", "Free"] },
    { title: "Video Duration", items: ["0-2 hours", "3-6 hours", "7-9 hours"] },
    { title: "Features", items: ["Caption", "Quizzes", "Practice Test"] },
  ];

  return (
    <div className=" sm:w-1/4 p-6 my-4 rounded">
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            {/* Label with Dropdown Icon */}
            <div
              className="flex flex-row sm:flex-col justify-between items-center p-4  rounded cursor-pointer"
              onClick={() => toggleSection(section.title)}
            >
              <span className="font-bold text-lg text-gray-800">
                {section.title}
              </span>
              <span className="text-gray-500 text-xl transform transition-transform duration-400 ease-in-out">
                {openSections[section.title] ? (
                  <RiArrowDropUpLine className=" text-[3rem] font-black " />
                ) : (
                  <RiArrowDropDownLine className=" text-[3rem]  font-black" />
                )}
              </span>
            </div>

            {/* Dropdown Content */}
            {openSections[section.title] && (
              <ul className="space-y-2 mt-2 pl-6">
                {section.items.map((item) => (
                  <li key={item}>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-primary"
                      />
                      <span className="text-gray-700">{item}</span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
