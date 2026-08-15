"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Cpu,
  Target,
  Sparkles,
  Layers,
  Code2,
  Database,
  BarChart3,
  Rocket,
  ShieldCheck,
  Quote,
  Shuffle,
  Crown
} from "lucide-react";

interface Founder {
  id: string;
  name: string;
  role: string;
  designation: string;
  badge: string;
  badgeColor: string;
  image: string;
  quote: string;
  skills: { label: string; icon: React.ReactNode }[];
}

const INITIAL_FOUNDERS: Founder[] = [
  {
    id: "faiz",
    name: "Faiz Ansari",
    role: "Founder & Senior Revenue Strategist",
    designation: "Founder",
    badge: "Revenue Architecture",
    badgeColor: "#2563EB",
    image: "/founders/Faiz Ansari.png",
    quote:
      "We created First Option Agency after watching hundreds of business owners burn lakhs of rupees on traditional agencies that only delivered impressions, vanity metrics, and fake leads. Our mission is simple: build a predictable, automated revenue engine that turns clicks into real buyers.",
    skills: [
      { label: "Direct Response Ads", icon: <Target size={13} /> },
      { label: "Revenue Systems", icon: <TrendingUp size={13} /> },
      { label: "High-Ticket Sales Funnels", icon: <Layers size={13} /> },
      { label: "Performance Marketing", icon: <BarChart3 size={13} /> },
    ],
  },
  {
    id: "mudassir",
    name: "Shaikh Mudassir",
    role: "Founder & Head of Technology & Engineering",
    designation: "Founder",
    badge: "Technology & AI Systems",
    badgeColor: "#7C3AED",
    image: "/founders/Shaikh Mudassir.png",
    quote:
      "Modern marketing is nothing without rock-solid tech infrastructure. We build high-converting software ecosystems — from custom CRMs and ERPs to intelligent AI automations and robust APIs that turn data into automated business revenue.",
    skills: [
      { label: "AI & Automations", icon: <Cpu size={13} /> },
      { label: "Software & Web Apps", icon: <Code2 size={13} /> },
      { label: "Custom CRMs & ERPs", icon: <Database size={13} /> },
      { label: "APIs & Integrations", icon: <Sparkles size={13} /> },
    ],
  },
  {
    id: "moin",
    name: "Moin Zariwala",
    role: "Founder & Head of Marketing Strategy",
    designation: "Founder",
    badge: "Marketing Strategy",
    badgeColor: "#059669",
    image: "/founders/Moin Zariwala.png",
    quote:
      "Scaling brands requires an obsession with market psychology, omni-channel acquisition, and bulletproof campaign execution. We ensure every campaign reaches the exact target audience with messaging that converts immediately.",
    skills: [
      { label: "Omni-Channel Marketing", icon: <Rocket size={13} /> },
      { label: "Brand Positioning & Scaling", icon: <ShieldCheck size={13} /> },
      { label: "Lead Generation & CRO", icon: <Target size={13} /> },
      { label: "Creative Campaigns", icon: <Sparkles size={13} /> },
    ],
  },
];

export default function Founders() {
  const [founders, setFounders] = useState<Founder[]>(INITIAL_FOUNDERS);

  // Randomize founder order on client mount so no founder is always on top/first
  useEffect(() => {
    const shuffled = [...INITIAL_FOUNDERS].sort(() => Math.random() - 0.5);
    setFounders(shuffled);
  }, []);

  const handleManualShuffle = () => {
    setFounders((prev) => {
      const next = [...prev];
      for (let i = next.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [next[i], next[j]] = [next[j], next[i]];
      }
      return next;
    });
  };

  return (
    <section
      id="founders"
      style={{
        position: "relative",
        paddingTop: "clamp(60px, 8vw, 96px)",
        paddingBottom: "clamp(60px, 8vw, 96px)",
        backgroundColor: "var(--bg-main)",
        overflow: "hidden",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      {/* Subtle Background Glow */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "1000px",
          height: "450px",
          background:
            "radial-gradient(ellipse at center, rgba(37, 99, 235, 0.05) 0%, rgba(124, 58, 237, 0.03) 50%, transparent 80%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="container-main" style={{ position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(40px, 6vw, 60px)" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginBottom: 14,
            }}
          >
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="section-badge"
              style={{ margin: 0 }}
            >
              BEHIND FIRST OPTION AGENCY
            </motion.span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            style={{
              fontSize: "clamp(1.4rem, 4vw, 2.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--text-main)",
              lineHeight: 1.15,
              marginBottom: "clamp(10px, 1.5vw, 14px)",
            }}
          >
            Meet The Founders Driving <br />
            <span className="gradient-text-teal">Your Measurable Growth</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            style={{
              color: "var(--text-dim)",
              fontSize: "clamp(0.82rem, 1.5vw, 0.95rem)",
              maxWidth: 640,
              margin: "0 auto",
              lineHeight: 1.65,
              fontWeight: 400,
            }}
          >
            Direct founder-led execution across revenue strategy, full-stack software & AI
            automation, and high-performance omni-channel marketing.
          </motion.p>
        </div>

        {/* 3 Founder Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "clamp(24px, 3vw, 32px)",
            alignItems: "stretch",
          }}
        >
          {founders.map((founder, index) => (
            <motion.div
              key={founder.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                layout: { duration: 0.4, ease: "easeInOut" },
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <div
                style={{
                  background: "var(--bg-surface)",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid var(--border-subtle)",
                  boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 16px 36px -8px rgba(37, 99, 235, 0.15)";
                  e.currentTarget.style.borderColor = "rgba(37, 99, 235, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px -2px rgba(0, 0, 0, 0.05)";
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                }}
              >
                {/* ── UNROPPED FULL PHOTO CONTAINER ── */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "1 / 1",
                    backgroundColor: "#0B1120",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Subtle Background Glow behind portrait */}
                  <div
                    style={{
                      position: "absolute",
                      width: "80%",
                      height: "80%",
                      borderRadius: "50%",
                      background: `radial-gradient(circle, ${founder.badgeColor}25 0%, transparent 70%)`,
                      filter: "blur(30px)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Full Uncropped Founder Photo */}
                  <Image
                    src={encodeURI(founder.image)}
                    alt={`${founder.name} - ${founder.role}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{
                      objectFit: "contain",
                      objectPosition: "center bottom",
                    }}
                    priority={index === 0}
                  />

                  {/* Top Founder Designation Badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      zIndex: 2,
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        padding: "5px 11px",
                        borderRadius: "9999px",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        backgroundColor: "rgba(15, 23, 42, 0.85)",
                        color: "#FFFFFF",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <Crown size={12} color="#FBBF24" />
                      Founder
                    </span>
                  </div>

                  {/* Department Tag on right */}
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      zIndex: 2,
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        padding: "5px 10px",
                        borderRadius: "9999px",
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        color: "#0F172A",
                        backdropFilter: "blur(8px)",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          backgroundColor: founder.badgeColor,
                        }}
                      />
                      {founder.badge}
                    </span>
                  </div>
                </div>

                {/* ── CARD BODY ── */}
                <div
                  style={{
                    padding: "20px 20px 22px 20px",
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    justifyContent: "space-between",
                    gap: 16,
                  }}
                >
                  {/* Name & Official Title */}
                  <div>
                    <h3
                      style={{
                        color: "var(--text-main)",
                        fontSize: "1.25rem",
                        fontWeight: 800,
                        letterSpacing: "-0.025em",
                        marginBottom: 4,
                      }}
                    >
                      {founder.name}
                    </h3>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        color: founder.badgeColor,
                        fontSize: "0.84rem",
                        fontWeight: 700,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      <span>{founder.role}</span>
                    </div>
                  </div>

                  {/* Quote / Mission Statement */}
                  <div
                    style={{
                      position: "relative",
                      backgroundColor: "rgba(241, 245, 249, 0.65)",
                      border: "1px solid rgba(226, 232, 240, 0.85)",
                      borderRadius: "var(--radius-md)",
                      padding: "14px 14px 14px 34px",
                    }}
                  >
                    <Quote
                      size={14}
                      style={{
                        position: "absolute",
                        top: 14,
                        left: 12,
                        color: founder.badgeColor,
                        opacity: 0.8,
                        transform: "scaleX(-1)",
                      }}
                    />
                    <p
                      style={{
                        fontSize: "0.82rem",
                        lineHeight: 1.6,
                        color: "#334155",
                        fontStyle: "italic",
                        margin: 0,
                        fontWeight: 450,
                      }}
                    >
                      &ldquo;{founder.quote}&rdquo;
                    </p>
                  </div>

                  {/* Expertise / Focus Badges */}
                  <div>
                    <div
                      style={{
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        color: "var(--text-muted)",
                        marginBottom: 8,
                      }}
                    >
                      Core Domain Expertise
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px",
                      }}
                    >
                      {founder.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5,
                            padding: "4px 9px",
                            backgroundColor: "#F8FAFC",
                            border: "1px solid #E2E8F0",
                            borderRadius: "6px",
                            fontSize: "0.73rem",
                            fontWeight: 600,
                            color: "#1E293B",
                          }}
                        >
                          <span style={{ color: founder.badgeColor }}>
                            {skill.icon}
                          </span>
                          {skill.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sub-bar / Reassurance note */}
        <div
          style={{
            marginTop: "clamp(24px, 4vw, 36px)",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <ShieldCheck size={14} color="#2563EB" />
            Direct founder-led strategy & execution on every client account.
          </span>
          <button
            onClick={handleManualShuffle}
            type="button"
            title="Randomize founder view order"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontSize: "0.72rem",
              color: "var(--color-primary)",
              background: "rgba(37, 99, 235, 0.06)",
              border: "1px solid rgba(37, 99, 235, 0.15)",
              padding: "3px 8px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: 600,
              transition: "all 0.2s ease",
            }}
          >
            <Shuffle size={12} />
            Rotate Order
          </button>
        </div>
      </div>
    </section>
  );
}
