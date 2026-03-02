import { FaBars, FaBell } from "react-icons/fa";

const Topbar = ({ onToggle }) => {
  return (
    <div
      style={{
        height: "55px",
        backgroundColor: "#bcf3ff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: " 16px",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <FaBars size={20} onClick={onToggle} style={{ cursor: "pointer" }} />

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <FaBell color="#6b7280" style={{ cursor: "pointer" }} />

        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#6366f1",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          A
        </div>
      </div>
    </div>
  );
};

export default Topbar;
