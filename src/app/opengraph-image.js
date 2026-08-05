import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#0f0f0f",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 64,
              height: 64,
              alignItems: "center",
              justifyContent: "center",
              background: "#c9ff33",
              borderRadius: 16,
              fontSize: 36,
              fontWeight: 700,
              color: "#0f0f0f",
            }}
          >
            G
          </div>
          <span style={{ fontSize: 34, fontWeight: 600, color: "#ffffff" }}>GOMO Studio</span>
        </div>
        <div style={{ display: "flex", fontSize: 56, fontWeight: 700, color: "#ffffff", maxWidth: 900, lineHeight: 1.15 }}>
          Your website&apos;s AI-powered backend
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 26, color: "rgba(255,255,255,0.6)" }}>
          AI content generation · Visual editor · Instant publishing
        </div>
      </div>
    ),
    { ...size },
  );
}
