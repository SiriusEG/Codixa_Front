export default async function handler(req, res) {
  console.log("API hit:", req.method); // Check if the API is called
  console.log("Request body:", req.body);

  if (req.method === "PUT") {
    const { requestId, newStatus } = req.body;
    console.log("Received payload:", req.body);

    try {
      const response = await fetch(
        "https://codixa.runasp.net/api/admin/Instructor-Status",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ requestId, newStatus }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Server error: ${data.message || response.status}`);
      }

      res.status(200).json({ message: "Instructor status updated", data });
    } catch (error) {
      console.error("Error updating status:", error.message);
      res.status(500).json({ message: "Update failed", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
