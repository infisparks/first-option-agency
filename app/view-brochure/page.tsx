"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download, Hospital, Activity, Database, FileText, MapPin, Search } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function ViewBrochurePage() {
  return (
    <main style={{ background: "linear-gradient(180deg, #F8FAFC 0%, #F5F3FF 100%)", minHeight: "100vh" }}>
      {/* Header / Navigation */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{ 
          padding: "16px clamp(20px, 5vw, 40px)", 
          background: "rgba(255, 255, 255, 0.8)", 
          borderBottom: "1px solid rgba(124, 58, 237, 0.15)", 
          position: "sticky", 
          top: 0, 
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backdropFilter: "blur(12px)"
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--color-primary)", fontWeight: 700, textDecoration: "none" }}>
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>
        <motion.a 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="/brochure/roadmap.png" 
          download="First-Option-Agency-Roadmap.png"
          style={{ 
            background: "var(--color-primary)", 
            color: "#FFFFFF", 
            padding: "10px 24px", 
            borderRadius: "12px", 
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontWeight: 700,
            fontSize: "14px",
            boxShadow: "0 10px 20px -5px rgba(124, 58, 237, 0.3)"
          }}
        >
          <Download size={18} />
          Download Roadmap
        </motion.a>
      </motion.nav>

      <div className="container-main" style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 20px" }}>
        {/* SEO Focused Content Block */}
        <motion.section 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{ marginBottom: "80px", textAlign: "center" }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: 8, 
              padding: "6px 16px", 
              background: "rgba(124, 58, 237, 0.08)", 
              borderRadius: "999px", 
              color: "var(--color-primary)", 
              fontSize: "12px", 
              fontWeight: 800, 
              letterSpacing: "0.05em",
              marginBottom: "24px",
              textTransform: "uppercase"
            }}
          >
            <Activity size={14} />
            Strategic Growth Infrastructure for Modern Business
          </motion.div>

          <h1 style={{ 
            fontSize: "clamp(2.2rem, 6vw, 4.5rem)", 
            fontWeight: 900, 
            color: "var(--text-main)", 
            marginBottom: "24px",
            lineHeight: 1.05,
            letterSpacing: "-0.04em"
          }}>
            India&apos;s Best <span style={{ 
              background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))", 
              WebkitBackgroundClip: "text", 
              WebkitTextFillColor: "transparent" 
            }}>Marketing Agency</span>
          </h1>

          <p style={{ 
            fontSize: "clamp(1rem, 2vw, 1.25rem)", 
            color: "var(--text-dim)", 
            maxWidth: "800px", 
            margin: "0 auto 40px",
            lineHeight: 1.6,
            fontWeight: 500
          }}>
            First Option Agency is a leading <strong>performance marketing agency in Gurgaon</strong>, meticulously engineered to solve the acquisition challenges of high-growth doctors, manufacturers, and IT companies.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap", marginBottom: "40px" }}>
            {["Lead Generation", "Conversion Optimisation", "ROI Tracking", "Ads Management", "Sales Funnels"].map((tag, i) => (
              <motion.span 
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                style={{ background: "#FFFFFF", color: "#64748B", padding: "8px 20px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, border: "1px solid #E2E8F0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.section>

        {/* Roadmap Display Section */}
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.5 }}
          style={{ 
            background: "rgba(255, 255, 255, 0.4)", 
            borderRadius: "32px", 
            padding: "clamp(12px, 3vw, 32px)", 
            boxShadow: "0 40px 100px -20px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.5)",
            border: "1px solid rgba(229, 231, 235, 0.4)",
            marginBottom: "80px",
            backdropFilter: "blur(20px)"
          }}
        >
          <div style={{ 
            position: "relative", 
            width: "100%", 
            height: "auto", 
            minHeight: "400px",
            borderRadius: "20px", 
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#F1F5F9"
          }}>
            <p style={{ color: "#94A3B8", fontWeight: 700 }}>Roadmap Preview Loading...</p>
          </div>
        </motion.div>

        {/* Semantic Content Grid for SEO */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px", marginBottom: "80px" }}>
          <DetailCard 
            icon={<Activity size={24} />}
            title="Performance Marketing"
            content="Digitize your client acquisition with our advanced marketing operations. We automate lead tracking, conversion analysis, and ROI reporting for businesses in Delhi NCR and across India."
          />
          <DetailCard 
            icon={<FileText size={24} />}
            title="High Converting Content"
            content="Eliminate generic posts. Our strategy-driven content creation helps businesses in India build massive trust and authority through professional Reels and persuasive copywriting."
          />
          <DetailCard 
            icon={<Database size={24} />}
            title="Scalable Sales Funnels"
            content="Manage your customer journey, appointment bookings, and sales pipelines with ease. First Option Agency is the top-rated growth partner for high-ticket service providers."
          />
        </div>

        {/* SEO Locations Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", padding: "60px 40px", background: "white", borderRadius: "32px", border: "1px solid #E5E7EB" }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#64748B", fontSize: "14px", fontWeight: 600, marginBottom: "20px" }}>
            <MapPin size={16} />
            Trusted across Gurgaon, Delhi NCR, and Pan-India
          </div>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 800, color: "var(--text-main)", marginBottom: "20px", letterSpacing: "-0.03em" }}>
            Powering the Future of Modern Business
          </h2>
          <p style={{ color: "#64748B", maxWidth: "700px", margin: "0 auto 40px", fontSize: "16px", lineHeight: 1.7 }}>
            Whether you are searching for <strong>doctor marketing strategies</strong> or a full-scale <strong>B2B lead generation platform</strong>, First Option Agency provides a secure, efficient, and reliable solution tailored for the Indian market.
          </p>
          <Link href="/#contact" style={{ textDecoration: "none" }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: "var(--color-primary)",
                color: "white",
                padding: "16px 40px",
                borderRadius: "999px",
                fontWeight: 800,
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                boxShadow: "0 20px 40px -10px rgba(124, 58, 237, 0.4)"
              }}
            >
              Get Your Free Strategy Today
              <Search size={20} />
            </motion.div>
          </Link>
        </motion.section>
      </div>

      <footer style={{ padding: "40px", textAlign: "center", color: "#94A3B8", fontSize: "14px" }}>
        &copy; 2026 First Option Agency - India&apos;s Leading ROI Focused Marketing Partner
      </footer>
    </main>
  );
}

function DetailCard({ icon, title, content }: { icon: any, title: string, content: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      style={{ 
        background: "white", 
        padding: "32px", 
        borderRadius: "24px", 
        border: "1px solid #F1F5F9", 
        boxShadow: "0 10px 30px -5px rgba(0,0,0,0.03)" 
      }}
    >
      <div style={{ color: "#2563EB", marginBottom: "20px" }}>{icon}</div>
      <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0F172A", marginBottom: "12px" }}>{title}</h3>
      <p style={{ color: "#64748B", fontSize: "15px", lineHeight: 1.6 }}>{content}</p>
    </motion.div>
  );
}

