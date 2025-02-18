// In your Next.js API route (e.g., pages/api/lessons/add.js)
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    const token = req.headers.authorization?.split(" ")[1] || "";
    const { body } = req;

    // Validate required fields
    const requiredFields = [
      "LessonName",
      "IsVideo",
      "LessonOrder",
      "IsForpreview",
      "SectionId",
    ];

    const missingFields = requiredFields.filter((field) => !body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const addResponse = await fetch(
      "https://codixa.runasp.net/api/Lesson/AddNewLesson",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...body,
          // Force string values for backend compatibility
          IsVideo: body.IsVideo?.toString() || "false",
          IsForpreview: body.IsForpreview?.toString() || "false",
          LessonOrder: body.LessonOrder?.toString() || "1",
          SectionId: body.SectionId?.toString(),
        }),
      }
    );

    // Handle non-success responses
    if (!addResponse.ok) {
      const errorText = await addResponse.text();
      return res.status(addResponse.status).json({
        success: false,
        message: `Backend error: ${errorText.substring(0, 200)}...`,
        status: addResponse.status,
      });
    }

    const responseData = await addResponse.json();
    return res.status(addResponse.status).json(responseData);
  } catch (error) {
    console.error("Lesson creation error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}
