import { SERVICES } from "@/app/constants/services";
import Navbar from "@/app/components/Navbar";
import ContactFooter from "@/app/components/ContactFooter";
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
      <main style={{ background: "#F5F6F8", minHeight: "100vh", paddingTop: "clamp(120px, 15vw, 160px)", paddingBottom: "100px", position: "relative" }}>
        
        {/* Decorative Grid Background matching minimalist HR dashboards */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "500px", backgroundImage: "radial-gradient(#E5E7EB 1px, transparent 1px)", backgroundSize: "32px 32px", opacity: 0.5, pointerEvents: "none" }} />
        
        <div className="container-main" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(60px, 8vw, 80px)", maxWidth: 700, marginInline: "auto" }}>
            <span className="section-badge" style={{ display: "inline-block", background: "rgba(124, 58, 237, 0.1)", color: "#7C3AED", padding: "6px 16px", borderRadius: 9999, fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.05em", marginBottom: 20 }}>
              OUR EXPERTISE
            </span>
            <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, color: "#111827", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 24 }}>
              Impact-Driven Services to <br />
              <span style={{ color: "#7C3AED", backgroundImage: "linear-gradient(90deg, #7C3AED, #4F46E5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Scale Your Business</span>
            </h1>
            <p style={{ fontSize: "clamp(1rem, 1.2vw, 1.125rem)", color: "#6B7280", lineHeight: 1.6 }}>
              Tailored growth performance marketing and digital acquisition systems designed for high-end service, SaaS, and B2B brands globally.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "clamp(24px, 3vw, 32px)" }}>
            {SERVICES.map((service) => {
              const IconComp = (LucideIcons as any)[service.icon] || LucideIcons.Zap;
              return (
                <Link key={service.slug} href={`/services/${service.slug}`} style={{ textDecoration: "none" }}>
                  <div className="service-card" style={{ 
                    background: "#FFFFFF", 
                    borderRadius: "clamp(16px, 2vw, 24px)", 
                    padding: "clamp(28px, 3.5vw, 40px)", 
                    height: "100%", 
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid #E5E7EB", 
                    position: "relative",
                    overflow: "hidden"
                  }}>
                    {/* Top Section with Icon and Tag */}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32 }}>
                      <div style={{ 
                        width: 64, 
                        height: 64, 
                        background: "linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(79,70,229,0.04) 100%)", 
                        borderRadius: 16, 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        color: "#7C3AED",
                        border: "1px solid rgba(124,58,237,0.1)"
                      }}>
                        <IconComp size={28} strokeWidth={1.75} />
                      </div>
                      {service.tag && (
                        <div style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", color: "#4B5563", fontSize: "0.75rem", fontWeight: 600, padding: "6px 14px", borderRadius: 9999 }}>
                          {service.tag}
                        </div>
                      )}
                    </div>
                    
                    {/* Content Block */}
                    <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#111827", marginBottom: 16, letterSpacing: "-0.02em" }}>
                      {service.title}
                    </h3>
                    <p style={{ color: "#6B7280", lineHeight: 1.65, fontSize: "0.95rem", flexGrow: 1, marginBottom: 36 }}>
                      {service.shortDesc}
                    </p>

                    {/* Bottom Action Area */}
                    <div style={{ 
                      marginTop: "auto",
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "space-between",
                      borderTop: "1px solid #F3F4F6",
                      paddingTop: 24
                    }}>
                      <span style={{ color: "#7C3AED", fontWeight: 600, fontSize: "0.95rem", display: "flex", alignItems: "center", gap: 6 }}>
                        Explore Strategy
                      </span>
                      <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#F5F6F8", display: "flex", alignItems: "center", justifyContent: "center", color: "#4B5563" }} className="arrow-btn">
                        <ArrowRight size={18} />
                      </div>
                    </div>

                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .service-card .arrow-btn {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .service-card:hover .arrow-btn {
          background: #7C3AED !important;
          color: white !important;
          transform: translateX(4px);
        }
      `}} />

      <ContactFooter />
    </>
  );
}
