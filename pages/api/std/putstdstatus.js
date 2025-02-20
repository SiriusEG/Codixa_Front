import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { requestId, newStatus } = req.body;

  try {
    // Send the update request to the external API
    const response = await axios.post(
      "https://codixa.runasp.net/api/Instructor/ChangeStudentEnrollStatus",
      {
        requestId,
        newStatus,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the external API returned success
    if (response.status === 200) {
      return res.status(200).json({ message: "Status updated successfully" });
    } else {
      return res.status(500).json({ error: "Failed to update status" });
    }
  } catch (error) {
    console.error("Error updating enrollment status:", error);
    return res.status(500).json({ error: "Failed to update status" });
  }
}
