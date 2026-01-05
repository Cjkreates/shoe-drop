/* eslint-disable */
import { ImageResponse } from "next/og";

export const runtime = "edge";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#09090b",
          backgroundImage:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.03), transparent 20%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.02), transparent 25%)",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 88,
            fontWeight: 800,
            letterSpacing: 2,
            textTransform: "uppercase",
            fontFamily: 'Inter, -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial',
          }}
        >
          AERO DROPS
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
