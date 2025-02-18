export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { sectionId } = req.body;
  const authHeader = req.headers.authorization;

  if (!sectionId) {
    return res.status(400).json({ message: "Section ID is required" });
  }

  try {
    const response = await fetch(
      `https://codixa.runasp.net/api/Section/Delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify({ sectionId }),
      }
    );

    // Handle text response first
    const responseText = await response.text();

    // Attempt to parse JSON only if response is not empty
    let responseData = {};
    try {
      responseData = responseText ? JSON.parse(responseText) : {};
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      if (!response.ok) {
        throw new Error(responseText || "Unknown error occurred");
      }
    }

    if (!response.ok) {
      throw new Error(responseData.message || "Failed to delete section");
    }

    // If successful with no content, send success message
    res
      .status(200)
      .json({ success: true, message: "Section deleted successfully" });
  } catch (error) {
    console.error("Error deleting section:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete section",
      details: error.details,
    });
  }
}
