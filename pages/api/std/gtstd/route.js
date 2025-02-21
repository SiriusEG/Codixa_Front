export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get("courseId");
  const page = searchParams.get("currentPage");
  const authHeader = request.headers.get("authorization");

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  try {
    // Validate parameters
    if (!courseId || !page) {
      return new Response(
        JSON.stringify({
          error: "Missing courseId or currentPage",
        }),
        { status: 400, headers }
      );
    }

    if (!/^\d+$/.test(courseId) || !/^\d+$/.test(page)) {
      return new Response(
        JSON.stringify({
          error: "Invalid parameter format",
        }),
        { status: 400, headers }
      );
    }

    // Forward request
    const externalRes = await fetch(
      `https://codixa.runasp.net/api/Instructor/GetStudentsRequestsByCourse/${courseId}/${page}`,
      {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
        redirect: "error", // Prevent HTML redirects
      }
    );

    // Handle HTML responses
    if (
      !externalRes.headers.get("content-type")?.includes("application/json")
    ) {
      const html = await externalRes.text();
      console.error("External API HTML Response:", html.substring(0, 300));
      return new Response(
        JSON.stringify({
          error: "External service error",
          details: html.substring(0, 300),
        }),
        { status: 502, headers }
      );
    }

    const data = await externalRes.json();

    return new Response(
      JSON.stringify({
        data: data.data,
        totalPages: data.totalPages,
      }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error.message,
      }),
      { status: 500, headers }
    );
  }
}
