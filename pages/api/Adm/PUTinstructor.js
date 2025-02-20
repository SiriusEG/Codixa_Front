export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { requestId, newStatus } = req.body;

    // Fixing the status assignment
    let statusio = newStatus === "Approved" ? 1 : 0;

    try {
      const response = await fetch(
        "https://codixa.runasp.net/api/admin/ChangeInstructorStatus",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ requestId, newStatus: statusio }),
        }
      );

      if (!response.ok) throw new Error("Server error");

      res.status(200).json({ message: "Instructor status updated" });
    } catch (error) {
      res.status(500).json({ message: "Update failed", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
