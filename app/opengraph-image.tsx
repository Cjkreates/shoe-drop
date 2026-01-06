/* eslint-disable */
/* stylelint-disable */
import { ImageResponse } from "next/og";
import "./opengraph-image.css";

export const runtime = "edge";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div className="og-container">
        <div className="og-text">
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
