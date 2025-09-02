import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";
import { connectToDatabase } from "@/lib/db";

export const config = {
  api: {
    bodyParser: false, // disable Next.js body parser
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = new IncomingForm({
      uploadDir: path.join(process.cwd(), "public/schoolImages"),
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Image upload failed" });
      }

      const { name, address, city, state, contact, email_id, location } = fields;
      const uploadedFile = files.image?.[0];
      const imagePath = uploadedFile
        ? `/schoolImages/${path.basename(uploadedFile.filepath)}`
        : "/schoolImages/default.jpg";

      try {
        const db = await connectToDatabase();
        await db.execute(
          `INSERT INTO schools (name, address, city, state, contact, email_id, image, location)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            name?.[0] || "",
            address?.[0] || "",
            city?.[0] || "",
            state?.[0] || "",
            contact?.[0] || "",
            email_id?.[0] || "",
            imagePath,
            location?.[0] || null,
          ]
        );

        res.status(201).json({ message: "School added successfully!" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add school" });
      }
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
