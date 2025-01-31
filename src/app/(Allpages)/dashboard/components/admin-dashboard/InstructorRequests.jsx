"use client"; // Required for client-side interactivity

import { useEffect, useState } from "react";
import axios from "axios";

const InstructorRequests = () => {
  const [requests, setRequests] = useState([]);

  // Fetch instructor requests on component mount
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("/api/get-instructor-requests"); // Use server-side API route
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching instructor requests:", error);
      }
    };
    fetchRequests();
  }, []);

  // Handle approve action
  const handleApprove = async (instructorId) => {
    try {
      const response = await axios.put("/api/approve-instructor", {
        requestId: instructorId,
        newStatus: "Approved",
      });
      console.log("Instructor approved:", response.data);

      // Update the local state to reflect the change
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.instructorId === instructorId
            ? { ...req, status: "Approved" }
            : req
        )
      );
    } catch (error) {
      console.error("Error approving instructor:", error);
    }
  };

  // Handle viewing the PDF in the browser
  const handleViewPDF = (filePath) => {
    window.open("https://codixa.runasp.net/" + filePath, "_blank"); // Open the PDF in a new tab
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">
        Instructor Requests
      </h1>
      <div className="space-y-6">
        {requests.length > 0 ? (
          requests.map((request) => (
            <div
              key={request.instructorId}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center"
            >
              <div className="flex-1">
                <p className="text-xl font-semibold">
                  {request.instructorFullName}
                </p>
                <p className="text-gray-500">{request.email}</p>
                <p className="text-gray-500">Phone: {request.phoneNumber}</p>
                <p className="text-gray-500">Specialty: {request.specialty}</p>
                <p className="text-gray-500">Gender: {request.gender}</p>
                <p className="text-gray-500">
                  Status: {request.status || "Pending"}
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                {!request.status && (
                  <button
                    onClick={() => handleApprove(request.instructorId)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  >
                    Approve
                  </button>
                )}
                <button
                  onClick={() => handleViewPDF(request.filePath)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  View CV
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No requests found.</p>
        )}
      </div>
    </div>
  );
};

export default InstructorRequests;
