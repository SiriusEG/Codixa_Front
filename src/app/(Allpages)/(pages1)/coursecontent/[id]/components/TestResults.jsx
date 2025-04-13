import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightIcon,
  TrophyIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { FaRegLightbulb } from "react-icons/fa";

const TestResults = ({ testResult, handleNextLesson }) => {
  const progress =
    typeof testResult.Result === "number" ? testResult.Result : 0;
  const isPassed = testResult.IsPassed;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-gradient-to-br from-white to-gray-50 p-10 rounded-2xl shadow-xl border border-gray-100 max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        {/* Enhanced Result Circle */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              className="text-gray-100"
              strokeWidth="10"
              stroke="currentColor"
              fill="transparent"
              r="42"
              cx="50"
              cy="50"
            />
            {/* Progress circle with animation */}
            <motion.circle
              initial={{ strokeDashoffset: `${2 * Math.PI * 42}` }}
              animate={{
                strokeDashoffset: `${2 * Math.PI * 42 * (1 - progress / 100)}`,
                stroke: isPassed ? "#22c55e" : "#ef4444",
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              strokeWidth="10"
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="42"
              cx="50"
              cy="50"
              strokeDasharray={`${2 * Math.PI * 42}`}
              transform="rotate(-90 50 50)"
            />
            {/* Inner circle for better aesthetics */}
            <circle
              className="text-white"
              fill="currentColor"
              r="32"
              cx="50"
              cy="50"
            />
          </svg>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
              {progress}%
            </span>
            <span className="text-xs text-gray-500 font-medium mt-1">
              SCORE
            </span>
          </motion.div>
        </div>

        {/* Enhanced Status Display */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col items-center justify-center gap-3 mb-6"
        >
          <div
            className={`p-3 rounded-full ${
              isPassed ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {isPassed ? (
              <TrophyIcon className="w-8 h-8 text-green-500" />
            ) : (
              <FaRegLightbulb className="w-7 h-7 text-amber-500" />
            )}
          </div>
          <h3 className="text-2xl font-bold text-gray-800">
            {isPassed ? "Congratulations!" : "Keep Learning"}
          </h3>
          <p className="text-gray-600 max-w-md">
            {testResult.message ||
              (isPassed
                ? "You've successfully completed the assessment and demonstrated your knowledge!"
                : "You're making progress. Review the material and try again to improve your score.")}
          </p>
        </motion.div>
      </div>

      {/* Enhanced Stats if available */}
      {testResult.correctAnswers && testResult.totalQuestions && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          <div className="bg-blue-50 p-4 rounded-xl text-center">
            <p className="text-sm text-blue-600 font-medium">Correct Answers</p>
            <p className="text-2xl font-bold text-blue-700">
              {testResult.correctAnswers}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-xl text-center">
            <p className="text-sm text-purple-600 font-medium">
              Total Questions
            </p>
            <p className="text-2xl font-bold text-purple-700">
              {testResult.totalQuestions}
            </p>
          </div>
        </motion.div>
      )}

      {/* Enhanced Action Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <button
          onClick={handleNextLesson}
          className="w-full py-4 px-6 bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white rounded-xl
                    transition-all flex items-center justify-center gap-3 font-medium shadow-lg shadow-blue-200 hover:shadow-blue-300"
        >
          {isPassed ? "Continue Course" : "Try Again"}
          {isPassed ? (
            <ArrowRightIcon className="w-5 h-5" />
          ) : (
            <ArrowPathIcon className="w-5 h-5" />
          )}
        </button>

        {/* Additional help link for those who didn't pass */}
        {!isPassed && (
          <p className="text-center mt-4 text-sm text-gray-500">
            Need help?{" "}
            <a href="#" className="text-primary hover:underline">
              Review the material
            </a>{" "}
            before trying again.
          </p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default TestResults;
