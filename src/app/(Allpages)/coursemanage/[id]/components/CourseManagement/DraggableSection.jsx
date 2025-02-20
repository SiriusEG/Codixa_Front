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
} from "react-icons/fa";
import { useState } from "react";
import { useToast } from "../context/ToastContext";
import DeleteLessonButton from "./ui/DeleteLessonButton";
import ConfirmationModal from "./ui/ConfirmationModal";

export default function DraggableSection({
  section,
  index,
  refreshSections,
  onAddLectureClick,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sectionName, setSectionName] = useState(section.sectionName);
  const { addToast } = useToast();

  const handleDelete = async (Id) => {
    setShowDeleteModal(false);
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch("/api/sec/dltsec", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sectionId: Id }),
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
      const token = sessionStorage.getItem("token");
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
            Lessons:
              section.sectionContent?.map((lesson) => ({
                LessonId: lesson.lessonId,
                LessonOrder: lesson.lessonOrder,
                LessonName: lesson.lessonName,
              })) || [],
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

  return (
    <Draggable draggableId={`section-${section.sectionId}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`bg-gray-50 rounded-lg p-4 mb-4 shadow-sm transition-all ${
            snapshot.isDragging ? "bg-blue-50 ring-2 ring-primary-100" : ""
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
                <h3 className="font-semibold text-gray-800">
                  {section.sectionName}
                </h3>
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
                onClick={() => onAddLectureClick(section.sectionId)}
                className="text-primary-100 hover:text-primary-110 transition-colors"
              >
                <FaPlus size={18} />
              </button>
            </div>
          </div>

          <Droppable droppableId={`lessons-${section.sectionId}`} type="LESSON">
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
                        <DeleteLessonButton lessonId={lesson.lessonId} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <ConfirmationModal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={() => handleDelete(section.sectionId)}
            title="Delete Section"
            message="Are you sure you want to delete this section? All lessons in this section will be permanently removed."
          />
        </div>
      )}
    </Draggable>
  );
}
