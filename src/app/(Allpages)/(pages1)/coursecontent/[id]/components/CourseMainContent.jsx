import React from "react";
import ReactPlayer from "react-player";
import TestResults from "./TestResults";

const CourseMainContent = ({
  activeItem,
  testResult,
  answers,
  setAnswers,
  handleTestSubmit,
  handleNextLesson,
  error,
  nextItem,
}) => {
  return (
    <div className="flex-1 p-8 h-screen overflow-y-auto">
      {activeItem?.message?.includes("Access Denied") ? (
        <div className="h-full flex items-center justify-center">
          <p className="text-red-500 text-xl font-bold">
            {`{Message: "${activeItem.message}"}`}
          </p>
        </div>
      ) : activeItem ? (
        <>
          {/* Title + Next button on the right */}
          <div className="flex items-center justify-between mb-4 border-b pb-2">
            <h2 className="text-2xl font-bold">
              {activeItem.isTest
                ? activeItem.sectionName
                : `${activeItem.sectionName} - ${activeItem.lessonName}`}
            </h2>
            {nextItem && (
              <button
                onClick={handleNextLesson}
                className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm flex items-center"
              >
                Next →
              </button>
            )}
          </div>

          {/* Show any message from the API */}
          {activeItem.message && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
              {activeItem.message}
            </div>
          )}

          {/* If it's a test */}
          {activeItem.isTest ? (
            <div className="space-y-4">
              {/* If testResult is set, show TestResults */}
              {testResult ? (
                <TestResults
                  testResult={testResult}
                  handleNextLesson={handleNextLesson}
                />
              ) : (
                // Otherwise, show the questions
                <>
                  {activeItem.questions?.length > 0 && (
                    <div className="space-y-4">
                      {activeItem.questions.map((question) => (
                        <div
                          key={question.QuestionId}
                          className="bg-white p-4 rounded-lg"
                        >
                          <h3 className="font-semibold mb-2">
                            {question.Question}
                          </h3>
                          <div className="space-y-2">
                            {question.Choices.map((choice) => (
                              <label
                                key={choice.ChoicesQuestionId}
                                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded"
                              >
                                <input
                                  type="radio"
                                  name={`question-${question.QuestionId}`}
                                  onChange={() =>
                                    setAnswers((prev) => ({
                                      ...prev,
                                      [question.QuestionId]:
                                        choice.ChoicesQuestionId,
                                    }))
                                  }
                                  checked={
                                    answers[question.QuestionId] ===
                                    choice.ChoicesQuestionId
                                  }
                                />
                                {choice.Answer}
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeItem.questions?.length > 0 && (
                    <button
                      onClick={handleTestSubmit}
                      className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Submit Test
                    </button>
                  )}
                </>
              )}
              {error && <div className="text-red-500 mt-2">{error}</div>}
            </div>
          ) : (
            // If it's a lesson
            <>
              {activeItem.VideoUrl ? (
                <div className="h-full flex flex-col">
                  <div className="aspect-video bg-black rounded-lg overflow-hidden flex-grow">
                    <ReactPlayer
                      url={`https://codixa.runasp.net/${activeItem.VideoUrl}`}
                      controls
                      width="100%"
                      height="100%"
                    />
                  </div>
                  <div className="mt-4 p-4 bg-white rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p>{activeItem.description}</p>
                  </div>
                </div>
              ) : activeItem.LessonText ? (
                <div className="h-full flex flex-col">
                  <div className="bg-white rounded-lg shadow p-6 flex-grow">
                    <h3 className="text-lg font-semibold mb-4">
                      Lesson Content
                    </h3>
                    <div className="prose max-w-none">
                      {activeItem.LessonText}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 p-8 h-full">
                  Select a lesson or test to get started
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <div className="text-center text-gray-500 p-8 h-full">
          Select a lesson or test to get started
        </div>
      )}
    </div>
  );
};

export default CourseMainContent;
