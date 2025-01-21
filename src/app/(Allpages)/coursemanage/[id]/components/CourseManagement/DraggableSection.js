// components/CourseManagement/DraggableSection.js
"use client";

import { Draggable } from "react-beautiful-dnd";
import {
  FaRegTrashAlt,
  FaGripVertical,
  FaPlusCircle,
  FaVideo,
  FaFileAlt,
  FaQuestionCircle,
} from "react-icons/fa";

export default function DraggableSection({
  section,
  index,
  setSections,
  onAddLectureClick,
}) {
  const handleDeleteSection = () => {
    setSections((prev) => prev.filter((s) => s.id !== section.id));
  };

  const handleLectureChange = (lectureId, newData) => {
    setSections((prev) =>
      prev.map((s) => {
        if (s.id === section.id) {
          return {
            ...s,
            lectures: s.lectures.map((l) =>
              l.id === lectureId ? { ...l, ...newData } : l
            ),
          };
        }
        return s;
      })
    );
  };

  const handleDeleteLecture = (lectureId) => {
    setSections((prev) =>
      prev.map((s) => {
        if (s.id === section.id) {
          return {
            ...s,
            lectures: s.lectures.filter((l) => l.id !== lectureId),
          };
        }
        return s;
      })
    );
  };

  const getLectureIcon = (type) => {
    switch (type) {
      case "video":
        return <FaVideo className="text-primary-100" />;
      case "article":
        return <FaFileAlt className="text-green-600" />;
      case "quiz":
        return <FaQuestionCircle className="text-red-600" />;
      default:
        return <FaVideo className="text-primary-100" />;
    }
  };

  return (
    <Draggable draggableId={section.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="mb-6 border rounded-lg bg-white hover:shadow-md transition-shadow"
        >
          <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
            <div className="flex items-center">
              <span
                {...provided.dragHandleProps}
                className="text-gray-400 mr-2 cursor-move hover:text-primary-100"
              >
                <FaGripVertical className="text-lg" />
              </span>
              <input
                type="text"
                value={section.title}
                onChange={(e) => {
                  setSections((prev) =>
                    prev.map((s) =>
                      s.id === section.id ? { ...s, title: e.target.value } : s
                    )
                  );
                }}
                className="bg-transparent font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 px-2 py-1 rounded"
              />
            </div>
            <button
              onClick={handleDeleteSection}
              className="text-red-500 hover:text-red-600 p-1 rounded-full hover:bg-red-50"
            >
              <FaRegTrashAlt className="text-lg" />
            </button>
          </div>

          <div className="p-4">
            {section.lectures.map((lecture) => (
              <div
                key={lecture.id}
                className="flex items-center mb-3 last:mb-0 group hover:bg-gray-50 p-2 rounded"
              >
                <span className="w-8 flex justify-center">
                  {getLectureIcon(lecture.type)}
                </span>
                <input
                  type="text"
                  value={lecture.title}
                  onChange={(e) =>
                    handleLectureChange(lecture.id, { title: e.target.value })
                  }
                  className="flex-1 mx-4 bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 px-2 py-1 rounded"
                  placeholder="Lecture title"
                />
                <input
                  type="text"
                  value={lecture.duration}
                  onChange={(e) =>
                    handleLectureChange(lecture.id, {
                      duration: e.target.value,
                    })
                  }
                  className="w-20 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 px-2 py-1 rounded"
                  placeholder="0:00"
                />
                <button
                  onClick={() => handleDeleteLecture(lecture.id)}
                  className="ml-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-red-600"
                >
                  <FaRegTrashAlt className="text-sm" />
                </button>
              </div>
            ))}
            <button
              onClick={() => onAddLectureClick(section.id)}
              className="text-primary-100 hover:text-purple-700 flex items-center mt-4 px-2 py-1 rounded hover:bg-purple-50 w-fit"
            >
              <FaPlusCircle className="mr-2" />
              Add Lecture
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}
