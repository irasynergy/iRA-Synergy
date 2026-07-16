"use client";

import React, { useEffect, useState, useRef } from "react";
import { useScreenshotProtection } from "@/hooks/useScreenshotProtection";

export interface ScreenshotProtectionProps {
  watermarkText?: string;
  overlayDuration?: number;
  blurOnHide?: boolean;
  blockDevTools?: boolean;
  blockRightClick?: boolean;
  userEmail?: string;
}

/**
 * ScreenshotProtection wrapper component.
 * Integrates anti-screenshot keyboard handlers, tab blur, DevTools detection,
 * right-click locks, and customizable canvas watermark tiles.
 */
export default function ScreenshotProtection({
  watermarkText = "irasynergy.com · CONFIDENTIAL",
  overlayDuration = 1200,
  blurOnHide = true,
  blockDevTools = true,
  blockRightClick = true,
  userEmail,
}: ScreenshotProtectionProps) {
  const [mounted, setMounted] = useState(false);
  const [watermarkUrl, setWatermarkUrl] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Invoke core hook
  const { isBlocked, isDevToolsOpen } = useScreenshotProtection({
    overlayDuration,
    blurOnHide,
    blockDevTools,
    blockRightClick,
    userEmail,
  });

  // Handle mounting on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate canvas-based repeating watermark image
  useEffect(() => {
    if (!mounted) return;

    // Use standard HTML5 canvas in client environment
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.clearRect(0, 0, 300, 300);
      
      // Text configuration: use email if logged in for session traceability
      const primaryText = userEmail || watermarkText;
      const dateText = new Date().toLocaleDateString("en-IN");
      
      // Font settings
      ctx.font = "600 11px sans-serif";
      // Neutral semi-transparent color that works on both dark and light pages
      ctx.fillStyle = "rgba(156, 163, 175, 0.08)";
      ctx.textAlign = "center";
      
      // Rotate 45 degrees around center point
      ctx.translate(150, 150);
      ctx.rotate(-45 * Math.PI / 180);
      
      ctx.fillText(primaryText, 0, -8);
      ctx.fillText(dateText, 0, 8);

      const dataUrl = canvas.toDataURL("image/png");
      setWatermarkUrl(dataUrl);
    }
  }, [mounted, watermarkText, userEmail]);

  if (!mounted) return null;

  return (
    <>
      {/* Global CSS Inject to support Blur transitions */}
      <style jsx global>{`
        body {
          transition: filter 0.15s ease, opacity 0.15s ease !important;
        }
        body.screenshot-blur {
          filter: blur(12px) brightness(0.3) !important;
          pointer-events: none !important;
        }
        body.devtools-locked {
          filter: blur(20px) brightness(0.2) !important;
          pointer-events: none !important;
        }
      `}</style>

      {/* DevTools Sniffer State Modifier */}
      {blockDevTools && isDevToolsOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(10, 15, 25, 0.95)",
          zIndex: 2147483642,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          color: "#f8fafc",
          textAlign: "center",
          padding: "2rem"
        }}>
          <div style={{
            width: "4rem",
            height: "4rem",
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ef4444",
            fontSize: "2rem",
            marginBottom: "1.5rem",
          }}>⛔</div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            Developer Options Active
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "0.9rem", maxWidth: "400px", lineHeight: 1.5 }}>
            Access to confidential data is suspended. Close the developer console to resume your session.
          </p>
        </div>
      )}

      {/* Layer 1 Blockout Overlay */}
      {isBlocked && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "#000000",
          zIndex: 2147483645,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          fontFamily: "sans-serif",
          pointerEvents: "all"
        }}>
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⚠️</div>
          <p style={{ fontSize: "1.2rem", fontWeight: 600 }}>
            Screenshots are not permitted on this site
          </p>
        </div>
      )}

      {/* Layer 4 Dynamic Repeating Watermark Pattern Overlay */}
      {watermarkUrl && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${watermarkUrl})`,
          backgroundRepeat: "repeat",
          pointerEvents: "none",
          zIndex: 2147483640,
        }} />
      )}
    </>
  );
}
