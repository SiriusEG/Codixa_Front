import React from "react";
import ReactPlayer from "react-player";
import TestResults from "./TestResults";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const CourseMainContent = ({
  activeItem,
  testResult,
  answers,
  setAnswers,
  handleTestSubmit,
  handleNextLesson,
  error,
  nextItem,
}) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="flex-1 p-8 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      {activeItem?.message?.includes("Access Denied") ? (
        <div className="h-full flex items-center justify-center">
          <p className="text-red-500 text-xl font-bold">
            {`{Message: "${activeItem.message}"}`}
          </p>
        </div>
      ) : activeItem ? (
        <motion.div
          key={activeItem.lessonId || activeItem.sectionTestId}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {activeItem.isTest
                  ? activeItem.sectionName
                  : `${activeItem.sectionName} - ${activeItem.lessonName}`}
              </h2>
              {!activeItem.isTest && (
                <p className="text-gray-500 mt-1 text-sm">
                  {activeItem.VideoUrl ? "Video Lesson" : "Reading Material"}
                </p>
              )}
            </div>
            {nextItem && (
              <button
                onClick={handleNextLesson}
                className="px-4 py-2.5 bg-primary hover:bg-primary-100 text-white rounded-lg transition-all 
                         flex items-center gap-2 text-sm font-medium shadow-lg hover:shadow-blue-200"
              >
                Next Lesson
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            )}
          </div>

          {activeItem.message && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 p-4 bg-blue-50 text-primary-100 rounded-lg border border-blue-200"
            >
              {activeItem.message}
            </motion.div>
          )}

          {activeItem.isTest ? (
            <div className="space-y-6 max-w-3xl mx-auto">
              {testResult ? (
                <TestResults
                  testResult={testResult}
                  handleNextLesson={handleNextLesson}
                />
              ) : (
                <>
                  {activeItem.questions?.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4"
                    >
                      {activeItem.questions.map((question) => (
                        <div
                          key={question.QuestionId}
                          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                        >
                          <h3 className="font-semibold text-gray-800 mb-3">
                            {question.Question}
                          </h3>
                          <div className="space-y-2">
                            {question.Choices.map((choice) => (
                              <label
                                key={choice.ChoicesQuestionId}
                                className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                              >
                                <input
                                  type="radio"
                                  name={`question-${question.QuestionId}`}
                                  onChange={() =>
                                    setAnswers((prev) => ({
                                      ...prev,
                                      [question.QuestionId]:
                                        choice.ChoicesQuestionId,
                                    }))
                                  }
                                  checked={
                                    answers[question.QuestionId] ===
                                    choice.ChoicesQuestionId
                                  }
                                  className="w-4 h-4 text-primary border-gray-300 focus:ring-blue-500"
                                />
                                <span className="text-gray-700">
                                  {choice.Answer}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                  {activeItem.questions?.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6"
                    >
                      <button
                        onClick={handleTestSubmit}
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg
                                 transition-all flex items-center gap-2 font-medium shadow-md"
                      >
                        Submit Test
                        <CheckCircleIcon className="w-5 h-5" />
                      </button>
                    </motion.div>
                  )}
                </>
              )}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 mt-4"
                >
                  {error}
                </motion.div>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {activeItem.VideoUrl ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative aspect-video bg-gray-800 rounded-xl overflow-hidden shadow-xl"
                >
                  <ReactPlayer
                    url={`https://codixa.runasp.net/${activeItem.VideoUrl}`}
                    controls
                    width="100%"
                    height="100%"
                    config={{
                      file: { attributes: { controlsList: "nodownload" } },
                    }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="prose prose-lg max-w-none bg-white p-8 rounded-xl shadow-sm border border-gray-100"
                >
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                    Lesson Content
                  </h3>
                  <div
                    dangerouslySetInnerHTML={{ __html: activeItem.LessonText }}
                  />
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      ) : (
        <div className="h-full flex items-center justify-center">
          <div className="text-center text-gray-500 p-8">
            <h3 className="text-xl font-semibold mb-2">
              Select Content to Start
            </h3>
            <p className="text-gray-400">
              Choose a lesson or test from the sidebar
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseMainContent;
