import React from "react";
import {
  FaBook,
  FaQuestionCircle,
  FaPlayCircle,
  FaFileAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const CourseSidebar = ({
  currentProgress,
  expandedSections,
  toggleSection,
  activeItem,
  lessonTypes,
  fetchLessonDetails,
}) => {
  return (
    <div className="w-1/4 bg-white border-r overflow-y-auto p-4">
      <h2 className="text-xl font-bold mb-4">Course Content</h2>
      {currentProgress?.map((section, index) => (
        <div key={section.sectionId} className="mb-4">
          {/* Section Header */}
          <div
            className={`flex items-center justify-between cursor-pointer p-2 rounded ${
              expandedSections.has(index)
                ? "bg-gray-300"
                : section.sectionType === 1
                ? "bg-orange-50"
                : "bg-blue-50"
            }`}
            onClick={() => toggleSection(index)}
          >
            <div className="flex items-center gap-2">
              {section.sectionType === 1 ? (
                <FaQuestionCircle className="text-orange-600" />
              ) : (
                <FaBook className="text-blue-600" />
              )}
              <h3 className="font-semibold">{section.sectionName}</h3>
            </div>
            {expandedSections.has(index) ? (
              <FaChevronUp className="text-gray-500" />
            ) : (
              <FaChevronDown className="text-gray-500" />
            )}
          </div>

          {/* Section Content (lessons or tests) */}
          {expandedSections.has(index) && (
            <div className="mt-2">
              {section.sectionType === 0
                ? // Lesson items
                  section.sectionContent?.map((lesson, idx) => (
                    <div
                      key={`${lesson.lessonId}-${idx}`}
                      onClick={() =>
                        fetchLessonDetails(
                          lesson.lessonId,
                          false,
                          lesson.sectionId,
                          section.sectionName,
                          lesson.lessonName
                        )
                      }
                      className={`p-2 ml-4 mb-1 cursor-pointer rounded flex items-center gap-2 ${
                        activeItem &&
                        !activeItem.isTest &&
                        activeItem.lessonId === lesson.lessonId
                          ? "bg-gray-300 font-semibold"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {lessonTypes[lesson.lessonId] === "video" ? (
                        <FaPlayCircle className="text-green-500" />
                      ) : (
                        <FaFileAlt className="text-blue-500" />
                      )}
                      <span>{lesson.lessonName}</span>
                    </div>
                  ))
                : // Test items
                  section.sectionTestContent?.map((test, idx) => (
                    <div
                      key={`${test.sectionTestId}-${idx}`}
                      onClick={() =>
                        fetchLessonDetails(
                          test.sectionTestId,
                          true,
                          section.sectionId,
                          section.sectionName
                        )
                      }
                      className={`p-2 ml-4 mb-1 cursor-pointer rounded flex items-center gap-2 ${
                        activeItem &&
                        activeItem.isTest &&
                        activeItem.sectionTestId === test.sectionTestId
                          ? "bg-gray-300 font-semibold"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <FaQuestionCircle className="text-orange-500" />
                      <span>{section.sectionName}</span>
                    </div>
                  ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseSidebar;
