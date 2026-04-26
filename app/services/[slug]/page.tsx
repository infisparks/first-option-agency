import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SERVICES } from "@/app/constants/services";
import * as LucideIcons from "lucide-react";
import Navbar from "@/app/components/Navbar";
import ContactFooter from "@/app/components/ContactFooter";

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | First Option Agency`,
    description: service.fullDesc,
    keywords: `${service.mainKeyword}, marketing services, global`,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  // Dynamically get the icon component
  const IconComponent = (LucideIcons as any)[service.icon] || LucideIcons.Zap;

  return (
    <>
      <Navbar />
      <main style={{ background: "#F5F6F8", minHeight: "100vh", paddingTop: "120px" }}>
        <div className="container-main" style={{ maxWidth: 1000 }}>
          
          {/* Breadcrumb */}
          <div style={{ marginBottom: 32 }}>
            <Link href="/#services" style={{ color: "#6B7280", textDecoration: "none", fontSize: "0.85rem", fontWeight: 500 }}>
              ← Back to Services
            </Link>
          </div>

          <div style={{ background: "#FFFFFF", borderRadius: 24, overflow: "hidden", boxShadow: "0 4px 30px rgba(0,0,0,0.05)", border: "1px solid #E5E7EB" }}>
            {/* Header Area */}
            <div style={{ padding: "clamp(24px, 5vw, 60px)", borderBottom: "1px solid #F3F4F6" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ background: "rgba(124, 58, 237, 0.1)", color: "#7C3AED", padding: "6px 12px", borderRadius: 8, fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {service.tag}
                </div>
              </div>
              <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: 900, color: "#111827", letterSpacing: "-0.03em", marginBottom: 20 }}>
                {service.title}
              </h1>
              <p style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)", color: "#4B5563", lineHeight: 1.6, maxWidth: 800 }}>
                {service.fullDesc}
              </p>
            </div>

            {/* Content Area */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40, padding: "clamp(24px, 5vw, 60px)" }}>
              {/* Left: Image & Benefits */}
              <div>
                <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", borderRadius: 20, overflow: "hidden", marginBottom: 32, border: "1px solid #E5E7EB" }}>
                  <Image src={service.image} alt={service.title} fill style={{ objectFit: "cover" }} />
                </div>
                
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111827", marginBottom: 20 }}>Key Benefits</h3>
                <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                  {service.benefits.map((benefit, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: "0.95rem", color: "#4B5563" }}>
                      <LucideIcons.CheckCircle size={18} style={{ color: "#10B981" }} />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: CTA & Icon */}
              <div style={{ background: "#F9FAFB", borderRadius: 24, padding: 32, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", border: "1px solid #F3F4F6" }}>
                <div style={{ width: 64, height: 64, background: "#FFFFFF", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", color: "#7C3AED", boxShadow: "0 10px 20px rgba(0,0,0,0.05)", marginBottom: 24 }}>
                  <IconComponent size={32} />
                </div>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#111827", marginBottom: 16 }}>Ready to scale your {service.tag.toLowerCase()}?</h2>
                <p style={{ fontSize: "0.9rem", color: "#6B7280", marginBottom: 32, lineHeight: 1.5 }}>
                  Book a free growth strategy session and let&apos;s discuss how we can implement this for your business.
                </p>
                <button className="glow-btn-primary" style={{ width: "100%", padding: "16px", borderRadius: 12, border: "none", color: "#FFF", fontWeight: 700, cursor: "pointer" }}>
                  BOOK A FREE DEMO
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ContactFooter />
    </>
  );
}
