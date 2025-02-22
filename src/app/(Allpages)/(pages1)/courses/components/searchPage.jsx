"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { CiTimer } from "react-icons/ci";
import Link from "next/link";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const SearchPage = () => {
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fetch("https://codixa.runasp.net/api/CourseCategory")
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    setIsLoading(true);
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `https://codixa.runasp.net/api/Courses/Search/${currentPage}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              courseName: searchTerm,
              categoryId: selectedCategory,
            }),
          }
        );

        const data = await response.json();

        const formattedCourses =
          data.courses?.map((course) => ({
            id: course.courseId,
            title: course.courseName,
            description: course.courseDescription,
            category: course.categoryName,
            imageUrl: course.courseCardPhoto
              ? `https://codixa.runasp.net/${course.courseCardPhoto.replace(
                  /\\/g,
                  "/"
                )}`
              : "/imgs/study-place.jpg",
          })) || [];

        setCourses(formattedCourses);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("API Error:", error);
        setCourses([]);
        setTotalPages(1);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [searchTerm, selectedCategory, currentPage, isMounted]);

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen w-screen p-6 gap-6">
      {/* Filters Section */}
      <div className="w-full md:w-1/4">
        <div className="bg-gray-100 rounded-xl p-6 shadow-lg h-fit sticky top-6">
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full mb-6 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-800"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />

          <FilterSection
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={(id) => {
              setSelectedCategory(id);
              setCurrentPage(1);
            }}
            isMounted={isMounted}
          />
        </div>
      </div>

      {/* Results Section */}
      <div className="w-full md:w-3/4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Search Results
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-lg h-[500px] animate-pulse"
              />
            ))
          ) : courses.length === 0 ? (
            <p className="text-gray-600 col-span-full p-6 bg-white rounded-xl">
              No courses found
            </p>
          ) : (
            courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))
          )}
        </div>

        {isMounted && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

const FilterSection = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  isMounted,
}) => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="space-y-6">
      <div>
        <div
          className="flex justify-between items-center p-4 bg-gray-50 rounded-lg cursor-pointer"
          onClick={() => toggleSection("category")}
        >
          <span className="font-bold text-gray-800">Category</span>
          {openSections.category ? (
            <RiArrowDropUpLine className="text-2xl text-gray-600" />
          ) : (
            <RiArrowDropDownLine className="text-2xl text-gray-600" />
          )}
        </div>
        {openSections.category && (
          <ul className="space-y-3 mt-3 pl-3">
            {isMounted &&
              categories.map((category) => (
                <li key={category.categoryId}>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedCategory === category.categoryId}
                      onChange={() =>
                        setSelectedCategory(
                          selectedCategory === category.categoryId
                            ? null
                            : category.categoryId
                        )
                      }
                      className="form-checkbox h-5 w-5 text-primary border-2 border-gray-300 rounded-md"
                    />
                    <span className="text-gray-700">{category.name}</span>
                  </label>
                </li>
              ))}
          </ul>
        )}
      </div>

      {["Level", "Language", "Price", "Video Duration", "Features"].map(
        (section) => (
          <div key={section}>
            <div
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg cursor-pointer"
              onClick={() => toggleSection(section.toLowerCase())}
            >
              <span className="font-bold text-gray-800">{section}</span>
              {openSections[section.toLowerCase()] ? (
                <RiArrowDropUpLine className="text-2xl text-gray-600" />
              ) : (
                <RiArrowDropDownLine className="text-2xl text-gray-600" />
              )}
            </div>
            {openSections[section.toLowerCase()] && (
              <div className="mt-3 pl-3 space-y-3">
                {getFilterItems(section).map((item) => (
                  <label key={item} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-primary border-2 border-gray-300 rounded-md"
                    />
                    <span className="text-gray-700">{item}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

const CourseCard = ({ course }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-[500px] flex flex-col">
    <div className="relative h-48 w-full shrink-0">
      <Image
        src={course.imageUrl}
        alt={course.title}
        fill
        className="object-cover rounded-t-xl"
        priority
      />
      <div className="absolute top-2 right-2 bg-primary/90 text-white px-3 py-1 rounded-full text-sm">
        {course.category || "Uncategorized"}
      </div>
    </div>

    <div className="p-6 flex flex-col flex-grow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-xs text-gray-600">AI</span>
          </div>
          <span className="text-gray-600 text-sm">Codixa Team</span>
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <CiTimer className="mr-1 text-lg" />
          {"3 months"}
        </div>
      </div>

      <Link href={`/courses/${course.id}`} className="block mb-3">
        <h3 className="text-xl font-semibold text-gray-800 hover:text-primary transition-colors line-clamp-2">
          {course.title}
        </h3>
      </Link>

      <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
        {course.description || "No description available"}
      </p>

      <Link
        href={`/coursedetail/${course.id}`}
        className="inline-flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors mt-auto"
      >
        <span className="mr-2">View Course</span>
        <FaArrowRight className="text-sm" />
      </Link>
    </div>
  </div>
);

const PaginationControls = ({ currentPage, totalPages, setCurrentPage }) => (
  <div className="flex justify-center mt-8 space-x-4">
    <button
      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
      disabled={currentPage === 1}
      className="px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50 hover:bg-primary-dark transition-colors"
    >
      Previous
    </button>
    <span className="px-4 py-2 text-gray-700">
      Page {currentPage} of {totalPages}
    </span>
    <button
      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
      disabled={currentPage >= totalPages}
      className="px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50 hover:bg-primary-dark transition-colors"
    >
      Next
    </button>
  </div>
);

const getFilterItems = (section) => {
  switch (section) {
    case "Level":
      return ["Beginner", "Intermediate", "Expert", "All Level"];
    case "Language":
      return ["English", "Mandarin", "Arabic", "Francais"];
    case "Price":
      return ["Paid", "Free"];
    case "Video Duration":
      return ["0-2 hours", "3-6 hours", "7-9 hours"];
    case "Features":
      return ["Caption", "Quizzes", "Practice Test"];
    default:
      return [];
  }
};

export default SearchPage;
