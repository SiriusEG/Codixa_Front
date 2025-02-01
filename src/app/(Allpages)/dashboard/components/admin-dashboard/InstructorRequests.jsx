"use client";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaEye } from "react-icons/fa";

const InstructorRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/get-instructor-requests");
        if (!response.ok) {
          throw new Error("Failed to fetch instructor requests");
        }
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching instructor requests:", error);
      }
    };
    fetchRequests();
  }, []);

  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      const response = await fetch("/api/PUTinstructor", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId: requestId, newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.requestId === requestId ? { ...req, status: newStatus } : req
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleViewPDF = (filePath) => {
    window.open(`https://codixa.runasp.net/${filePath}`, "_blank");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Instructor Requests</h1>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Name",
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
                <td className="px-6 py-4 whitespace-nowrap">
                  {request.fullName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{request.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {request.phoneNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {request.specialty}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {request.gender}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                    ${
                      request.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : request.status === "Rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {request.status || "Pending"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleViewPDF(request.filePath)}
                    className="text-blue-600 hover:text-blue-900 flex items-center"
                  >
                    <FaEye className="mr-1" /> View CV
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() =>
                      handleStatusUpdate(request.requestId, "Approved")
                    }
                    disabled={request.status === "Approved"}
                    className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded 
                      ${
                        request.status === "Approved"
                          ? "bg-green-100 text-green-700 cursor-not-allowed"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                  >
                    <FaCheckCircle className="mr-1" /> Approve
                  </button>
                  <button
                    onClick={() =>
                      handleStatusUpdate(request.requestId, "Rejected")
                    }
                    disabled={request.status === "Rejected"}
                    className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded 
                      ${
                        request.status === "Rejected"
                          ? "bg-red-100 text-red-700 cursor-not-allowed"
                          : "bg-red-600 text-white hover:bg-red-700"
                      }`}
                  >
                    <FaTimesCircle className="mr-1" /> Reject
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
    </div>
  );
};

export default InstructorRequests;
