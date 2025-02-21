export async function POST(request) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  try {
    const authHeader = request.headers.get("authorization");
    const body = await request.json();

    // Validate inputs
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers,
      });
    }

    if (!body.requestId || ![1, 2].includes(body.newStatus)) {
      return new Response(JSON.stringify({ error: "Invalid request body" }), {
        status: 400,
        headers,
      });
    }

    // Forward to external API
    const externalRes = await fetch(
      "https://codixa.runasp.net/api/Instructor/ChangeStudentEnrollStatus",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify(body),
      }
    );

    // Handle HTML responses
    const contentType = externalRes.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      const html = await externalRes.text();
      console.error("External API HTML Response:", html.substring(0, 500));
      return new Response(
        JSON.stringify({
          error: "External service unavailable",
        }),
        {
          status: 502,
          headers,
        }
      );
    }

    const data = await externalRes.json();

    return new Response(JSON.stringify(data), {
      status: externalRes.status,
      headers,
    });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
      }),
      {
        status: 500,
        headers,
      }
    );
  }
}
