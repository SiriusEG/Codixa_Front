"use client";
import { useState, useEffect } from "react";
import { useToast } from "../../context/ToastContext";

export default function TestSectionForm({
  sectionId,
  onClose,
  initialData = null,
  refreshSections,
}) {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    sectionId: sectionId,
    successResult: 70.0,
    maxAttempts: 3,
    questions: [
      {
        text: "",
        choiceAnswer: [{ choicesQuestionText: "", isTrue: false }],
      },
    ],
  });

  // Fetch existing test questions if initialData is provided
  useEffect(() => {
    const fetchExistingTest = async () => {
      if (initialData) {
        setLoading(true);
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(
            `https://codixa.runasp.net/api/Section/GetTestSectionQuestions/${sectionId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            console.log("Fetched test data:", data); // Debug log
            setFormData({
              sectionId: sectionId,
              successResult: data.successResult || 70.0,
              maxAttempts: data.maxAttempts || 3,
              questions: data.questions || [
                {
                  text: "",
                  choiceAnswer: [{ choicesQuestionText: "", isTrue: false }],
                },
              ],
            });
          } else {
            // If no existing test, use default structure
            setFormData({
              sectionId: sectionId,
              successResult: 70.0,
              maxAttempts: 3,
              questions: [
                {
                  text: "",
                  choiceAnswer: [{ choicesQuestionText: "", isTrue: false }],
                },
              ],
            });
          }
        } catch (error) {
          console.error("Error fetching existing test:", error);
          addToast("Failed to load existing test data", "error");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchExistingTest();
  }, [sectionId, initialData, addToast]);

  const addQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          text: "",
          choiceAnswer: [{ choicesQuestionText: "", isTrue: false }],
        },
      ],
    }));
  };

  const addChoice = (qIndex) => {
    const newQuestions = [...formData.questions];
    newQuestions[qIndex].choiceAnswer.push({
      choicesQuestionText: "",
      isTrue: false,
    });
    setFormData((prev) => ({ ...prev, questions: newQuestions }));
  };

  const removeQuestion = (qIndex) => {
    if (formData.questions.length > 1) {
      const newQuestions = formData.questions.filter(
        (_, index) => index !== qIndex
      );
      setFormData((prev) => ({ ...prev, questions: newQuestions }));
    }
  };

  const removeChoice = (qIndex, cIndex) => {
    if (formData.questions[qIndex].choiceAnswer.length > 1) {
      const newQuestions = [...formData.questions];
      newQuestions[qIndex].choiceAnswer = newQuestions[
        qIndex
      ].choiceAnswer.filter((_, index) => index !== cIndex);
      setFormData((prev) => ({ ...prev, questions: newQuestions }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://codixa.runasp.net/api/Section/AddTestSectionQuestions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Failed to save questions");
      addToast("Questions saved successfully!");
      onClose();
      await refreshSections();
    } catch (error) {
      addToast(error.message, "error");
    }
  };

  if (loading) {
    return (
      <div className="p-8 bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-100"></div>
          <span className="ml-3 text-gray-600">Loading test data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-3xl font-bold text-gray-800">
          {initialData ? "Edit Test Section" : "Create Test Section"}
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors text-2xl font-bold"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Test Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Passing Percentage
            </label>
            <div className="relative">
              <input
                type="number"
                value={formData.successResult}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    successResult: parseFloat(e.target.value),
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-transparent text-lg"
                min="0"
                max="100"
                step="0.1"
                required
              />
              <span className="absolute right-4 top-3 text-gray-500 text-lg">
                %
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Maximum Attempts
            </label>
            <input
              type="number"
              value={formData.maxAttempts}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  maxAttempts: parseInt(e.target.value),
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-transparent text-lg"
              min="1"
              max="10"
              required
            />
          </div>
        </div>

        {/* Questions Section */}
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-semibold text-gray-800">
              Test Questions
            </h4>
            <button
              type="button"
              onClick={addQuestion}
              className="px-6 py-3 bg-primary-100 text-white rounded-lg hover:bg-primary-110 transition-colors flex items-center gap-2 font-medium"
            >
              <span className="text-xl">+</span>
              Add Question
            </button>
          </div>

          {formData.questions.map((question, qIndex) => (
            <div
              key={qIndex}
              className="border-2 border-gray-200 rounded-xl p-6 bg-white shadow-sm"
            >
              <div className="flex justify-between items-start mb-6">
                <h5 className="text-lg font-semibold text-gray-800">
                  Question {qIndex + 1}
                </h5>
                {formData.questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(qIndex)}
                    className="text-red-500 hover:text-red-700 transition-colors text-lg font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Question Text
                </label>
                <input
                  type="text"
                  value={question.text}
                  onChange={(e) => {
                    const newQuestions = [...formData.questions];
                    newQuestions[qIndex].text = e.target.value;
                    setFormData({ ...formData, questions: newQuestions });
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 text-lg"
                  placeholder="Enter question text"
                  required
                />
              </div>

              <div className="space-y-4 ml-6">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-semibold text-gray-700">
                    Answer Choices
                  </label>
                  <button
                    type="button"
                    onClick={() => addChoice(qIndex)}
                    className="text-sm text-primary-100 hover:text-primary-110 flex items-center gap-1 font-medium"
                  >
                    <span className="text-lg">+</span>
                    Add Choice
                  </button>
                </div>

                {question.choiceAnswer.map((choice, cIndex) => (
                  <div
                    key={cIndex}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <input
                      type="text"
                      value={choice.choicesQuestionText}
                      onChange={(e) => {
                        const newQuestions = [...formData.questions];
                        newQuestions[qIndex].choiceAnswer[
                          cIndex
                        ].choicesQuestionText = e.target.value;
                        setFormData({ ...formData, questions: newQuestions });
                      }}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 text-lg"
                      placeholder="Choice text"
                      required
                    />
                    <label className="flex items-center gap-3 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={choice.isTrue}
                        onChange={(e) => {
                          const newQuestions = [...formData.questions];
                          newQuestions[qIndex].choiceAnswer[cIndex].isTrue =
                            e.target.checked;
                          setFormData({ ...formData, questions: newQuestions });
                        }}
                        className="h-5 w-5 text-primary-100 focus:ring-primary-100 rounded"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Correct Answer
                      </span>
                    </label>
                    {question.choiceAnswer.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeChoice(qIndex, cIndex)}
                        className="text-red-500 hover:text-red-700 transition-colors text-lg"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 font-medium text-lg"
          >
            {initialData ? "Update Test" : "Save Test"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium text-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
