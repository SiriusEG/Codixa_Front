import { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";

const CourseModal = ({ isOpen, onClose, onCourseAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/course-categories");
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.error || "Failed to load categories");
        setCategories(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (isOpen) fetchCategories();
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "image" ? files?.[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const formPayload = new FormData();
      formPayload.append("title", formData.title);
      formPayload.append("description", formData.description);
      formPayload.append("categoryId", formData.categoryId);

      if (formData.image) {
        formPayload.append("image", formData.image);
      }

      const token = sessionStorage.getItem("token");
      const response = await fetch("/api/add-new-course", {
        method: "POST",
        body: formPayload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to create course");

      onCourseAdded(data.data);
      onClose();
      setFormData({ title: "", description: "", categoryId: "", image: null });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Create New Course
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 font-bold text-5xl text-red-800"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6"
          encType="multipart/form-data"
        >
          <div className="space-y-6">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border focus:border-primary focus:ring-1 outline-none"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Image
              </label>
              <div className="flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary transition-colors">
                <input
                  type="file"
                  name="image"
                  onChange={handleInputChange}
                  className="hidden"
                  accept="image/*"
                  id="course-image"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="course-image"
                  className="cursor-pointer text-center p-4"
                >
                  <FaPlusCircle className="mx-auto text-gray-400 mb-2 text-2xl" />
                  <p className="text-sm text-gray-600">
                    {formData.image?.name ||
                      "Upload course image (JPEG/PNG up to 10MB)"}
                  </p>
                </label>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-2.5 rounded-lg border focus:border-primary focus:ring-1 outline-none"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              {loading ? (
                <div className="animate-pulse py-2.5 rounded-lg bg-gray-100" />
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-lg border focus:border-primary focus:ring-1 outline-none"
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.categoryId} value={cat.categoryId}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mt-6 p-3 bg-red-50 text-red-700 rounded-lg">
              Error: {error}
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary-100 text-white rounded-lg disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseModal;
