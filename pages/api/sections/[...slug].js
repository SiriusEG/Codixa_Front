export default async function handler(req, res) {
  const [route, courseId] = req.query.slug;
  const token = req.headers.authorization?.split(" ")[1];
  const baseUrl = "https://codixa.runasp.net/api/Section";

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    switch (req.method) {
      case "GET":
        const response = await fetch(`${baseUrl}/GetAllSections/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return res.status(response.status).json(await response.json());

      case "POST":
        const addResponse = await fetch(`${baseUrl}/AddNewSection`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(req.body),
        });
        return res.status(addResponse.status).json(await addResponse.json());

      case "DELETE":
        const deleteResponse = await fetch(`${baseUrl}/Delete`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(req.body),
        });
        return res
          .status(deleteResponse.status)
          .json(await deleteResponse.json());

      case "PUT":
        const updateResponse = await fetch(
          `https://codixa.runasp.net/api/section/UpdateSectionsLessons`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(req.body),
          }
        );
        return res
          .status(updateResponse.status)
          .json(await updateResponse.json());

      default:
        return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
