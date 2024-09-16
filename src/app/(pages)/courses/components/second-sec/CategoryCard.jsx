import React from "react";

function CategoryCard({ category }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-4 px-6 max-w-xs text-center shadow-xl rounded-lg ">
      <div
        style={{
          color: category.color,
        }}
        className="p-4 rounded relative"
      >
        <div
          className="absolute inset-0  rounded-sm z-0"
          style={{
            background: category.color,
            opacity: 0.3,
          }}
        ></div>
        <category.icon className="relative z-10" />
      </div>

      <h3 className="text-xl font-semibold">{category.name}</h3>

      <p className="text-gray-500">{category.desc}</p>
    </div>
  );
}

export default CategoryCard;
