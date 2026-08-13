"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  ArrowUpRight, 
  Layers, 
  Target, 
  Zap,
  ChevronRight,
  Sparkles,
  Layout
} from "lucide-react";

const PRIMARY_COLOR = "#2563EB"; // Brand Blue
const TEXT_PRIMARY = "#111827";
const TEXT_SECONDARY = "#4B5563";
const BORDER_COLOR = "#E5E7EB";

export default function FunnelsDirectory() {
  const funnels = [
    {
      id: "alumina-residue",
      title: "Alumina Residue Supply",
      category: "Industrial / Manufacturing",
      desc: "High-conversion funnel for B2B industrial raw materials supply. Focuses on cost reduction and quality assurance.",
      conversionRate: "4.8%",
      leads: 124,
      status: "Active",
      icon: <Layers size={24} />,
      href: "/funnels/alumina-residue"
    },
    {
      id: "performance-marketing",
      title: "Agency Growth System",
      category: "B2B Services",
      desc: "Client acquisition funnel for marketing agencies. Showcases ROI-driven strategies and case studies.",
      conversionRate: "3.2%",
      leads: 89,
      status: "Draft",
      icon: <Target size={24} />,
      href: "#"
    },
    {
      id: "saas-onboarding",
      title: "SaaS Product Demo",
      category: "Software",
      desc: "Streamlined onboarding funnel for software products. Optimized for demo bookings and free trial signups.",
      conversionRate: "5.1%",
      leads: 210,
      status: "Upcoming",
      icon: <Zap size={24} />,
      href: "#"
    }
  ];

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#F5F6F8", padding: "60px 20px", fontFamily: "var(--font-outfit), sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Header */}
        <header style={{ marginBottom: "60px", textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: PRIMARY_COLOR, fontWeight: 700, fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>
            <BarChart3 size={18} />
            Optimization Dashboard
          </div>
          <h1 style={{ fontSize: "42px", fontWeight: 900, color: TEXT_PRIMARY, marginBottom: "12px", letterSpacing: "-0.04em" }}>
            Growth <span style={{ color: PRIMARY_COLOR }}>Solutions.</span>
          </h1>
          <p style={{ color: TEXT_SECONDARY, fontSize: "18px", maxWidth: "600px", lineHeight: 1.6 }}>
            Manage and monitor your high-performance conversion funnels. Each page is engineered for maximum ROI and deep engagement.
          </p>
        </header>

        {/* Stats Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "48px" }}>
           {[
             { label: "Total Funnels", val: "3", icon: <Layout size={20} /> },
             { label: "Active Traffic", val: "12.4k", icon: <ArrowUpRight size={20} /> },
             { label: "Conversion Lift", val: "+24%", icon: <Sparkles size={20} /> }
           ].map((stat, i) => (
             <div key={i} style={{ backgroundColor: "#FFFFFF", padding: "24px", borderRadius: "16px", border: `1px solid ${BORDER_COLOR}`, display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ width: "48px", height: "48px", backgroundColor: "rgba(99, 102, 241, 0.1)", color: PRIMARY_COLOR, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {stat.icon}
                </div>
                <div>
                   <div style={{ fontSize: "14px", fontWeight: 700, color: TEXT_SECONDARY }}>{stat.label}</div>
                   <div style={{ fontSize: "24px", fontWeight: 800, color: TEXT_PRIMARY }}>{stat.val}</div>
                </div>
             </div>
           ))}
        </div>

        {/* Funnel Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: "32px" }}>
          {funnels.map((funnel) => (
            <motion.div
              key={funnel.id}
              whileHover={{ y: -8 }}
              style={{ 
                backgroundColor: "#FFFFFF", 
                borderRadius: "24px", 
                border: `1px solid ${BORDER_COLOR}`, 
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
                transition: "all 0.3s ease",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div style={{ padding: "32px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
                  <div style={{ width: "56px", height: "56px", backgroundColor: "#F8FAFC", border: `1px solid ${BORDER_COLOR}`, borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", color: PRIMARY_COLOR }}>
                    {funnel.icon}
                  </div>
                  <div style={{ 
                    padding: "4px 12px", 
                    borderRadius: "100px", 
                    fontSize: "12px", 
                    fontWeight: 700, 
                    backgroundColor: funnel.status === "Active" ? "#DCFCE7" : funnel.status === "Draft" ? "#FEF9C3" : "#F1F5F9",
                    color: funnel.status === "Active" ? "#166534" : funnel.status === "Draft" ? "#854D0E" : "#475569"
                  }}>
                    {stat(funnel.status)}
                  </div>
                </div>
                
                <h3 style={{ fontSize: "24px", fontWeight: 800, color: TEXT_PRIMARY, marginBottom: "4px" }}>{funnel.title}</h3>
                <div style={{ fontSize: "13px", color: PRIMARY_COLOR, fontWeight: 700, marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{funnel.category}</div>
                <p style={{ color: TEXT_SECONDARY, fontSize: "15px", lineHeight: 1.6, marginBottom: "24px" }}>{funnel.desc}</p>
                
                <div style={{ display: "flex", gap: "24px", padding: "16px 0", borderTop: `1px solid ${BORDER_COLOR}` }}>
                   <div>
                      <div style={{ fontSize: "12px", fontWeight: 700, color: TEXT_SECONDARY, textTransform: "uppercase" }}>Conversion</div>
                      <div style={{ fontSize: "18px", fontWeight: 800, color: TEXT_PRIMARY }}>{funnel.conversionRate}</div>
                   </div>
                   <div>
                      <div style={{ fontSize: "12px", fontWeight: 700, color: TEXT_SECONDARY, textTransform: "uppercase" }}>Leads</div>
                      <div style={{ fontSize: "18px", fontWeight: 800, color: TEXT_PRIMARY }}>{funnel.leads}</div>
                   </div>
                </div>
              </div>

              <div style={{ marginTop: "auto", padding: "20px 32px", backgroundColor: "#F8FAFC", borderTop: `1px solid ${BORDER_COLOR}` }}>
                 {funnel.href === "#" ? (
                   <span style={{ color: "#94A3B8", fontSize: "15px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px", cursor: "not-allowed" }}>
                     Coming Soon
                   </span>
                 ) : (
                    <Link href={funnel.href} style={{ color: PRIMARY_COLOR, textDecoration: "none", fontSize: "15px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
                      View Live Funnel
                      <ChevronRight size={18} />
                    </Link>
                 )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </main>
  );
}

function stat(status: string) {
  return status;
}
