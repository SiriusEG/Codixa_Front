import { useState } from "react";
import { FaSearch, FaPlusCircle, FaUserAlt } from "react-icons/fa";

function Courses() {
  const [courses, setCourses] = useState([
    {
      title: "farLand Frontend Ultimate course",
      image:
        "https://i.pinimg.com/736x/20/8d/70/208d70e0ad0dba556decdf3a02e825f2.jpg", // Replace with actual image path
      price: "$50",
      description:
        "For a local business, like Retail store, Hotel, Restaurant or a hair salon nearby, you will need to judge the provider image quality and relevance wrt to the respective business.",
      date: "Today",
    },
    // Add more courses as needed
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const truncateDescription = (description, wordLimit) => {
    const words = description.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return description;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <FaSearch className="text-gray-600" />
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>
        <button
          onClick={toggleModal}
          className="px-4 py-2 bg-primary-100 flex items-center justify-center text-white rounded-md "
        >
          <FaPlusCircle className="mr-2" />
          Add Course
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-4">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white p-4 border rounded-lg shadow-md hover:shadow-lg"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-semibold">{course.title}</span>
            </div>
            <div className="mb-4 text-gray-500">
              {truncateDescription(course.description, 30)}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{course.price}</span>
              <button className="px-4 py-2 bg-primary-100 text-white rounded-md">
                See details ~
              </button>
            </div>
            <div className="flex justify-between items-center text-gray-400 mt-2"></div>
          </div>
        ))}
      </div>

      {/* Modal for adding a course */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-semibold mb-4">Add New Course</h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Course Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                  placeholder="Enter course title"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Course Image
                </label>
                <input
                  type="file"
                  id="image"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Course Description
                </label>
                <textarea
                  id="description"
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter course description"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-100 text-white rounded-md "
                >
                  Add Course
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
