"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  FileText, 
  Building2, 
  Factory, 
  ShoppingCart, 
  ShieldCheck,
  Package,
  ChevronRight
} from "lucide-react";
import BookDemoModal from "@/app/components/BookDemoModal";

const PRIMARY_COLOR = "#2563EB"; // Blue
const BG_COLOR = "#F5F6F8";
const CARD_BG = "#FFFFFF";
const BORDER_COLOR = "#E5E7EB";
const TEXT_PRIMARY = "#111827";
const TEXT_SECONDARY = "#6B7280";

export default function AluminaFunnnelPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main style={{ minHeight: "100vh", backgroundColor: BG_COLOR, color: TEXT_PRIMARY, fontFamily: "var(--font-outfit), Inter, system-ui, sans-serif" }}>
      {/* Top Banner */}
      <section style={{ backgroundColor: PRIMARY_COLOR, padding: "12px 20px", textAlign: "center" }}>
        <h1 style={{ color: "#FFFFFF", fontSize: "clamp(14px, 3vw, 16px)", fontWeight: 600, margin: 0 }}>
          High Alumina Residue Oxide Powder (Aluminium Ash / Rehti / Dhula) – Bulk Supply for Cement & Steel Industries
        </h1>
      </section>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
        
        {/* Hero Section */}
        <div style={{ 
          backgroundColor: CARD_BG, 
          borderRadius: "16px", 
          border: `1px solid ${BORDER_COLOR}`,
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
          marginBottom: "32px"
        }}>
          <div style={{ padding: "clamp(24px, 5vw, 60px)", textAlign: "center" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div style={{ 
                display: "inline-flex", 
                alignItems: "center", 
                gap: "8px", 
                backgroundColor: "rgba(99, 102, 241, 0.1)", 
                color: PRIMARY_COLOR,
                padding: "6px 16px",
                borderRadius: "100px",
                fontSize: "14px",
                fontWeight: 600,
                marginBottom: "24px"
              }}>
                <MessageCircle size={16} />
                Enquiries aa rahi hai, lekin cost control nahi ho raha?
              </div>

              <h2 style={{ 
                fontSize: "clamp(24px, 4vw, 42px)", 
                fontWeight: 800, 
                lineHeight: 1.2, 
                marginBottom: "20px", 
                letterSpacing: "-0.02em",
                color: TEXT_PRIMARY 
              }}>
                Lab-tested <span style={{ color: PRIMARY_COLOR }}>~76% Alumina</span> content ke saath <br />
                Raw material cost <span style={{ color: PRIMARY_COLOR }}>15–25% tak reduce</span> karne ka solution
              </h2>

              <p style={{ fontSize: "18px", color: TEXT_SECONDARY, marginBottom: "32px", fontWeight: 500 }}>
                Reduce Raw Material Cost and Maintain Quality Standards
              </p>

              <div style={{ position: "relative", marginBottom: "40px", borderRadius: "12px", overflow: "hidden" }}>
                <Image 
                  src="/funnel/residue-bag.png" 
                  alt="High Alumina Residue Oxide Powder Bulk Supply" 
                  width={1200} 
                  height={600}
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                />
                <div style={{ 
                  position: "absolute", 
                  bottom: "20px", 
                  left: "20px", 
                  backgroundColor: "rgba(255,255,255,0.9)", 
                  padding: "10px 20px", 
                  borderRadius: "8px",
                  backdropFilter: "blur(10px)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}>
                  <ShieldCheck size={20} color={PRIMARY_COLOR} />
                  <span style={{ fontWeight: 700, color: TEXT_PRIMARY }}>Lab Tested Quality</span>
                </div>
              </div>

              <button 
                onClick={() => setIsModalOpen(true)}
                style={{
                  backgroundColor: PRIMARY_COLOR,
                  color: "#FFFFFF",
                  border: "none",
                  padding: "18px 40px",
                  borderRadius: "12px",
                  fontSize: "18px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  transition: "all 0.3s ease",
                  boxShadow: `0 10px 30px rgba(99, 102, 241, 0.2)`
                }}
              >
                <Package size={20} />
                Request Sample & Price
                <ChevronRight size={20} />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Target Industries Section */}
        <section style={{ marginBottom: "32px" }}>
          <h3 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "20px", textAlign: "center" }}>
            Ye Product Kin Industries Ke Liye Hai?
          </h3>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
            gap: "20px" 
          }}>
            {[
              { title: "Steel Manufacturers", desc: "(Slag Conditioning)", icon: <Factory size={24} /> },
              { title: "Cement Manufacturers", desc: "(Raw Mix Optimization)", icon: <Building2 size={24} /> },
              { title: "Procurement Teams", desc: "& Bulk Buyers", icon: <ShoppingCart size={24} /> }
            ].map((item, idx) => (
              <div key={idx} style={{ 
                backgroundColor: CARD_BG, 
                padding: "24px", 
                borderRadius: "12px", 
                border: `1px solid ${BORDER_COLOR}`,
                display: "flex",
                alignItems: "center",
                gap: "16px"
              }}>
                <div style={{ color: PRIMARY_COLOR, backgroundColor: "rgba(99, 102, 241, 0.1)", padding: "12px", borderRadius: "10px" }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: TEXT_PRIMARY }}>{item.title}</div>
                  <div style={{ fontSize: "14px", color: TEXT_SECONDARY }}>{item.desc}</div>
                </div>
                <div style={{ marginLeft: "auto", color: "#10B981" }}>
                  <CheckCircle2 size={20} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <button 
              onClick={() => setIsModalOpen(true)}
              style={{
                backgroundColor: "#FFFFFF",
                color: PRIMARY_COLOR,
                border: `2px solid ${PRIMARY_COLOR}`,
                padding: "14px 30px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
            >
              Check Availability for Your Plant
            </button>
          </div>
        </section>

        {/* Product Specification Section */}
        <section style={{ 
          backgroundColor: "#111827", 
          borderRadius: "16px", 
          overflow: "hidden", 
          color: "#FFFFFF",
          marginBottom: "32px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))"
        }}>
          <div style={{ padding: "clamp(30px, 5vw, 60px)" }}>
            <h3 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "16px" }}>
              Product Specification <br />
              <span style={{ color: PRIMARY_COLOR }}>(Lab Tested)</span>
            </h3>
            <p style={{ color: "#9CA3AF", marginBottom: "24px", lineHeight: 1.6 }}>
              Industrial usage ke liye suitable composition. Our Alumina Residue is rigorously tested to ensure consistency and performance in high-heat industrial applications.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px 0", display: "flex", flexDirection: "column", gap: "12px" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <CheckCircle2 size={18} color={PRIMARY_COLOR} /> 
                <span>Al2O3 Content: ~76%</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <CheckCircle2 size={18} color={PRIMARY_COLOR} /> 
                <span>Consistent Bulk Supply</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <CheckCircle2 size={18} color={PRIMARY_COLOR} /> 
                <span>Certified Lab Reports</span>
              </li>
            </ul>
            <button 
              onClick={() => window.open('https://wa.me/yournumber', '_blank')}
              style={{
                backgroundColor: "#25D366",
                color: "#FFFFFF",
                border: "none",
                padding: "16px 30px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                transition: "all 0.3s ease"
              }}
            >
              <Image src="/whatsapp.png" alt="WhatsApp" width={24} height={24} />
              Get Full Lab Report on WhatsApp
            </button>
          </div>
          <div style={{ position: "relative", minHeight: "400px" }}>
            <Image 
              src="/funnel/powder-specs.png" 
              alt="Lab Tested Alumina Specification" 
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </section>

        {/* Why Procurement Teams Are Choosing Section */}
        <section style={{ marginBottom: "32px", textAlign: "center" }}>
          <h3 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "24px" }}>
            Why Procurement Teams Are Choosing This
          </h3>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
            gap: "24px" 
          }}>
            {[
              { title: "Cost Reduction", desc: "Significant savings vs traditional material" },
              { title: "Consistent Supply", desc: "Reliable bulk delivery schedules" },
              { title: "Direct Supplier", desc: "Direct from source (no middlemen)" }
            ].map((item, idx) => (
              <div key={idx} style={{ 
                backgroundColor: CARD_BG, 
                padding: "32px", 
                borderRadius: "16px", 
                border: `1px solid ${BORDER_COLOR}`,
                boxShadow: "0 4px 12px rgba(0,0,0,0.02)"
              }}>
                <div style={{ 
                  width: "48px", 
                  height: "48px", 
                  backgroundColor: "rgba(99, 102, 241, 0.1)", 
                  borderRadius: "12px", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  color: PRIMARY_COLOR,
                  margin: "0 auto 20px auto"
                }}>
                  <ArrowRight size={24} style={{ transform: "rotate(-45deg)" }} />
                </div>
                <h4 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px", color: TEXT_PRIMARY }}>{item.title}</h4>
                <p style={{ color: TEXT_SECONDARY, fontSize: "14px" }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            style={{
              marginTop: "40px",
              backgroundColor: PRIMARY_COLOR,
              color: "#FFFFFF",
              border: "none",
              padding: "16px 40px",
              borderRadius: "100px",
              fontSize: "18px",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: `0 10px 25px rgba(99, 102, 241, 0.15)`
            }}
          >
            Get Bulk Pricing Now
          </button>
        </section>

        {/* Sample & Supply Section */}
        <section style={{ 
          backgroundColor: CARD_BG, 
          borderRadius: "16px", 
          border: `1px solid ${BORDER_COLOR}`,
          overflow: "hidden",
          textAlign: "center"
        }}>
          <div style={{ padding: "clamp(30px, 5vw, 60px)" }}>
            <h3 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "32px" }}>
              Sample & Bulk Supply Available
            </h3>
            <div style={{ maxWidth: "800px", margin: "0 auto 40px auto", borderRadius: "12px", overflow: "hidden" }}>
              <Image 
                src="/funnel/powder-samples.png" 
                alt="Alumina Powder Samples" 
                width={800} 
                height={450}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              style={{
                backgroundColor: PRIMARY_COLOR,
                color: "#FFFFFF",
                border: "none",
                padding: "16px 40px",
                borderRadius: "12px",
                fontSize: "18px",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px"
              }}
            >
              Request Sample
              <ArrowRight size={20} />
            </button>
            <div style={{ 
              marginTop: "40px", 
              paddingTop: "24px", 
              borderTop: `1px solid ${BORDER_COLOR}`,
              color: TEXT_SECONDARY,
              fontSize: "14px",
              fontWeight: 500
            }}>
              Minimum Order Quantity Applicable | Only Industrial Use
            </div>
          </div>
        </section>

      </div>

      <BookDemoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Request Industrial Sample"
        description="Fill out the form below to request a sample of our High Alumina Residue Oxide Powder or get a bulk pricing quote for your plant."
        buttonText="Send Request Now"
      />
      
      <footer style={{ padding: "40px 20px", textAlign: "center", borderTop: `1px solid ${BORDER_COLOR}`, backgroundColor: "#FFFFFF" }}>
        <p style={{ color: TEXT_SECONDARY, fontSize: "14px" }}>
          © {new Date().getFullYear()} First Option Agency. All Rights Reserved.
        </p>
      </footer>
    </main>
  );
}
