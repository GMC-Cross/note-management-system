import React from "react";
import { Loader2 } from "lucide-react";

export default function Spinner({ text = "Đang tải dữ liệu..." }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 0",
        color: "#666",
        gap: "8px",
      }}
    >
      {/* style xoay tròn 360 độ */}
      <Loader2
        size={32}
        style={{
          animation: "spin 1s linear infinite",
        }}
      />
      <span style={{ fontSize: "0.9rem" }}>{text}</span>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
