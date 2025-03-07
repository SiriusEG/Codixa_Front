"use client";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export const CourseContent = ({ sections }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
      <div className="space-y-4">
        {sections?.map((section, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <div
              className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
              onClick={() =>
                setExpandedSection(expandedSection === index ? null : index)
              }
            >
              <h3 className="font-semibold">{section.sectionName}</h3>
              {expandedSection === index ? (
                <FaChevronUp className="text-primary" />
              ) : (
                <FaChevronDown className="text-primary" />
              )}
            </div>

            <AnimatePresence>
              {expandedSection === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-white border-t">
                    {section.lessons?.length > 0 ? (
                      section.lessons.map((lesson, idx) => (
                        <div
                          key={idx}
                          className="py-2 px-4 bg-gray-50 border-primary-100 rounded-md my-1 hover:bg-gray-50"
                        >
                          {lesson.lessonName}
                        </div>
                      ))
                    ) : (
                      <div className="py-2 px-4 text-gray-500">
                        No lessons available
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};
