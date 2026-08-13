"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { Service } from "../../constants/services";

interface ServiceContentProps {
  service: Service;
}

export default function ServiceContent({ service }: ServiceContentProps) {
  const IconComponent = (LucideIcons as any)[service.icon] || LucideIcons.Zap;

  return (
    <div className="container-main" style={{ maxWidth: 1100 }}>
      {/* Breadcrumb */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        style={{ marginBottom: 32 }}
      >
        <Link href="/services" style={{ color: "#6B7280", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
          <LucideIcons.ArrowLeft size={16} />
          Return to Solutions
        </Link>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ background: "#FFFFFF", borderRadius: "clamp(24px, 4vw, 32px)", overflow: "hidden", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.08)", border: "1px solid #E5E7EB" }}
      >
        
        {/* 1. Strategic Visualization (TOP) */}
        {service.secondaryImage && (
          <div style={{ padding: "clamp(20px, 4vw, 40px)", background: "#F9FAFB", borderBottom: "1px solid #F3F4F6" }}>
            <div style={{ textAlign: "center", marginBottom: "clamp(12px, 2vw, 24px)" }}>
               <span style={{ background: "rgba(37, 99, 235, 0.1)", color: "#2563EB", padding: "4px 12px", borderRadius: 999, fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>STRATEGY BLUEPRINT</span>
            </div>
            <div style={{ 
              position: "relative", 
              width: "100%", 
              minHeight: "clamp(280px, 35vw, 600px)", 
              borderRadius: "clamp(16px, 2vw, 24px)", 
              overflow: "hidden", 
              background: "#FFFFFF",
              border: "1px solid #E5E7EB", 
              boxShadow: "0 15px 35px rgba(0,0,0,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Image 
                src={service.secondaryImage} 
                alt={`${service.title} strategic visualization`}
                width={1200}
                height={675}
                style={{ width: "100%", height: "auto", objectFit: "contain", maxWidth: "100%" }} 
                priority
              />
            </div>
          </div>
        )}

        {/* 2. Header & Description (MIDDLE) */}
        <div style={{ padding: "clamp(24px, 5vw, 60px)", borderBottom: "1px solid #F3F4F6" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ background: "rgba(37, 99, 235, 0.1)", color: "#2563EB", padding: "6px 14px", borderRadius: 8, fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase" }}>
              {service.tag}
            </div>
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#D1D5DB" }} />
            <span style={{ fontSize: "0.8rem", color: "#6B7280", fontWeight: 600 }}>Operational Insight</span>
          </div>
          <h1 style={{ fontSize: "clamp(1.75rem, 4.5vw, 3rem)", fontWeight: 900, color: "#111827", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 20 }}>
            {service.title}
          </h1>
          <p style={{ fontSize: "clamp(1rem, 1.8vw, 1.15rem)", color: "#4B5563", lineHeight: 1.6, maxWidth: 900 }}>
            {service.fullDesc}
          </p>
        </div>

        {/* 3. Benefits & Supporting Media (BOTTOM) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(20px, 4vw, 48px)", padding: "clamp(24px, 5vw, 60px)" }}>
          
          {/* Left: Benefits Checkbox List */}
          <div>
            <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#111827", marginBottom: 24, letterSpacing: "-0.01em" }}>What We Deliver</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {service.benefits.map((benefit: string, i: number) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  style={{ display: "flex", alignItems: "flex-start", gap: 14, background: "#F9FAFB", padding: "14px 18px", borderRadius: 14, border: "1px solid #F3F4F6" }}
                >
                  <div style={{ background: "#2563EB", color: "white", padding: 5, borderRadius: 6, display: "flex", flexShrink: 0 }}>
                    <LucideIcons.Check size={14} strokeWidth={3.5} />
                  </div>
                  <span style={{ fontSize: "0.95rem", color: "#374151", fontWeight: 600, lineHeight: 1.4 }}>{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Supporting Image & High-Intent CTA */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div style={{ 
              position: "relative", 
              width: "100%", 
              borderRadius: 20, 
              overflow: "hidden", 
              background: "#FFFFFF",
              border: "1px solid #E5E7EB",
              padding: 2,
              boxShadow: "0 10px 25px rgba(0,0,0,0.03)"
            }}>
              <Image 
                src={service.image} 
                alt={`${service.title} focus area`} 
                width={800}
                height={500}
                style={{ width: "100%", height: "auto", objectFit: "contain", borderRadius: 18 }} 
              />
            </div>

            <div style={{ 
              background: "linear-gradient(135deg, #1E1B4B 0%, #4C1D95 100%)", 
              borderRadius: 20, 
              padding: "clamp(24px, 4vw, 36px) clamp(20px, 3.5vw, 28px)", 
              color: "#FFFFFF",
              position: "relative",
              overflow: "hidden"
            }}>
              {/* Decorative element */}
              <div style={{ position: "absolute", top: -15, right: -15, width: 90, height: 90, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
              
              <div style={{ width: 50, height: 50, background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <IconComponent size={24} color="#FFFFFF" />
              </div>
              <h4 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#FFFFFF", marginBottom: 10, lineHeight: 1.25 }}>Scale your ROI today?</h4>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", marginBottom: 24, lineHeight: 1.6 }}>
                Secure a custom transformation strategy tailored for {service.title.toLowerCase()}.
              </p>
              <button className="glow-btn-primary" style={{ width: "100%", padding: "16px", borderRadius: 14, border: "none", color: "#FFFFFF", fontWeight: 800, cursor: "pointer", fontSize: "0.9rem", letterSpacing: "0.02em" }}>
                BOOK A GROWTH AUDIT
              </button>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
