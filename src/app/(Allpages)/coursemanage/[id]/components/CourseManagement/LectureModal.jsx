"use client";
import { useState } from "react";
import { useToast } from "../context/ToastContext";

export default function LectureModal({
  isOpen,
  onClose,
  sectionId,
  refreshSections,
}) {
  const [formData, setFormData] = useState({
    LessonName: "",
    IsVideo: "true",
    Video: null, // File input
    LessonText: "",
    LessonOrder: "1",
    IsForpreview: "false",
  });

  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");

      const formPayload = new FormData();
      formPayload.append("SectionId", sectionId.toString());
      formPayload.append("LessonName", formData.LessonName);
      formPayload.append("IsVideo", formData.IsVideo);
      formPayload.append("LessonOrder", formData.LessonOrder);
      formPayload.append("IsForpreview", formData.IsForpreview);

      if (formData.IsVideo === "true" && formData.Video) {
        formPayload.append("Video", formData.Video); // Attach file
      } else {
        formPayload.append("LessonText", formData.LessonText);
      }

      const response = await fetch("/api/sec/+lec", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formPayload, // Send as multipart/form-data
      });

      if (!response.ok) throw new Error("Failed to add lesson");

      await refreshSections();
      onClose();
      addToast("Lecture added successfully 🎉");

      setFormData({
        LessonName: "",
        IsVideo: "true",
        Video: null,
        LessonText: "",
        LessonOrder: "1",
        IsForpreview: "false",
      });
    } catch (error) {
      addToast(error.message, "error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#00000051] bg-opacity-50 flex items-center justify-center p-4 z-[999]">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Add New Lecture
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lecture Name
            </label>
            <input
              type="text"
              required
              value={formData.LessonName}
              onChange={(e) =>
                setFormData({ ...formData, LessonName: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content Type
            </label>
            <select
              value={formData.IsVideo === "true" ? "video" : "text"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  IsVideo: e.target.value === "video" ? "true" : "false",
                })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-100"
            >
              <option value="video">Video</option>
              <option value="text">Text</option>
            </select>
          </div>

          {formData.IsVideo === "true" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video File
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) =>
                  setFormData({ ...formData, Video: e.target.files[0] })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-100"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lesson Content
              </label>
              <textarea
                value={formData.LessonText}
                onChange={(e) =>
                  setFormData({ ...formData, LessonText: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-100"
                rows="4"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lesson Order
            </label>
            <input
              type="number"
              value={formData.LessonOrder}
              onChange={(e) =>
                setFormData({ ...formData, LessonOrder: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-100"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.IsForpreview === "true"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  IsForpreview: e.target.checked ? "true" : "false",
                })
              }
              className="h-4 w-4 rounded border-gray-300 text-primary-100 focus:ring-primary-100"
            />
            <label className="text-sm font-medium text-gray-700">
              Available for Preview
            </label>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary-100 text-white rounded-lg hover:bg-primary-110 transition-colors"
            >
              Add Lecture
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
