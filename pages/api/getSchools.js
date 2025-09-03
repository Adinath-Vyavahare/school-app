// pages/api/getSchools.js
import { connectToDatabase } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const db = await connectToDatabase();
      const [rows] = await db.execute("SELECT * FROM schools");

      return res.status(200).json({ schools: rows }); // ✅ wrap in { schools: [...] }
    } catch (err) {
      console.error("Error fetching schools:", err);
      return res.status(500).json({ error: "Database error" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
