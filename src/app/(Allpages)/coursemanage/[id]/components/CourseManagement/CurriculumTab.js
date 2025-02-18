'use client';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import DraggableSection from './DraggableSection';
import LectureModal from './LectureModal';
import { useState, useEffect } from 'react';
import { FaPlusCircle, FaSave } from 'react-icons/fa';
import { useToast } from '../context/ToastContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function CurriculumTab({ courseId }) {
  const [sections, setSections] = useState([]);
  const [isLectureModalOpen, setIsLectureModalOpen] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasOrderChanged, setHasOrderChanged] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    fetchSections();
  }, [courseId]);

  const fetchSections = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem('token');
      const response = await fetch(`/api/sections/GetAllSections/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to fetch sections');
      const data = await response.json();
      setSections(data);
      setHasOrderChanged(false);
    } catch (error) {
      addToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [movedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, movedItem);

    const updatedSections = items.map((section, index) => ({
      ...section,
      sectionOrder: index + 1,
    }));

    setSections(updatedSections);
    setHasOrderChanged(true);
  };

  const handleSaveOrder = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('/api/sections/UpdateSectionsLessons', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(
          sections.map((section) => ({
            SectionId: section.sectionId,
            SectionOrder: section.sectionOrder,
            SectionName: section.sectionName,
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

      if (!response.ok) throw new Error('Failed to save order');
      addToast('Order saved successfully 💾');
      setHasOrderChanged(false);
    } catch (error) {
      addToast(error.message, 'error');
    }
  };

  const handleAddSection = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('/api/sections/AddNewSection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          courseId,
          sectionName: `New Section ${sections.length + 1}`,
          sectionOrder: sections.length + 1,
        }),
      });

      if (!response.ok) throw new Error('Failed to add section');
      await fetchSections();
      addToast('Section added successfully 🎉');
    } catch (error) {
      addToast(error.message, 'error');
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
            onClick={handleAddSection}
            className="px-4 py-2 bg-primary-100 text-white rounded-lg flex items-center gap-2 hover:bg-primary-110 transition-colors"
          >
            <FaPlusCircle className="mr-2" />
            Add Section
          </button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} height={100} className="rounded-lg" />
          ))}
        </div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="sections">
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
