import axios from "axios";
const API_BASE_URL = process.env.API_BASE_URL;

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Call the external API to fetch instructor requests
      const response = await axios.get(
        `https://codixa.runasp.net/api/admin/Instructors-Requests`
      );

      // Return the fetched data as the response
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error fetching instructor requests:", error);
      res.status(500).json({ message: "Failed to fetch instructor requests" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
