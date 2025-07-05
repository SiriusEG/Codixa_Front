export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Course ID is required" });
  }

  try {
    const response = await fetch(
      `https://codixa.runasp.net/api/Certification/VerifyCertification/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error verifying certification:", error);
    res.status(500).json({
      message: "Failed to verify certification",
      error: error.message,
    });
  }
}
