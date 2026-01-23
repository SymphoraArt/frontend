import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: 100,
            fontWeight: 700,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          A
        </span>
        <div
          style={{
            position: "absolute",
            top: 24,
            right: 24,
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "#22d3ee",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
