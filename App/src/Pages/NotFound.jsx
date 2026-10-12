import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#f4f7fb",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "500px" }}>
        <h1
          style={{
            margin: 0,
            fontSize: "clamp(100px, 20vw, 180px)",
            fontWeight: "800",
            lineHeight: 1,
            color: "#2563eb",
            letterSpacing: "-8px",
          }}
        >
          404
        </h1>

        <h2
          style={{
            margin: "20px 0 12px",
            fontSize: "30px",
            color: "#1e293b",
          }}
        >
          Page Not Found
        </h2>

        <p
          style={{
            marginBottom: "30px",
            fontSize: "16px",
            lineHeight: 1.7,
            color: "#64748b",
          }}
        >
          Sorry, the page you are looking for doesn't exist
          or may have been moved.
        </p>

        <Link
          to="/"
          style={{
            display: "inline-block",
            padding: "13px 26px",
            backgroundColor: "#2563eb",
            color: "#ffffff",
            textDecoration: "none",
            borderRadius: "8px",
            fontWeight: "600",
          }}
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;