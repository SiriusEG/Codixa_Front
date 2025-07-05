import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import TestResults from "./TestResults";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  XCircleIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  ChevronDownIcon,
  PlayIcon,
  PauseIcon,
  ForwardIcon,
  BackwardIcon,
  SpeakerWaveIcon,
  CogIcon,
  ArrowLeftIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

const CourseMainContent = ({
  activeItem,
  testResult,
  answers,
  setAnswers,
  handleTestSubmit,
  handleNextLesson,
  error,
  nextItem,
  fetchLessonDetails,
  isLastLesson,
  courseId,
  progress,
  onProgressUpdate,
  certificateView,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [videoQuality, setVideoQuality] = useState("auto");
  const [isFinishing, setIsFinishing] = useState(false);
  const [certificateData, setCertificateData] = useState(null);
  const [loadingCertificate, setLoadingCertificate] = useState(false);

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  const qualityOptions = ["auto", "1080p", "720p", "480p", "360p"];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const formatTime = (seconds) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekMouseUp = (e) => {
    setSeeking(false);
    playerRef.current?.seekTo(parseFloat(e.target.value));
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRewind = () => {
    const currentTime = playerRef.current?.getCurrentTime() || 0;
    playerRef.current?.seekTo(Math.max(0, currentTime - 10));
  };

  const handleForward = () => {
    const currentTime = playerRef.current?.getCurrentTime() || 0;
    playerRef.current?.seekTo(Math.min(duration, currentTime + 10));
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const handleProgress = (state) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    setShowSpeedMenu(false);
    if (playerRef.current) {
      playerRef.current.playbackRate = speed;
    }
  };

  const handleQualityChange = (quality) => {
    setVideoQuality(quality);
    setShowQualityMenu(false);
    // Quality is applied through ReactPlayer's props
  };

  const handleMarkLessonCompleted = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(
        `https://codixa.runasp.net/api/CourseProgress/MarkLessonAsCompleted/${activeItem.lessonId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark lesson as completed");
      }
    } catch (error) {
      console.error("Error marking lesson as completed:", error);
    }
  };

  const handleNextWithProgress = async () => {
    if (!activeItem.isTest) {
      await handleMarkLessonCompleted();
    }
    handleNextLesson();
  };

  // Handle clicks outside menus to close them
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        !e.target.closest(".speed-menu-container") &&
        !e.target.closest(".quality-menu-container")
      ) {
        setShowSpeedMenu(false);
        setShowQualityMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleNextQuestion = () => {
    if (
      activeItem.questions &&
      currentQuestionIndex < activeItem.questions.length - 1
    ) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const currentQuestion = activeItem?.questions?.[currentQuestionIndex];

  // Add the retry handler for the test
  const handleRetryTest = () => {
    setAnswers && setAnswers({});
    setCurrentQuestionIndex(0);
    // Re-fetch the test questions for the current test
    if (
      activeItem &&
      activeItem.isTest &&
      activeItem.sectionTestId &&
      fetchLessonDetails
    ) {
      fetchLessonDetails(
        activeItem.sectionTestId,
        true,
        activeItem.sectionId,
        activeItem.sectionName
      );
    }
  };

  // Handler for finishing the last lesson/section
  const handleFinishAndCertificate = async () => {
    setIsFinishing(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      if (activeItem && activeItem.lessonId) {
        await fetch(
          `https://codixa.runasp.net/api/CourseProgress/MarkLessonAsCompleted/${activeItem.lessonId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      // Call the GetCertification API
      if (courseId) {
        await fetch(
          `https://codixa.runasp.net/api/Certification/GetCertification/${courseId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      if (typeof onProgressUpdate === "function") {
        onProgressUpdate();
      }
    } catch (error) {
      console.error("Error finishing lesson for certificate:", error);
    } finally {
      setIsFinishing(false);
    }
  };

  // Debugging output for props
  console.log("CourseMainContent props:", {
    isLastLesson,
    progress,
    activeItem,
    onProgressUpdate,
  });

  // PDF Download function
  const downloadCertificate = async () => {
    try {
      // Dynamically import the libraries
      const html2canvas = (await import("html2canvas")).default;
      const jsPDF = (await import("jspdf")).default;

      const certificateElement = document.getElementById("certificate-canvas");
      if (!certificateElement) {
        console.error("Certificate element not found");
        return;
      }

      // Show loading state
      const downloadBtn = document.getElementById("download-btn");
      if (downloadBtn) {
        downloadBtn.disabled = true;
        downloadBtn.innerHTML = "Generating PDF...";
      }

      // Capture the certificate as canvas
      const canvas = await html2canvas(certificateElement, {
        scale: 2, // Higher quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: certificateElement.offsetWidth,
        height: certificateElement.offsetHeight,
      });

      // Create PDF
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "mm", "a4");

      // Calculate dimensions to fit the certificate properly
      const imgWidth = 297; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Center the image on the page
      const x = 0;
      const y = (210 - imgHeight) / 2; // A4 height is 210mm

      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);

      // Generate filename
      const studentName =
        certificateData?.studntName ||
        certificateData?.StudntName ||
        certificateData?.userName ||
        certificateData?.UserName ||
        "Student";
      const courseName =
        certificateData?.courseName || certificateData?.CourseName || "Course";
      const filename = `${studentName}_${courseName}_Certificate.pdf`;

      // Download the PDF
      pdf.save(filename);

      // Reset button state
      if (downloadBtn) {
        downloadBtn.disabled = false;
        downloadBtn.innerHTML = "Download PDF";
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      // Reset button state on error
      const downloadBtn = document.getElementById("download-btn");
      if (downloadBtn) {
        downloadBtn.disabled = false;
        downloadBtn.innerHTML = "Download PDF";
      }
    }
  };

  useEffect(() => {
    const fetchCertificateData = async () => {
      if (activeItem?.type === "certificate" || certificateView) {
        setLoadingCertificate(true);
        try {
          const token = localStorage.getItem("token");
          if (!token || !courseId) return;
          const response = await fetch(
            `https://codixa.runasp.net/api/Certification/GetCertification/${courseId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setCertificateData(data);
          } else {
            setCertificateData(null);
          }
        } catch (e) {
          setCertificateData(null);
        } finally {
          setLoadingCertificate(false);
        }
      }
    };
    fetchCertificateData();
  }, [activeItem, certificateView, courseId]);

  // Certificate view rendering
  if (activeItem?.type === "certificate" || certificateView) {
    return (
      <div className="flex items-center w-full justify-center min-h-screen bg-gray-100 p-8 select-none">
        {/* Download Button */}
        <button
          id="download-btn"
          onClick={downloadCertificate}
          className="absolute top-[20%] right-[5%] z-40 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 shadow-lg"
        >
          <ArrowDownTrayIcon className="w-5 h-5" />
          Download certificate
        </button>

        {/* CERTIFICATE CANVAS */}
        <div
          id="certificate-canvas"
          className="relative w-full h-[35rem] bg-white"
        >
          {/* Watermark */}
          <span className="absolute inset-0 flex items-center justify-center text-[10rem] leading-none font-extrabold text-green-50 pointer-events-none">
            Codixa
          </span>

          {/* Top‑left W3 logo (replace with your own asset if different) */}
          <img
            src="/logo.gif" /* original path kept */
            alt="W3Schools Logo"
            className="absolute top-8 left-8 w-24"
          />

          {/* MAIN TEXT BLOCK */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 py-4">
            <h2 className="text-2xl font-extrabold tracking-wider text-yellow-800 mb-8">
              CERTIFICATE OF COMPLETION
            </h2>

            {loadingCertificate ? (
              <div className="text-yellow-600 font-semibold text-lg mt-6">
                Loading certificate...
              </div>
            ) : certificateData ? (
              <>
                <p className="text-lg text-gray-700 mb-2">
                  This certifies that
                </p>

                <p className="text-3xl font-bold text-gray-900 mb-4">
                  {certificateData.studntName ||
                    certificateData.StudntName ||
                    certificateData.userName ||
                    certificateData.UserName ||
                    "[Student Name]"}
                </p>

                <p className="text-lg text-gray-700 mb-2">
                  has completed the necessary courses of study and passed
                </p>

                <p className="text-2xl font-semibold text-green-700 mb-6">
                  {certificateData.courseName ||
                    certificateData.CourseName ||
                    "[Course Name]"}
                </p>

                {/* Extra descriptor line to mimic sample certificate */}
                <p className="text-md text-gray-600 mb-8 max-w-xl">
                  with fundamental knowledge of web development using HTML5
                </p>

                {/* Instructor & association kept from original code */}
                <p className="text-md text-gray-600 mb-1">
                  Instructor:{" "}
                  {certificateData.instructorName ||
                    certificateData.InstructorName ||
                    "[Instructor]"}
                </p>
                <p className="text-md text-gray-600 mb-8">
                  Association:{" "}
                  <span className="font-bold text-green-700">codixa</span>
                </p>

                <p className="text-sm text-gray-600">
                  Issued{" "}
                  {certificateData.certificationDate ||
                    certificateData.CertificationDate ||
                    certificateData.date ||
                    certificateData.Date ||
                    "[Date]"}
                </p>
              </>
            ) : (
              <div className="text-red-500 font-semibold mt-6">
                No certificate found.
              </div>
            )}
          </div>

          {/* Signature block */}
          <div className="absolute bottom-20 right-16 text-center">
            {/* Optional graphic signature; leave the img tag if you have a file */}
            <span className="text-sm font-medium text-gray-800">
              Instructor:{" "}
              {certificateData?.instructorName ||
                certificateData?.InstructorName ||
                "[Instructor]"}
            </span>
            <br />
            <span className="text-xs text-gray-600">for Codixa</span>
          </div>

          {/* Verification link */}
          <div className="absolute bottom-8 left-16 text-xs text-gray-600 leading-snug">
            Verify completion at:
            <br />
            <a
              href={`https://codixa.vercel.app/certification/${
                certificateData?.certificationId ||
                certificateData?.CertificationId ||
                ""
              }
            `}
              className="underline text-blue-600 break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://codixa.vercel.app/certification/
              {certificateData?.certificationId ||
                certificateData?.CertificationId ||
                ""}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 bg-gradient-to-br from-gray-50 to-white">
      {/* Finish to get Certificate Button or Next Lesson Button */}
      {isLastLesson ? (
        <div className="flex justify-end mb-4">
          <button
            onClick={handleFinishAndCertificate}
            className="px-6 py-3 border-none outline-none bg-yellow-500 rounded-xl text-white font-semibold"
            disabled={isFinishing}
          >
            {isFinishing ? "Loading..." : "Finish to get Certificate"}
          </button>
        </div>
      ) : (
        nextItem && (
          <div className="flex justify-end mb-4">
            <button
              onClick={handleNextWithProgress}
              className="px-6 py-3 border-none outline-none bg-primary rounded-xl text-white font-semibold"
            >
              Next Lesson
            </button>
          </div>
        )
      )}
      <AnimatePresence mode="wait">
        {activeItem?.message?.includes("Access Denied") ? (
          <motion.div
            key="access-denied"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={itemVariants}
            className="h-full flex items-center justify-center"
          >
            <div className="p-8 bg-red-50 rounded-2xl border border-red-200 shadow-lg max-w-lg text-center">
              <XCircleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <p className="text-red-600 text-xl font-bold">
                {`Access Denied: ${activeItem.message}`}
              </p>
              <p className="text-red-500 mt-4">
                Please contact support if you believe this is an error.
              </p>
            </div>
          </motion.div>
        ) : activeItem ? (
          <motion.div
            key={activeItem.lessonId || activeItem.sectionTestId}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-xl ${
                    activeItem.isTest
                      ? "bg-orange-100"
                      : "bg-primary bg-opacity-10"
                  }`}
                >
                  {activeItem.isTest ? (
                    <AcademicCapIcon className="w-6 h-6 text-orange-600" />
                  ) : activeItem.VideoUrl ? (
                    <VideoCameraIcon className="w-6 h-6 text-primary" />
                  ) : (
                    <DocumentTextIcon className="w-6 h-6 text-primary" />
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {activeItem.isTest
                      ? activeItem.sectionName
                      : `${activeItem.sectionName} - ${activeItem.lessonName}`}
                  </h2>
                  {!activeItem.isTest && (
                    <p className="text-gray-500 mt-1 text-sm flex items-center gap-1">
                      {activeItem.VideoUrl ? (
                        <>
                          <VideoCameraIcon className="w-4 h-4" />
                          Video Lesson
                        </>
                      ) : (
                        <>
                          <DocumentTextIcon className="w-4 h-4" />
                          Reading Material
                        </>
                      )}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {activeItem.isTest ? (
              <div className="space-y-6 max-w-3xl mx-auto">
                {testResult &&
                  testResult.Message &&
                  testResult.Message !==
                    "You have already passed this test." && (
                    <div className="text-center text-red-600 font-semibold text-lg mb-4">
                      {testResult.Message}
                    </div>
                  )}
                {testResult ? (
                  <TestResults
                    testResult={testResult}
                    handleNextLesson={handleNextLesson}
                    onRetry={handleRetryTest}
                    s
                  />
                ) : (
                  <>
                    <AnimatePresence mode="wait">
                      {currentQuestion && (
                        <motion.div
                          key={currentQuestion.QuestionId}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ duration: 0.3 }}
                          className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                        >
                          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 bg-primary text-white rounded-full text-sm font-bold">
                              {currentQuestionIndex + 1}
                            </span>
                            {currentQuestion.Question}
                          </h3>
                          <div className="space-y-3 pl-8">
                            {currentQuestion.Choices.map((choice) => (
                              <label
                                key={choice.ChoicesQuestionId}
                                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                                  answers[currentQuestion.QuestionId] ===
                                  choice.ChoicesQuestionId
                                    ? "bg-blue-50 border border-blue-200"
                                    : "hover:bg-gray-50 border border-transparent"
                                }`}
                              >
                                <div className="relative">
                                  <input
                                    type="radio"
                                    name={`question-${currentQuestion.QuestionId}`}
                                    onChange={() =>
                                      setAnswers((prev) => ({
                                        ...prev,
                                        [currentQuestion.QuestionId]:
                                          choice.ChoicesQuestionId,
                                      }))
                                    }
                                    checked={
                                      answers[currentQuestion.QuestionId] ===
                                      choice.ChoicesQuestionId
                                    }
                                    className="w-4 h-4 text-primary border-gray-300 focus:ring-blue-500"
                                  />
                                  {answers[currentQuestion.QuestionId] ===
                                    choice.ChoicesQuestionId && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"
                                    />
                                  )}
                                </div>
                                <span className="text-gray-700">
                                  {choice.Answer}
                                </span>
                              </label>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {activeItem.questions?.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: { delay: 0.2 },
                        }}
                        className="mt-8 sticky bottom-8 flex justify-between items-center"
                      >
                        <button
                          onClick={handlePreviousQuestion}
                          disabled={currentQuestionIndex === 0}
                          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl transition-all flex items-center gap-2 font-medium shadow-sm hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ArrowLeftIcon className="w-5 h-5" />
                          Previous
                        </button>

                        {currentQuestionIndex <
                        activeItem.questions.length - 1 ? (
                          <button
                            onClick={handleNextQuestion}
                            disabled={!answers[currentQuestion?.QuestionId]}
                            className="px-6 py-3 bg-gradient-to-r from-primary to-primary-100 hover:to-primary-100/50 text-white rounded-xl transition-all flex items-center gap-2 font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Next
                            <ArrowRightIcon className="w-5 h-5" />
                          </button>
                        ) : (
                          <button
                            onClick={handleTestSubmit}
                            disabled={
                              Object.keys(answers).length !==
                              activeItem.questions.length
                            }
                            className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500 text-white rounded-xl transition-all flex items-center gap-3 font-medium shadow-lg shadow-green-200 hover:shadow-green-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Submit Test
                            <CheckCircleIcon className="w-5 h-5" />
                          </button>
                        )}
                      </motion.div>
                    )}
                  </>
                )}
                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 mt-4 shadow-md"
                  >
                    <div className="flex items-center gap-2">
                      <XCircleIcon className="w-5 h-5 text-red-500" />
                      <p>{error}</p>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="space-y-8">
                {activeItem.VideoUrl ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="max-w-3xl mx-auto"
                  >
                    <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gray-900">
                      {/* Video Container - Smaller size */}
                      <div className="w-full aspect-video">
                        <ReactPlayer
                          ref={playerRef}
                          url={`https://codixa.runasp.net/${activeItem.VideoUrl}`}
                          width="100%"
                          height="100%"
                          playing={isPlaying}
                          volume={volume}
                          playbackRate={playbackSpeed}
                          onProgress={handleProgress}
                          onDuration={handleDuration}
                          onPlay={() => setIsPlaying(true)}
                          onPause={() => setIsPlaying(false)}
                          config={{
                            file: {
                              attributes: { controlsList: "nodownload" },
                              forceVideo: true,
                              forceSafariHLS: true,
                              quality:
                                videoQuality !== "auto"
                                  ? [
                                      {
                                        label: videoQuality,
                                        bitrate:
                                          videoQuality === "1080p"
                                            ? 4800000
                                            : videoQuality === "720p"
                                            ? 2400000
                                            : videoQuality === "480p"
                                            ? 1200000
                                            : 600000,
                                      },
                                    ]
                                  : undefined,
                            },
                          }}
                          className="z-10"
                          controls={false}
                        />
                      </div>

                      {/* Custom Video Controls */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 transition-opacity">
                        {/* Progress bar */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-white text-xs">
                            {formatTime(played * duration)}
                          </span>
                          <input
                            type="range"
                            min={0}
                            max={0.999999}
                            step="any"
                            value={played}
                            onMouseDown={handleSeekMouseDown}
                            onChange={handleSeekChange}
                            onMouseUp={handleSeekMouseUp}
                            className="w-full h-1 bg-gray-400 rounded-full appearance-none cursor-pointer"
                            style={{
                              background: `linear-gradient(to right, #3b82f6 ${
                                played * 100
                              }%, #4b5563 ${played * 100}%)`,
                            }}
                          />
                          <span className="text-white text-xs">
                            {formatTime(duration)}
                          </span>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={handleRewind}
                              className="text-white hover:text-blue-400 transition-colors p-1"
                            >
                              <BackwardIcon className="w-5 h-5" />
                            </button>

                            <button
                              onClick={handlePlayPause}
                              className="bg-blue-500 hover:bg-blue-600 transition-colors rounded-full p-2"
                            >
                              {isPlaying ? (
                                <PauseIcon className="w-5 h-5 text-white" />
                              ) : (
                                <PlayIcon className="w-5 h-5 text-white" />
                              )}
                            </button>

                            <button
                              onClick={handleForward}
                              className="text-white hover:text-blue-400 transition-colors p-1"
                            >
                              <ForwardIcon className="w-5 h-5" />
                            </button>

                            <div className="flex items-center ml-2">
                              <SpeakerWaveIcon className="w-4 h-4 text-white mr-1" />
                              <input
                                type="range"
                                min={0}
                                max={1}
                                step="any"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="w-16 h-1 bg-gray-400 rounded-full appearance-none cursor-pointer"
                                style={{
                                  background: `linear-gradient(to right, #3b82f6 ${
                                    volume * 100
                                  }%, #4b5563 ${volume * 100}%)`,
                                }}
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {/* Playback Speed */}
                            <div className="relative speed-menu-container">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowSpeedMenu(!showSpeedMenu);
                                  setShowQualityMenu(false);
                                }}
                                className="flex items-center text-white text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
                              >
                                {playbackSpeed}x
                                <ChevronDownIcon className="w-3 h-3 ml-1" />
                              </button>

                              {showSpeedMenu && (
                                <div className="absolute bottom-full mb-1 right-0 bg-gray-800 rounded shadow-lg py-1 z-50">
                                  {speedOptions.map((speed) => (
                                    <button
                                      key={speed}
                                      onClick={() => handleSpeedChange(speed)}
                                      className={`block w-full text-left px-4 py-1 text-xs ${
                                        speed === playbackSpeed
                                          ? "text-blue-400"
                                          : "text-white hover:bg-gray-700"
                                      }`}
                                    >
                                      {speed}x
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Quality Settings */}
                            <div className="relative quality-menu-container">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowQualityMenu(!showQualityMenu);
                                  setShowSpeedMenu(false);
                                }}
                                className="flex items-center text-white bg-gray-700 hover:bg-gray-600 p-1 rounded"
                              >
                                <CogIcon className="w-4 h-4" />
                              </button>

                              {showQualityMenu && (
                                <div className="absolute bottom-full mb-1 right-0 bg-gray-800 rounded shadow-lg py-1 z-50">
                                  <div className="px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                                    Quality
                                  </div>
                                  {qualityOptions.map((quality) => (
                                    <button
                                      key={quality}
                                      onClick={() =>
                                        handleQualityChange(quality)
                                      }
                                      className={`block w-full text-left px-4 py-1 text-xs ${
                                        quality === videoQuality
                                          ? "text-blue-400"
                                          : "text-white hover:bg-gray-700"
                                      }`}
                                    >
                                      {quality}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="prose prose-lg max-w-none bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
                  >
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6 pb-4 border-b border-gray-100 flex items-center gap-3">
                      <DocumentTextIcon className="w-6 h-6 text-primary" />
                      Lesson Content
                    </h3>
                    <div
                      className="lesson-content"
                      dangerouslySetInnerHTML={{
                        __html: activeItem.LessonText,
                      }}
                    />
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="empty-state"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={itemVariants}
            className="h-full flex items-center justify-center"
          >
            <div className="text-center text-gray-500 p-8 bg-white rounded-2xl shadow-md max-w-md">
              <DocumentTextIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-700">
                Select Content to Start
              </h3>
              <p className="text-gray-400">
                Choose a lesson or test from the sidebar to begin your learning
                journey
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseMainContent;
