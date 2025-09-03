import useSWR from "swr";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ShowSchools() {
  const { data, error } = useSWR("/api/getSchools", fetcher);

  if (error) return <p>❌ Failed to load schools</p>;
  if (!data) return <p>⏳ Loading...</p>;

  const schools = data.schools || []; // ✅ fallback to []

  return (
    <div style={{ padding: "20px" }}>
      <h1>Schools List</h1>

      <Link href="/addSchool">
        <button
          style={{
            marginBottom: "20px",
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {schools.length > 0 ? (
          schools.map((school) => (
            <div
              key={school.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              }}
            >
              <img
  src={school.image}
  alt={school.name}
  style={{
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
  }}
/>

              <h2>{school.name}</h2>
              <p>{school.address}</p>
              <p>
                {school.city}, {school.state}
              </p>
            </div>
          ))
        ) : (
          <p>📭 No schools found. Add one!</p>
        )}
      </div>
    </div>
  );
}
