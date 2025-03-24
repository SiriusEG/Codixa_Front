const TestResults = ({ testResult, activeItem, handleNextLesson }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-xl font-semibold mb-4">Test Results</h3>
    <div className="space-y-2">
      <p>
        Passed: {testResult?.IsPassed ?? activeItem.IsPassed ? "Yes" : "No"}
      </p>
      <p>
        Score: {((testResult?.Result ?? activeItem.Result) * 100).toFixed(0)}%
      </p>
      <p>Message: {testResult?.message ?? activeItem.message}</p>
    </div>
    <button
      onClick={handleNextLesson}
      className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Continue
    </button>
  </div>
);

export default TestResults;
