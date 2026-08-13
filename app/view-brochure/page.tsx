"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Download, 
  ArrowLeft, 
  CheckCircle2, 
  Zap, 
  Target, 
  BarChart3, 
  ShieldCheck,
  FileText,
  Users,
  Globe2,
  TrendingUp,
  Maximize2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import ContactFooter from '../components/ContactFooter';

export default function BrochurePage() {
  const downloadBrochure = () => {
    const link = document.createElement('a');
    link.href = '/brochure/broucher.webp';
    link.download = 'First-Option-Agency-Strategy-Roadmap.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main style={{ background: '#F8FAFC', minHeight: '100vh', fontFamily: "'Outfit', sans-serif" }}>
      <Navbar onBookDemo={() => {}} />
      
      {/* ── IMMERSIVE FULL-SCREEN BROCHURE HERO ── */}
      <section style={{ padding: 'clamp(80px, 10vw, 120px) 0 40px', position: 'relative', overflow: 'hidden', background: '#fff' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.04) 0%, transparent 100%)', zIndex: 0 }} />
        
        <div className="container-main" style={{ position: 'relative', zIndex: 1 }}>
          {/* Re-designed One-Line Header */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'row',
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '40px',
            textAlign: 'center'
          }}>
             <h1 style={{ fontSize: 'clamp(1.4rem, 4vw, 2.4rem)', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.04em', lineHeight: 1.1, margin: 0 }}>
                First Option <span style={{ color: 'var(--color-primary)' }}>Agency</span>
             </h1>
             <motion.div 
               initial={{ opacity: 0, x: 10 }}
               animate={{ opacity: 1, x: 0 }}
               style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--color-primary)', fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em', padding: '6px 14px', background: 'rgba(37, 99, 235, 0.05)', borderRadius: '50px', border: '1px solid rgba(37, 99, 235, 0.1)' }}
             >
                <TrendingUp size={12} /> Strategic Portfolio
             </motion.div>
          </div>

          {/* Full Screen Image Container */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              width: '100%',
              maxWidth: '1100px',
              margin: '0 auto',
              borderRadius: 'clamp(16px, 3vw, 32px)',
              boxShadow: '0 50px 120px -20px rgba(37, 99, 235, 0.2)',
              border: '1px solid rgba(37, 99, 235, 0.12)',
              background: '#fff',
              position: 'relative'
            }}
          >
            <Image 
              src="/brochure/broucher.webp" 
              alt="First Option Agency Full Strategy Roadmap" 
              width={1600} 
              height={2400} 
              priority
              style={{ 
                width: '100%', 
                height: 'auto', 
                display: 'block'
              }}
            />
            
            {/* Download Button moved to bottom of image */}
            <div style={{ padding: '32px', textAlign: 'center', borderTop: '1px solid #F1F5F9', background: '#FAFBFF' }}>
               <button 
                  onClick={downloadBrochure} 
                  className="glow-btn-primary" 
                  style={{ 
                    padding: '16px 48px', 
                    borderRadius: '50px', 
                    fontSize: '1rem', 
                    fontWeight: 800, 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: 12, 
                    cursor: 'pointer', 
                    border: 'none', 
                    color: '#fff',
                    boxShadow: '0 15px 30px rgba(37, 99, 235, 0.25)'
                  }}
               >
                  <Download size={20} /> Download Guide
               </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SEO PILLARS: INDUSTRY SPECIFIC ── */}
      <section style={{ padding: '80px 0', background: '#fff', borderTop: '1px solid #F1F5F9' }}>
        <div className="container-main">
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
              {/* Healthcare Pillar */}
              <div style={{ padding: '40px', borderRadius: '32px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                 <div style={{ color: 'var(--color-primary)', marginBottom: '24px' }}><Users size={32} /></div>
                 <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '16px' }}>Marketing for Doctors</h3>
                 <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '24px' }}>
                   Our <strong>healthcare marketing strategy</strong> focuses on patient trust and appointment consistency. We build HIPAA-compliant funnels that target specific medical conditions.
                 </p>
                 <ul style={{ padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {['Patient Psychology Funnels', 'Google Local Service Ads'].map(li => (
                      <li key={li} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: '0.88rem', fontWeight: 600, color: '#0F172A' }}>
                        <CheckCircle2 size={16} color="var(--color-primary)" /> {li}
                      </li>
                    ))}
                 </ul>
              </div>

              {/* Manufacturing Pillar */}
              <div style={{ padding: '40px', borderRadius: '32px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                 <div style={{ color: '#10B981', marginBottom: '24px' }}><Zap size={32} /></div>
                 <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '16px' }}>B2B Manufacturing Lead Gen</h3>
                 <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '24px' }}>
                   Scale your factory output with <strong>predictable B2B lead generation</strong>. We specialize in identifying industrial buyers on LinkedIn and Search.
                 </p>
                 <ul style={{ padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {['Supply Chain Targeting', 'Bulk RFP Funnels'].map(li => (
                      <li key={li} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: '0.88rem', fontWeight: 600, color: '#0F172A' }}>
                        <CheckCircle2 size={16} color="#10B981" /> {li}
                      </li>
                    ))}
                 </ul>
              </div>

              {/* IT/SaaS Pillar */}
              <div style={{ padding: '40px', borderRadius: '32px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                 <div style={{ color: '#2563EB', marginBottom: '24px' }}><Globe2 size={32} /></div>
                 <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '16px' }}>IT & SaaS Growth Systems</h3>
                 <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '24px' }}>
                   High-growth IT companies require rapid experimentation. Our <strong>SaaS marketing roadmap</strong> leverages data-science and performance creative.
                 </p>
                 <ul style={{ padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {['Demo-Booking Optimization', 'C-Level LinkedIn Ads'].map(li => (
                      <li key={li} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: '0.88rem', fontWeight: 600, color: '#0F172A' }}>
                        <CheckCircle2 size={16} color="#2563EB" /> {li}
                      </li>
                    ))}
                 </ul>
              </div>
           </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section style={{ padding: '100px 0', background: '#FAFBFF ' }}>
        <div className="container-main">
           <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0F172A' }}>Frequently Asked Questions</h2>
           </div>
           
           <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { q: "What makes First Option Agency different?", a: "Our ROI-only focus. We track every rupee spent back to a paying customer." },
                { q: "How long to see results?", a: "Lead quality shifts in 14 days; full optimization in 30-60 days." }
              ].map((faq, i) => (
                <div key={i} style={{ padding: '32px', background: '#fff', borderRadius: '24px', border: '1px solid #E2E8F0' }}>
                   <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>{faq.q}</h4>
                   <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.96rem' }}>{faq.a}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* ── FINAL CTA: CINEMATIC RE-DESIGN ── */}
      <section style={{ 
        padding: 'clamp(80px, 10vw, 140px) 0', 
        background: 'linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 50%, #2563EB 100%)', 
        color: '#fff', 
        textAlign: 'center', 
        overflow: 'hidden', 
        position: 'relative',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
         <div style={{ position: 'absolute', top: '-20%', left: '10%', width: '40%', height: '80%', background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0 }} />
         <div style={{ position: 'absolute', bottom: '-20%', right: '10%', width: '40%', height: '80%', background: 'radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0 }} />
         
         <div className="container-main" style={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', fontWeight: 950, marginBottom: '28px', letterSpacing: '-0.045em', lineHeight: 1.05, color: '#FFFFFF' }}>
                Ready to <span style={{ textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.3)', textUnderlineOffset: '8px' }}>Dominate</span> Your Market?
              </h2>
              <p style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', opacity: 0.95, maxWidth: '750px', margin: '0 auto 56px', fontWeight: 500, lineHeight: 1.6, color: '#E2E8F0' }}>
                Stop wishing for growth. Start engineering it. Download our complete strategic roadmap today.
              </p>
              
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                <button 
                  onClick={downloadBrochure} 
                  style={{ padding: '22px 52px', borderRadius: '50px', background: '#FFFFFF', color: '#4C1D95', fontWeight: 850, border: 'none', cursor: 'pointer', fontSize: '1.1rem', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
                >
                    Download Full Guide
                </button>
                <Link href="/#contact" style={{ padding: '20px 48px', borderRadius: '50px', background: 'rgba(255,255,255,0.08)', color: '#fff', fontWeight: 700, border: '1px solid rgba(255,255,255,0.25)', textDecoration: 'none', fontSize: '1.1rem', backdropFilter: 'blur(10px)' }}>
                    Request Custom Audit
                </Link>
              </div>
            </motion.div>
         </div>
      </section>

      <ContactFooter />
    </main>
  );
}
