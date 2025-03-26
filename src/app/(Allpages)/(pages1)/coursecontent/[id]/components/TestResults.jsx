import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const TestResults = ({ testResult, handleNextLesson }) => {
  const progress =
    typeof testResult.Result === "number" ? testResult.Result : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-gray-200"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
            />
            <circle
              className={`${
                testResult.IsPassed ? "text-green-500" : "text-red-500"
              }`}
              strokeWidth="8"
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xl font-bold">
            {progress}%
          </span>
        </div>

        <div className="flex items-center justify-center gap-2 mb-4">
          {testResult.IsPassed ? (
            <CheckCircleIcon className="w-8 h-8 text-green-500" />
          ) : (
            <XCircleIcon className="w-8 h-8 text-red-500" />
          )}
          <h3 className="text-2xl font-bold text-gray-800">
            {testResult.IsPassed ? "Congratulations!" : "Try Again"}
          </h3>
        </div>
        <p className="text-gray-600 mb-6">
          {testResult.message || "You've completed the assessment."}
        </p>
      </div>

      <button
        onClick={handleNextLesson}
        className="w-full py-3 px-6 bg-primary hover:bg-primary-100 text-white rounded-lg
                 transition-all flex items-center justify-center gap-2 font-medium"
      >
        Continue Course
        <ArrowRightIcon className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default TestResults;
