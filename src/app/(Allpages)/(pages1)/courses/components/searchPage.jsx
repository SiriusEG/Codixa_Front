"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import PaginationControls from "./PaginationControls";
import BackgroundAnimation from "./BackgroundAnimation";
import Circles from "./circles";
const SearchPage = () => {
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  /*fixed ? send git */
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
              ...(selectedCategory && { categoryId: selectedCategory }),
              ...(selectedLevel !== null && { Level: selectedLevel }),
              ...(selectedLanguage !== null && { Language: selectedLanguage }),
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
            instructorFullName: course.instructorFullName,
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
  }, [
    searchTerm,
    selectedCategory,
    selectedLevel,
    selectedLanguage,
    currentPage,
    isMounted,
  ]);

  return (
    <div className="flex flex-col z-0 min-h-screen w-full p-3 sm:p-6 gap-4 sm:gap-6 relative">
      <BackgroundAnimation />
      {/* Mobile Filter Toggle */}
      <div className="md:hidden w-full mb-2">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full bg-primary text-white py-3 rounded-lg font-medium flex justify-center items-center"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
          {showFilters ? (
            <RiArrowDropUpLine className="text-2xl ml-1" />
          ) : (
            <RiArrowDropDownLine className="text-2xl ml-1" />
          )}
        </button>
      </div>

      <div className="flex flex-col md:flex-row w-full gap-4 sm:gap-6">
        {/* Filters Section */}
        <div className={`w-full md:w-1/4 ${showFilters || "hidden md:block"}`}>
          <div className="bg-gray-100 rounded-xl p-4 sm:p-6 shadow-lg h-fit sticky top-6">
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
              selectedLevel={selectedLevel}
              setSelectedLevel={(value) => {
                setSelectedLevel(value);
                setCurrentPage(1);
              }}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={(value) => {
                setSelectedLanguage(value);
                setCurrentPage(1);
              }}
              isMounted={isMounted}
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="w-full md:w-3/4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
            Search Results
          </h2>

          <div className="flex justify-content-start sm:gap-6 ">
            {isLoading ? (
              [...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-lg h-[400px] sm:h-[450px] animate-pulse"
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
            <div className="mt-8">
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FilterSection = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedLevel,
  setSelectedLevel,
  selectedLanguage,
  setSelectedLanguage,
  isMounted,
}) => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const getFilterItems = (section) => {
    switch (section) {
      case "Level":
        return [
          { label: "Beginner", value: 0 },
          { label: "Intermediate", value: 1 },
          { label: "Expert", value: 2 },
          { label: "All Level", value: 3 },
        ];
      case "Language":
        return [
          { label: "English", value: 0 },
          { label: "Arabic", value: 1 },
          { label: "Russian", value: 2 },
          { label: "Francais", value: 3 },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <Circles />
      <div>
        <div
          className="flex justify-between items-center p-3 sm:p-4 bg-gray-50 rounded-lg cursor-pointer"
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
          <ul className="space-y-2 mt-2 pl-2 sm:pl-3">
            {isMounted &&
              categories.map((category) => (
                <li key={category.categoryId}>
                  <label className="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
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
                      className="form-checkbox h-4 w-4 sm:h-5 sm:w-5 text-primary border-2 border-gray-300 rounded-md accent-primary"
                    />
                    <span className="text-sm sm:text-base text-gray-700">
                      {category.name}
                    </span>
                  </label>
                </li>
              ))}
          </ul>
        )}
      </div>

      {["Level", "Language"].map((section) => (
        <div key={section}>
          <div
            className="flex justify-between items-center p-3 sm:p-4 bg-gray-50 rounded-lg cursor-pointer"
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
            <div className="mt-2 pl-2 sm:pl-3 space-y-2 sm:space-y-3">
              {getFilterItems(section).map((item) => (
                <label
                  key={item.value}
                  className="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={
                      section === "Level"
                        ? selectedLevel === item.value
                        : section === "Language"
                        ? selectedLanguage === item.value
                        : false
                    }
                    onChange={() => {
                      if (section === "Level") {
                        setSelectedLevel(
                          selectedLevel === item.value ? null : item.value
                        );
                      } else if (section === "Language") {
                        setSelectedLanguage(
                          selectedLanguage === item.value ? null : item.value
                        );
                      }
                    }}
                    className="form-checkbox h-4 w-4 sm:h-5 sm:w-5 text-primary border-2 border-gray-300 rounded-md accent-primary"
                  />
                  <span className="text-sm sm:text-base text-gray-700">
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const CourseCard = ({ course }) => (
  <div className="flex flex-col w-72 lg:w-80 sm:w-64 h-96 lg:h-[25rem] sm:h-80 p-4 rounded-xl shadow-xl bg-white overflow-hidden">
    {/* IMAGE */}
    <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden flex-shrink-0 relative">
      <Image
        src={course.imageUrl}
        alt={`${course.title} image`}
        fill
        sizes="(max-width: 640px) 100vw, 300px"
        className="object-cover"
      />
    </div>

    {/* AUTHOR & TITLE */}
    <div className="flex items-center gap-2 mt-2 flex-shrink-0">
      <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
        <span className="text-gray-600 text-[0.65rem] font-medium">
          {course.instructorFullName?.charAt(0)}
        </span>
      </div>
      <span className="text-gray-600 text-[0.65rem] truncate max-w-[10rem]">
        {course.instructorFullName}
      </span>
    </div>

    <h3 className="text-sm sm:text-base font-semibold text-gray-800 mt-1 line-clamp-1 flex-shrink-0">
      {course.title}
    </h3>

    {/* DESCRIPTION */}
    <p className="text-[0.6rem] sm:text-xs text-gray-600 mt-1 mb-2 line-clamp-2 flex-shrink-0">
      {course.description || "No description available"}
    </p>

    {/* BUTTON */}
    <div className="mt-auto flex-shrink-0">
      <Link
        href={`/coursedetail/${course.id}`}
        className="block w-full py-2 bg-primary text-white rounded-xl font-semibold text-[0.65rem] sm:text-xs text-center transition-colors duration-300 hover:bg-primary-100"
      >
        View Course
      </Link>
    </div>
  </div>
);

export default SearchPage;
