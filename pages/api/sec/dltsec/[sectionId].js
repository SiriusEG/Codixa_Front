export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { sectionId } = req.query;
  const authHeader = req.headers.authorization;

  if (!sectionId) {
    return res.status(400).json({ message: "Section ID is required" });
  }

  try {
    const externalResponse = await fetch(
      "https://codixa.runasp.net/api/Section/Delete",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify({ sectionId: Number(sectionId) }),
      }
    );

    if (!externalResponse.ok) {
      const errorText = await externalResponse.text();
      throw new Error(errorText || "External API request failed");
    }

    res.status(200).json({
      success: true,
      message: "Section deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting section:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete section",
    });
  }
}
