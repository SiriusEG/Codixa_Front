"use client";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import DraggableSection from "./DraggableSection";
import LectureModal from "./LectureModal";
import { useState, useEffect } from "react";
import { FaPlusCircle, FaSave } from "react-icons/fa";
import { useToast } from "../context/ToastContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="relative p-4">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default function CurriculumTab({ courseId }) {
  const [sections, setSections] = useState([]);
  const [isLectureModalOpen, setIsLectureModalOpen] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasOrderChanged, setHasOrderChanged] = useState(false);
  const [isSectionTypeModalOpen, setIsSectionTypeModalOpen] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    fetchSections();
  }, [courseId]);

  const fetchSections = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/sec/getAllSections/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch sections");
      const data = await response.json();
      setSections(data);
      setHasOrderChanged(false);
    } catch (error) {
      addToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    if (result.type === "SECTION") {
      const items = Array.from(sections);
      const [movedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, movedItem);

      const updatedSections = items.map((section, index) => ({
        ...section,
        sectionOrder: index + 1,
      }));

      setSections(updatedSections);
      setHasOrderChanged(true);
    } else if (result.type === "LESSON") {
      const sourceSectionId = parseInt(result.source.droppableId.split("-")[1]);
      const destSectionId = parseInt(
        result.destination.droppableId.split("-")[1]
      );
      const sourceIndex = result.source.index;
      const destIndex = result.destination.index;

      if (sourceSectionId === destSectionId) {
        const updatedSections = sections.map((section) => {
          if (section.sectionId === sourceSectionId) {
            const lessons = Array.from(section.sectionContent);
            const [movedLesson] = lessons.splice(sourceIndex, 1);
            lessons.splice(destIndex, 0, movedLesson);

            return {
              ...section,
              sectionContent: lessons.map((lesson, index) => ({
                ...lesson,
                lessonOrder: index + 1,
              })),
            };
          }
          return section;
        });

        setSections(updatedSections);
        setHasOrderChanged(true);
      }
    }
  };

  const handleSaveOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/sec/updateSectionsLessons", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(
          sections.map((section) => ({
            SectionId: section.sectionId,
            SectionOrder: section.sectionOrder,
            SectionName: section.sectionName,
            SectionType: section.sectionType, // Added sectionType here
            Lessons:
              section.sectionContent?.map((lesson) => ({
                LessonId: lesson.lessonId,
                sectionId: section.sectionId,
                LessonOrder: lesson.lessonOrder,
                LessonName: lesson.lessonName,
              })) || [],
          }))
        ),
      });

      if (!response.ok) throw new Error("Failed to save order");
      addToast("Order saved successfully 💾");
      setHasOrderChanged(false);
    } catch (error) {
      addToast(error.message, "error");
    }
  };

  const handleAddSection = async (sectionType) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/sec/+sec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          courseId: Number(courseId),
          sectionName: `${sectionType === 1 ? "Test " : ""}Section ${
            sections.length + 1
          }`,
          sectionOrder: sections.length + 1,
          sectionType: sectionType,
        }),
      });

      if (!response.ok) throw new Error("Failed to add section");
      await fetchSections();
      addToast("Section added successfully 🎉");
    } catch (error) {
      addToast(error.message, "error");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Course Curriculum</h2>
        <div className="flex gap-4">
          <button
            onClick={handleSaveOrder}
            disabled={!hasOrderChanged}
            className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors disabled:opacity-50 disabled:hover:bg-green-500"
          >
            <FaSave className="mr-2" />
            Save Order
          </button>
          <button
            onClick={() => setIsSectionTypeModalOpen(true)}
            className="px-4 py-2 bg-primary-100 text-white rounded-lg flex items-center gap-2 hover:bg-primary-110 transition-colors"
          >
            <FaPlusCircle className="mr-2" />
            Add Section
          </button>
        </div>
      </div>

      <Modal
        isOpen={isSectionTypeModalOpen}
        onClose={() => setIsSectionTypeModalOpen(false)}
      >
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">Select Section Type</h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                setIsSectionTypeModalOpen(false);
                handleAddSection(0);
              }}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex flex-col items-center">
                <span className="text-lg">📚 Normal Section</span>
                <p className="text-sm text-gray-600 mt-2">
                  For regular lessons and content
                </p>
              </div>
            </button>
            <button
              onClick={() => {
                setIsSectionTypeModalOpen(false);
                handleAddSection(1);
              }}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex flex-col items-center">
                <span className="text-lg">📝 Test Section</span>
                <p className="text-sm text-gray-600 mt-2">
                  For quizzes and assessments
                </p>
              </div>
            </button>
          </div>
        </div>
      </Modal>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} height={100} className="rounded-lg" />
          ))}
        </div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="sections" type="SECTION">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                {sections.map((section, index) => (
                  <DraggableSection
                    key={section.sectionId}
                    section={section}
                    index={index}
                    refreshSections={fetchSections}
                    onAddLectureClick={() => {
                      setSelectedSectionId(section.sectionId);
                      setIsLectureModalOpen(true);
                    }}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}

      <LectureModal
        isOpen={isLectureModalOpen}
        onClose={() => setIsLectureModalOpen(false)}
        sectionId={selectedSectionId}
        refreshSections={fetchSections}
      />
    </div>
  );
}
