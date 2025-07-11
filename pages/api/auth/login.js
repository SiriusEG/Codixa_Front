import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { UserName, Password } = req.body;

    try {
      const response = await axios.post(
        `https://codixa.runasp.net/api/account/login`,
        { UserName, Password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Return the response from the external API
      res.status(200).json(response.data);
    } catch (error) {
      if (error.response) {
        // Forward the full error response from the external API
        res.status(error.response.status).json(error.response.data);
      } else {
        // Network or unknown error
        res.status(500).json({ error: error.message || "Unknown error" });
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
