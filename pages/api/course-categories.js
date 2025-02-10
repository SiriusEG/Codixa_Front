// pages/api/course-categories.js
export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    const response = await fetch(
      "https://codixa.runasp.net/api/CourseCategory"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: error.message });
  }
}
