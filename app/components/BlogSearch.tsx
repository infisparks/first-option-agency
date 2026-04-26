"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight, Search } from "lucide-react";
import { BLOG_POSTS, BlogPost } from "@/app/constants/blogs";

export default function BlogSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const categories = ["All", ...new Set(BLOG_POSTS.map(p => p.category))];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "All" || post.category === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="container-main">
      {/* Search Bar */}
      <div style={{ maxWidth: 800, margin: "0 auto 40px" }}>
        <div style={{ position: "relative", marginBottom: 32 }}>
          <input
            type="text"
            placeholder="Search our marketing intelligence..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "20px 24px 20px 60px",
              borderRadius: "16px",
              border: "1px solid #E5E7EB",
              fontSize: "1.1rem",
              outline: "none",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.04)",
              background: "#FFFFFF",
              color: "#111827"
            }}
            className="search-input"
          />
          <Search 
            size={24} 
            style={{ position: "absolute", left: 24, top: "50%", transform: "translateY(-50%)", color: "#6366F1" }} 
          />
        </div>

        {/* Category Tabs */}
        <div style={{ 
          display: "flex", 
          gap: 12, 
          overflowX: "auto", 
          padding: "4px 4px 20px", 
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          justifyContent: "center"
        }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              style={{
                padding: "10px 24px",
                borderRadius: "999px",
                border: "none",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.3s ease",
                background: activeTab === cat ? "#6366F1" : "#F3F4F6",
                color: activeTab === cat ? "#FFFFFF" : "#4B5563",
                boxShadow: activeTab === cat ? "0 4px 12px rgba(99, 102, 241, 0.3)" : "none"
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 32 }}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <article key={post.slug} className="blog-card" style={{ 
              background: "#FFFFFF", 
              borderRadius: 24, 
              overflow: "hidden", 
              border: "1px solid #F3F4F6", 
              display: "flex", 
              flexDirection: "column",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              cursor: "pointer",
              boxShadow: "0 4px 20px -10px rgba(0,0,0,0.05)"
            }}>
              <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                <div style={{ 
                  position: "relative", 
                  width: "100%", 
                  aspectRatio: "16/10", 
                  background: "#F9FAFB",
                  overflow: "hidden",
                  borderBottom: "1px solid #F3F4F6"
                }}>
                  <Image src={post.image} alt={post.title} fill style={{ objectFit: "contain", padding: "12px", transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)" }} className="blog-thumb" />
                  <div style={{ 
                    position: "absolute", 
                    bottom: 16, 
                    right: 16, 
                    background: "rgba(99, 102, 241, 0.95)", 
                    padding: "6px 14px", 
                    borderRadius: "10px", 
                    fontSize: "0.65rem", 
                    fontWeight: 800, 
                    color: "#FFFFFF", 
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
                    zIndex: 10
                  }}>
                    {post.category}
                  </div>
                </div>
              </Link>
              
              <div style={{ padding: "28px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#9CA3AF", fontSize: "0.85rem", marginBottom: 16 }}>
                  <Calendar size={14} style={{ color: "#6366F1" }} />
                  {post.date}
                </div>
                <h3 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#111827", marginBottom: 12, lineHeight: 1.25, letterSpacing: "-0.02em" }}>
                  <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                    {post.title}
                  </Link>
                </h3>
                <p style={{ color: "#6B7280", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: 24 }}>
                  {post.excerpt}
                </p>
                <div style={{ marginTop: "auto" }}>
                  <Link href={`/blog/${post.slug}`} style={{ display: "flex", alignItems: "center", gap: 8, color: "#6366F1", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none" }}>
                    Read Insights <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "100px 20px" }}>
            <div style={{ fontSize: "3rem", marginBottom: 16 }}>🔍</div>
            <h3 style={{ color: "#111827", marginBottom: 8, fontWeight: 800 }}>No marketing intelligence found</h3>
            <p style={{ color: "#6B7280" }}>Try checking another category or refining your search term.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .search-input:focus {
          border-color: #6366F1 !important;
          box-shadow: 0 20px 25px -5px rgba(99, 102, 241, 0.1), 0 10px 10px -5px rgba(99, 102, 241, 0.04) !important;
        }
        .blog-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 60px -15px rgba(99, 102, 241, 0.15), 0 10px 15px -3px rgba(0, 0, 0, 0.05) !important;
          border-color: #6366F1 !important;
        }
        .blog-card:hover .blog-thumb {
          transform: scale(1.08);
        }
      `}</style>
    </div>
  );
}
