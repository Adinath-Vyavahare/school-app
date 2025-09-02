import { connectToDatabase } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const db = await connectToDatabase();
      const [rows] = await db.execute(
        "SELECT id, name, address, city, image FROM schools"
      );
      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch schools" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
