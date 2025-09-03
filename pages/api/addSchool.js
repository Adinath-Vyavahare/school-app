// pages/api/addSchool.js
import { connectToDatabase } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, address, city, state, contact, email_id, image } = req.body;

      const db = await connectToDatabase();
      await db.execute(
  "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
  [name, address, city, state, contact, email_id, image]
);


      return res.status(201).json({ message: "School added successfully" }); // ✅ return here
    } catch (err) {
      console.error("Error inserting school:", err);
      return res.status(500).json({ error: "Database error" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
