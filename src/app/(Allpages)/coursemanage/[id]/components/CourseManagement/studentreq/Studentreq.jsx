"use client";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";
import { useRouter } from "next/navigation";
import PaginationControls from "../ui/PaginationControls";
const Studentreq = ({ courseId }) => {
  const router = useRouter();
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
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication required");

        const response = await fetch(
          `https://codixa.runasp.net/api/Instructor/GetStudentsRequestsByCourse/${courseId}/${currentPage}`,
          {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}` 
            },
            body: JSON.stringify(searchTerm)
          }
        );

        const contentType = response.headers.get("content-type");
        if (!contentType?.includes("application/json")) {
          const text = await response.text();
          throw new Error(
            `Server Error (${response.status}): ${text.substring(0, 100)}`
          );
        }

        const data = await response.json();
        if (!response.ok)
          throw new Error(data.error || "Failed to fetch requests");

        setRequests(data.data);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(error.message);
        if (error.message.includes("401")) {
          localStorage.removeItem("token");
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchRequests, 300);
    return () => clearTimeout(timer);
  }, [courseId, currentPage, router, searchTerm]);

  const handleStatusUpdate = async (requestId, newStatus) => {
    if (!requestId || ![1, 2].includes(newStatus)) {
      setError("Invalid update request");
      return;
    }

    setUpdating(requestId);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(
        "https://codixa.runasp.net/api/Instructor/ChangeStudentEnrollStatus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            requestId: Number(requestId),
            newStatus: newStatus,
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeout);

      const contentType = response.headers.get("content-type");
      const responseData = contentType?.includes("application/json")
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        throw new Error(
          typeof responseData === "object"
            ? responseData.message || "Update failed"
            : `Server Error: ${responseData.substring(0, 100)}`
        );
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

      setError(null);
    } catch (error) {
      console.error("Update Error:", error);
      setError(error.message);

      setRequests((prev) =>
        prev.map((req) =>
          req.requestId === requestId
            ? { ...req, requestStatus: req.requestStatus }
            : req
        )
      );
    } finally {
      setUpdating(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredRequests = requests.filter((request) =>
    request.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen min-w-[100vh]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Student Requests</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {error && (
        <div className="p-4 mb-4 text-red-600 bg-red-50 rounded-lg">
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
                  {["Student", "Course", "Date", "Status", "Actions"].map(
                    (header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    )
                  )}
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
                        ID: {request.courseId}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
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
                        className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
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
                        className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
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
          </div>

          {totalPages > 1 && (
            <PaginationControls
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              currentPage={currentPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Studentreq;
