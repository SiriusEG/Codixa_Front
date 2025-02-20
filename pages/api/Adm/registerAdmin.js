import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Forward the POST data to the external API
      const response = await axios.post(
        "https://codixa.runasp.net/api/admin/RegisterAdmin",
        req.body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      res.status(200).json({ success: true, data: response.data });
    } catch (error) {
      console.error(
        "Error registering admin:",
        error.response?.data || error.message
      );
      res.status(error.response?.status || 500).json({
        success: false,
        error: error.response?.data || error.message || "Internal Server Error",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
