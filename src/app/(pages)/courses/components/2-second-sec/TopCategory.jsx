import React from "react";
import { FaCamera, FaPenFancy, FaDisplay, FaVideo } from "react-icons/fa6";
import { TbBusinessplan } from "react-icons/tb";
import { MdAssuredWorkload } from "react-icons/md";
import CategoryCard from "./CategoryCard";

const dummyCategories = [
  {
    id: 0,
    name: "Design",
    icon: FaPenFancy,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmod",
    color: "#24e7f5",
  },
  {
    id: 1,
    name: "Development",
    icon: FaDisplay,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmod",
    color: "#27b1f1",
  },
  {
    id: 2,
    name: "Business",
    icon: TbBusinessplan,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmod",
    color: "#6928ff",
  },
  {
    id: 3,
    name: "Marketing",
    icon: MdAssuredWorkload,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmod",
    color: "#ff6529",
  },
  {
    id: 4,
    name: "Photography",
    icon: FaCamera,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmod",
    color: "#ff2828",
  },
  {
    id: 5,
    name: "Acting",
    icon: FaVideo,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmod",
    color: "#505050",
  },
];

function TopCategory() {
  return (
    <section className="bg-white flex flex-col gap-3 py-6 px-2 md:px-6 lg:px-8">
      <h2 className="text-3xl font-bold ml-5 self-center sm:self-start">
        Choose favourite course from top category
      </h2>
      <div className="flex flex-wrap flex-row items-center justify-center py-6  gap-x-[5%] xl:gap-x-[7%] px-4 ph:px-6 md:py-8 gap-y-16">
        {dummyCategories.map((category, i) => (
          <CategoryCard category={category} key={i}/>
        ))}
      </div>
    </section>
  );
}

export default TopCategory;
