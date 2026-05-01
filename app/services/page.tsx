import { SERVICES } from "@/app/constants/services";
import Navbar from "@/app/components/Navbar";
import ContactFooter from "@/app/components/ContactFooter";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";

export const metadata = {
  title: "Performance Marketing & Growth Services | First Option Agency",
  description: "Explore our range of ROI-driven performance marketing, SEO, and lead generation services designed for global business growth.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesListPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#F5F6F8", minHeight: "100vh", paddingTop: "clamp(120px, 15vw, 160px)", paddingBottom: "100px", position: "relative" }}>
        
        {/* Decorative Grid Background matching minimalist HR dashboards */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "500px", backgroundImage: "radial-gradient(#E5E7EB 1px, transparent 1px)", backgroundSize: "32px 32px", opacity: 0.5, pointerEvents: "none" }} />
        
        <div className="container-main" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(60px, 8vw, 80px)", maxWidth: 800, marginInline: "auto" }}>
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

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "clamp(24px, 3vw, 40px)" }}>
            {SERVICES.map((service) => {
              const IconComp = (LucideIcons as any)[service.icon] || LucideIcons.Zap;
              return (
                <Link key={service.slug} href={`/services/${service.slug}`} style={{ textDecoration: "none" }}>
                  <div className="service-card" style={{ 
                    background: "#FFFFFF", 
                    borderRadius: "clamp(20px, 2.5vw, 32px)", 
                    padding: "clamp(20px, 2.5vw, 28px)", 
                    height: "100%", 
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid #E5E7EB", 
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)"
                  }}>
                    
                    {/* Service Image Container */}
                    <div style={{ 
                      position: "relative", 
                      width: "100%", 
                      height: "220px", 
                      borderRadius: "clamp(12px, 1.5vw, 20px)",
                      overflow: "hidden",
                      marginBottom: 24
                    }}>
                      <Image 
                        src={service.image} 
                        alt={service.title}
                        fill
                        style={{ objectFit: "cover", transition: "transform 0.6s ease" }}
                        className="service-img"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Overlapping Icon */}
                      <div style={{ 
                        position: "absolute", 
                        bottom: 12, 
                        left: 12,
                        width: 48, 
                        height: 48, 
                        background: "rgba(255, 255, 255, 0.95)", 
                        backdropFilter: "blur(8px)",
                        borderRadius: 12, 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        color: "#7C3AED",
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                        zIndex: 2
                      }}>
                        <IconComp size={22} strokeWidth={1.5} />
                      </div>
                      {/* Floating Tag */}
                      {service.tag && (
                        <div style={{ 
                          position: "absolute",
                          top: 12,
                          right: 12,
                          background: "rgba(17, 24, 39, 0.8)", 
                          backdropFilter: "blur(8px)",
                          color: "white", 
                          fontSize: "0.7rem", 
                          fontWeight: 700, 
                          padding: "6px 12px", 
                          borderRadius: 9999,
                          letterSpacing: "0.05em",
                          textTransform: "uppercase",
                          zIndex: 2
                        }}>
                          {service.tag}
                        </div>
                      )}
                    </div>
                    
                    {/* Content Block */}
                    <div style={{ padding: "0 8px 12px 8px", flexGrow: 1 }}>
                      <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#111827", marginBottom: 12, letterSpacing: "-0.02em" }}>
                        {service.title}
                      </h3>
                      <p style={{ color: "#6B7280", lineHeight: 1.6, fontSize: "0.95rem", marginBottom: 24 }}>
                        {service.shortDesc}
                      </p>
                    </div>

                    {/* Bottom Action Area */}
                    <div style={{ 
                      marginTop: "auto",
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "space-between",
                      borderTop: "1px solid #F3F4F6",
                      paddingTop: 20,
                      paddingInline: 8
                    }}>
                      <span style={{ color: "#7C3AED", fontWeight: 700, fontSize: "0.95rem", display: "flex", alignItems: "center", gap: 6 }}>
                        Explore Strategy
                      </span>
                      <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#F5F6F8", display: "flex", alignItems: "center", justifyContent: "center", color: "#4B5563" }} className="arrow-btn">
                        <ArrowRight size={20} />
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
        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          border-color: rgba(124, 58, 237, 0.2) !important;
        }
        .service-card:hover .service-img {
          transform: scale(1.05);
        }
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
