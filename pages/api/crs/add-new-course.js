import formidable from "formidable";
import fs from "fs/promises";
import os from "os";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    // Create temporary directory
    const tempDir = path.join(os.tmpdir(), "course-uploads");
    await fs.mkdir(tempDir, { recursive: true });

    // Parse form data
    const { fields, files } = await new Promise((resolve, reject) => {
      const form = formidable({
        uploadDir: tempDir,
        keepExtensions: true,
        multiples: false,
        filename: (name, ext) => {
          return `${Date.now()}-${name}${ext}`;
        },
        maxFileSize: 10 * 1024 * 1024, // 10MB
      });

      form.parse(req, (err, fields, files) => {
        if (err) {
          if (err.code === formidable.errors.maxFileSizeExceeded) {
            return reject(new Error("File size exceeds 10MB limit"));
          }
          return reject(err);
        }
        resolve({ fields, files });
      });
    });

    // Validate required fields
    if (!fields.title || !fields.description || !fields.categoryId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Prepare form data for external API
    const formData = new FormData();
    formData.append("CourseName", fields.title[0]);
    formData.append("CourseDescription", fields.description[0]);
    formData.append("CategoryId", fields.categoryId[0]);

    // Handle file upload
    if (files.image) {
      const file = files.image[0];
      if (!file.filepath) {
        return res.status(400).json({ error: "Invalid file upload" });
      }

      try {
        const fileData = await fs.readFile(file.filepath);
        formData.append(
          "CourseCardPhoto",
          new Blob([fileData]),
          file.originalFilename ||
            `course-image-${Date.now()}${path.extname(file.newFilename)}`
        );
      } catch (error) {
        console.error("File read error:", error);
        return res.status(500).json({ error: "Failed to process image" });
      } finally {
        // Clean up temporary file
        await fs.unlink(file.filepath).catch(console.error);
      }
    }

    // Send to external API
    const response = await fetch(
      "https://codixa.runasp.net/api/Courses/AddNewCourse",
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: authHeader,
        },
      }
    );

    // Handle response
    const contentType = response.headers.get("content-type");
    const responseData = contentType?.includes("application/json")
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      console.error("External API error:", responseData);
      return res.status(response.status).json({
        error:
          typeof responseData === "object"
            ? responseData
            : { message: responseData },
      });
    }

    return res.status(200).json({ data: responseData });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({
      error: error.message,
      ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    });
  }
}
