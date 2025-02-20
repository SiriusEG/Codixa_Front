export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    const token = req.headers.authorization?.split(" ")[1] || "";

    const formData = new FormData();
    for (const key in req.body) {
      if (key === "Video" && req.body[key]) {
        formData.append("Video", req.body[key]); // Handle file separately
      } else {
        formData.append(key, req.body[key]);
      }
    }

    const addResponse = await fetch(
      "https://codixa.runasp.net/api/Lesson/AddNewLesson",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Token is required
        },
        body: formData,
      }
    );

    if (!addResponse.ok) {
      const errorText = await addResponse.text();
      return res.status(addResponse.status).json({
        success: false,
        message: `Backend error: ${errorText.substring(0, 200)}...`,
        status: addResponse.status,
      });
    }

    const responseData = await addResponse.json();
    return res.status(200).json(responseData);
  } catch (error) {
    console.error("Lesson creation error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}
