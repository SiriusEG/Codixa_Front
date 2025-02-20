export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    const token = req.headers.authorization?.split(" ")[1] || "";
    const { lessonId } = req.body;

    // Enhanced validation
    if (typeof lessonId !== "number" || lessonId <= 0) {
      console.error(
        "Validation failed - Received lessonId:",
        lessonId,
        "Type:",
        typeof lessonId
      );
      return res.status(400).json({
        success: false,
        message: "Valid positive numeric lesson ID is required",
      });
    }

    // Debugging logs
    console.log("Attempting to delete lesson:", {
      lessonId,
      tokenPresent: !!token,
      headers: req.headers,
    });

    // External API call with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const externalResponse = await fetch(
      "https://codixa.runasp.net/api/Lesson/Delete",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ lessonId }),
        signal: controller.signal,
      }
    );
    clearTimeout(timeoutId);

    // Log raw response details
    const responseText = await externalResponse.text();
    console.log("External API response:", {
      status: externalResponse.status,
      headers: Object.fromEntries(externalResponse.headers.entries()),
      body: responseText,
    });

    // Parse response carefully
    let responseData;
    try {
      responseData = responseText ? JSON.parse(responseText) : {};
    } catch (e) {
      console.error("JSON parse error:", e.message);
      responseData = { message: responseText };
    }

    // Handle success cases
    if (externalResponse.ok) {
      return res.status(200).json({
        success: true,
        message: "Lesson deleted successfully",
        data: responseData,
      });
    }

    // Handle specific error cases
    if (externalResponse.status === 500) {
      console.error("External server error:", {
        lessonId,
        response: responseText,
      });
      return res.status(500).json({
        success: false,
        message: "External server error - please try again later",
        technicalDetails: responseText.substring(0, 200),
      });
    }

    // Forward other errors
    return res.status(externalResponse.status).json({
      success: false,
      message:
        responseData.message || `Deletion failed (${externalResponse.status})`,
      details: responseData,
    });
  } catch (error) {
    console.error("Full error details:", {
      error: error.stack,
      body: req.body,
      headers: req.headers,
    });

    const errorMessage =
      error.name === "AbortError" ? "Request timed out" : error.message;

    return res.status(500).json({
      success: false,
      message: `Server error: ${errorMessage}`,
      errorCode: error.code,
    });
  }
}
