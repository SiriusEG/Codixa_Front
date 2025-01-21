"use client";

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import DraggableSection from "./DraggableSection";
import LectureModal from "./LectureModal";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

export default function CurriculumTab({ sections, setSections }) {
  const [isLectureModalOpen, setIsLectureModalOpen] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState(null);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSections(items);
  };

  const handleAddLecture = (newLecture) => {
    const updatedSections = sections.map((section) => {
      if (section.id === selectedSectionId) {
        return {
          ...section,
          lectures: [
            ...section.lectures,
            {
              id: `lecture${section.lectures.length + 1}`,
              ...newLecture,
            },
          ],
        };
      }
      return section;
    });
    setSections(updatedSections);
  };

  const handleAddSection = () => {
    const newSection = {
      id: `section${sections.length + 1}`,
      title: "New Section",
      lectures: [],
    };
    setSections([...sections, newSection]);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Course Curriculum</h2>
        <button
          onClick={handleAddSection}
          className="px-4 py-2 bg-primary-100 text-white rounded-lg flex items-center   transition-colors"
        >
          <FaPlusCircle className="mr-2" />
          Add Section
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {sections.map((section, index) => (
                <DraggableSection
                  key={section.id}
                  section={section}
                  index={index}
                  setSections={setSections}
                  onAddLectureClick={(sectionId) => {
                    setSelectedSectionId(sectionId);
                    setIsLectureModalOpen(true);
                  }}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <LectureModal
        isOpen={isLectureModalOpen}
        onClose={() => setIsLectureModalOpen(false)}
        onAddLecture={handleAddLecture}
      />
    </div>
  );
}
