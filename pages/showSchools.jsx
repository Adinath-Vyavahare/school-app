import Link from "next/link";
import { useEffect, useState } from "react";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSchools() {
      try {
        const res = await fetch("/api/getSchools");
        const data = await res.json();
        setSchools(data);
      } catch (err) {
        console.error("Error fetching schools:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSchools();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={{ padding: "20px", background: "#111", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", color: "white" }}>Schools List</h1>

      {/* Button to go back to add school */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Link href="/addSchool">
          <button
            style={{
              padding: "10px 20px",
              background: "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            ➕ Add New School
          </button>
        </Link>
      </div>

      {/* Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {schools.map((s) => {
          const imagePath =
            s.image && s.image.trim() !== "" ? s.image : "/schoolImages/default.jpg";

          return (
            <div
              key={s.id}
              style={{
                border: "1px solid #333",
                borderRadius: "10px",
                backgroundColor: "#fff",
                overflow: "hidden",
                boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",
              }}
            >
              <img
                src={imagePath}
                alt={s.name}
                style={{ width: "100%", height: "180px", objectFit: "cover" }}
              />
              <div style={{ padding: "15px" }}>
                <h3
                  style={{
                    margin: "0 0 8px",
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#222",
                  }}
                >
                  {s.name}
                </h3>
                <p style={{ margin: "0 0 5px", fontSize: "15px", color: "#444" }}>
                  {s.address}
                </p>
                <p
                  style={{
                    margin: "0",
                    fontSize: "14px",
                    color: "#0070f3",
                    fontWeight: "500",
                  }}
                >
                  {s.city}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
