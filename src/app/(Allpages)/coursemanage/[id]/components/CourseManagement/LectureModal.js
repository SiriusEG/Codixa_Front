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
    lessonName: "",
    isVideo: true,
    videoLink: "",
    lessonText: "",
    lessonOrder: 1,
    isForPreview: false,
  });
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      const payload = {
        sectionId,
        ...formData,
        lessonOrder: Number(formData.lessonOrder),
      };

      if (formData.isVideo && formData.videoLink) {
        payload.videoLink = formData.videoLink.replace(
          "https://codixa.runasp.net/",
          ""
        );
      }

      const response = await fetch("/api/sections/AddNewLesson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to add lesson");

      await refreshSections();
      onClose();
      addToast("Lecture added successfully 🎉");
      setFormData({
        lessonName: "",
        isVideo: true,
        videoLink: "",
        lessonText: "",
        lessonOrder: 1,
        isForPreview: false,
      });
    } catch (error) {
      addToast(error.message, "error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[999]">
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
              value={formData.lessonName}
              onChange={(e) =>
                setFormData({ ...formData, lessonName: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content Type
            </label>
            <select
              value={formData.isVideo ? "video" : "text"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  isVideo: e.target.value === "video",
                })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-100"
            >
              <option value="video">Video</option>
              <option value="text">Text</option>
            </select>
          </div>

          {formData.isVideo ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video Path
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 whitespace-nowrap">
                  codixa.runasp.net/
                </span>
                <input
                  type="text"
                  value={formData.videoLink}
                  onChange={(e) =>
                    setFormData({ ...formData, videoLink: e.target.value })
                  }
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-100"
                  placeholder="uploads/path/to/video.mp4"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lesson Content
              </label>
              <textarea
                value={formData.lessonText}
                onChange={(e) =>
                  setFormData({ ...formData, lessonText: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-100"
                rows="4"
              />
            </div>
          )}

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
