import axios from "axios";
import { IncomingForm } from "formidable";
import { createReadStream } from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({
        message: "Error parsing form data",
        error: err.message,
      });
    }

    try {
      const externalFormData = new FormData();

      // Add fields in EXACT order
      const fieldOrder = [
        "UserName",
        "FullName",
        "Password",
        "ConfirmPassword",
        "Email",
        "Specialty",
        "PhoneNumber",
        "DateOfBirth",
        "Gender",
      ];

      fieldOrder.forEach((field) => {
        externalFormData.append(field, fields[field][0]);
      });

      // Handle CV file
      if (files.Cv && files.Cv[0]) {
        const cvFile = files.Cv[0];
        const fileStream = createReadStream(cvFile.filepath);
        externalFormData.append(
          "Cv",
          fileStream,
          cvFile.originalFilename || "cv.pdf"
        );
      }

      // Send to external API
      const response = await axios.post(
        `${process.env.API_BASE_URL}/account/Register-Instructor`,
        externalFormData,
        {
          headers: {
            ...externalFormData.getHeaders(),
            "Content-Length": externalFormData.getLengthSync(),
          },
        }
      );
      console.log(externalFormData);

      res.status(200).json(response.data);
    } catch (error) {
      console.error("External API error:", error);
      const status = error.response?.status || 500;
      const message = error.response?.data || error.message;
      res.status(status).json({
        message: "Registration failed",
        error: message,
      });
      console.log(externalFormData);
    }
  });
}
