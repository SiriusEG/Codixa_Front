"use client";
import { useState } from "react";
import { useToast } from "../../context/ToastContext";

export default function TestSectionForm({
  sectionId,
  onClose,
  initialSuccessResult = 70.0,
}) {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    sectionId: sectionId,
    successResult: initialSuccessResult,
    questions: [
      {
        text: "",
        choiceAnswer: [{ choicesQuestionText: "", isTrue: false }],
      },
    ],
  });

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
    } catch (error) {
      addToast(error.message, "error");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">
          Test Section Configuration
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-100 focus:border-transparent"
              min="0"
              max="100"
              step="0.1"
              required
            />
            <span className="absolute right-3 top-2 text-gray-500">%</span>
          </div>
        </div>

        <div className="space-y-6">
          {formData.questions.map((question, qIndex) => (
            <div
              key={qIndex}
              className="border border-gray-200 rounded-lg p-4 bg-white"
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question {qIndex + 1}
                </label>
                <input
                  type="text"
                  value={question.text}
                  onChange={(e) => {
                    const newQuestions = [...formData.questions];
                    newQuestions[qIndex].text = e.target.value;
                    setFormData({ ...formData, questions: newQuestions });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-100"
                  placeholder="Enter question text"
                  required
                />
              </div>

              <div className="space-y-3 ml-4">
                {question.choiceAnswer.map((choice, cIndex) => (
                  <div key={cIndex} className="flex items-center gap-3">
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
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-100"
                      placeholder="Choice text"
                      required
                    />
                    <label className="flex items-center gap-2 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={choice.isTrue}
                        onChange={(e) => {
                          const newQuestions = [...formData.questions];
                          newQuestions[qIndex].choiceAnswer[cIndex].isTrue =
                            e.target.checked;
                          setFormData({ ...formData, questions: newQuestions });
                        }}
                        className="h-4 w-4 text-primary-100 focus:ring-primary-100 rounded"
                      />
                      <span className="text-sm text-gray-600">Correct</span>
                    </label>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addChoice(qIndex)}
                  className="mt-2 text-sm text-primary-100 hover:text-primary-110 flex items-center gap-1"
                >
                  <span>+</span>
                  Add Choice
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={addQuestion}
            className="px-4 py-2 bg-primary-100 text-white rounded-md hover:bg-primary-110 transition-colors flex items-center gap-2"
          >
            <span>+</span>
            Add Question
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-2"
          >
            Save All Questions
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
