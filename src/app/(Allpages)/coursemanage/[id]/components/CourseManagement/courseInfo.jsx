"use client";
import { useState, useEffect } from "react";
import { useToast } from "../context/ToastContext";

export default function CourseInfo({ courseData, refreshData }) {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    CourseName: "",
    CourseDescription: "",
    IsPublished: false,
    CourseCardPhoto: null,
  });
  const [originalData, setOriginalData] = useState({});
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (courseData) {
      setOriginalData(courseData);
      setFormData({
        CourseName: courseData.courseName,
        CourseDescription: courseData.courseDescription,
        IsPublished: Boolean(courseData.isPublished), // Ensure boolean conversion
        CourseCardPhoto: null,
      });
      setImagePreview(
        courseData.courseCardPhotoFilePath
          ? `https://codixa.runasp.net/${courseData.courseCardPhotoFilePath.replace(
              /\\/g,
              "/"
            )}`
          : ""
      );
    }
  }, [courseData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFormData((prev) => ({ ...prev, CourseCardPhoto: file }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        addToast("Authentication required", "error");
        return;
      }

      const formPayload = new FormData();
      formPayload.append("id", courseData.courseId);

      if (formData.CourseName !== originalData.courseName) {
        formPayload.append("CourseName", formData.CourseName);
      }
      if (formData.CourseDescription !== originalData.courseDescription) {
        formPayload.append("CourseDescription", formData.CourseDescription);
      }
      if (formData.IsPublished !== originalData.isPublished) {
        formPayload.append("IsPublished", formData.IsPublished.toString());
      }
      formPayload.append("CategoryId", originalData.categoryId.toString());

      if (formData.CourseCardPhoto instanceof File) {
        formPayload.append("CourseCardPhoto", formData.CourseCardPhoto);
      }

      const response = await fetch("/api/crs/upcrsinfo", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formPayload,
      });

      const contentType = response.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        try {
          data = JSON.parse(text);
        } catch {
          data = { message: text };
        }
      }

      if (!response.ok) throw new Error(data.message || "Update failed");

      addToast(data.message || "Course updated successfully!");
      await refreshData();
    } catch (error) {
      addToast(error.message, "error");
      console.error("Update error:", error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-6">Course Information</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current Image */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Current Image
          </label>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Course preview"
              className="w-48 h-48 object-cover rounded-lg border-2 border-gray-200"
            />
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Update Image</label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark"
            />
          </div>
        </div>

        {/* Course Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Course Name</label>
          <input
            type="text"
            value={formData.CourseName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, CourseName: e.target.value }))
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={formData.CourseDescription}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                CourseDescription: e.target.value,
              }))
            }
            className="w-full px-4 py-2 border rounded-lg h-32 focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>

        {/* Publish Status */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.IsPublished}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  IsPublished: e.target.checked,
                }))
              }
              className="w-5 h-5 text-primary rounded focus:ring-primary"
            />
            <label className="text-sm font-medium">Publish Course</label>
          </div>
          {originalData.isPublished !== undefined && (
            <span className="text-xs text-gray-500">
              Originally{" "}
              {originalData.isPublished ? "Published" : "Unpublished"}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
