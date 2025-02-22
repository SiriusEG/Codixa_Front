"use client";
import { useState, useRef } from "react";
import axios from "axios";
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
    Video: null,
    LessonText: "",
    LessonOrder: "1",
    IsForpreview: "false",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const uploadComplete = useRef(false);
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.LessonName.trim()) {
        throw new Error("Lecture name is required");
      }
      if (formData.IsVideo === "true" && !formData.Video) {
        throw new Error("Please select a video file");
      }

      const token = sessionStorage.getItem("token");
      const formPayload = new FormData();
      formPayload.append("SectionId", sectionId.toString());
      formPayload.append("LessonName", formData.LessonName);
      formPayload.append("IsVideo", formData.IsVideo);
      formPayload.append("LessonOrder", formData.LessonOrder);
      formPayload.append("IsForpreview", formData.IsForpreview);

      if (formData.IsVideo === "true") {
        formPayload.append("Video", formData.Video);
      } else {
        formPayload.append("LessonText", formData.LessonText);
      }

      setIsLoading(true);
      setUploadProgress(0);
      uploadComplete.current = false;

      // Direct API call to external endpoint
      await axios.post(
        "https://codixa.runasp.net/api/Lesson/AddNewLesson",
        formPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            const total = progressEvent.total || 1;
            const progress = Math.round((progressEvent.loaded * 100) / total);
            setUploadProgress(progress);
            if (progress === 100) uploadComplete.current = true;
          },
        }
      );

      await new Promise((resolve) => setTimeout(resolve, 1000));
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
      setUploadProgress(0);
      setIsLoading(false);
    } catch (error) {
      addToast(error.message, "error");
      setIsLoading(false);
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
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video File
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="video/*"
                  disabled={isLoading}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const maxSizeInMB = 500;
                      if (file.size > maxSizeInMB * 1024 * 1024) {
                        addToast(
                          `File size exceeds ${maxSizeInMB} MB limit`,
                          "error"
                        );
                        return;
                      }
                      setFormData({ ...formData, Video: file });
                    }
                  }}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-100 disabled:opacity-50"
                />
                {formData.Video && (
                  <p className="text-sm text-gray-600 mt-1">
                    Selected: {formData.Video.name} (
                    {(formData.Video.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
                {isLoading && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-primary h-3 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>
                        {uploadComplete.current
                          ? "Processing..."
                          : "Uploading..."}
                      </span>
                      <span>{uploadProgress}%</span>
                    </div>
                  </div>
                )}
              </div>
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
              className="h-4 w-4 rounded border-gray-300 text-primary-100 focus:ring-primary-100 cursor-pointer"
            />
            <label className="text-sm font-medium text-gray-700 cursor-pointer">
              Available for Preview
            </label>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-6 py-2 bg-primary-100 text-white rounded-lg hover:bg-primary-110 transition-colors cursor-pointer ${
                isLoading ? "opacity-70" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <span className="animate-spin inline-block w-4 h-4 border-t-2 border-b-2 border-white rounded-full"></span>
                  <span>Adding...</span>
                </div>
              ) : (
                "Add Lecture"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
