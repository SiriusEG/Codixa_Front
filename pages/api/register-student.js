export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    // Validate required fields
    const requiredFields = [
      "userName",
      "fullName",
      "password",
      "confirmPassword",
      "email",
      "phoneNumber",
      "dateOfBirth",
      "gender",
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // Forward the entire request body (including confirmPassword) to the external API
    const externalResponse = await fetch(
      "https://codixa.runasp.net/api/account/RegisterNewStudent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      }
    );

    // Handle any errors returned by the external API
    if (!externalResponse.ok) {
      const errorData = await externalResponse.json();
      return res.status(externalResponse.status).json({
        success: false,
        message: errorData.message || "Registration failed. Please try again.",
      });
    }

    // Parse the external API response
    const data = await externalResponse.json();

    // Return the successful response
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
    });
  }
}
