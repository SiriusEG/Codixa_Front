"use client";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";

const Studentreq = ({ courseId }) => {
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = sessionStorage.getItem("token");
        if (!token) throw new Error("Authentication required");

        const response = await fetch(
          `/api/std/gtstd?courseId=${24}&page=${1}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Handle non-JSON responses
        const contentType = response.headers.get("content-type");
        if (!contentType?.includes("application/json")) {
          const textData = await response.text();
          const errorMessage = textData.startsWith("<!DOCTYPE")
            ? "Server returned an error page"
            : textData.substring(0, 100);

          throw new Error(`Server Error (${response.status}): ${errorMessage}`);
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Unknown API error");
        }

        setRequests(data.data);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(error.message);

        // Handle authentication errors
        if (error.message.includes("401") || error.message.includes("auth")) {
          sessionStorage.removeItem("token");
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };
    const debounceTimer = setTimeout(() => {
      fetchRequests();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [currentPage, courseId, searchTerm]);

  const handleStatusUpdate = async (requestId, newStatus) => {
    setUpdating(requestId);
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch("/api/std/putstdstatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ requestId, newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update status");
      }

      setRequests((prev) =>
        prev.map((req) =>
          req.requestId === requestId
            ? {
                ...req,
                requestStatus: newStatus === 1 ? "Accepted" : "Rejected",
                updatedAt: new Date().toISOString(),
              }
            : req
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      setError(error.message);
    } finally {
      setUpdating(null);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredRequests = requests.filter((request) =>
    request.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen min-w-[100vh]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Student Enrollment Requests</h1>
        <input
          type="text"
          placeholder="Search students..."
          className="px-4 py-2 border rounded-lg w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && (
        <div className="text-red-600 p-4 bg-red-50 mb-4 rounded-lg">
          Error: {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-6">
          <FaSpinner className="animate-spin h-8 w-8 text-blue-600" />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Student Name",
                    "Course",
                    "Request Date",
                    "Status",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRequests.map((request) => (
                  <tr
                    key={request.requestId}
                    className={`hover:bg-gray-50 ${
                      updating === request.requestId ? "opacity-50" : ""
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {request.studentName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {request.studentEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {request.courseName}
                      </div>
                      <div className="text-sm text-gray-500">
                        Course ID: {request.courseId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(request.requestDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          request.requestStatus === "Accepted"
                            ? "bg-green-100 text-green-800"
                            : request.requestStatus === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {request.requestStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      <button
                        onClick={() => handleStatusUpdate(request.requestId, 1)}
                        disabled={
                          request.requestStatus === "Accepted" ||
                          updating === request.requestId
                        }
                        className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md transition-colors ${
                          request.requestStatus === "Accepted"
                            ? "bg-green-100 text-green-700 cursor-not-allowed"
                            : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                      >
                        {updating === request.requestId ? (
                          <FaSpinner className="animate-spin mr-1 h-3 w-3" />
                        ) : (
                          <FaCheckCircle className="mr-1" />
                        )}
                        {request.requestStatus === "Accepted"
                          ? "Accepted"
                          : "Accept"}
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(request.requestId, 2)}
                        disabled={
                          request.requestStatus === "Rejected" ||
                          updating === request.requestId
                        }
                        className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md transition-colors ${
                          request.requestStatus === "Rejected"
                            ? "bg-red-100 text-red-700 cursor-not-allowed"
                            : "bg-red-600 text-white hover:bg-red-700"
                        }`}
                      >
                        {updating === request.requestId ? (
                          <FaSpinner className="animate-spin mr-1 h-3 w-3" />
                        ) : (
                          <FaTimesCircle className="mr-1" />
                        )}
                        {request.requestStatus === "Rejected"
                          ? "Rejected"
                          : "Reject"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredRequests.length === 0 && !loading && (
              <div className="text-center py-8">
                <div className="text-gray-500 mb-2">No requests found</div>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-700">
                Showing page {currentPage} of {totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={currentPage >= totalPages}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Studentreq;
