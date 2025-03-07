import { useState } from "react";

const PaginationControls = ({ currentPage, totalPages, setCurrentPage }) => {
  const [inputPage, setInputPage] = useState(currentPage);

  const handlePageChange = () => {
    const pageNumber = Math.min(Math.max(1, parseInt(inputPage)), totalPages);
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex justify-center mt-8 space-x-4">
      <button
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50 hover:bg-primary-dark transition-colors"
      >
        Previous
      </button>
      <span className="px-4 py-2 text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage >= totalPages}
        className="px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50 hover:bg-primary-dark transition-colors"
      >
        Next
      </button>
      <div className="flex items-center space-x-2">
        <input
          type="number"
          value={inputPage}
          onChange={(e) => setInputPage(e.target.value)}
          className="px-2 w-20 py-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handlePageChange}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Go
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;
