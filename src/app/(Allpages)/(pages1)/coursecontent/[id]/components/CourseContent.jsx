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

  // 1) Fetch course content on mount
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

        // Build lessonTypes (video/text) for the sidebar icons
        const types = {};
        const flatItems = data.courseData.flatMap((section) => {
          if (section.sectionType === 0 && section.sectionContent) {
            section.sectionContent.forEach((lesson) => {
              types[lesson.lessonId] = lesson.videoUrl ? "video" : "text";
            });
            return section.sectionContent.map((lesson) => ({
              type: "lesson",
              id: lesson.lessonId,
              sectionId: section.sectionId,
              sectionName: section.sectionName,
              lessonName: lesson.lessonName,
              order: lesson.lessonOrder || 0,
            }));
          }
          if (section.sectionType === 1 && section.sectionTestContent) {
            return section.sectionTestContent.map((test) => ({
              type: "test",
              id: test.sectionTestId,
              sectionId: section.sectionId,
              sectionName: section.sectionName,
              order: test.testOrder || 0,
            }));
          }
          return [];
        });

        setLessonTypes(types);
        setContent(data.courseData);
        setCurrentProgress(data.courseData);

        // If there's a lastLessonId, auto-load that lesson:
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

  // 2) Recompute nextItem whenever activeItem changes
  useEffect(() => {
    if (activeItem) {
      const currentId = activeItem.isTest
        ? activeItem.sectionTestId
        : activeItem.lessonId;
      const next = findNextItem(currentId, activeItem.isTest);
      setNextItem(next);
    } else {
      setNextItem(null);
    }
  }, [activeItem, currentProgress]);

  // 3) Flatten out the items in ascending order
  const findNextItem = (currentId, isTest = false) => {
    const allItems = currentProgress
      .flatMap((section) => {
        if (section.sectionType === 0 && section.sectionContent) {
          return section.sectionContent.map((lesson) => ({
            type: "lesson",
            id: lesson.lessonId,
            sectionId: section.sectionId,
            sectionName: section.sectionName,
            lessonName: lesson.lessonName,
            order: lesson.lessonOrder || 0,
          }));
        }
        if (section.sectionType === 1 && section.sectionTestContent) {
          return section.sectionTestContent.map((test) => ({
            type: "test",
            id: test.sectionTestId,
            sectionId: section.sectionId,
            sectionName: section.sectionName,
            order: test.testOrder || 0,
          }));
        }
        return [];
      })
      .sort((a, b) => a.order - b.order);

    const currentIndex = allItems.findIndex(
      (item) =>
        item.id === currentId && item.type === (isTest ? "test" : "lesson")
    );
    if (currentIndex !== -1 && currentIndex < allItems.length - 1) {
      return allItems[currentIndex + 1];
    }
    return null;
  };

  // 4) Generic fetch function for a lesson or test
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

      // If it's a test
      if (isTest) {
        if (Array.isArray(data.questions)) {
          // We have questions to display
          setTestResult(null);
          setActiveItem({
            isTest: true,
            sectionTestId: id, // highlight this in sidebar
            sectionName,
            questions: data.questions,
            message: data.message,
          });
        } else if (
          typeof data.Result !== "undefined" &&
          typeof data.IsPassed !== "undefined"
        ) {
          // It's a completed test result
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
          lessonId: id, // highlight this in sidebar
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

  // 5) When user clicks "Next →"
  const handleNextLesson = async () => {
    setTestResult(null);
    if (!nextItem) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

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

  // 6) Submitting test answers
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
      // Now we have a test result:
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
