import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";

export default function AddSchool() {
  const { register, handleSubmit, reset } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }

    try {
      const res = await fetch("/api/addSchool", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setMessage("✅ School added successfully!");
        reset();
      } else {
        setMessage("❌ Failed to add school");
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("❌ Error occurred");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add School</h1>

      {/* Back to list button */}
      <Link href="/showSchools">
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
          📋 View Schools List
        </button>
      </Link>

      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
        }}
      >
        <input placeholder="School Name" {...register("name", { required: true })} />
        <input placeholder="Address" {...register("address", { required: true })} />
        <input placeholder="City" {...register("city", { required: true })} />
        <input placeholder="State" {...register("state", { required: true })} />
        <input placeholder="Contact" {...register("contact", { required: true })} />
        <input type="email" placeholder="Email" {...register("email_id", { required: true })} />
        <input type="file" {...register("image")} />

        <button
          type="submit"
          style={{
            padding: "10px",
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          ➕ Add School
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
