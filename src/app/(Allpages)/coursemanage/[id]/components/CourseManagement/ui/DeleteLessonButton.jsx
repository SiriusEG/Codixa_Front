"use client";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useToast } from "../../context/ToastContext";

export default function DeleteLessonButton({ lessonId }) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { addToast } = useToast();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const token = sessionStorage.getItem("token");

      const response = await fetch("/api/sec/deltlec", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ lessonId }),
      });

      const responseText = await response.text();
      const data = responseText ? JSON.parse(responseText) : {};

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete lesson");
      }

      addToast(data.message || "Lesson deleted successfully", "success");
      setIsConfirmOpen(false);
    } catch (error) {
      addToast(error.message, "error");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsConfirmOpen(true)}
        className="text-red-600 hover:text-red-800 transition-colors p-2"
        title="Delete lesson"
      >
        <FaTrash className="w-5 h-5" />
      </button>

      {isConfirmOpen && (
        <div className="fixed inset-0 bg-[#0000004b] bg-opacity-50 flex items-center justify-center p-4 z-[1000]">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p className="mb-6">
              Are you sure you want to delete this lesson? This action cannot be
              undone.
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-300"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
