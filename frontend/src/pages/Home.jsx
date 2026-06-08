import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b1220",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
        padding: "20px",
        textAlign: "center",
      }}
    >
      {/* TITLE */}
      <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>
        Task Management System
      </h1>

      <p style={{ color: "#94a3b8", marginBottom: "30px" }}>
        Secure JWT Authentication • Role Based Access • CRUD Tasks
      </p>

      {/* CARDS */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "40px",
        }}
      >
        <div style={cardStyle}>
          🔐 Authentication
        </div>

        <div style={cardStyle}>
          🧑‍💼 Role Based Access
        </div>

        <div style={cardStyle}>
          ⚙️ CRUD Operations
        </div>
      </div>

      {/* BUTTONS */}
      <div style={{ display: "flex", gap: "15px" }}>
        <button
          onClick={() => navigate("/login")}
          style={btnPrimary}
        >
          Login
        </button>

        <button
          onClick={() => navigate("/register")}
          style={btnSecondary}
        >
          Register
        </button>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#111a2e",
  padding: "20px",
  borderRadius: "12px",
  border: "1px solid #1f2a44",
  width: "180px",
};

const btnPrimary = {
  background: "#f97316",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const btnSecondary = {
  background: "transparent",
  color: "white",
  border: "1px solid #334155",
  padding: "12px 20px",
  borderRadius: "8px",
  cursor: "pointer",
};

export default Home;