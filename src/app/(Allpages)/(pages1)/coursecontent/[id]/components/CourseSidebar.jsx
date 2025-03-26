import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { PiSealQuestionBold } from "react-icons/pi";
import { RiFocusLine } from "react-icons/ri";
import { FcViewDetails } from "react-icons/fc";

const CourseSidebar = ({
  currentProgress,
  expandedSections,
  toggleSection,
  activeItem,
  lessonTypes,
  fetchLessonDetails,
}) => {
  const sectionVariants = {
    open: { opacity: 1, height: "auto" },
    collapsed: { opacity: 0, height: 0 },
  };

  return (
    <div className="w-80 bg-white border-r border-gray-100 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-50">
      <h2 className="text-lg font-bold text-gray-700 px-6 py-5 border-b border-gray-100">
        Course Content
      </h2>

      <div className="px-4 py-4 space-y-2">
        {currentProgress?.map((section, index) => (
          <div key={section.sectionId} className="group">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors
                ${
                  expandedSections.has(index)
                    ? "bg-blue-50"
                    : "hover:bg-gray-50"
                } 
                ${
                  section.sectionType === 1
                    ? "bg-orange-50 hover:bg-orange-100"
                    : ""
                }`}
              onClick={() => toggleSection(index)}
            >
              <div className="flex items-center gap-3">
                {section.sectionType === 1 ? (
                  <PiSealQuestionBold className="w-5 h-5 text-orange-600" />
                ) : (
                  <RiFocusLine className="w-5 h-5 text-primary" />
                )}
                <span className="text-sm font-medium text-gray-700">
                  {section.sectionName}
                </span>
              </div>
              {expandedSections.has(index) ? (
                <ChevronUpIcon className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronDownIcon className="w-4 h-4 text-gray-400" />
              )}
            </motion.div>

            <AnimatePresence>
              {expandedSections.has(index) && (
                <motion.div
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={sectionVariants}
                  className="ml-2 pl-5 border-l-2 border-gray-100"
                >
                  {section.sectionType === 0
                    ? section.sectionContent?.map((lesson) => (
                        <motion.div
                          key={lesson.lessonId}
                          whileHover={{ x: 5 }}
                          className={`flex items-center gap-3 p-2.5 mb-1 rounded-lg cursor-pointer text-sm transition-colors
                            ${
                              activeItem?.lessonId === lesson.lessonId
                                ? "bg-blue-100 text-primary"
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
                            <FcViewDetails className="w-4 h-4 flex-shrink-0" />
                          ) : (
                            <FcViewDetails className="w-4 h-4 flex-shrink-0" />
                          )}
                          <span className="truncate">{lesson.lessonName}</span>
                        </motion.div>
                      ))
                    : section.sectionTestContent?.map((test) => (
                        <motion.div
                          key={test.sectionTestId}
                          whileHover={{ x: 5 }}
                          className={`flex items-center gap-3 p-2.5 mb-1 rounded-lg cursor-pointer text-sm
                            ${
                              activeItem?.sectionTestId === test.sectionTestId
                                ? "bg-orange-100 text-orange-600"
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
                          <PiSealQuestionBold className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">Assessment Test</span>
                        </motion.div>
                      ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;
