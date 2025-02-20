export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { courseId } = req.body;
  const authHeader = req.headers.authorization;

  if (!courseId) {
    return res.status(400).json({ message: "Course ID is required" });
  }

  try {
    const apiUrl = `https://codixa.runasp.net/api/Courses/delete/${courseId}`;

    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
    });

    const responseText = await response.text();
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
      throw new Error(responseData.message || "Failed to delete course");
    }

    res
      .status(200)
      .json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete course",
      details: error.details || null,
    });
  }
}
