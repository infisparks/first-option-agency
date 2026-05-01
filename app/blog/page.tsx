import { BLOG_POSTS } from "@/app/constants/blogs";
import Navbar from "@/app/components/Navbar";
import ContactFooter from "@/app/components/ContactFooter";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import BlogSearch from "@/app/components/BlogSearch";

export const metadata = {
  title: "Marketing Insights & Performance Strategies Blog | First Option Agency",
  description: "Stay updated with the latest trends in performance marketing, SEO, and sales funnels. ROI-driven insights for global growth-focused businesses.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogListPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#F9FAFB", minHeight: "100vh", paddingTop: "140px", paddingBottom: "100px" }}>
        <div className="container-main">
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span className="section-badge">OUR BLOG</span>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#111827", letterSpacing: "-0.04em", marginTop: 12 }}>
              Marketing Insights for <br /><span style={{ color: "#7C3AED" }}>High-Growth Brands</span>
            </h1>
          </div>

          <BlogSearch />
        </div>
      </main>
      <ContactFooter />
    </>
  );
}
