import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL;

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { requestId, newStatus } = req.body;

    try {
      // Log the request body for debugging
      console.log("Sending PUT request with body:", { requestId, newStatus });

      // Call the external API to update the instructor's status
      const response = await axios.put(
        `${API_BASE_URL}/admin/Instructor-Status`,
        {
          requestId: requestId,
          newStatus: newStatus,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Return success response
      res.status(200).json({
        message: "Instructor status updated successfully",
        data: response.data,
      });
    } catch (error) {
      console.error(
        "Error updating instructor status:",
        error.response?.data || error.message
      );
      res.status(500).json({
        message: "Failed to update instructor status",
        error: error.message,
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
