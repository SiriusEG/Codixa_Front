export default async function handler(req, res) {
  const token = req.headers.authorization?.split(" ")[1];
  const { id, ...updateData } = req.body;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    // Handle image null case
    if (updateData.courseCardPhotoPath === null) {
      updateData.courseCardPhotoPath = null;
    }

    const response = await fetch(
      `https://codixa.runasp.net/api/Courses/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      }
    );

    if (!response.ok) throw new Error("Failed to update course");
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
