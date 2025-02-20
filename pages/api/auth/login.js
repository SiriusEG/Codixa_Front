import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { UserName, Password } = req.body;

    try {
      const response = await axios.post(
        `${API_BASE_URL}/account/Login`,
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
      const status = error.response?.status || 500;
      const message = error.response?.data?.error || error.message;

      // Return the error to the client
      res.status(status).json({ error: message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
