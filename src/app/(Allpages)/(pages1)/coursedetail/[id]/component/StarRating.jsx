"use client";
import { FaStar } from "react-icons/fa";

export const StarRating = ({ averageRating }) => {
  return (
    <div className="flex items-center gap-1">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <FaStar
            key={i}
            className={`text-xl ${
              i < Math.floor(averageRating)
                ? "text-yellow-500"
                : "text-gray-300"
            }`}
          />
        ))}
      <span className="ml-2 text-sm text-gray-600">
        ({averageRating?.toFixed(1)})
      </span>
    </div>
  );
};
