import { IncomingForm } from "formidable";
import fetch from "node-fetch";
import FormData from "form-data";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const form = new IncomingForm();
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const courseId = fields.id?.[0];
    if (!courseId)
      return res.status(400).json({ message: "Course ID required" });

    const apiFormData = new FormData();

    // Add fields
    if (fields.CourseName)
      apiFormData.append("CourseName", fields.CourseName[0]);
    if (fields.CourseDescription)
      apiFormData.append("CourseDescription", fields.CourseDescription[0]);
    if (fields.IsPublished)
      apiFormData.append("IsPublished", fields.IsPublished[0]);
    if (fields.Language) apiFormData.append("Language", fields.Language[0]);
    if (fields.Level) apiFormData.append("Level", fields.Level[0]);
    apiFormData.append("CategoryId", fields.CategoryId?.[0]);

    // Handle file upload
    if (files.CourseCardPhoto) {
      const file = files.CourseCardPhoto[0];
      apiFormData.append(
        "CourseCardPhoto",
        fs.createReadStream(file.filepath),
        {
          filename: file.originalFilename,
          contentType: file.mimetype,
        }
      );
    }

    const response = await fetch(
      `https://codixa.runasp.net/api/Courses/update/${courseId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          ...apiFormData.getHeaders(),
        },
        body: apiFormData,
      }
    );

    const responseText = await response.text();

    if (!response.ok) {
      return res.status(response.status).json({
        message: responseText || "Update failed",
        status: response.status,
      });
    }

    try {
      const jsonResponse = JSON.parse(responseText);
      res.status(200).json(jsonResponse);
    } catch (e) {
      res.status(200).json({
        message: responseText || "Update successful",
        status: 200,
      });
    }
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({
      message: error.message || "Internal server error",
      status: 500,
    });
  }
}
