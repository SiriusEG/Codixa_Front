import axios from "axios";
import { IncomingForm } from "formidable";
import { createReadStream } from "fs";
import FormData from "form-data";
import fs from "fs";

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  const form = new IncomingForm({
    multiples: false,
    maxFileSize: 5 * 1024 * 1024,
  });

  try {
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    const externalFormData = new FormData();

    // Strict field order
    const fieldOrder = [
      "UserName",
      "FullName",
      "Password",
      "ConfirmPassword",
      "Email",
      "Specialty",
      "Cv",
      "PhoneNumber",
      "DateOfBirth",
      "Gender",
      "Photo",
    ];

    fieldOrder.forEach((field) => {
      if (field === "Cv") {
        if (files.Cv) {
          const cvFile = files.Cv[0];
          const fileStream = createReadStream(cvFile.filepath);

          fileStream.on("end", () => {
            fs.unlink(cvFile.filepath, (err) => {
              if (err) console.error("Temp file cleanup error:", err);
            });
          });

          externalFormData.append("Cv", fileStream, {
            filename: cvFile.originalFilename || "cv.pdf",
            contentType: "application/pdf",
          });
        }
      } else if (field === "Photo") {
        if (files.Photo) {
          const photoFile = files.Photo[0];
          const fileStream = createReadStream(photoFile.filepath);

          fileStream.on("end", () => {
            fs.unlink(photoFile.filepath, (err) => {
              if (err) console.error("Temp file cleanup error:", err);
            });
          });

          externalFormData.append("Photo", fileStream, {
            filename: photoFile.originalFilename || "profile.jpg",
            contentType: photoFile.mimetype,
          });
        }
      } else if (fields[field]) {
        externalFormData.append(field, fields[field][0]);
      }
    });

    // Debugging output for Node.js FormData
    console.log("\n=== FORM DATA DEBUG ===");
    console.log("Field Order:", fieldOrder);
    console.log("Actual Parts:");
    externalFormData._streams.forEach((part, index) => {
      if (typeof part === "string") {
        console.log(`[${index}]`, part.trim());
      } else if (part.header) {
        const field = part.header.match(/name="([^"]+)"/)?.[1] || "unknown";
        const filename = part.header.match(/filename="([^"]+)"/)?.[1];
        console.log(`[${index}] ${field}:`, filename || part.value);
      }
    });

    const response = await axios.post(
      "https://codixa.runasp.net/api/account/RegisterNewInstructor",
      externalFormData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error("API Error:", error);

    if (error.code === "ECONNRESET") {
      return res.status(504).json({
        success: false,
        error: "Connection timed out. Please try again later.",
      });
    }

    const status = error.response?.status || 500;
    const errorData = error.response?.data || { message: error.message };

    res.status(status).json({
      success: false,
      error: errorData.message || "Internal server error",
    });
  }
}
