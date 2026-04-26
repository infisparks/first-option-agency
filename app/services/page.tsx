import { SERVICES } from "@/app/constants/services";
import Navbar from "@/app/components/Navbar";
import ContactFooter from "@/app/components/ContactFooter";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";

export const metadata = {
  title: "Performance Marketing & Growth Services | First Option Agency",
  description: "Explore our range of ROI-driven performance marketing, SEO, and lead generation services designed for global business growth.",
};

export default function ServicesListPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#F5F6F8", minHeight: "100vh", paddingTop: "140px", paddingBottom: "100px" }}>
        <div className="container-main">
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span className="section-badge">SERVICES</span>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#111827", letterSpacing: "-0.04em", marginTop: 12 }}>
              Everything You Need to <br /><span style={{ color: "#7C3AED" }}>Scale Your Business</span>
            </h1>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>
            {SERVICES.map((service) => {
              const IconComp = (LucideIcons as any)[service.icon] || LucideIcons.Zap;
              return (
                <Link key={service.slug} href={`/services/${service.slug}`} style={{ textDecoration: "none" }}>
                  <div style={{ background: "#FFFFFF", borderRadius: 24, padding: 32, height: "100%", border: "1px solid #E5E7EB", transition: "all 0.3s ease", cursor: "pointer" }} className="service-card">
                    <div style={{ width: 56, height: 56, background: "rgba(124, 58, 237, 0.1)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", color: "#7C3AED", marginBottom: 24 }}>
                      <IconComp size={24} />
                    </div>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#111827", marginBottom: 16 }}>{service.title}</h3>
                    <p style={{ color: "#6B7280", lineHeight: 1.6, marginBottom: 24, fontSize: "0.95rem" }}>{service.shortDesc}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#7C3AED", fontWeight: 700, fontSize: "0.9rem" }}>
                      Lean More <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
      <ContactFooter />
    </>
  );
}
