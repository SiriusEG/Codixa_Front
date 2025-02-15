"use client";
import { useState, useEffect } from "react";
import { useToast } from "../context/ToastContext";

export default function CourseInfo({ courseData, refreshData }) {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    courseName: "",
    courseDescription: "",
    categoryId: 0,
    isPublished: false,
    courseCardPhotoPath: null,
  });
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (courseData) {
      setFormData({
        courseName: courseData.courseName,
        courseDescription: courseData.courseDescription,
        categoryId: courseData.categoryId,
        isPublished: courseData.isPublished,
        courseCardPhotoPath: courseData.courseCardPhotoPath,
      });
      setImagePreview(
        courseData.courseCardPhotoPath
          ? `https://codixa.runasp.net/${courseData.courseCardPhotoPath.replace(
              /\\/g,
              "/"
            )}`
          : ""
      );
    }
  }, [courseData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setImagePreview("");
      setFormData((prev) => ({ ...prev, courseCardPhotoPath: null }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFormData((prev) => ({ ...prev, courseCardPhotoPath: file }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview("");
    setFormData((prev) => ({ ...prev, courseCardPhotoPath: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      const formPayload = new FormData();

      // Append all fields
      formPayload.append("id", courseData.courseId);
      formPayload.append("courseName", formData.courseName);
      formPayload.append("courseDescription", formData.courseDescription);
      formPayload.append("categoryId", formData.categoryId);
      formPayload.append("isPublished", formData.isPublished);

      // Handle image
      if (formData.courseCardPhotoPath instanceof File) {
        formPayload.append("image", formData.courseCardPhotoPath);
      } else if (formData.courseCardPhotoPath === null) {
        formPayload.append("courseCardPhotoPath", "null");
      }

      const response = await fetch("/api/updateinfo", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formPayload,
      });

      if (!response.ok) throw new Error("Update failed");

      addToast("Course updated successfully!");
      await refreshData();
    } catch (error) {
      addToast(error.message, "error");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-6">Course Information</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload Section */}
        <div>
          <label className="block text-sm font-medium mb-2">Course Image</label>
          <div className="flex items-center gap-4">
            {imagePreview && (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Course preview"
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-full hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary-100 file:text-white hover:file:bg-primary-110"
            />
          </div>
        </div>

        {/* Other Form Fields */}
        <div>
          <label className="block text-sm font-medium mb-2">Course Name</label>
          <input
            type="text"
            value={formData.courseName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, courseName: e.target.value }))
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-100"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={formData.courseDescription}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                courseDescription: e.target.value,
              }))
            }
            className="w-full px-4 py-2 border rounded-lg h-32 focus:ring-2 focus:ring-primary-100"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={formData.isPublished}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                isPublished: e.target.checked,
              }))
            }
            className="w-5 h-5 text-primary-100 rounded focus:ring-primary-100"
          />
          <label className="text-sm font-medium">Publish Course</label>
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-primary-100 text-white rounded-lg hover:bg-primary-110 transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
