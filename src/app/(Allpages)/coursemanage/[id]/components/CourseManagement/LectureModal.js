"use client";

import { useState } from "react";
import { FaTimes, FaCloudUploadAlt } from "react-icons/fa";

export default function LectureModal({ isOpen, onClose, onAddLecture }) {
  const [newLecture, setNewLecture] = useState({
    title: "",
    type: "video",
    duration: "",
    file: null,
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewLecture((prev) => ({ ...prev, file }));
    }
  };

  const simulateFileUpload = (file) => {
    return new Promise((resolve) => {
      setIsUploading(true);
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 1;
        if (progress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          resolve(file);
        }
        setUploadProgress(progress);
      }, 200);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newLecture.title.trim()) return;

    if (newLecture.type === "video" && !newLecture.file) {
      alert("Please select a video file");
      return;
    }

    // If video type, handle file upload
    if (newLecture.type === "video" && newLecture.file) {
      try {
        const uploadedFile = await simulateFileUpload(newLecture.file);
        // You would typically get the file URL from your API here
        const lectureData = {
          ...newLecture,
          fileUrl: URL.createObjectURL(uploadedFile),
          file: null, // Clear the file from state
        };
        onAddLecture(lectureData);
      } catch (error) {
        console.error("Upload failed:", error);
        return;
      }
    } else {
      onAddLecture(newLecture);
    }

    setNewLecture({ title: "", type: "video", duration: "", file: null });
    setUploadProgress(0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes className="text-lg" />
        </button>

        <h3 className="text-xl font-semibold mb-4">Add New Lecture</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Lecture Title
            </label>
            <input
              type="text"
              value={newLecture.title}
              onChange={(e) =>
                setNewLecture({ ...newLecture, title: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <select
              value={newLecture.type}
              onChange={(e) =>
                setNewLecture({ ...newLecture, type: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="video">Video</option>
              <option value="article">Article</option>
              <option value="quiz">Quiz</option>
            </select>
          </div>

          {newLecture.type === "video" && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Upload Video
              </label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 transition-colors">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="flex flex-col items-center text-gray-500">
                  <FaCloudUploadAlt className="text-2xl mb-2" />
                  <span className="text-sm">
                    {newLecture.file
                      ? newLecture.file.name
                      : "Click to select video"}
                  </span>
                  <span className="text-xs text-gray-400">
                    MP4, MOV, AVI (max 2GB)
                  </span>
                </div>
              </label>

              {isUploading && (
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-primary-100 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500 mt-1 block">
                    Uploading: {uploadProgress}%
                  </span>
                </div>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">
              Duration (mm:ss)
            </label>
            <input
              type="text"
              value={newLecture.duration}
              onChange={(e) =>
                setNewLecture({ ...newLecture, duration: e.target.value })
              }
              placeholder="5:30"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              pattern="\d+:\d{2}"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-100 text-white rounded-lg   disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Add Lecture"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
