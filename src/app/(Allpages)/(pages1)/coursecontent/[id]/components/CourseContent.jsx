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

  const toggleSection = (index) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      next.has(index) ? next.delete(index) : next.add(index);
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

        const types = {};
        data.courseData.forEach((section) => {
          section.sectionContent?.forEach((lesson) => {
            types[lesson.lessonId] = lesson.videoUrl ? "video" : "text";
          });
        });

        setLessonTypes(types);
        setContent(data.courseData);
        setCurrentProgress(data.courseData);

        if (data.lastLessonId) {
          let isTest = false;
          const sectionIndex = data.courseData.findIndex((section) => {
            if (section.sectionType === 0) {
              return section.sectionContent?.some(
                (lesson) => lesson.lessonId === data.lastLessonId
              );
            }
            if (section.sectionType === 1) {
              const hasTest = section.sectionTestContent?.some(
                (test) => test.sectionTestId === data.lastLessonId
              );
              if (hasTest) isTest = true;
              return hasTest;
            }
            return false;
          });

          if (sectionIndex !== -1) {
            setExpandedSections(new Set([sectionIndex]));
            const section = data.courseData[sectionIndex];
            if (section.sectionType === 0) {
              const lesson = section.sectionContent.find(
                (l) => l.lessonId === data.lastLessonId
              );
              fetchLessonDetails(
                data.lastLessonId,
                false,
                section.sectionId,
                section.sectionName,
                lesson.lessonName
              );
            } else {
              fetchLessonDetails(
                data.lastLessonId,
                true,
                section.sectionId,
                section.sectionName
              );
            }
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseContent();
  }, [courseId]);

  const fetchLessonDetails = async (
    id,
    isTest = false,
    sectionId = null,
    sectionName = "",
    lessonName = ""
  ) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/login");

      const payload = isTest
        ? { sectionTestId: id, sectionId }
        : { lessonId: id, sectionId };
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
        if (data.hasOwnProperty("Result") && data.hasOwnProperty("IsPassed")) {
          setActiveItem({ isTest, sectionName, ...data });
        } else {
          setActiveItem({ isTest, sectionName, questions: data });
        }
      } else {
        setActiveItem({ ...data, isTest, sectionName, lessonName });
      }
      setError("");
    } catch (err) {
      if (err.message.includes("Access Denied")) {
        setActiveItem({ message: err.message, isTest: false, sectionName });
      } else {
        setError(err.message);
      }
    }
  };

  const handleNextLesson = () => {
    setTestResult(null);
    if (!activeItem) return;
    const currentId = activeItem.isTest
      ? activeItem.sectionTestId
      : activeItem.lessonId;
    const nextItem = findNextItem(currentId, activeItem.isTest);

    if (nextItem) {
      fetchLessonDetails(
        nextItem.id,
        nextItem.type === "test",
        nextItem.sectionId,
        nextItem.sectionName,
        nextItem.lessonName
      );
    }
  };

  const findNextItem = (currentId, isTest = false) => {
    let found = false;
    for (const section of currentProgress) {
      if (section.sectionType === 0) {
        for (const lesson of section.sectionContent || []) {
          if (found)
            return {
              id: lesson.lessonId,
              type: "lesson",
              sectionId: section.sectionId,
              sectionName: section.sectionName,
              lessonName: lesson.lessonName,
            };
          if (lesson.lessonId === currentId && !isTest) found = true;
        }
      }
      if (section.sectionType === 1) {
        for (const test of section.sectionTestContent || []) {
          if (found)
            return {
              id: test.sectionTestId,
              type: "test",
              sectionId: section.sectionId,
              sectionName: section.sectionName,
            };
          if (test.sectionTestId === currentId && isTest) found = true;
        }
      }
    }
    return null;
  };

  const handleTestSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
      const answerArray = Object.entries(answers).map(
        ([questionId, choiceId]) => ({
          questionId: parseInt(questionId),
          selectedChoicesQuestionId: choiceId,
        })
      );

      const response = await fetch(
        "https://codixa.runasp.net/api/test/AddAnswer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(answerArray),
        }
      );

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Submission failed");
      setTestResult(result);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to submit answers");
    }
  };

  if (loading)
    return <div className="text-center p-8 h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 p-8">{error}</div>;

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
      />
    </div>
  );
};

export default CourseContent;
