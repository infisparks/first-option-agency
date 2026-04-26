"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  Factory,
  Building2,
  ShoppingCart,
  ShieldCheck,
  Package,
  Zap,
  Globe,
  Award,
  Users,
  FlaskConical,
  Truck,
  BadgeCheck,
  Phone,
  UserCircle2,
  X,
  Beaker,
  BarChart3,
  Layers3,
  RefreshCcw,
} from "lucide-react";

// ── Brand tokens ─────────────────────────────────────────────────
const P  = "#7C3AED";
const PD = "#6D28D9";
const PL = "#F5F3FF";
const PB = "rgba(124,58,237,0.08)";
const TM = "#111827";
const TD = "#4B5563";
const BG = "#F8FAFC";
const BD = "#E5E7EB";
const YL = "#FACC15";
// ─────────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as any },
};

const stagger = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as any },
});

// ── Inline Sample Request Form Modal ─────────────────────────────
function SampleFormModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName]     = useState("");
  const [phone, setPhone]   = useState("");
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{ position: "fixed", inset: 0, zIndex: 500, backgroundColor: "rgba(17,24,39,0.55)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as any }}
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: "#fff", borderRadius: "24px", border: `1px solid ${BD}`, boxShadow: "0 40px 80px -10px rgba(124,58,237,0.2),0 8px 32px rgba(0,0,0,0.08)", width: "100%", maxWidth: "440px", overflow: "hidden" }}
          >
            {/* Header Strip */}
            <div style={{ background: `linear-gradient(135deg,${P},${PD})`, padding: "24px 28px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>Industrial Supply</div>
                  <div style={{ color: "#fff", fontSize: "18px", fontWeight: 800, letterSpacing: "-0.03em" }}>Request a Free Sample</div>
                </div>
                <button
                  onClick={onClose}
                  style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "8px", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff" }}
                >
                  <X size={16} />
                </button>
              </div>
              <div style={{ marginTop: "14px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {["~76% Al₂O₃", "Lab Certified", "Direct Source"].map(t => (
                  <span key={t} style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff", fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "100px" }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: "24px 28px 28px" }}>
              {!sent ? (
                <form onSubmit={handleSubmit}>
                  <p style={{ fontSize: "12px", color: TD, marginBottom: "20px", lineHeight: 1.6 }}>
                    Enter your details below. Our team will reach out within <strong style={{ color: TM }}>24 hours</strong> with sample dispatch and bulk pricing.
                  </p>

                  {/* Name field */}
                  <div style={{ marginBottom: "14px" }}>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: TM, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Full Name <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }}>
                        <UserCircle2 size={16} />
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        style={{ width: "100%", padding: "11px 14px 11px 36px", borderRadius: "10px", border: `1px solid ${BD}`, fontSize: "13px", color: TM, outline: "none", fontFamily: "inherit", backgroundColor: BG, transition: "border-color 0.2s" }}
                        onFocus={e => (e.target.style.borderColor = P)}
                        onBlur={e => (e.target.style.borderColor = BD)}
                      />
                    </div>
                  </div>

                  {/* Phone field */}
                  <div style={{ marginBottom: "22px" }}>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: TM, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      WhatsApp / Phone <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }}>
                        <Phone size={16} />
                      </div>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        style={{ width: "100%", padding: "11px 14px 11px 36px", borderRadius: "10px", border: `1px solid ${BD}`, fontSize: "13px", color: TM, outline: "none", fontFamily: "inherit", backgroundColor: BG, transition: "border-color 0.2s" }}
                        onFocus={e => (e.target.style.borderColor = P)}
                        onBlur={e => (e.target.style.borderColor = BD)}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{ width: "100%", background: loading ? "#9CA3AF" : `linear-gradient(135deg,${P},${PD})`, color: "#fff", border: "none", padding: "13px", borderRadius: "12px", fontSize: "13px", fontWeight: 800, cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", letterSpacing: "0.01em", transition: "all 0.2s" }}
                  >
                    {loading ? "Sending..." : <><Package size={15} /> Send Sample Request</>}
                  </button>
                  <p style={{ textAlign: "center", fontSize: "10px", color: "#9CA3AF", marginTop: "12px" }}>
                    No spam. We only contact for industrial supply purposes.
                  </p>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: "center", padding: "20px 0" }}
                >
                  <div style={{ width: "56px", height: "56px", background: `linear-gradient(135deg,${P},${PD})`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <CheckCircle2 size={28} color="#fff" />
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: 800, color: TM, marginBottom: "8px" }}>Request Sent!</div>
                  <p style={{ fontSize: "12px", color: TD, lineHeight: 1.6 }}>
                    Thank you, <strong>{name}</strong>. Our team will contact you on <strong>{phone}</strong> within 24 hours with sample details.
                  </p>
                  <button onClick={onClose} style={{ marginTop: "20px", backgroundColor: PL, color: P, border: "none", padding: "10px 24px", borderRadius: "10px", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}>
                    Close
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Main Page ─────────────────────────────────────────────────────
export default function AluminaFunnelPage() {
  const [formOpen, setFormOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  const industries = [
    { icon: <Factory size={20} />, title: "Steel Manufacturers", sub: "Slag Conditioning", desc: "Enhances slag flow and removes impurities at scale." },
    { icon: <Building2 size={20} />, title: "Cement Manufacturers", sub: "Raw Mix Optimization", desc: "Replaces costly primary alumina without quality loss." },
    { icon: <ShoppingCart size={20} />, title: "Procurement Teams", sub: "Bulk Sourcing", desc: "Direct supply with zero middlemen and flexible MOQ terms." },
  ];

  const benefits = [
    { icon: <ShieldCheck size={18} />, title: "Zero Middlemen", desc: "Direct-source pricing beats any reseller." },
    { icon: <FlaskConical size={18} />, title: "Lab Certified", desc: "Every batch comes with full test documentation." },
    { icon: <Truck size={18} />, title: "Pan-India Supply", desc: "Reliable bulk logistics for your plant schedule." },
    { icon: <BadgeCheck size={18} />, title: "Consistent Purity", desc: "76% Al₂O₃ sustained across all shipments." },
    { icon: <Package size={18} />, title: "Flexible MOQ", desc: "Scales from trial samples to full contracts." },
    { icon: <Zap size={18} />, title: "Cost Cut by 25%", desc: "Verified savings vs. traditional alternatives." },
  ];

  const stats = [
    { val: "76%", label: "Alumina Purity", icon: <Award size={14} /> },
    { val: "25%", label: "Cost Saved",     icon: <Zap size={14} /> },
    { val: "500+", label: "Plants Served", icon: <Globe size={14} /> },
    { val: "98%", label: "Reorder Rate",   icon: <Users size={14} /> },
  ];

  // Spec data for the new visual component
  const specItems = [
    { icon: <Beaker size={22} />, label: "Al₂O₃ Content", val: "~76%", bar: 76, tag: "Core", color: P },
    { icon: <RefreshCcw size={22} />, label: "Moisture Level", val: "< 1%", bar: 5, tag: "Controlled", color: "#10B981" },
    { icon: <Layers3 size={22} />, label: "Particle Size", val: "Industrial Grade", bar: 90, tag: "Optimized", color: "#F59E0B" },
    { icon: <BarChart3 size={22} />, label: "Batch Stability", val: "±0.5%", bar: 95, tag: "Certified", color: "#6366F1" },
  ];

  return (
    <main style={{ minHeight: "100vh", backgroundColor: BG, fontFamily: "var(--font-outfit), sans-serif", overflowX: "hidden" }}>

      {/* ── Scroll Progress ── */}
      <motion.div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg,${P},${PD})`, transformOrigin: "0%", scaleX: bar, zIndex: 200 }} />

      {/* ── Sticky Nav ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, backgroundColor: "rgba(255,255,255,0.92)", backdropFilter: "blur(14px)", borderBottom: `1px solid ${BD}`, padding: "0 24px", height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo: real logo image */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Image src="/logo-2.webp" alt="First Option Agency" width={32} height={32} style={{ borderRadius: "8px", objectFit: "contain" }} />
          <div style={{ lineHeight: 1.15 }}>
            <div style={{ fontWeight: 800, fontSize: "13px", letterSpacing: "-0.02em", color: TM }}>First Option</div>
            <div style={{ fontWeight: 700, fontSize: "10px", letterSpacing: "0.03em", color: P, textTransform: "uppercase" }}>Industrial Supply</div>
          </div>
        </div>
        <button
          onClick={() => setFormOpen(true)}
          style={{ background: `linear-gradient(135deg,${P},${PD})`, color: "#fff", border: "none", padding: "8px 20px", borderRadius: "10px", fontSize: "12px", fontWeight: 700, cursor: "pointer", letterSpacing: "0.01em", display: "flex", alignItems: "center", gap: "6px", boxShadow: `0 4px 14px rgba(124,58,237,0.25)` }}
        >
          <Package size={13} /> Request Sample
        </button>
      </nav>

      {/* ── HERO ── */}
      <section style={{ padding: "clamp(48px,8vw,96px) 20px 0", background: `radial-gradient(ellipse at 80% 0%,rgba(124,58,237,0.06),transparent 60%)` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <motion.div {...fadeUp} style={{ textAlign: "center", marginBottom: "clamp(32px,5vw,56px)" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: PB, border: `1px solid rgba(124,58,237,0.15)`, color: P, padding: "5px 14px", borderRadius: "100px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "20px" }}>
              <ShieldCheck size={12} /> Lab-Tested Industrial Grade
            </div>
            <h1 style={{ fontSize: "clamp(28px,5vw,58px)", fontWeight: 900, lineHeight: 1.06, letterSpacing: "-0.04em", color: TM, marginBottom: "16px" }}>
              Cut Raw Material Cost <br />
              <span style={{ background: `linear-gradient(135deg,${P},${PD})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                15–25% With ~76% Alumina.
              </span>
            </h1>
            <p style={{ fontSize: "clamp(13px,1.6vw,15px)", color: TD, lineHeight: 1.65, maxWidth: "580px", margin: "0 auto 28px", fontWeight: 500 }}>
              High Alumina Residue Oxide Powder (Aluminium Ash / Rehti / Dhula) — Bulk supply for Cement & Steel industries. Lab-tested quality, direct source, zero middlemen.
            </p>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
              {["✓ 76% Al₂O₃", "✓ Bulk Supply", "✓ Lab Certified", "✓ Direct Source"].map(t => (
                <span key={t} style={{ fontSize: "11px", fontWeight: 700, color: P, backgroundColor: PL, border: `1px solid rgba(124,58,237,0.12)`, padding: "5px 12px", borderRadius: "100px" }}>{t}</span>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "12px" }}>
              <button
                onClick={() => setFormOpen(true)}
                className="glow-btn-primary"
                style={{ padding: "13px 32px", borderRadius: "12px", border: "none", color: "#fff", fontSize: "13px", fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px" }}
              >
                <Package size={16} /> Request Sample & Price
              </button>
              <button
                onClick={() => window.open("https://wa.me/yournumber", "_blank")}
                style={{ padding: "13px 28px", borderRadius: "12px", border: `1px solid ${BD}`, backgroundColor: "#fff", color: TM, fontSize: "13px", fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
              >
                <span style={{ backgroundColor: "#25D366", borderRadius: "4px", padding: "2px", display: "flex" }}>
                  <Image src="/whatsapp.png" alt="WA" width={14} height={14} />
                </span>
                Talk on WhatsApp
              </button>
            </div>
          </motion.div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] as any }}
            style={{ position: "relative", borderRadius: "0 0 24px 24px", overflow: "hidden", border: "6px solid #fff", borderTop: "none", boxShadow: "0 30px 80px -16px rgba(124,58,237,0.18),0 8px 32px rgba(0,0,0,0.06)", maxWidth: "1000px", margin: "0 auto" }}
          >
            <Image src="/funnel/alumina-residue/alumina-residue-powder-industrial-benefit.png" alt="High Alumina Residue Oxide Powder Industrial Benefit" width={1400} height={700} style={{ width: "100%", height: "auto", display: "block" }} priority />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "80px", background: "linear-gradient(to top,rgba(255,255,255,0.4),transparent)" }} />
          </motion.div>
        </div>
      </section>

      <section style={{ backgroundColor: "#fff", borderTop: `1px solid ${BD}`, borderBottom: `1px solid ${BD}`, padding: "20px 10px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
          {stats.map((s, i) => (
            <motion.div key={i} {...stagger(i)} style={{ textAlign: "center" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "2px", color: P, fontSize: "8px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: "2px" }}>
                {s.label}
              </div>
              <div style={{ fontSize: "clamp(14px, 4vw, 22px)", fontWeight: 900, color: TM, letterSpacing: "-0.03em" }}>{s.val}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section style={{ padding: "clamp(56px,8vw,80px) 20px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <motion.div {...fadeUp} style={{ marginBottom: "40px" }}>
            <div style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: P, marginBottom: "8px" }}>Target Industries</div>
            <h2 style={{ fontSize: "clamp(22px,3.5vw,36px)", fontWeight: 800, letterSpacing: "-0.03em", color: TM }}>
              Ye Product Kin Ke Liye Hai?
            </h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "16px" }}>
            {industries.map((item, i) => (
              <motion.div key={i} {...stagger(i)}
                whileHover={{ y: -4, boxShadow: `0 16px 40px rgba(124,58,237,0.1)` }}
                style={{ backgroundColor: "#fff", borderRadius: "16px", border: `1px solid ${BD}`, padding: "24px", transition: "all 0.3s ease" }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                  <div style={{ flexShrink: 0, width: "40px", height: "40px", backgroundColor: PL, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: P }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 800, color: TM, marginBottom: "2px" }}>{item.title}</div>
                    <div style={{ fontSize: "10px", fontWeight: 700, color: P, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.sub}</div>
                    <p style={{ fontSize: "12px", color: TD, lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                  </div>
                  <div style={{ marginLeft: "auto", flexShrink: 0 }}><CheckCircle2 size={16} color="#10B981" /></div>
                </div>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "28px" }}>
            <button onClick={() => setFormOpen(true)} style={{ backgroundColor: "#fff", color: P, border: `2px solid ${P}`, padding: "11px 28px", borderRadius: "12px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
              Check Availability for Your Plant →
            </button>
          </div>
        </div>
      </section>

      {/* ── SPEC SHOWCASE — new creative component ── */}
      <section style={{ padding: "0 20px clamp(56px,8vw,80px)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <motion.div {...fadeUp} style={{ marginBottom: "36px" }}>
            <div style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: P, marginBottom: "8px" }}>Lab Specification</div>
            <h2 style={{ fontSize: "clamp(22px,3.5vw,34px)", fontWeight: 800, letterSpacing: "-0.03em", color: TM }}>
              What's Inside Every Batch?
            </h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "32px", alignItems: "start" }}>
            {/* Left: image with stat overlay */}
            <motion.div {...stagger(0)} style={{ position: "relative", borderRadius: "20px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.08)", maxWidth: "800px", margin: "0 auto" }}>
              <Image src="/funnel/alumina-residue/high-alumina-residue-powder-specifications.png" alt="High Alumina Residue Oxide Powder Lab Tested Specifications" width={700} height={500} style={{ width: "100%", height: "auto", display: "block" }} />
            </motion.div>

            {/* Right: progress bar spec cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {specItems.map((s, i) => (
                <motion.div key={i} {...stagger(i + 1)}
                  style={{ backgroundColor: "#fff", border: `1px solid ${BD}`, borderRadius: "16px", padding: "18px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                    <div style={{ width: "40px", height: "40px", backgroundColor: `${s.color}14`, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: s.color, flexShrink: 0 }}>
                      {s.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "12px", fontWeight: 700, color: TM }}>{s.label}</span>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontSize: "13px", fontWeight: 900, color: s.color }}>{s.val}</span>
                          <span style={{ fontSize: "9px", backgroundColor: `${s.color}14`, color: s.color, padding: "2px 8px", borderRadius: "100px", fontWeight: 700, textTransform: "uppercase" }}>{s.tag}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div style={{ height: "6px", backgroundColor: "#F1F5F9", borderRadius: "100px", overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.bar}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] as any }}
                      style={{ height: "100%", background: `linear-gradient(90deg,${s.color}88,${s.color})`, borderRadius: "100px" }}
                    />
                  </div>
                </motion.div>
              ))}

              {/* CTA inside the specs block */}
              <motion.div {...stagger(5)} style={{ backgroundColor: PL, border: `1px solid rgba(124,58,237,0.12)`, borderRadius: "16px", padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 800, color: TM, marginBottom: "2px" }}>Ready to Test Quality?</div>
                  <div style={{ fontSize: "11px", color: TD }}>Get a free sample dispatched to your plant.</div>
                </div>
                <button
                  onClick={() => setFormOpen(true)}
                  style={{ background: `linear-gradient(135deg,${P},${PD})`, color: "#fff", border: "none", padding: "10px 20px", borderRadius: "10px", fontSize: "12px", fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap" }}
                >
                  Request Sample <ArrowRight size={14} />
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── bento style ── */}
      <section style={{ padding: "0 20px clamp(56px,8vw,80px)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <motion.div {...fadeUp} style={{ textAlign: "center", marginBottom: "40px" }}>
            <div style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: P, marginBottom: "8px" }}>Why Choose Us</div>
            <h2 style={{ fontSize: "clamp(22px,3.5vw,34px)", fontWeight: 800, letterSpacing: "-0.03em", color: TM }}>
              Procurement Teams <span style={{ color: P }}>Trust This.</span>
            </h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "13px" }}>
            {benefits.map((b, i) => (
              <motion.div key={i} {...stagger(i)}
                whileHover={{ scale: 1.02 }}
                style={{ backgroundColor: "#fff", border: `1px solid ${BD}`, borderRadius: "16px", padding: "20px", display: "flex", alignItems: "flex-start", gap: "12px", transition: "all 0.2s ease" }}
              >
                <div style={{ flexShrink: 0, width: "36px", height: "36px", backgroundColor: PL, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: P }}>{b.icon}</div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: TM, marginBottom: "4px" }}>{b.title}</div>
                  <p style={{ fontSize: "12px", color: TD, margin: 0, lineHeight: 1.55 }}>{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: "0 20px clamp(64px,10vw,100px)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <motion.div {...fadeUp}
            style={{ background: `linear-gradient(135deg,${P} 0%,${PD} 100%)`, borderRadius: "28px", overflow: "hidden", position: "relative" }}
          >
            <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "240px", height: "240px", border: "2px solid rgba(255,255,255,0.08)", borderRadius: "50%", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "140px", height: "140px", border: "2px solid rgba(255,255,255,0.06)", borderRadius: "50%", pointerEvents: "none" }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ padding: "clamp(32px,5vw,56px) clamp(32px,5vw,56px) 24px" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "rgba(255,255,255,0.15)", color: "#fff", padding: "5px 12px", borderRadius: "100px", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>
                  <Package size={12} /> Sample & Bulk Supply Available
                </div>
                <h2 style={{ color: "#fff", fontSize: "clamp(22px,3.5vw,36px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: "14px" }}>
                  Experience Quality <br />First Hand.
                </h2>
                <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "13px", lineHeight: 1.65, marginBottom: "28px" }}>
                  Request a test sample or get a bulk pricing quote tailored for your plant's monthly requirement.
                </p>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(0,0,0,0.2)", borderRadius: "10px", padding: "8px 14px", marginBottom: "24px" }}>
                  <span style={{ backgroundColor: YL, color: "#000", fontSize: "11px", fontWeight: 800, padding: "2px 8px", borderRadius: "6px" }}>SAVE 15–25%</span>
                  <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px" }}>vs. traditional raw material</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  <button
                    onClick={() => setFormOpen(true)}
                    style={{ backgroundColor: "#fff", color: P, border: "none", padding: "12px 28px", borderRadius: "12px", fontSize: "13px", fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px" }}
                  >
                    Request Sample <ArrowRight size={16} />
                  </button>
                  <button
                    onClick={() => window.open("https://wa.me/yournumber", "_blank")}
                    style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", padding: "12px 24px", borderRadius: "12px", fontSize: "13px", fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px" }}
                  >
                    <span style={{ backgroundColor: "#25D366", padding: "3px", borderRadius: "4px", display: "flex" }}>
                      <Image src="/whatsapp.png" alt="WA" width={14} height={14} />
                    </span>
                    WhatsApp Us
                  </button>
                </div>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "11px", marginTop: "16px", fontWeight: 600 }}>
                  Minimum Order Quantity Applicable · Industrial Use Only
                </p>
              </div>
              <div style={{ position: "relative", minHeight: "clamp(300px, 46vw, 540px)", backgroundColor: "#fff", width: "100%", borderTop: "none" }}>
                <Image src="/funnel/alumina-residue/alumina-residue-powder-samples-and-supply.png" alt="Alumina Residue Oxide Powder Product Samples and Supply" fill style={{ objectFit: "contain" }} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: "#fff", borderTop: `1px solid ${BD}`, padding: "28px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Image src="/logo-2.webp" alt="First Option Agency" width={26} height={26} style={{ borderRadius: "6px", objectFit: "contain" }} />
            <span style={{ fontWeight: 800, fontSize: "12px", color: TM }}>First Option <span style={{ color: P }}>Industrial</span></span>
          </div>
          <p style={{ fontSize: "11px", color: TD, margin: 0 }}>© {new Date().getFullYear()} First Option Agency · All Rights Reserved</p>
          <div style={{ display: "flex", gap: "20px" }}>
            {["Privacy", "Terms", "Compliance"].map(l => (
              <a key={l} href="#" style={{ fontSize: "11px", fontWeight: 600, color: TD, textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* ── Sample Form Modal ── */}
      <SampleFormModal open={formOpen} onClose={() => setFormOpen(false)} />

      <style jsx global>{`
        * { box-sizing: border-box; }
        :root {
          --color-primary: ${P};
          --color-accent: ${PD};
          --text-main: ${TM};
          --text-dim: ${TD};
          --text-muted: #6B7280;
          --border-subtle: ${BD};
        }
        input::placeholder { color: #9CA3AF; font-size: 13px; }
      `}</style>
    </main>
  );
}
