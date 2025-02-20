import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { courseId, page } = req.query;

  try {
    // Fetch data from the external API
    const response = await axios.get(
      `https://codixa.runasp.net/api/Instructor/GetStudentsRequestsByCourse/${courseId}/${page}`
    );

    const { data, pageNumber, totalPages } = response.data;

    // Return the fetched data
    return res.status(200).json({
      data,
      pageNumber: parseInt(pageNumber),
      totalPages: parseInt(totalPages),
    });
  } catch (error) {
    console.error("Error fetching student requests:", error);
    return res.status(500).json({ error: "Failed to fetch student requests" });
  }
}
