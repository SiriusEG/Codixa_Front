"use client";
import { Draggable, Droppable } from "react-beautiful-dnd";
import {
  FaEdit,
  FaSave,
  FaTrash,
  FaPlus,
  FaGripVertical,
  FaVideo,
  FaFileAlt,
  FaClipboardList,
} from "react-icons/fa";
import { useState } from "react";
import { useToast } from "../context/ToastContext";
import DeleteLessonButton from "./ui/DeleteLessonButton";
import ConfirmationModal from "./ui/ConfirmationModal";
import TestSectionForm from "./ui/TestSectionForm";

export default function DraggableSection({
  section,
  index,
  refreshSections,
  onAddLectureClick,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [sectionName, setSectionName] = useState(section.sectionName);
  const { addToast } = useToast();

  const isTestSection = section.sectionType === 1;

  const handleDelete = async (Id) => {
    setShowDeleteModal(false);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/sec/dltsec/${Id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete section");
      }

      addToast("Section deleted successfully 🗑️");
      await refreshSections();
    } catch (error) {
      addToast(
        error.message.startsWith("Unexpected token")
          ? "Invalid server response"
          : error.message,
        "error"
      );
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/sec/UpdateSectionsLessons", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify([
          {
            SectionId: section.sectionId,
            SectionOrder: section.sectionOrder,
            SectionName: sectionName,
            SectionType: section.sectionType,
            Lessons: !isTestSection
              ? section.sectionContent?.map((lesson) => ({
                  LessonId: lesson.lessonId,
                  LessonOrder: lesson.lessonOrder,
                  LessonName: lesson.lessonName,
                })) || []
              : [],
          },
        ]),
      });

      if (!response.ok) throw new Error("Failed to save changes");
      setIsEditing(false);
      addToast("Changes saved successfully 💾");
      await refreshSections();
    } catch (error) {
      addToast(error.message, "error");
    }
  };

  const handleAddClick = () => {
    if (isTestSection) {
      setShowTestModal(true);
    } else {
      onAddLectureClick(section.sectionId);
    }
  };

  return (
    <Draggable draggableId={`section-${section.sectionId}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`${
            isTestSection ? "bg-orange-50" : "bg-gray-50"
          } rounded-lg p-4 mb-4 shadow-sm transition-all ${
            snapshot.isDragging ? "ring-2 ring-primary-100" : ""
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 flex-1">
              <span {...provided.dragHandleProps}>
                <FaGripVertical className="text-gray-400 hover:text-primary-100 cursor-move transition-colors" />
              </span>
              {isEditing ? (
                <input
                  type="text"
                  value={sectionName}
                  onChange={(e) => setSectionName(e.target.value)}
                  className="font-semibold bg-white px-3 py-1 rounded border w-full focus:ring-2 focus:ring-primary-100"
                  autoFocus
                />
              ) : (
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-800">
                    {section.sectionName}
                  </h3>
                  {isTestSection && (
                    <FaClipboardList className="text-orange-500" />
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="text-green-500 hover:text-green-600 transition-colors"
                >
                  <FaSave size={18} />
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-500 hover:text-blue-600 transition-colors"
                >
                  <FaEdit size={18} />
                </button>
              )}
              <button
                onClick={() => setShowDeleteModal(true)}
                className="text-red-500 hover:text-red-600 transition-colors"
              >
                <FaTrash size={18} />
              </button>
              <button
                onClick={handleAddClick}
                className={`${
                  isTestSection
                    ? "text-orange-500 hover:text-orange-600"
                    : "text-primary-100 hover:text-primary-110"
                } transition-colors`}
              >
                <FaPlus size={18} />
              </button>
            </div>
          </div>

          {/* Lesson List for Normal Sections */}
          {!isTestSection && (
            <Droppable
              droppableId={`lessons-${section.sectionId}`}
              type="LESSON"
            >
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="ml-8 space-y-2"
                >
                  {section.sectionContent?.map((lesson, lessonIndex) => (
                    <Draggable
                      key={`lesson-${lesson.lessonId}`}
                      draggableId={`lesson-${lesson.lessonId}`}
                      index={lessonIndex}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors ${
                            snapshot.isDragging
                              ? "bg-blue-50 ring-2 ring-primary-100"
                              : ""
                          }`}
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <span {...provided.dragHandleProps}>
                              <FaGripVertical className="text-gray-400 hover:text-primary-100 cursor-move transition-colors" />
                            </span>
                            {lesson.isVideo ? (
                              <FaVideo className="text-blue-500" />
                            ) : (
                              <FaFileAlt className="text-green-500" />
                            )}
                            <p className="text-sm font-medium text-gray-700">
                              {lesson.lessonName}
                            </p>
                            {lesson.isVideo && lesson.videoLink && (
                              <a
                                href={`https://codixa.runasp.net/${lesson.videoLink.replace(
                                  /\\/g,
                                  "/"
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-primary-100 hover:underline ml-2"
                              >
                                (Preview)
                              </a>
                            )}
                          </div>
                          <span className="text-xs text-gray-500">
                            Order: {lesson.lessonOrder}
                          </span>
                          <DeleteLessonButton
                            lessonId={lesson.lessonId}
                            refreshSections={refreshSections}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}

          {/* Test Section Content */}
          {isTestSection && (
            <div className="ml-8 p-3 bg-white rounded-lg">
              {section.testContent ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">
                    Passing Score: {section.testContent.successResult}%
                  </p>
                  <p className="text-sm text-gray-500">
                    Test Duration: {section.testContent.testDuration} minutes
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  No test configuration found
                </p>
              )}
            </div>
          )}

          {/* Delete Confirmation Modal */}
          <ConfirmationModal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={() => handleDelete(section.sectionId)}
            title="Delete Section"
            message="Are you sure you want to delete this section? All content in this section will be permanently removed."
          />

          {/* Test Configuration Modal */}
          {showTestModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-2xl w-full">
                <TestSectionForm
                  sectionId={section.sectionId}
                  onClose={() => setShowTestModal(false)}
                  initialData={section.testContent}
                  refreshSections={refreshSections}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}
