import { IncomingForm } from "formidable";
import FormData from "form-data";
import { createReadStream } from "fs";
import axios from "axios";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    const token = req.headers.authorization?.split(" ")[1] || "";

    // Parse incoming form data
    const { fields, files } = await new Promise((resolve, reject) => {
      const form = new IncomingForm();
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    // Create external API form data
    const externalForm = new FormData();

    // Process regular fields
    Object.entries(fields).forEach(([key, value]) => {
      const fieldValue = Array.isArray(value) ? value[0] : value;
      if (fieldValue !== undefined) {
        externalForm.append(key, fieldValue);
      }
    });

    // Process file upload
    if (files.Video) {
      const videoFile = files.Video[0];
      externalForm.append("Video", createReadStream(videoFile.filepath), {
        filename: videoFile.originalFilename,
        knownLength: videoFile.size,
        contentType: videoFile.mimetype || "video/*",
      });
    }

    // Send to external API using axios
    const response = await axios.post(
      "https://codixa.runasp.net/api/Lesson/AddNewLesson",
      externalForm,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          ...externalForm.getHeaders(),
        },
        maxBodyLength: Infinity,
      }
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Lesson creation error:", error);
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || error.message;
    return res.status(status).json({
      success: false,
      message: `Backend error: ${message.substring(0, 200)}...`,
    });
  }
}
