import { useState } from "react";
import { FaSearch, FaPlusCircle, FaChartLine, FaEdit } from "react-icons/fa";
import Link from "next/link";

function Courses() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "FarLand Frontend Ultimate Course",
      image:
        "https://i.pinimg.com/236x/75/87/df/7587df77ef521cf98057d0028ee983f1.jpg",
      earnings: "$2,450",
      students: 245,
      description:
        "For a local business, like Retail store, Hotel, Restaurant or a hair salon nearby...",
      status: "Published",
      lastUpdated: "Today",
      lessons: 24,
      duration: "18.5 hours",
    },
    // Add more courses as needed
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewCourse({ ...newCourse, [name]: files[0] });
    } else {
      setNewCourse({ ...newCourse, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation and actual API call here
    const course = {
      id: courses.length + 1,
      ...newCourse,
      earnings: "$0",
      students: 0,
      status: "Draft",
      lastUpdated: "Now",
      lessons: 0,
      duration: "0 hours",
    };
    setCourses([...courses, course]);
    setIsModalOpen(false);
    setNewCourse({ title: "", description: "", image: null });
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-800">Your Courses</h1>
          <p className="text-gray-600 mt-2">
            Manage and track your course performance
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-primary-100 text-white rounded-lg flex items-center transition-colors"
        >
          <FaPlusCircle className="mr-2" />
          Create New Course
        </button>
      </div>

      {/* Search and Stats */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="relative w-full md:w-96 mb-4 md:mb-0">
            <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search your courses..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-100 focus:ring-1 focus:ring-primary-100 outline-none"
            />
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">
                {courses.length}
              </p>
              <p className="text-sm text-gray-600">Total Courses</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">
                $
                {courses
                  .reduce(
                    (acc, course) =>
                      acc + parseFloat(course.earnings.replace(/[^0-9.]/g, "")),
                    0
                  )
                  .toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total Earnings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="relative">
              <img
                src={course.image || placeholderImage}
                alt={course.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <h3 className="text-white font-semibold text-lg">
                  {course.title}
                </h3>
              </div>
              <span className="absolute top-2 right-2 bg-white/90 px-3 py-1 rounded-full text-sm text-gray-700">
                {course.status}
              </span>
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-600 text-sm">
                    {course.lessons} lessons • {course.duration}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {course.students} students enrolled
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary-100">
                    {course.earnings}
                  </p>
                  <p className="text-xs text-gray-500">Total earnings</p>
                </div>
              </div>

              <div className="flex justify-between items-center border-t pt-4">
                <Link
                  href={`coursemanage/${course.id}`}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center transition-colors"
                >
                  <FaEdit className="mr-2" />
                  Manage Course
                </Link>
                <span className="text-sm text-gray-500">
                  {course.lastUpdated}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Course Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-2xl">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">
                Create New Course
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newCourse.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                    placeholder="Enter course title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Image
                  </label>
                  <div className="flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 transition-colors">
                    <input
                      type="file"
                      name="image"
                      onChange={handleInputChange}
                      className="hidden"
                      accept="image/*"
                      id="course-image"
                    />
                    <label
                      htmlFor="course-image"
                      className="cursor-pointer text-center p-4"
                    >
                      <FaPlusCircle className="mx-auto text-gray-400 mb-2 text-2xl" />
                      <p className="text-sm text-gray-600">
                        {newCourse.image
                          ? newCourse.image.name
                          : "Upload course image"}
                      </p>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={newCourse.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                    placeholder="Describe your course..."
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-8">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Courses;
