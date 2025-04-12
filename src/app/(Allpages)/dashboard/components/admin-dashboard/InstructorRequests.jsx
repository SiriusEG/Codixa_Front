"use client";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaEye } from "react-icons/fa";

const InstructorRequests = () => {
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://codixa.runasp.net/api/admin/GetInstructorsRequests/${currentPage}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(searchTerm)
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch instructor requests");
      }
      const data = await response.json();
      setRequests(data.instructorsRequests || []);
      setTotalPages(data.totalpages || 1);
    } catch (error) {
      console.error("Error fetching instructor requests:", error);
      setRequests([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [currentPage, searchTerm]);

  const handleStatusUpdate = async (requestId, newStatus) => {
    setUpdating(requestId);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://codixa.runasp.net/api/admin/ChangeInstructorStatus",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ requestId, newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.requestId === requestId 
            ? { 
                ...req, 
                status: newStatus === 1 ? "Accepted" : "Rejected"
              } 
            : req
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.requestId === requestId ? { ...req, status: req.status } : req
        )
      );
    } finally {
      setUpdating(null);
    }
  };

  const handleViewPDF = (filePath) => {
    const normalizedPath = filePath.replace(/\\/g, "/");
    window.open(`https://codixa.runasp.net/${normalizedPath}`, "_blank");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen min-w-[100vh]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Instructor Requests</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search instructors..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

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
                  "Name",
                  "Username",
                  "Email",
                  "Phone",
                  "Specialty",
                  "Gender",
                  "Status",
                  "CV",
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
                  <td className="px-3 py-4 ">{request.fullName}</td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    {request.userName}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    {request.email}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    {request.phoneNumber}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    {request.specialty}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    {request.gender}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                      ${
                        request.status === "Accepted"
                          ? "bg-green-100 text-green-800"
                          : request.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {request.status === "Accepted"
                        ? "Approved"
                        : request.status === "Rejected"
                        ? "Rejected"
                        : "Pending"}
                    </span>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleViewPDF(request.filePath)}
                      className="text-blue-600 hover:text-blue-900 flex items-center"
                    >
                      <FaEye className="mr-1" /> View CV
                    </button>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap space-x-2">
                    <button
                      onClick={() => handleStatusUpdate(request.requestId, 1)}
                      disabled={request.status === "Accepted" || updating}
                      className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded 
                        ${
                          request.status === "Accepted"
                            ? "bg-green-100 text-green-700 cursor-not-allowed"
                            : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                    >
                      <FaCheckCircle className="mr-1" />{" "}
                      {updating === request.requestId
                        ? "Updating..."
                        : "Approve"}
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(request.requestId, 0)}
                      disabled={request.status === "Rejected" || updating}
                      className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded 
                        ${
                          request.status === "Rejected"
                            ? "bg-red-100 text-red-700 cursor-not-allowed"
                            : "bg-red-600 text-white hover:bg-red-700"
                        }`}
                    >
                      <FaTimesCircle className="mr-1" />{" "}
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
              No pending instructor requests
            </div>
          )}
        </div>
      )}

      {!loading && (
        <div className="mt-6 flex justify-center items-center gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-100 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-gray-700">Page {currentPage}</span>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage >= totalPages}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-100 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default InstructorRequests;
