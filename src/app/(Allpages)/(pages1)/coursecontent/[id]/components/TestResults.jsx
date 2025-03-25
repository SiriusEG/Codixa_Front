import React from "react";

const TestResults = ({ testResult, handleNextLesson }) => {
  console.log("Rendering TestResults with:", testResult);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Test Results</h3>

      <div className="space-y-2">
        <p>Passed: {testResult.IsPassed ? "Yes" : "No"}</p>
        <p>
          Score:{" "}
          {typeof testResult.Result === "number"
            ? `${testResult.Result.toFixed(0)}%`
            : "N/A"}
        </p>
        {testResult.message && <p>Message: {testResult.message}</p>}
      </div>
      {/* 
      <pre className="bg-gray-100 p-2 mt-4 rounded text-sm">
        {JSON.stringify(testResult, null, 2)}
      </pre> */}

      <button
        onClick={handleNextLesson}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Continue
      </button>
    </div>
  );
};

export default TestResults;
