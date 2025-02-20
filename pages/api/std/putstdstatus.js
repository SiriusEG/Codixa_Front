import axios from "axios";

export async function POST(request) {
  const authorizationHeader = request.headers.get("authorization");
  const errorResponse = (message, status = 400) =>
    new Response(JSON.stringify({ error: message }), {
      status,
      headers: { "Content-Type": "application/json" },
    });

  try {
    // Validate authorization
    if (!authorizationHeader?.startsWith("Bearer ")) {
      return errorResponse("Unauthorized", 401);
    }

    const token = authorizationHeader.split(" ")[1];
    const body = await request.json();

    // Validate request body
    if (!body.requestId || ![1, 2].includes(body.newStatus)) {
      return errorResponse("Invalid request parameters", 400);
    }

    // External API call
    const response = await axios.post(
      "https://codixa.runasp.net/api/Instructor/UpdateRequestStatus",
      {
        requestId: body.requestId,
        newStatus: body.newStatus,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );

    // Handle external API response
    if (response.status !== 200) {
      console.error("Status update failed:", response.data);
      return errorResponse(
        response.data?.message || "Status update failed",
        response.status
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        updatedStatus: body.newStatus === 1 ? "Accepted" : "Rejected",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Status Update Error:", error);

    if (axios.isAxiosError(error)) {
      return errorResponse(
        error.response?.data?.message || "External service unavailable",
        error.response?.status || 503
      );
    }

    return errorResponse("Internal server error", 500);
  }
}
