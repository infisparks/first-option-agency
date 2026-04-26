"use client";

import { motion } from "framer-motion";
import { Stethoscope, Factory, Laptop, ArrowRight } from "lucide-react";

const industries = [
  {
    title: "For Doctors & Clinics",
    subtitle: "Healthcare Specialists",
    description: "Personal branding, Reels production, and lead generation funnels for specialists looking to grow their private practice and clinical authority.",
    icon: <Stethoscope size={24} />,
    color: "#7C3AED",
    features: ["Specialist Branding", "Patient Acquisition", "Authority Content"]
  },
  {
    title: "For Manufacturers & Wholesalers",
    subtitle: "Supply Chain & B2B",
    description: "We build B2B discovery systems that put your products in front of retailers and distributors. Direct-to-retailer marketing that bypasses the noise.",
    icon: <Factory size={24} />,
    color: "#4F46E5",
    features: ["Retailer Discovery", "B2B Lead Gen", "Market Expansion"]
  },
  {
    title: "For IT & Service Companies",
    subtitle: "Digital Economy",
    description: "High-ticket client acquisition for SaaS, IT services, and consultants. We build the infrastructure to consistently close premium deals.",
    icon: <Laptop size={24} />,
    color: "#6D28D9",
    features: ["High-Ticket Sales", "SaaS Growth", "LinkedIn Automation"]
  }
];

export default function Industries() {
  return (
    <section id="industries" style={{ padding: "clamp(60px, 10vw, 120px) 0", background: "#FFFFFF", position: "relative" }}>
      <div className="container-main">
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-badge"
          >
            OUR EXPERTISE
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ 
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)", 
              fontWeight: 800, 
              color: "var(--text-main)", 
              marginTop: "12px",
              letterSpacing: "-0.03em"
            }}
          >
            Industries We Have <span className="gradient-text-teal">Mastered</span>
          </motion.h2>
        </div>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "24px" 
        }}>
          {industries.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                padding: "40px",
                borderRadius: "24px",
                background: "#F9FAFB",
                border: "1px solid #E5E7EB",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden"
              }}
              whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.05)", borderColor: item.color + "40" }}
            >
              <div style={{ 
                width: "56px", 
                height: "56px", 
                borderRadius: "16px", 
                background: item.color + "10", 
                color: item.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "24px"
              }}>
                {item.icon}
              </div>

              <div style={{ marginBottom: "20px" }}>
                <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: item.color, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                  {item.subtitle}
                </h4>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#111827", lineHeight: 1.2 }}>
                  {item.title}
                </h3>
              </div>

              <p style={{ color: "#4B5563", marginBottom: "24px", lineHeight: 1.6, fontSize: "0.95rem" }}>
                {item.description}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {item.features.map(f => (
                  <span key={f} style={{ 
                    padding: "6px 12px", 
                    background: "#FFFFFF", 
                    border: "1px solid #E5E7EB", 
                    borderRadius: "99px", 
                    fontSize: "0.75rem", 
                    fontWeight: 600, 
                    color: "#374151" 
                  }}>
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
