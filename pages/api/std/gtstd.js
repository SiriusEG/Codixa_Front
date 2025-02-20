// app/api/std/gtstd/route.js
import axios from "axios";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get("courseId");
  const page = searchParams.get("page");
  const authHeader = request.headers.get("authorization");

  // Create error response helper
  const createError = (message, status) =>
    new Response(JSON.stringify({ error: message }), {
      status,
      headers: { "Content-Type": "application/json" },
    });

  try {
    // Validate inputs
    if (!courseId || !page) {
      return createError("Missing courseId or page parameters", 400);
    }

    if (!/^\d+$/.test(page)) {
      return createError("Invalid page number format", 400);
    }

    // Validate authorization
    if (!authHeader?.startsWith("Bearer ")) {
      return createError("Authentication required", 401);
    }

    const token = authHeader.split(" ")[1];
    if (!token || token.length < 50) {
      // Basic token validation
      return createError("Invalid authentication format", 401);
    }

    // External API call with timeout
    const apiUrl = `https://codixa.runasp.net/api/Instructor/GetStudentsRequestsByCourse/${24}/${1}`;
    const response = await axios.get(apiUrl, {
      headers: { Authorization: `Bearer ${token}` },
      transformResponse: [(data) => data], // Prevent JSON parsing
      validateStatus: () => true,
    });

    // Detect HTML responses
    if (
      typeof response.data === "string" &&
      response.data.startsWith("<!DOCTYPE")
    ) {
      console.error("HTML Response from External API:", {
        status: response.status,
        headers: response.headers,
        data: response.data.substring(0, 500),
      });
      return createError("External service unavailable", 502);
    }

    // Handle successful JSON response
    try {
      const jsonData =
        typeof response.data === "string"
          ? JSON.parse(response.data)
          : response.data;

      return new Response(
        JSON.stringify({
          data: jsonData.data,
          totalPages: jsonData.totalPages,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      return createError("Invalid response format", 502);
    }
  } catch (error) {
    console.error("API Error:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });

    return createError(
      axios.isAxiosError(error)
        ? "Connection to external service failed"
        : "Internal server error",
      500
    );
  }
}
