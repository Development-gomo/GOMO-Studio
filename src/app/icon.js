import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f0f0f",
          borderRadius: 7,
          fontFamily: "sans-serif",
        }}
      >
        <span style={{ color: "#c9ff33", fontSize: 20, fontWeight: 700 }}>G</span>
      </div>
    ),
    { ...size },
  );
}
