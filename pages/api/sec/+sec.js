export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "Unauthorized" });

      const requiredFields = [
        "sectionName",
        "sectionOrder",
        "courseId",
        "sectionType",
      ];
      const missingFields = requiredFields.filter((field) => !req.body[field]);

      if (missingFields.length > 0) {
        return res.status(400).json({
          message: `Missing required fields: ${missingFields.join(", ")}`,
        });
      }

      const response = await fetch(
        "https://codixa.runasp.net/api/Section/AddNewSection",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            sectionName: req.body.sectionName,
            sectionOrder: req.body.sectionOrder,
            courseId: req.body.courseId,
            sectionType: req.body.sectionType,
          }),
        }
      );

      const responseText = await response.text();
      let responseData = {};

      try {
        responseData = responseText ? JSON.parse(responseText) : {};
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        if (!response.ok) {
          throw new Error(responseText || "Unknown error occurred");
        }
      }

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to add section");
      }

      return res.status(201).json(responseData);
    } catch (error) {
      console.error("Error adding section:", error);
      return res.status(500).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
