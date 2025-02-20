import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { refreshToken, token } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: "Refresh token is required." });
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/account/RefreshToken`,
        { RefreshToken: refreshToken, Token: token },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      const { token: newToken, refreshToken: newRefreshToken } = response.data;

      // Return the new tokens
      res.status(200).json({ token: newToken, refreshToken: newRefreshToken });
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
