import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import ContactFooter from "@/app/components/ContactFooter";
import { MapPin, CheckCircle, TrendingUp, Users } from "lucide-react";

const LOCATIONS = [
  { slug: "global", Name: "Global", desc: "Helping businesses worldwide achieve unprecedented scale through data-driven performance marketing." },
  { slug: "india", Name: "India", desc: "Empowering Indian brands to dominate the local and international markets." },
  { slug: "usa", Name: "USA", desc: "Strategic acquisition systems for high-growth businesses in the United States." },
  { slug: "middle-east", Name: "Middle East", desc: "Driving innovation and performance marketing excellence in the MENA region." },
  { slug: "europe", Name: "Europe", desc: "Performance-led growth strategies for the European enterprise landscape." }
];

export async function generateStaticParams() {
  return LOCATIONS.map((loc) => ({
    slug: loc.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const loc = LOCATIONS.find((l) => l.slug === slug);
  if (!loc) return { title: "Location Not Found" };

  return {
    title: `Best Performance Marketing Agency in ${loc.Name} | ROI Driven SEO`,
    description: `Accelerate your business growth in ${loc.Name} with our expert performance marketing, SEO, and lead generation services tailored for high-growth businesses.`,
    keywords: `marketing agency in ${loc.Name}, SEO agency ${loc.Name}, lead generation ${loc.Name}`,
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loc = LOCATIONS.find((l) => l.slug === slug);
  if (!loc) notFound();

  return (
    <>
      <Navbar />
      <main style={{ background: "#FFFFFF", minHeight: "100vh", paddingTop: "140px" }}>
        
        {/* Hero Section */}
        <div style={{ background: "linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)", padding: "80px 0", marginBottom: 80 }}>
          <div className="container-main" style={{ textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#FFF", padding: "8px 16px", borderRadius: 9999, border: "1px solid rgba(124,58,237,0.2)", fontSize: "0.75rem", fontWeight: 700, color: "#7C3AED", marginBottom: 24 }}>
              <MapPin size={14} />
              REGIONAL EXPERTISE: {loc.Name.toUpperCase()}
            </div>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#111827", letterSpacing: "-0.04em", marginBottom: 20 }}>
              ROI-driven Performance Marketing <br /> Agency in <span style={{ color: "#7C3AED" }}>{loc.Name}</span>
            </h1>
            <p style={{ fontSize: "1.1rem", color: "#4B5563", maxWidth: 700, marginInline: "auto", lineHeight: 1.6 }}>
              {loc.desc} We help brands dominate their market with data-driven acquisition systems and localized performance strategies.
            </p>
          </div>
        </div>

        {/* Local Strategy Section */}
        <div className="container-main" style={{ paddingBottom: 100 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#111827", marginBottom: 24, letterSpacing: "-0.02em" }}>
                Why Businesses in {loc.Name} Choose First Option Agency?
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {[
                  { title: "Localized Performance SEO", desc: "Rank for high-intent keywords that specifically target customers in " + loc.Name + "." },
                  { title: "In-Market Audience Acquisition", desc: "Target users who are currently looking for your services in " + loc.Name + "." },
                  { title: "Market Domination", desc: "Out-rank competitors and become the go-to authority in your regional niche." }
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 16 }}>
                    <div style={{ flexShrink: 0, width: 24, height: 24, borderRadius: "50%", background: "#10B981", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF" }}>
                      <CheckCircle size={14} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827", marginBottom: 4 }}>{item.title}</h4>
                      <p style={{ fontSize: "0.95rem", color: "#6B7280", lineHeight: 1.5 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={{ background: "#F9FAFB", borderRadius: 32, padding: 40, border: "1px solid #E5E7EB" }}>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#111827", marginBottom: 24, textAlign: "center" }}>Get a {loc.Name} Strategy Session</h3>
              <p style={{ textAlign: "center", color: "#6B7280", marginBottom: 32 }}>We'll analyze your current market presence and provide a roadmap to dominate {loc.Name}.</p>
              <button className="glow-btn-primary" style={{ width: "100%", padding: "18px", borderRadius: 16, border: "none", color: "#FFF", fontWeight: 700, cursor: "pointer" }}>
                BOOK A STRATEGY DEMO
              </button>
            </div>
          </div>
        </div>

      </main>
      <ContactFooter />
    </>
  );
}
