import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const page = req.query.page || 1;
      const token = req.headers.authorization;

      const response = await axios.get(
        `https://codixa.runasp.net/api/admin/GetInstructorsRequests/${page}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error fetching instructor requests:", error);
      res.status(500).json({ message: "Failed to fetch instructor requests" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
