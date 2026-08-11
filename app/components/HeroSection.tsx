"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Star, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  Target, 
  BarChart3,
  MessageCircle
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface HeroSectionProps {
  onBookDemo: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const TICKER_ITEMS = [
  "High-Converting Sales Funnels",
  "Meta & Google Ads Engine",
  "B2B Lead Generation",
  "Conversion Rate Optimization",
  "Real-Time ROI Tracking",
  "AI-Powered Pipeline Automation",
  "Direct Response Copywriting",
  "Enterprise Lead Qualification",
  "Precision Audience Targeting",
  "Data-Driven Revenue Scaling",
];

export default function HeroSection({ onBookDemo }: HeroSectionProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          DARK EXECUTIVE HERO SECTION
          PC Desktop: Professional 2-Column Split Layout
          Mobile View: Creative Stack with Thumbnail Above CTA Buttons
          ═══════════════════════════════════════════════════════ */}
      <section
        id="hero"
        style={{
          position: "relative",
          paddingTop: "clamp(88px, 10vh, 124px)",
          paddingBottom: "clamp(36px, 4vh, 56px)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: "radial-gradient(circle at 50% -10%, #170C34 0%, #090615 55%, #05030B 100%)",
          color: "#F8FAFC",
        }}
      >
        {/* ── Ambient Background Glows & Cyber Grid ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
          {/* Subtle Grid Pattern */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "radial-gradient(rgba(139, 92, 246, 0.15) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              opacity: 0.6,
              maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 90%)",
              WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 90%)",
            }}
          />

          {/* Luminous Glow Beams */}
          <div
            style={{
              position: "absolute",
              top: "8%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "clamp(300px, 60vw, 850px)",
              height: "clamp(250px, 40vw, 450px)",
              background: "radial-gradient(ellipse at center, rgba(124, 58, 237, 0.28) 0%, rgba(99, 102, 241, 0.12) 45%, transparent 75%)",
              filter: "blur(60px)",
            }}
          />

          {/* Floating Orb 1: Violet Top-Right */}
          <div
            style={{
              position: "absolute",
              top: "15%",
              right: "8%",
              width: 320,
              height: 320,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(139, 92, 246, 0.18) 0%, transparent 70%)",
              filter: "blur(60px)",
              animation: "float-y 8s ease-in-out infinite",
            }}
          />

          {/* Floating Orb 2: Emerald Bottom-Left */}
          <div
            style={{
              position: "absolute",
              bottom: "20%",
              left: "5%",
              width: 280,
              height: 280,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)",
              filter: "blur(60px)",
              animation: "float-y 10s ease-in-out infinite reverse",
            }}
          />

          {/* Horizon Line Glow */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "10%",
              right: "10%",
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), rgba(16, 185, 129, 0.3), transparent)",
            }}
          />
        </div>

        <div className="container-main" style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 1240 }}>

          {/* ═══════════════════════════════════════════════════════
              1. DESKTOP / PC VERSION (screens >= 1024px)
              Executive 2-Column Split Screen (Fits PC screen height)
              ═══════════════════════════════════════════════════════ */}
          <div className="hero-desktop-grid hidden lg:grid">
            {/* Left Column: Copy & Actions */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left" }}>
              {/* Trust & Live Status Pill */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "4px 12px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(139, 92, 246, 0.32)",
                  borderRadius: "9999px",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 14,
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 0 20px rgba(124, 58, 237, 0.2), 0 1px 0 rgba(255, 255, 255, 0.15) inset",
                  color: "#E2E8F0",
                }}
              >
                <span style={{ position: "relative", width: 7, height: 7, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ position: "absolute", width: 7, height: 7, borderRadius: "50%", background: "#10B981", animation: "badge-ping 1.8s ease-out infinite" }} />
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#10B981", display: "inline-block" }} />
                </span>
                <span>AI-Driven Performance Engine</span>
                <span
                  style={{
                    background: "linear-gradient(135deg, rgba(124, 58, 237, 0.35), rgba(139, 92, 246, 0.2))",
                    border: "1px solid rgba(167, 139, 250, 0.4)",
                    borderRadius: "999px",
                    padding: "1px 7px",
                    fontSize: "0.55rem",
                    fontWeight: 800,
                    color: "#C4B5FD",
                    letterSpacing: "0.06em",
                  }}
                >
                  5.0 ★ TOP RATED
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
                style={{
                  fontSize: "clamp(2rem, 3.4vw, 2.9rem)",
                  fontWeight: 900,
                  lineHeight: 1.12,
                  letterSpacing: "-0.04em",
                  marginBottom: 12,
                  color: "#FFFFFF",
                  textShadow: "0 2px 20px rgba(0, 0, 0, 0.5)",
                }}
              >
                The World’s Result-First <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%)",
                    color: "#FFFFFF",
                    padding: "3px 14px",
                    borderRadius: 10,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 6,
                    lineHeight: "1.15",
                    boxShadow: "0 0 30px rgba(124, 58, 237, 0.45), 0 2px 0 rgba(255, 255, 255, 0.25) inset",
                    border: "1px solid rgba(196, 181, 253, 0.35)",
                  }}
                >
                  Performance Agency.
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "#E2E8F0",
                  marginBottom: 12,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.38,
                }}
              >
                We Don’t Just Drive Traffic — We Engineer <span style={{ color: "#38BDF8" }}>Predictable Buyers</span> &amp; <span style={{ color: "#34D399" }}>High-Margin Revenue</span>.
              </motion.h2>

              {/* Paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.15 }}
                style={{
                  fontSize: "0.82rem",
                  color: "#94A3B8",
                  marginBottom: 20,
                  lineHeight: 1.58,
                  fontWeight: 400,
                  maxWidth: 500,
                }}
              >
                We build high-converting acquisition funnels, laser-targeted paid campaigns, and verified pipeline systems for Doctors, Manufacturers, IT Companies &amp; Scaling Brands.
              </motion.p>

              {/* CTA Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  flexWrap: "wrap",
                  marginBottom: 16,
                }}
              >
                <motion.button
                  onClick={onBookDemo}
                  aria-label="Book a free growth session demo"
                  whileHover={{ scale: 1.04, boxShadow: "0 0 35px rgba(124, 58, 237, 0.65)" }}
                  whileTap={{ scale: 0.97 }}
                  className="glow-btn-primary"
                  style={{
                    padding: "12px 28px",
                    borderRadius: "9999px",
                    border: "1px solid rgba(255, 255, 255, 0.25)",
                    color: "#FFFFFF",
                    fontSize: "0.82rem",
                    fontWeight: 800,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    cursor: "pointer",
                    letterSpacing: "0.02em",
                    background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 60%, #5B21B6 100%)",
                    boxShadow: "0 0 25px rgba(124, 58, 237, 0.45), 0 1px 0 rgba(255, 255, 255, 0.3) inset",
                  }}
                >
                  <Sparkles size={14} className="text-yellow-300" />
                  BOOK A FREE DEMO
                  <ArrowRight size={15} strokeWidth={2.5} />
                </motion.button>

                <a
                  href="https://wa.me/918329494445"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Message us on WhatsApp"
                  style={{ textDecoration: "none" }}
                >
                  <motion.button
                    whileHover={{
                      scale: 1.04,
                      background: "rgba(16, 185, 129, 0.18)",
                      boxShadow: "0 0 25px rgba(16, 185, 129, 0.35)",
                    }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      padding: "12px 24px",
                      borderRadius: "9999px",
                      border: "1.5px solid #10B981",
                      color: "#34D399",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      background: "rgba(16, 185, 129, 0.08)",
                      cursor: "pointer",
                      backdropFilter: "blur(12px)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 7,
                      transition: "all 0.3s ease",
                      letterSpacing: "0.01em",
                    }}
                  >
                    <MessageCircle size={15} strokeWidth={2.2} />
                    WhatsApp Direct
                  </motion.button>
                </a>
              </motion.div>

              {/* Quick Verification Chips */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.25 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  flexWrap: "wrap",
                }}
              >
                {[
                  "No Lock-in Contracts",
                  "Guaranteed ROI Roadmap",
                  "100% Funnel Ownership",
                  "Live In 7 Days",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <CheckCircle size={12} strokeWidth={2.5} style={{ color: "#34D399", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.68rem", fontWeight: 600, color: "#CBD5E1" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Column: Floating 3D Transparent Workflow Graphic (No enclosing card/box) */}
            <div style={{ width: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* Atmospheric Luminous Underglow */}
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "85%",
                  background: "radial-gradient(ellipse at center, rgba(124, 58, 237, 0.32) 0%, rgba(56, 189, 248, 0.12) 45%, transparent 70%)",
                  filter: "blur(40px)",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.75, ease: EASE, delay: 0.2 }}
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 10.5",
                  minHeight: 280,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1,
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Image
                  src="/header.webp"
                  alt="First Option Performance Marketing Infrastructure - Research, Meta Ads, Video Studio, Funnels & Analytics"
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 680px"
                  style={{
                    objectFit: "contain",
                    objectPosition: "center",
                    transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease",
                    transform: isHovered ? "scale(1.04)" : "scale(1)",
                    filter: isHovered ? "drop-shadow(0 15px 35px rgba(124, 58, 237, 0.4))" : "drop-shadow(0 10px 25px rgba(0, 0, 0, 0.6))",
                  }}
                />
              </motion.div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════
              2. MOBILE / TABLET VERSION (screens < 1024px)
              Creative Stack: Header -> Floating Graphic -> CTA Buttons
              ═══════════════════════════════════════════════════════ */}
          <div className="hero-mobile-stack lg:hidden" style={{ textAlign: "center" }}>
            {/* Top Status Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "4px 11px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(139, 92, 246, 0.32)",
                borderRadius: "9999px",
                fontSize: "clamp(0.6rem, 2.5vw, 0.66rem)",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 12,
                backdropFilter: "blur(16px)",
                boxShadow: "0 0 20px rgba(124, 58, 237, 0.2), 0 1px 0 rgba(255, 255, 255, 0.15) inset",
                color: "#E2E8F0",
              }}
            >
              <span style={{ position: "relative", width: 7, height: 7, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ position: "absolute", width: 7, height: 7, borderRadius: "50%", background: "#10B981", animation: "badge-ping 1.8s ease-out infinite" }} />
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#10B981", display: "inline-block" }} />
              </span>
              <span>AI Performance Engine</span>
              <span
                style={{
                  background: "linear-gradient(135deg, rgba(124, 58, 237, 0.35), rgba(139, 92, 246, 0.2))",
                  border: "1px solid rgba(167, 139, 250, 0.4)",
                  borderRadius: "999px",
                  padding: "1px 6px",
                  fontSize: "0.54rem",
                  fontWeight: 800,
                  color: "#C4B5FD",
                  letterSpacing: "0.06em",
                }}
              >
                5.0 ★ TOP RATED
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
              style={{
                fontSize: "clamp(1.75rem, 6.5vw, 2.5rem)",
                fontWeight: 900,
                lineHeight: 1.12,
                letterSpacing: "-0.04em",
                marginBottom: 10,
                color: "#FFFFFF",
                textShadow: "0 2px 20px rgba(0, 0, 0, 0.5)",
              }}
            >
              The World’s Result-First <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%)",
                  color: "#FFFFFF",
                  padding: "3px 12px",
                  borderRadius: 8,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 6,
                  lineHeight: "1.15",
                  boxShadow: "0 0 30px rgba(124, 58, 237, 0.45), 0 2px 0 rgba(255, 255, 255, 0.25) inset",
                  border: "1px solid rgba(196, 181, 253, 0.35)",
                }}
              >
                Performance Agency.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
              style={{
                fontSize: "clamp(0.85rem, 3.2vw, 1.05rem)",
                fontWeight: 700,
                color: "#E2E8F0",
                marginBottom: 8,
                letterSpacing: "-0.02em",
                lineHeight: 1.35,
              }}
            >
              We Don’t Just Drive Traffic — We Engineer <span style={{ color: "#38BDF8" }}>Predictable Buyers</span> &amp; <span style={{ color: "#34D399" }}>High-Margin Revenue</span>.
            </motion.h2>

            {/* Value Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.15 }}
              style={{
                fontSize: "clamp(0.74rem, 2.8vw, 0.84rem)",
                color: "#94A3B8",
                marginBottom: 14,
                lineHeight: 1.52,
                fontWeight: 400,
                maxWidth: 480,
                marginInline: "auto",
              }}
            >
              We build high-converting acquisition funnels, laser-targeted paid campaigns, and verified pipeline systems for Doctors, Manufacturers, IT Companies &amp; Scaling Brands.
            </motion.p>

            {/* FLOATING 3D GRAPHIC (ABOVE BUTTONS ON MOBILE - NO CARD/BOX) */}
            <div style={{ position: "relative", width: "100%", maxWidth: 620, marginInline: "auto", marginBottom: 16 }}>
              {/* Atmospheric Glow */}
              <div
                style={{
                  position: "absolute",
                  inset: "10% 5%",
                  background: "radial-gradient(ellipse at center, rgba(124, 58, 237, 0.28) 0%, rgba(56, 189, 248, 0.1) 50%, transparent 70%)",
                  filter: "blur(30px)",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.75, ease: EASE, delay: 0.2 }}
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 10",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1,
                }}
              >
                <Image
                  src="/header.webp"
                  alt="First Option Performance Marketing Infrastructure - Research, Meta Ads, Video Studio, Funnels & Analytics"
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 620px"
                  style={{
                    objectFit: "contain",
                    objectPosition: "center",
                    filter: "drop-shadow(0 8px 20px rgba(0, 0, 0, 0.65))",
                  }}
                />
              </motion.div>
            </div>

            {/* DUAL CTA BUTTONS (DIRECTLY UNDER THUMBNAIL ON MOBILE) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.26 }}
              style={{
                display: "flex",
                gap: 10,
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                marginBottom: 14,
              }}
            >
              <motion.button
                onClick={onBookDemo}
                aria-label="Book a free growth session demo"
                whileTap={{ scale: 0.97 }}
                className="glow-btn-primary"
                style={{
                  padding: "11px 22px",
                  borderRadius: "9999px",
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                  color: "#FFFFFF",
                  fontSize: "clamp(0.72rem, 2.6vw, 0.84rem)",
                  fontWeight: 800,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  cursor: "pointer",
                  letterSpacing: "0.02em",
                  background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 60%, #5B21B6 100%)",
                  boxShadow: "0 0 25px rgba(124, 58, 237, 0.45), 0 1px 0 rgba(255, 255, 255, 0.3) inset",
                }}
              >
                <Sparkles size={13} className="text-yellow-300" />
                BOOK A FREE DEMO
                <ArrowRight size={14} strokeWidth={2.5} />
              </motion.button>

              <a
                href="https://wa.me/918329494445"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message us on WhatsApp"
                style={{ textDecoration: "none" }}
              >
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: "11px 20px",
                    borderRadius: "9999px",
                    border: "1.5px solid #10B981",
                    color: "#34D399",
                    fontSize: "clamp(0.72rem, 2.6vw, 0.84rem)",
                    fontWeight: 700,
                    background: "rgba(16, 185, 129, 0.08)",
                    cursor: "pointer",
                    backdropFilter: "blur(12px)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    letterSpacing: "0.01em",
                  }}
                >
                  <MessageCircle size={14} strokeWidth={2.2} />
                  WhatsApp Direct
                </motion.button>
              </a>
            </motion.div>

            {/* Verification Chips */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.3 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                flexWrap: "wrap",
                marginBottom: 20,
              }}
            >
              {[
                "No Lock-in Contracts",
                "Guaranteed ROI",
                "100% Funnel Ownership",
                "Live In 7 Days",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <CheckCircle size={11} strokeWidth={2.5} style={{ color: "#34D399", flexShrink: 0 }} />
                  <span style={{ fontSize: "clamp(0.62rem, 2.2vw, 0.68rem)", fontWeight: 600, color: "#CBD5E1" }}>
                    {item}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ═══════════════════════════════════════════════════════
              COMMON HIGH-AUTHORITY METRICS STRIP (Full Width Bottom)
              ═══════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.35 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(10px, 2.5vw, 28px)",
              padding: "clamp(9px, 1.4vh, 13px) clamp(12px, 2.5vw, 28px)",
              background: "rgba(15, 11, 30, 0.75)",
              borderRadius: "14px",
              border: "1px solid rgba(139, 92, 246, 0.2)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
              flexWrap: "wrap",
              marginTop: "clamp(12px, 2vh, 24px)",
            }}
          >
            {[
              { num: "98.6%", label: "Retention" },
              { num: "4.8x", label: "Avg. ROAS" },
              { num: "45%+", label: "Conv. Rate" },
              { num: "150+", label: "Brands Scaled" },
            ].map((stat, idx) => (
              <div key={stat.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span
                  style={{
                    fontSize: "clamp(0.85rem, 1.4vw, 1.05rem)",
                    fontWeight: 800,
                    color: "#A78BFA",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {stat.num}
                </span>
                <span style={{ fontSize: "clamp(0.62rem, 1vw, 0.74rem)", fontWeight: 500, color: "#94A3B8" }}>
                  {stat.label}
                </span>
                {idx < 3 && (
                  <div
                    style={{
                      width: 1,
                      height: 12,
                      background: "rgba(255, 255, 255, 0.12)",
                      marginLeft: 6,
                    }}
                    className="hidden sm:block"
                  />
                )}
              </div>
            ))}
            <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={11} strokeWidth={0} fill="#FBBF24" />
              ))}
              <span style={{ fontSize: "clamp(0.62rem, 1vw, 0.72rem)", fontWeight: 600, color: "#E2E8F0", marginLeft: 4 }}>
                Authority Verified
              </span>
            </div>
          </motion.div>
        </div>

        {/* Seamless dark gradient transition to ticker */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 24,
            background: "linear-gradient(to bottom, transparent, #06040F)",
            zIndex: 2,
          }}
        />
      </section>

      {/* ═══════════════════════════════════════════════════════
          SCROLLING TICKER — Dark Cyber Neon Edition
          ═══════════════════════════════════════════════════════ */}
      <div
        style={{
          background: "linear-gradient(90deg, #090616 0%, #150E2D 50%, #090616 100%)",
          padding: "11px 0",
          overflow: "hidden",
          borderTop: "1px solid rgba(139, 92, 246, 0.28)",
          borderBottom: "1px solid rgba(139, 92, 246, 0.28)",
          position: "relative",
          zIndex: 5,
        }}
      >
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                paddingRight: 36,
                whiteSpace: "nowrap",
              }}
            >
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "rgba(226, 232, 240, 0.85)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {item}
              </span>
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#8B5CF6",
                  boxShadow: "0 0 8px #8B5CF6",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          WHY CHOOSE US / METRICS SECTION (Clean Modern)
          ═══════════════════════════════════════════════════════ */}
      <section
        style={{
          background: "linear-gradient(165deg, #F8FAFC 0%, #F5F3FF 50%, #EDE9FE 100%)",
          padding: "clamp(48px, 6vw, 72px) 0",
          position: "relative",
          zIndex: 10,
          borderBottom: "1px solid rgba(124, 58, 237, 0.1)",
        }}
      >
        <div style={{ position: "absolute", inset: 0, opacity: 0.35 }} className="bg-dot-grid" />

        <div className="container-main" style={{ maxWidth: 1100, position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(32px, 4vw, 44px)" }}>
            <span className="section-badge">
              WHY CHOOSE US
            </span>
            <h2
              style={{
                fontSize: "clamp(1.3rem, 3.2vw, 2.1rem)",
                fontWeight: 800,
                color: "var(--text-main)",
                marginBottom: "clamp(6px, 1.2vw, 12px)",
                letterSpacing: "-0.035em",
              }}
            >
              The Future of{" "}
              <span
                style={{
                  background: "var(--color-primary)",
                  color: "#FFFFFF",
                  padding: "2px 10px",
                  borderRadius: "8px",
                  display: "inline-block",
                }}
              >
                Direct Response Marketing
              </span>
            </h2>
            <p
              style={{
                color: "var(--text-dim)",
                fontSize: "clamp(0.76rem, 1.4vw, 0.88rem)",
                fontWeight: 500,
                maxWidth: 540,
                marginInline: "auto",
                lineHeight: 1.6,
              }}
            >
              A complete acquisition infrastructure designed to scale your revenue — where precision data science and high-intent creative converge.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "clamp(12px, 2vw, 20px)",
            }}
          >
            <MetricCard
              icon={<Target size={18} strokeWidth={2} />}
              title="Unified Acquisition Funnels"
              desc="Full visibility into your customer journey, from first impression to closed deal, in a single real-time dashboard."
              color="#7C3AED"
            />
            <MetricCard
              icon={<Sparkles size={18} strokeWidth={2} />}
              title="High-Intent Creative Engine"
              desc="High-converting video ads, dynamic landing pages, and copy engineered to convert high-ticket buyers."
              color="#F59E0B"
            />
            <MetricCard
              icon={<Clock size={18} strokeWidth={2} />}
              title="Real-Time Performance Data"
              desc="Live ad performance, lead quality score, and conversion tracking synced second-by-second."
              color="#10B981"
            />
            <MetricCard
              icon={<BarChart3 size={18} strokeWidth={2} />}
              title="Predictable ROAS & Profit"
              desc="Track true profitability, customer lifetime value, and cost-per-acquisition with zero guesswork."
              color="#6D28D9"
            />
          </div>

          {/* Mini KPI Trust Pill Band */}
          <div
            style={{
              display: "flex",
              gap: "clamp(12px, 2.5vw, 22px)",
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: "clamp(24px, 3.5vw, 38px)",
              padding: "clamp(12px, 2vw, 18px)",
              background: "rgba(255, 255, 255, 0.8)",
              borderRadius: "14px",
              border: "1px solid rgba(124, 58, 237, 0.15)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 4px 20px -2px rgba(124, 58, 237, 0.06)",
            }}
          >
            {[
              { icon: <TrendingUp size={13} />, label: "Avg. 4.8x ROI Boost", color: "#7C3AED" },
              { icon: <Users size={13} />, label: "150+ Brands Scaled", color: "#6D28D9" },
              { icon: <ShieldCheck size={13} />, label: "Zero Guesswork Ad Spend", color: "#10B981" },
              { icon: <Star size={13} />, label: "5.0/5.0 Excellence Rating", color: "#F59E0B" },
            ].map((kpi) => (
              <div key={kpi.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ color: kpi.color }}>{kpi.icon}</div>
                <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-dim)" }}>{kpi.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero-desktop-grid {
          grid-template-columns: 1fr 1.05fr;
          gap: clamp(28px, 4vw, 52px);
          align-items: center;
        }
      `}</style>
    </>
  );
}

function MetricCard({
  icon,
  title,
  desc,
  color,
}: {
  icon: any;
  title: string;
  desc: string;
  color: string;
}) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={{
        rest: { y: 0, boxShadow: "0 2px 12px -4px rgba(0,0,0,0.06)", borderColor: "rgba(226,232,240,0.9)" },
        hover: { y: -6, boxShadow: `0 18px 40px -8px ${color}26`, borderColor: color + "40" },
      }}
      style={{
        background: "#FFFFFF",
        borderRadius: "clamp(14px, 2vw, 18px)",
        border: "1px solid",
        padding: "clamp(18px, 2.5vw, 24px) clamp(16px, 2vw, 22px)",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        cursor: "pointer",
        overflow: "hidden",
        position: "relative",
        transition: "all 0.42s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* Top Accent Line */}
      <motion.div
        variants={{ rest: { scaleX: 0, opacity: 0 }, hover: { scaleX: 1, opacity: 1 } }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          transformOrigin: "left",
        }}
      />

      {/* Icon Capsule */}
      <motion.div
        variants={{
          rest: { background: "#F1F5F9", color: color },
          hover: { background: color, color: "#FFFFFF" },
        }}
        transition={{ duration: 0.28 }}
        style={{
          width: "clamp(34px, 4vw, 40px)",
          height: "clamp(34px, 4vw, 40px)",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </motion.div>

      <div>
        <motion.h3
          variants={{ rest: { color: "#0F172A" }, hover: { color: color } }}
          style={{
            fontSize: "clamp(0.82rem, 1.5vw, 0.95rem)",
            fontWeight: 700,
            marginBottom: 5,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </motion.h3>
        <p style={{ fontSize: "clamp(0.7rem, 1.2vw, 0.78rem)", color: "#475569", lineHeight: 1.55, fontWeight: 500 }}>
          {desc}
        </p>
      </div>
    </motion.div>
  );
}


