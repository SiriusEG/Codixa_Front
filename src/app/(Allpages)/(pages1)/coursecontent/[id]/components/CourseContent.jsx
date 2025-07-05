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
  const [progressState, setProgressState] = useState(0);
  const [activeCertificate, setActiveCertificate] = useState(false);

  const findInfoForItem = (itemId, itemType) => {
    if (!currentProgress) return null;

    for (const section of currentProgress) {
      if (
        itemType === "lesson" &&
        section.sectionType === 0 &&
        section.sectionContent
      ) {
        const lesson = section.sectionContent.find(
          (l) => l.lessonId === itemId
        );
        if (lesson) {
          return {
            sectionId: section.sectionId,
            sectionName: section.sectionName,
            lessonName: lesson.lessonName,
          };
        }
      } else if (
        itemType === "test" &&
        section.sectionType === 1 &&
        section.sectionTestContent
      ) {
        const test = section.sectionTestContent.find(
          (t) => t.sectionTestId === itemId
        );
        if (test) {
          return {
            sectionId: section.sectionId,
            sectionName: section.sectionName,
          };
        }
      }
    }
    return null;
  };

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

      // Ensure we have the necessary context
      let contextInfo = {};
      if (!sectionId) {
        contextInfo = findInfoForItem(id, isTest ? "test" : "lesson") || {};
      }

      const finalSectionId = sectionId || contextInfo.sectionId;
      const finalSectionName = sectionName || contextInfo.sectionName;
      const finalLessonName = lessonName || contextInfo.lessonName;

      const payload = {};
      if (isTest) {
        payload.sectionTestId = id;
        if (finalSectionId) {
          payload.sectionId = finalSectionId;
        }
      } else {
        payload.lessonId = id;
        if (finalSectionId) {
          payload.sectionId = finalSectionId;
        }
      }

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
        if (Array.isArray(data) && data.length > 0) {
          setTestResult(null);
          setActiveItem({
            isTest: true,
            sectionTestId: id,
            sectionName: finalSectionName,
            questions: data,
            message: data.Message || data.message,
            isCompleted: false, // Indicate test is ready to be taken
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
            sectionName: finalSectionName,
            questions: [],
            message: data.Message || data.message,
            isCompleted: true, // Indicate test is already completed
          });
        } else {
          // Fallback
          setTestResult(null);
          setActiveItem({
            isTest: true,
            sectionTestId: id,
            sectionName: finalSectionName,
            questions: data.questions || [],
            message:
              data.Message || data.message || "No questions / result found.",
            isCompleted: false,
          });
        }
      } else {
        // It's a lesson
        setTestResult(null);
        setActiveItem({
          ...data,
          isTest: false,
          lessonId: id,
          sectionName: finalSectionName,
          lessonName: finalLessonName,
          message: data.Message || data.message,
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

      const payload = {};
      if (nextItem.type === "test") {
        payload.sectionTestId = nextItem.id;
        if (nextItem.sectionId) {
          payload.sectionId = nextItem.sectionId;
        }
      } else {
        payload.lessonId = nextItem.id;
        if (nextItem.sectionId) {
          payload.sectionId = nextItem.sectionId;
        }
      }

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
        if (Array.isArray(data) && data.length > 0) {
          setTestResult(null);
          setActiveItem({
            isTest: true,
            sectionTestId: nextItem.id,
            sectionName: nextItem.sectionName,
            questions: data,
            message: data.Message || data.message,
            isCompleted: false, // Indicate test is ready to be taken
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
            message: data.Message || data.message,
            isCompleted: true, // Indicate test is already completed
          });
        } else {
          setTestResult(null);
          setActiveItem({
            isTest: true,
            sectionTestId: nextItem.id,
            sectionName: nextItem.sectionName,
            questions: data.questions || [],
            message:
              data.Message || data.message || "No questions / result found.",
            isCompleted: false,
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
          message: data.Message || data.message,
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

  // Calculate flat items and progress
  const flatItems = buildFlatItems();
  const totalItems = flatItems.length;
  const completedItems = flatItems.filter((item) => item.isCompleted).length;
  const progress =
    totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  // Keep progressState in sync with calculated progress
  useEffect(() => {
    setProgressState(progress);
  }, [progress]);

  // Callback to update progress after marking last lesson as completed
  const handleProgressUpdate = () => {
    // Recalculate completed items and progress
    const updatedFlatItems = buildFlatItems();
    const updatedCompleted = updatedFlatItems.filter(
      (item) => item.isCompleted
    ).length;
    const updatedProgress =
      totalItems > 0 ? Math.round((updatedCompleted / totalItems) * 100) : 0;
    setProgressState(updatedProgress);
  };

  // Detect if the current activeItem is the last lesson/test
  let isLastLesson = false;
  if (activeItem) {
    const currentIndex = flatItems.findIndex(
      (item) =>
        item.id ===
          (activeItem.isTest
            ? activeItem.sectionTestId
            : activeItem.lessonId) &&
        item.type === (activeItem.isTest ? "test" : "lesson")
    );
    isLastLesson = currentIndex === flatItems.length - 1;
  }

  // Handler to select certificate from sidebar
  const handleSelectCertificate = () => setActiveCertificate(true);

  // When a lesson or test is selected, reset activeCertificate
  const handleLessonSelect = (...args) => {
    setActiveCertificate(false);
    fetchLessonDetails(...args);
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
        activeItem={activeCertificate ? { type: "certificate" } : activeItem}
        lessonTypes={lessonTypes}
        fetchLessonDetails={handleLessonSelect}
        progress={progressState}
        courseId={courseId}
        onSelectCertificate={handleSelectCertificate}
      />
      <CourseMainContent
        activeItem={activeCertificate ? { type: "certificate" } : activeItem}
        testResult={testResult}
        answers={answers}
        setAnswers={setAnswers}
        handleTestSubmit={handleTestSubmit}
        handleNextLesson={handleNextLesson}
        error={error}
        nextItem={nextItem}
        fetchLessonDetails={fetchLessonDetails}
        isLastLesson={isLastLesson}
        courseId={courseId}
        progress={progressState}
        onProgressUpdate={handleProgressUpdate}
        certificateView={activeCertificate}
      />
    </div>
  );
};

export default CourseContent;
