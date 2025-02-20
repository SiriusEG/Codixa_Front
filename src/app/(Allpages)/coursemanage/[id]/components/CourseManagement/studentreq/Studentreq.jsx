"use client";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Studentreq = ({ courseId }) => {
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(
          `https://codixa.runasp.net/api/std/gtstd/${courseId}/${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch requests");
        const data = await response.json();
        setRequests(data.data);
        console.log(data);

        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [currentPage]);

  const handleStatusUpdate = async (requestId, newStatus) => {
    setUpdating(requestId);
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        "https://codixa.runasp.net/api/std/putstdstatus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ requestId, newStatus }),
        }
      );
      if (!response.ok) throw new Error("Failed to update status");

      setRequests((prev) =>
        prev.map((req) =>
          req.requestId === requestId
            ? {
                ...req,
                requestStatus: newStatus === 1 ? "Accepted" : "Rejected",
              }
            : req
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdating(null);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen min-w-[100vh]">
      <h1 className="text-2xl font-bold mb-6">Student Enrollment Requests</h1>

      {loading && (
        <div className="flex justify-center items-center py-6">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-800"></div>
        </div>
      )}

      {!loading && (
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
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {requests.map((request) => (
                <tr key={request.requestId} className="hover:bg-gray-50">
                  <td className="px-3 py-4">{request.studentName}</td>
                  <td className="px-3 py-4">{request.courseName}</td>
                  <td className="px-3 py-4">
                    {formatDate(request.requestDate)}
                  </td>
                  <td className="px-3 py-4">
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
                  <td className="px-3 py-4 space-x-2">
                    <button
                      onClick={() => handleStatusUpdate(request.requestId, 1)}
                      disabled={
                        request.requestStatus === "Accepted" ||
                        updating === request.requestId
                      }
                      className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded ${
                        request.requestStatus === "Accepted"
                          ? "bg-green-100 text-green-700 cursor-not-allowed"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                    >
                      <FaCheckCircle className="mr-1" />
                      {updating === request.requestId
                        ? "Updating..."
                        : "Accept"}
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(request.requestId, 2)}
                      disabled={
                        request.requestStatus === "Rejected" ||
                        updating === request.requestId
                      }
                      className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded ${
                        request.requestStatus === "Rejected"
                          ? "bg-red-100 text-red-700 cursor-not-allowed"
                          : "bg-red-600 text-white hover:bg-red-700"
                      }`}
                    >
                      <FaTimesCircle className="mr-1" />
                      {updating === request.requestId
                        ? "Updating..."
                        : "Reject"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {requests.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No enrollment requests found
            </div>
          )}
        </div>
      )}

      {!loading && (
        <div className="mt-6 flex justify-center items-center gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-gray-700">Page {currentPage}</span>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage >= totalPages}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Studentreq;
