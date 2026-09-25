import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function OgImage({
  title,
  subtitle,
  eyebrow = "Abhay Mishra",
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #6355FF 0%, #9F55FF 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 26,
            opacity: 0.9,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            fontSize: 62,
            fontWeight: 800,
            marginTop: 18,
            lineHeight: 1.1,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div style={{ fontSize: 30, marginTop: 24, opacity: 0.92, maxWidth: 900 }}>
            {subtitle}
          </div>
        ) : null}
        <div style={{ display: "flex", marginTop: 48, fontSize: 26, opacity: 0.85 }}>
          Video Editor · Social Media Manager
        </div>
      </div>
    ),
    { ...ogSize }
  );
}
