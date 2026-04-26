"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { Maximize2, Zap, Layout, Mic, UserPlus, Database, PieChart, Activity, DollarSign, Stethoscope, FileText, Calendar, Plus, Minus, X, Search, ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";

/* ═══════════════════════════════════════════════════════
   Feature Data — Updated with custom IPD images
   ═══════════════════════════════════════════════════════ */

import { SERVICES } from "../constants/services";
import Link from "next/link";

const tagColors: Record<string, string> = {
  "Strategy": "#7C3AED",
  "Operations": "#6D28D9",
  "Conversion": "#8B5CF6",
  "Creative": "#F59E0B",
  "Paid Ads": "#10B981",
  "Leads": "#0891B2",
  "SEO": "#7C3AED",
};

// Optimized Animation Configuration
const ANIMATION_CONFIG = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  viewport: { once: true, margin: "-100px" },
};

export default function Features() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  const openLightbox = (url: string) => {
    setActiveImage(url);
    setZoom(1);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setActiveImage(null);
    document.body.style.overflow = "";
  };

  const handleZoom = (delta: number) => {
    setZoom(prev => Math.min(Math.max(prev + delta, 0.4), 3.5));
  };

  return (
    <section id="services" style={{ position: "relative", paddingTop: 72, paddingBottom: 80, backgroundColor: 'var(--bg-main)', overflowX: 'hidden' }}>
      <div className="container-main">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(44px, 7vw, 68px)" }}>
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={ANIMATION_CONFIG.viewport}
            transition={{ duration: 0.4, ease: ANIMATION_CONFIG.ease }}
            className="section-badge" 
          >
            OUR SERVICES
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={ANIMATION_CONFIG.viewport}
            transition={{ duration: 0.5, delay: 0.1, ease: ANIMATION_CONFIG.ease }}
            style={{ fontSize: "clamp(1.3rem, 4vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.035em", marginTop: "clamp(8px, 1.2vw, 12px)", marginBottom: "clamp(8px, 1.5vw, 14px)", color: 'var(--text-main)', lineHeight: 1.1 }}
          >
            Strategic Performance <br /><span className="gradient-text-teal">Marketing Solutions</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={ANIMATION_CONFIG.viewport}
            transition={{ duration: 0.5, delay: 0.2, ease: ANIMATION_CONFIG.ease }}
            style={{ color: "var(--text-dim)", fontSize: "clamp(0.76rem, 1.5vw, 0.9rem)", maxWidth: 580, margin: "0 auto", lineHeight: 1.65, fontWeight: 500 }}
          >
           We don&apos;t just drive traffic—we build complete acquisition systems that convert visitors into customers and maximize your ROI.
          </motion.p>
        </div>

        {/* Feature Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(56px, 9vw, 96px)" }}>
          {SERVICES.map((feature, index) => (
            <FeatureSection 
                key={feature.slug} 
                feature={feature} 
                index={index} 
                onImageClick={openLightbox} 
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-backdrop"
            onClick={closeLightbox}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1001,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(10px)'
            }}
          >
             {/* Controls */}
             <div 
              onClick={(e) => e.stopPropagation()}
              className="lightbox-controls"
              style={{
                position: 'fixed',
                top: '30px',
                right: '30px',
                display: 'flex',
                gap: '12px',
                zIndex: 1002
              }}
             >
                <button 
                  onClick={() => handleZoom(0.3)}
                  className="pro-btn-glass"
                  style={{ width: '52px', height: '52px', borderRadius: '16px', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Zoom In"
                >
                  <Plus size={24} strokeWidth={2.5} />
                </button>
                <button 
                  onClick={() => handleZoom(-0.3)}
                  className="pro-btn-glass"
                  style={{ width: '52px', height: '52px', borderRadius: '16px', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Zoom Out"
                >
                  <Minus size={24} strokeWidth={2.5} />
                </button>
                <button 
                  onClick={closeLightbox}
                  className="pro-btn-glass close-btn"
                  style={{ width: '52px', height: '52px', borderRadius: '16px', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Close"
                >
                  <X size={24} strokeWidth={2.5} />
                </button>
             </div>

             {/* Image Wrapper */}
             <div 
              onClick={(e) => e.stopPropagation()}
              style={{ 
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: zoom > 1 ? 'auto' : 'hidden',
              }}
             >
                <motion.div 
                  layoutId={activeImage || undefined}
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: `scale(${zoom})`,
                    cursor: zoom > 1 ? 'grab' : 'default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                  <Image 
                    src={activeImage || ""}
                    alt="Feature Preview"
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </motion.div>
             </div>

             <div className="glass-indicator" style={{ position: 'fixed', top: '35px', left: '50%', transform: 'translateX(-50%)', padding: '10px 24px', borderRadius: '50px', color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.9rem', border: '1px solid rgba(0,0,0,0.05)', background: 'rgba(37, 99, 235, 0.05)' }}>
               {Math.round(zoom * 100)}%
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .pro-btn-glass {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .pro-btn-glass:hover {
          background: rgba(37, 99, 235, 0.05);
          border-color: rgba(37, 99, 235, 0.2);
          transform: translateY(-4px);
          box-shadow: 0 10px 20px rgba(37, 99, 235, 0.1);
        }
        .close-btn:hover {
          background: rgba(239, 68, 68, 0.05) !important;
          border-color: rgba(239, 68, 68, 0.2) !important;
        }
        @media (max-width: 768px) {
          .lightbox-controls {
            top: auto !important;
            bottom: 40px !important;
            right: 50% !important;
            transform: translateX(50%) !important;
            background: #fff !important;
            padding: 12px !important;
            border-radius: 20px !important;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important;
          }
        }
      `}</style>
    </section>
  );
}

function FeatureSection({ feature, index, onImageClick }: { feature: any; index: number; onImageClick: (url: string) => void }) {
  const displayNum = index + 1;
  const isOdd = displayNum % 2 !== 0;
  const imagePath = feature.image;
  const tagColor = tagColors[feature.tag] || "var(--color-primary)";
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Performance-focused Animation Variants
  const imageVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,                 
      scale: 0.98                           
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { 
        duration: ANIMATION_CONFIG.duration, 
        ease: ANIMATION_CONFIG.ease 
      } 
    }
  };

  const contentVariants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      scale: 0.99 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { 
        duration: ANIMATION_CONFIG.duration, 
        delay: isMobile ? 0 : 0.1, 
        ease: ANIMATION_CONFIG.ease 
      } 
    }
  };

  const IconComp = (LucideIcons as any)[feature.icon] || LucideIcons.Zap;

  return (
    <div
      className={`feature-section flex flex-col gap-8 md:gap-16 items-center py-8 md:py-16 px-4 ${
        isOdd ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Image Container with Optimized Effects */}
      <motion.div 
        variants={imageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={ANIMATION_CONFIG.viewport}
        style={{ willChange: "transform, opacity" }}
        className="w-[85%] md:w-[32%] relative flex justify-center py-10 mx-auto md:mx-0"
      >
        {/* Optimized Glow */}
        {!isMobile && (
          <div 
            className="absolute inset-[-40px] opacity-[0.08] pointer-events-none blur-[60px] rounded-full"
            style={{ background: `radial-gradient(circle, ${tagColor} 0%, transparent 70%)` }}
          />
        )}
        
        {/* Card Shadow Wrapper */}
        <div style={{ filter: `drop-shadow(0 30px 50px rgba(124, 58, 237, 0.15))` }}>
          <div 
            className="feature-img-box group relative p-[20px] md:p-[32px] overflow-hidden"
            style={{ 
              background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)`,
              borderRadius: '40px',
              border: `1.5px solid rgba(124, 58, 237, 0.35)`,
              maxWidth: '100%',
              transition: 'all 0.4s ease'
            }}
          >
             <div className="relative rounded-[24px] overflow-hidden bg-white shadow-inner">
               <Image
                  src={imagePath}
                  alt={feature.title}
                  width={1200}
                  height={800}
                  className="w-full h-auto block object-contain"
                  loading={displayNum <= 2 ? "eager" : "lazy"}
                  priority={displayNum <= 2}
                  onClick={() => onImageClick(imagePath)}
                  style={{ cursor: 'pointer' }}
                />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content Container */}
      <motion.div 
        variants={contentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={ANIMATION_CONFIG.viewport}
        style={{ willChange: "transform, opacity" }}
        className="w-full md:w-[62%] flex flex-col gap-6 text-center md:text-left items-center md:items-start"
      >
        <div className="flex items-center gap-4">
          <div 
            className="flex items-center justify-center w-11 h-11 rounded-xl border"
            style={{ 
              background: `${tagColor}08`, 
              borderColor: `${tagColor}15`,
              color: tagColor,
            }}
          >
            <IconComp size={18} />
          </div>
          <span 
            className="text-[0.75rem] font-bold tracking-[0.1em] uppercase opacity-80"
            style={{ color: tagColor }}
          >
            {feature.tag}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <h3 style={{ fontSize: "clamp(1.1rem, 3vw, 2rem)", fontWeight: 800, color: '#0F172A', letterSpacing: "-0.03em", lineHeight: 1.15 }}>
            {feature.title}
          </h3>
          <p style={{ fontSize: "clamp(0.76rem, 1.5vw, 0.88rem)", color: '#475569', lineHeight: 1.65, fontWeight: 500 }}>
            {feature.shortDesc}
          </p>
        </div>

        <Link href={`/services/${feature.slug}`} className="group/btn" style={{ textDecoration: 'none' }} aria-label={`Explore Service: ${feature.title}`}>
          <button 
            style={{ 
              padding: '12px 24px', 
              borderRadius: '12px', 
              background: 'white', 
              border: `1.5px solid ${tagColor}30`, 
              color: tagColor, 
              fontWeight: 700, 
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Explore Service
            <LucideIcons.ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
          </button>
        </Link>

        <div className="flex items-center gap-3 mt-2 group">
            <div 
              className="w-10 h-[2px] transition-all duration-500 group-hover:w-14" 
              style={{ background: tagColor, opacity: 0.3, borderRadius: 999 }} 
            />
            <span style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.7rem)", fontWeight: 900, color: "#94A3B8", letterSpacing: "0.18em", textTransform: "uppercase" }}>
              SERVICE {String(displayNum).padStart(2, "0")}
            </span>
        </div>
      </motion.div>
    </div>
  );
}
