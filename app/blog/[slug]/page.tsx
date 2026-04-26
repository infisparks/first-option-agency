import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/app/constants/blogs";
import Navbar from "@/app/components/Navbar";
import ContactFooter from "@/app/components/ContactFooter";
import { Calendar, User, Tag } from "lucide-react";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Blog Not Found" };

  return {
    title: `${post.title} | First Option Agency Blog`,
    description: post.excerpt,
    keywords: post.keywords.join(", "),
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main style={{ background: "#FFFFFF", minHeight: "100vh", paddingTop: "clamp(100px, 12vw, 140px)", paddingBottom: "100px" }}>
        <article className="container-main" style={{ maxWidth: 850 }}>
          
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#111827", textAlign: "center", lineHeight: 1.1, letterSpacing: "-0.04em", marginBottom: 32 }}>
            {post.title}
          </h1>

          {/* Meta Info */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, marginBottom: 48, color: "#6B7280", fontSize: "0.88rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Calendar size={16} />
              {post.date}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <User size={16} />
              {post.author}
            </div>
          </div>

          {/* Featured Image */}
          <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: "clamp(16px, 3vw, 32px)", overflow: "hidden", marginBottom: "clamp(30px, 5vw, 60px)", boxShadow: "0 20px 50px rgba(0,0,0,0.1)", background: "#F3F4F6" }}>
            <Image src={post.image} alt={post.title} fill style={{ objectFit: "contain" }} />
          </div>

          {/* Content */}
          <div 
            className="blog-content"
            style={{ 
              fontSize: "clamp(0.95rem, 1.2vw, 1.125rem)", 
              lineHeight: 1.7, 
              color: "#374151",
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Extra Images Grid */}
          {post.extraImages && post.extraImages.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(12px, 2vw, 24px)", marginTop: 40 }}>
              {post.extraImages.map((img, i) => (
                <div key={i} style={{ position: "relative", aspectRatio: "4/3", borderRadius: 16, overflow: "hidden", background: "#F3F4F6", border: "1px solid #E5E7EB" }}>
                  <Image src={img} alt={`Insight ${i + 1}`} fill style={{ objectFit: "contain", padding: 8 }} />
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          <div style={{ marginTop: 60, paddingTop: 40, borderTop: "1px solid #F3F4F6" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {post.keywords.map((tag) => (
                <span key={tag} style={{ background: "#F3F4F6", color: "#4B5563", padding: "6px 12px", borderRadius: 8, fontSize: "clamp(0.7rem, 1vw, 0.85rem)", fontWeight: 500 }}>
                  #{tag.replace(/\s+/g, "")}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Box */}
          <div style={{ marginTop: "clamp(40px, 8vw, 80px)", background: "linear-gradient(135deg, #6D28D9 0%, #4C1D95 100%)", borderRadius: "clamp(20px, 3vw, 32px)", padding: "clamp(32px, 5vw, 48px) clamp(16px, 3vw, 32px)", textAlign: "center", color: "#FFFFFF" }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 1.8rem)", fontWeight: 800, marginBottom: 16, color: "#FFFFFF" }}>Want results like these?</h2>
            <p style={{ opacity: 0.9, marginBottom: 32, maxWidth: 500, marginInline: "auto", fontSize: "clamp(0.85rem, 1.2vw, 1rem)" }}>
              Let&apos;s build your custom performance marketing engine. Book a 30-minute growth session today.
            </p>
            <button className="glow-btn-primary" style={{ background: "#FFF", color: "#7C3AED", padding: "12px 32px", borderRadius: 9999, border: "none", fontWeight: 700, cursor: "pointer", fontSize: "0.85rem" }}>
              BOOK A FREE STRATEGY SESSION
            </button>
          </div>

        </article>
      </main>

      <ContactFooter />
    </>
  );
}
