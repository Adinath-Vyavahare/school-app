import Link from "next/link";

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>School Management App</h1>
      <p>Select an option:</p>

      <div style={{ marginTop: "20px" }}>
        <Link href="/addSchool">
          <button style={btnStyle}>➕ Add School</button>
        </Link>
        <Link href="/showSchools">
          <button style={btnStyle}>📋 Show Schools</button>
        </Link>
      </div>
    </div>
  );
}

const btnStyle = {
  padding: "10px 20px",
  margin: "10px",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "#0070f3",
  color: "white",
  cursor: "pointer",
  fontSize: "16px",
};
