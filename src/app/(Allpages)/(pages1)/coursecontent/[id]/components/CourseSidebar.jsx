import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { PiSealQuestionBold } from "react-icons/pi";
import { RiFocusLine } from "react-icons/ri";
import { FcViewDetails } from "react-icons/fc";
import { GiBookshelf } from "react-icons/gi";
import { MdOutlineOndemandVideo, MdOutlineArticle } from "react-icons/md";

const CourseSidebar = ({
  currentProgress,
  expandedSections,
  toggleSection,
  activeItem,
  lessonTypes,
  fetchLessonDetails,
}) => {
  const sectionVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, staggerChildren: 0.05 },
    },
    collapsed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2 },
    },
  };

  const itemVariants = {
    open: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    collapsed: { opacity: 0, x: -10, transition: { duration: 0.2 } },
  };

  return (
    <div className="w-80 bg-gradient-to-b from-white to-gray-50 border-r border-gray-100 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-50 shadow-md">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
          <GiBookshelf className="w-6 h-6 text-primary" />
          <h2 className="text-lg font-bold text-gray-700">Course Content</h2>
        </div>
      </div>

      <div className="px-4 py-4 space-y-3">
        {currentProgress?.map((section, index) => (
          <div key={section.sectionId} className="group">
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`flex items-center justify-between p-3.5 rounded-xl cursor-pointer transition-colors
                ${
                  expandedSections.has(index)
                    ? "bg-blue-50 shadow-sm"
                    : "hover:bg-gray-50"
                } 
                ${
                  section.sectionType === 1
                    ? "bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100"
                    : ""
                }`}
              onClick={() => toggleSection(index)}
            >
              <div className="flex items-center gap-3">
                {section.sectionType === 1 ? (
                  <div className="p-1.5 bg-orange-100 rounded-lg">
                    <PiSealQuestionBold className="w-5 h-5 text-orange-600" />
                  </div>
                ) : (
                  <div className="p-1.5 bg-blue-100 rounded-lg">
                    <RiFocusLine className="w-5 h-5 text-primary" />
                  </div>
                )}
                <span className="text-sm font-medium text-gray-700 line-clamp-2">
                  {section.sectionName}
                </span>
              </div>
              <div
                className={`p-1.5 rounded-full transition-colors ${
                  expandedSections.has(index) ? "bg-blue-100" : "bg-gray-100"
                }`}
              >
                {expandedSections.has(index) ? (
                  <ChevronUpIcon className="w-4 h-4 text-primary" />
                ) : (
                  <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                )}
              </div>
            </motion.div>

            <AnimatePresence>
              {expandedSections.has(index) && (
                <motion.div
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={sectionVariants}
                  className="ml-2 pl-5 border-l-2 border-gray-100 mt-1 space-y-1"
                >
                  {section.sectionType === 0
                    ? section.sectionContent?.map((lesson) => (
                        <motion.div
                          key={lesson.lessonId}
                          variants={itemVariants}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          className={`flex items-center gap-3 p-3 mb-1 rounded-xl cursor-pointer text-sm transition-colors
                            ${
                              activeItem?.lessonId === lesson.lessonId
                                ? "bg-blue-100 text-primary shadow-sm"
                                : "hover:bg-gray-100 text-gray-600"
                            }`}
                          onClick={() =>
                            fetchLessonDetails(
                              lesson.lessonId,
                              false,
                              lesson.sectionId,
                              section.sectionName,
                              lesson.lessonName
                            )
                          }
                        >
                          {lessonTypes[lesson.lessonId] === "video" ? (
                            <div
                              className={`p-1.5 rounded-lg ${
                                activeItem?.lessonId === lesson.lessonId
                                  ? "bg-blue-200"
                                  : "bg-gray-100"
                              }`}
                            >
                              <MdOutlineOndemandVideo className="w-4 h-4 flex-shrink-0" />
                            </div>
                          ) : (
                            <div
                              className={`p-1.5 rounded-lg ${
                                activeItem?.lessonId === lesson.lessonId
                                  ? "bg-blue-200"
                                  : "bg-gray-100"
                              }`}
                            >
                              <MdOutlineArticle className="w-4 h-4 flex-shrink-0" />
                            </div>
                          )}
                          <span className="truncate font-medium">
                            {lesson.lessonName}
                          </span>
                        </motion.div>
                      ))
                    : section.sectionTestContent?.map((test) => (
                        <motion.div
                          key={test.sectionTestId}
                          variants={itemVariants}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          className={`flex items-center gap-3 p-3 mb-1 rounded-xl cursor-pointer text-sm
                            ${
                              activeItem?.sectionTestId === test.sectionTestId
                                ? "bg-orange-100 text-orange-600 shadow-sm"
                                : "hover:bg-gray-100 text-gray-600"
                            }`}
                          onClick={() =>
                            fetchLessonDetails(
                              test.sectionTestId,
                              true,
                              section.sectionId,
                              section.sectionName
                            )
                          }
                        >
                          <div
                            className={`p-1.5 rounded-lg ${
                              activeItem?.sectionTestId === test.sectionTestId
                                ? "bg-orange-200"
                                : "bg-gray-100"
                            }`}
                          >
                            <PiSealQuestionBold className="w-4 h-4 flex-shrink-0" />
                          </div>
                          <span className="truncate font-medium">
                            Assessment Test
                          </span>
                        </motion.div>
                      ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="px-4 py-6 mt-4 border-t border-gray-100">
        <div className="bg-blue-50 p-4 rounded-xl">
          <h3 className="text-sm font-semibold text-primary mb-2">
            Need Help?
          </h3>
          <p className="text-xs text-gray-600">
            Contact course support or browse additional resources in our
            knowledge base.
          </p>
          <button className="mt-3 w-full py-2 px-3 bg-white text-primary border border-blue-200 text-xs font-medium rounded-lg hover:bg-blue-500 hover:text-white transition-colors">
            Get Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseSidebar;
