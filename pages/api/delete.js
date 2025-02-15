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
    const response = await fetch(
      `https://codixa.runasp.net/api/Courses/delete/${courseId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to delete course");
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res
      .status(500)
      .json({ message: error.message || "Failed to delete course" });
  }
}
