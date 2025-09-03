import mysql from "mysql2/promise";

export async function connectToDatabase() {
  try {
    console.log("DB_USER:", process.env.DB_USER);
    console.log("DB_HOST:", process.env.DB_HOST);
    console.log("DB_NAME:", process.env.DB_NAME);
    console.log("DB_PORT:", process.env.DB_PORT);

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });

    console.log("✅ Connected to database");
    return connection;
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    throw err;
  }
}
