"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import CourseSidebar from "./CourseSidebar";
import CourseMainContent from "./CourseMainContent";

const CourseContent = () => {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id;

  const [content, setContent] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [currentProgress, setCurrentProgress] = useState([]);
  const [answers, setAnswers] = useState({});
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedSections, setExpandedSections] = useState(new Set());
  const [lessonTypes, setLessonTypes] = useState({});
  const [nextItem, setNextItem] = useState(null);

  const toggleSection = (index) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  useEffect(() => {
    const fetchCourseContent = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }
        const response = await fetch(
          `https://codixa.runasp.net/api/CourseProgress/GetCourseContent/${courseId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!response.ok) throw new Error("Failed to fetch course content");
        const data = await response.json();

        // Build lessonTypes for the sidebar icons:
        const types = {};
        // We'll also build a "flatItems" array in the exact order they appear:
        const flatItems = [];

        data.courseData.forEach((section) => {
          // If it's a lesson section
          if (section.sectionType === 0 && section.sectionContent) {
            section.sectionContent.forEach((lesson) => {
              // Record the type (video or text) for icons
              types[lesson.lessonId] = lesson.videoUrl ? "video" : "text";

              // Push the lesson item in the exact array order
              flatItems.push({
                type: "lesson",
                id: lesson.lessonId,
                sectionId: section.sectionId,
                sectionName: section.sectionName,
                lessonName: lesson.lessonName,
              });
            });
          }
          // If it's a test section
          else if (section.sectionType === 1 && section.sectionTestContent) {
            section.sectionTestContent.forEach((test) => {
              // Push the test item in the exact array order
              flatItems.push({
                type: "test",
                id: test.sectionTestId,
                sectionId: section.sectionId,
                sectionName: section.sectionName,
              });
            });
          }
        });

        setLessonTypes(types);
        setContent(data.courseData);
        setCurrentProgress(data.courseData);

        // If there's a lastLessonId, auto-load that lesson
        if (data.lastLessonId) {
          const defaultItem = flatItems.find(
            (item) => item.type === "lesson" && item.id === data.lastLessonId
          );
          if (defaultItem) {
            fetchLessonDetails(
              data.lastLessonId,
              false,
              defaultItem.sectionId,
              defaultItem.sectionName,
              defaultItem.lessonName
            );
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseContent();
  }, [courseId, router]);

  // Whenever activeItem changes, figure out the next item
  useEffect(() => {
    if (activeItem) {
      setNextItem(findNextItem(activeItem));
    } else {
      setNextItem(null);
    }
  }, [activeItem, currentProgress]);

  // Flatten all items in the exact order they appear in currentProgress
  const buildFlatItems = () => {
    const flat = [];
    currentProgress.forEach((section) => {
      if (section.sectionType === 0 && section.sectionContent) {
        section.sectionContent.forEach((lesson) => {
          flat.push({
            type: "lesson",
            id: lesson.lessonId,
            sectionId: section.sectionId,
            sectionName: section.sectionName,
            lessonName: lesson.lessonName,
          });
        });
      } else if (section.sectionType === 1 && section.sectionTestContent) {
        section.sectionTestContent.forEach((test) => {
          flat.push({
            type: "test",
            id: test.sectionTestId,
            sectionId: section.sectionId,
            sectionName: section.sectionName,
          });
        });
      }
    });
    return flat;
  };

  // Finds the next item by index in the flattened array
  const findNextItem = (current) => {
    const allItems = buildFlatItems();
    const currentIndex = allItems.findIndex(
      (item) =>
        item.id ===
          (current.isTest ? current.sectionTestId : current.lessonId) &&
        item.type === (current.isTest ? "test" : "lesson")
    );
    if (currentIndex !== -1 && currentIndex < allItems.length - 1) {
      return allItems[currentIndex + 1];
    }
    return null;
  };

  const fetchLessonDetails = async (
    id,
    isTest = false,
    sectionId = null,
    sectionName = "",
    lessonName = ""
  ) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const payload = isTest ? { sectionId } : { lessonId: id };
      const response = await fetch(
        "https://codixa.runasp.net/api/CourseProgress/GetLessonTestDetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to fetch details");
      }

      const data = await response.json();

      if (isTest) {
        // It's a test
        if (Array.isArray(data.questions)) {
          setTestResult(null);
          setActiveItem({
            isTest: true,
            sectionTestId: id,
            sectionName,
            questions: data.questions,
            message: data.message,
          });
        } else if (
          typeof data.Result !== "undefined" &&
          typeof data.IsPassed !== "undefined"
        ) {
          // Completed test result
          setTestResult(data);
          setActiveItem({
            isTest: true,
            sectionTestId: id,
            sectionName,
            questions: [],
            message: data.message,
          });
        } else {
          // Fallback
          setTestResult(null);
          setActiveItem({
            isTest: true,
            sectionTestId: id,
            sectionName,
            questions: data.questions || [],
            message: data.message || "No questions / result found.",
          });
        }
      } else {
        // It's a lesson
        setTestResult(null);
        setActiveItem({
          ...data,
          isTest: false,
          lessonId: id,
          sectionName,
          lessonName,
          message: data.message,
        });
      }
      setError("");
    } catch (err) {
      setTestResult(null);
      setActiveItem({
        message: err.message,
        isTest,
        sectionName,
      });
      setError(err.message);
    }
  };

  // When user clicks "Next"
  const handleNextLesson = async () => {
    setTestResult(null);
    if (!nextItem) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      // If next is a test => send {sectionId}, else => send {lessonId}
      const payload =
        nextItem.type === "test"
          ? { sectionId: nextItem.sectionId }
          : { lessonId: nextItem.id };

      const response = await fetch(
        "https://codixa.runasp.net/api/CourseProgress/GetLessonTestDetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to fetch details");
      }

      const data = await response.json();

      if (nextItem.type === "test") {
        // It's a test
        if (Array.isArray(data.questions)) {
          setTestResult(null);
          setActiveItem({
            isTest: true,
            sectionTestId: nextItem.id,
            sectionName: nextItem.sectionName,
            questions: data.questions,
            message: data.message,
          });
        } else if (
          typeof data.Result !== "undefined" &&
          typeof data.IsPassed !== "undefined"
        ) {
          setTestResult(data);
          setActiveItem({
            isTest: true,
            sectionTestId: nextItem.id,
            sectionName: nextItem.sectionName,
            questions: [],
            message: data.message,
          });
        } else {
          setTestResult(null);
          setActiveItem({
            isTest: true,
            sectionTestId: nextItem.id,
            sectionName: nextItem.sectionName,
            questions: data.questions || [],
            message: data.message || "No questions / result found.",
          });
        }
      } else {
        // It's a lesson
        setTestResult(null);
        setActiveItem({
          ...data,
          isTest: false,
          lessonId: nextItem.id,
          sectionName: nextItem.sectionName,
          lessonName: nextItem.lessonName,
          message: data.message,
        });
      }
    } catch (err) {
      setActiveItem({
        message: err.message,
        isTest: nextItem.type === "test",
        sectionName: nextItem.sectionName,
      });
    }
  };

  const handleTestSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
      const response = await fetch(
        "https://codixa.runasp.net/api/test/AddAnswer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(
            Object.entries(answers).map(([qId, cId]) => ({
              questionId: parseInt(qId),
              selectedChoicesQuestionId: cId,
            }))
          ),
        }
      );

      const result = await response.json();
      console.log("Test submission result:", result);
      if (!response.ok) {
        throw new Error(result.message || "Submission failed");
      }
      setTestResult(result);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to submit answers");
    }
  };

  if (loading) {
    return <div className="text-center p-8 h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <CourseSidebar
        currentProgress={currentProgress}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        activeItem={activeItem}
        lessonTypes={lessonTypes}
        fetchLessonDetails={fetchLessonDetails}
      />
      <CourseMainContent
        activeItem={activeItem}
        testResult={testResult}
        answers={answers}
        setAnswers={setAnswers}
        handleTestSubmit={handleTestSubmit}
        handleNextLesson={handleNextLesson}
        error={error}
        nextItem={nextItem}
      />
    </div>
  );
};

export default CourseContent;
