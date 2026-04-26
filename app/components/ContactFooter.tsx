"use client";

import { motion, useInView } from "framer-motion";
import {
  Mail, MapPin, Phone, ArrowRight,
  Instagram, Linkedin, Twitter, CheckCircle2, Award, MessageCircle,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function ContactFooter() {
  const [focused, setFocused] = useState<string | null>(null);
  const formRef = useRef(null);
  const isFormInView = useInView(formRef, { once: true, margin: "-10%" });

  const contactInfo = [
    {
      icon: <Mail size={17} />,
      title: "Mail Us 24/7",
      value: "firstoptionagency@gmail.com",
      href: "mailto:firstoptionagency@gmail.com",
      color: "var(--color-primary)",
    },
    {
      icon: <Phone size={17} />,
      title: "Call / WhatsApp",
      value: "+91 832 949 4445",
      href: "https://wa.me/918329494445",
      color: "#10B981",
    },
    {
      icon: <MapPin size={17} />,
      title: "Global Presence",
      value: "Remote First | Serving Clients Worldwide",
      href: "#",
      color: "var(--color-accent)",
    },
  ];

  return (
    <footer
      id="contact"
      style={{
        position: "relative",
        paddingTop: "clamp(56px, 9vw, 100px)",
        paddingBottom: "clamp(32px, 4vw, 48px)",
        overflow: "hidden",
        background: "linear-gradient(to top, #FFFFFF 0%, #FAFBFF 60%, #F0F7FF 100%)",
      }}
    >
      {/* Background decorations */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1.5px", background: "linear-gradient(to right, transparent, rgba(37,99,235,0.25), transparent)", zIndex: 1 }} />
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: "120%", height: 500, background: "radial-gradient(ellipse at center, rgba(37,99,235,0.03) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      <div className="container-main" style={{ position: "relative", zIndex: 1 }}>
        {/* ── CONTACT SECTION ── */}
        <div className="contact-grid">

          {/* Left: Copy & Contact Info */}
          <div style={{ alignSelf: "center" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              style={{ marginBottom: "24px" }}
              aria-label="First Option Agency"
            >
               <Image 
                src="/logo.webp" 
                alt="First Option Agency Logo" 
                width={320} 
                height={84} 
                style={{ objectFit: "contain", width: "auto", height: "clamp(56px, 10vw, 84px)" }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="section-badge"
            >
              LET&apos;S TALK
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.07 }}
              style={{
                fontSize: "clamp(1.3rem, 4vw, 2.6rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: "clamp(10px, 2vw, 18px)",
                color: "var(--text-main)",
                letterSpacing: "-0.035em",
              }}
            >
              Ready to Scale Your{" "}
              <br className="hide-sm" />
              <span
                style={{
                  background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Business Revenue?
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 }}
              style={{
                color: "var(--text-dim)",
                fontSize: "clamp(0.78rem, 1.6vw, 0.9rem)",
                marginBottom: "clamp(24px, 3.5vw, 40px)",
                maxWidth: 440,
                fontWeight: 500,
                lineHeight: 1.65,
              }}
            >
              Join 100+ growing businesses. Schedule your growth strategy session and discover how we can build your acquisition system.
            </motion.p>

            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(14px, 2.2vw, 22px)" }}>
              {contactInfo.map((info, i) => (
                <motion.a
                  key={info.title}
                  href={info.href}
                  aria-label={info.title}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.18 + i * 0.08, ease: EASE }}
                  whileHover={{ x: 3 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "clamp(10px, 1.8vw, 16px)",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <div
                    style={{
                      width: "clamp(38px, 5vw, 46px)",
                      height: "clamp(38px, 5vw, 46px)",
                      borderRadius: "12px",
                      background: `${info.color}0A`,
                      border: `1px solid ${info.color}1E`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: info.color,
                      flexShrink: 0,
                      transition: "all 0.3s ease",
                    }}
                  >
                    {info.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        color: "#64748B",
                        fontSize: "clamp(0.58rem, 1.1vw, 0.68rem)",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: 2,
                      }}
                    >
                      {info.title}
                    </div>
                    <div
                      style={{
                        fontSize: "clamp(0.8rem, 1.5vw, 0.92rem)",
                        fontWeight: 700,
                        color: "#0F172A",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {info.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* WhatsApp CTA pill */}
            <motion.a
              href="https://wa.me/919958399157"
              target="_blank"
              rel="noopener"
              aria-label="Direct WhatsApp message"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginTop: "clamp(16px, 2.5vw, 28px)",
                padding: "10px 18px",
                borderRadius: "9999px",
                background: "linear-gradient(135deg, #25D366, #128C7E)",
                color: "#fff",
                fontSize: "0.78rem",
                fontWeight: 700,
                textDecoration: "none",
                letterSpacing: "0.01em",
                boxShadow: "0 8px 20px -4px rgba(37,211,102,0.35)",
                transition: "all 0.3s ease",
              }}
            >
              <MessageCircle size={14} strokeWidth={2.5} />
              WhatsApp Us
            </motion.a>
          </div>

          {/* Right: Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            animate={isFormInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            style={{
              padding: "clamp(22px, 4vw, 44px)",
              borderRadius: "clamp(20px, 3vw, 32px)",
              background: "#FFFFFF",
              border: "1px solid rgba(226,232,240,0.9)",
              boxShadow: "0 20px 56px -14px rgba(37,99,235,0.1), 0 6px 20px -6px rgba(0,0,0,0.04)",
              position: "relative",
            }}
          >
            {/* Form top accent */}
            <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: 2.5, background: "linear-gradient(90deg, #2563EB, #6366F1, #3B82F6)", borderRadius: "0 0 5px 5px" }} />

            <h3
              style={{
                fontSize: "clamp(1.1rem, 2.5vw, 1.55rem)",
                fontWeight: 800,
                color: "var(--text-main)",
                marginBottom: "clamp(4px, 0.8vw, 8px)",
                letterSpacing: "-0.025em",
              }}
            >
              Schedule Your Session
            </h3>
            <p style={{ color: "var(--text-dim)", marginBottom: "clamp(20px, 3vw, 32px)", fontWeight: 500, fontSize: "clamp(0.75rem, 1.3vw, 0.85rem)" }}>
              Our strategy team responds within 24 hours.
            </p>

            <form style={{ display: "flex", flexDirection: "column", gap: "clamp(12px, 2vw, 18px)" }}>
              <div className="form-row">
                <FormInput label="Full Name" type="text" id="name" placeholder="John Doe" focused={focused === "name"} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} />
                <FormInput label="Work Email" type="email" id="email" placeholder="john@agency.com" focused={focused === "email"} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
              </div>
              <FormInput label="Company Name" type="text" id="subject" placeholder="Your Business Name" focused={focused === "subject"} onFocus={() => setFocused("subject")} onBlur={() => setFocused(null)} />

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label
                  htmlFor="message"
                  style={{
                    fontSize: "clamp(0.68rem, 1.2vw, 0.76rem)",
                    fontWeight: 700,
                    color: focused === "message" ? "#2563EB" : "#475569",
                    transition: "color 0.3s",
                    paddingLeft: 2,
                    letterSpacing: "0.01em",
                  }}
                >
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  placeholder="Tell us about your requirements..."
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  style={{
                    padding: "clamp(10px, 1.5vw, 14px)",
                    borderRadius: "clamp(10px, 1.5vw, 13px)",
                    background: "#F8FAFC",
                    border: `1.5px solid ${focused === "message" ? "#2563EB" : "rgba(226,232,240,0.9)"}`,
                    color: "#0F172A",
                    fontSize: "clamp(0.78rem, 1.4vw, 0.88rem)",
                    minHeight: "clamp(80px, 12vw, 110px)",
                    outline: "none",
                    transition: "all 0.3s ease",
                    boxShadow: focused === "message" ? "0 0 0 3px rgba(37,99,235,0.07)" : "none",
                    fontFamily: "var(--font-outfit), sans-serif",
                    resize: "vertical",
                  }}
                />
              </div>

              <motion.button
                type="submit"
                aria-label="Submit growth session request"
                className="glow-btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: "clamp(11px, 1.8vw, 15px)",
                  borderRadius: "9999px",
                  border: "none",
                  color: "#fff",
                  fontSize: "clamp(0.78rem, 1.5vw, 0.9rem)",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  marginTop: 4,
                  letterSpacing: "0.01em",
                }}
              >
                Start Growth Session
                <ArrowRight size={15} strokeWidth={2.5} />
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* ── FOOTER LINKS ── */}
        <div
          style={{
            marginTop: "clamp(56px, 9vw, 100px)",
            paddingTop: "clamp(40px, 6vw, 64px)",
            borderTop: "1px solid rgba(226,232,240,0.8)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "clamp(28px, 4vw, 48px)",
          }}
        >
          {/* Col 1 */}
          <div style={{ maxWidth: 340 }}>
            <Image
              src="/logo.png"
              alt="INFIPLUS"
              width={100}
              height={32}
              style={{ objectFit: "contain", marginBottom: "clamp(12px, 1.8vw, 18px)" }}
            />
            <p
              style={{
                color: "var(--text-dim)",
                lineHeight: 1.7,
                fontSize: "clamp(0.72rem, 1.3vw, 0.82rem)",
                fontWeight: 500,
              }}
            >
              Building smart acquisition systems that turn inquiries into paying clients. Predictable growth for modern businesses.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: "clamp(18px, 2.5vw, 28px)" }}>
              <SocialLink icon={<Instagram size={15} />} color="#E1306C" label="Follow us on Instagram" />
              <SocialLink icon={<Linkedin size={15} />} color="#0A66C2" label="Connect with us on LinkedIn" />
              <SocialLink icon={<Twitter size={15} />} color="#1DA1F2" label="Follow us on Twitter" />
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4
              style={{
                fontSize: "clamp(0.65rem, 1.2vw, 0.76rem)",
                fontWeight: 800,
                color: "#0F172A",
                marginBottom: "clamp(14px, 2vw, 20px)",
                textTransform: "uppercase",
                letterSpacing: "0.09em",
              }}
            >
              Company
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(8px, 1.2vw, 12px)" }}>
              <FooterLink text="Our Story" href="#hero" />
              <FooterLink text="Strategy Roadmap" href="/view-brochure" />
              <FooterLink text="Contact Us" href="#contact" />
              <FooterLink text="Privacy Policy" href="#" />
            </div>
          </div>

          {/* Col 3 */}
          <div>
            <h4
              style={{
                fontSize: "clamp(0.65rem, 1.2vw, 0.76rem)",
                fontWeight: 800,
                color: "#0F172A",
                marginBottom: "clamp(14px, 2vw, 20px)",
                textTransform: "uppercase",
                letterSpacing: "0.09em",
              }}
            >
              Services
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(8px, 1.2vw, 12px)" }}>
              <FooterLink text="Marketing Strategy" href="#services" />
              <FooterLink text="Paid Advertising" href="#services" />
              <FooterLink text="Funnel Optimization" href="#services" />
              <FooterLink text="Content Marketing" href="#services" />
            </div>
          </div>

          {/* Col 4 */}
          <div>
            <h4
              style={{
                fontSize: "clamp(0.65rem, 1.2vw, 0.76rem)",
                fontWeight: 800,
                color: "#0F172A",
                marginBottom: "clamp(14px, 2vw, 20px)",
                textTransform: "uppercase",
                letterSpacing: "0.09em",
              }}
            >
              Trust
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(10px, 1.5vw, 16px)" }}>
              {[
                { icon: <CheckCircle2 size={16} />, text: "ROI Focused", color: "#10B981" },
                { icon: <Award size={16} />, text: "Strategy Driven", color: "var(--color-primary)" },
              ].map((badge) => (
                <div
                  key={badge.text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    color: "var(--text-dim)",
                    fontWeight: 600,
                    fontSize: "clamp(0.72rem, 1.3vw, 0.82rem)",
                  }}
                >
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: "10px",
                      background: `${badge.color}0C`,
                      border: `1px solid ${badge.color}22`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: badge.color,
                      flexShrink: 0,
                    }}
                  >
                    {badge.icon}
                  </div>
                  {badge.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            marginTop: "clamp(36px, 5vw, 56px)",
            paddingTop: "clamp(16px, 2.5vw, 24px)",
            borderTop: "1px solid rgba(226,232,240,0.6)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p suppressHydrationWarning style={{ color: "#94A3B8", fontSize: "clamp(0.68rem, 1.3vw, 0.78rem)", fontWeight: 500 }}>
            © {new Date().getFullYear()} First Option Agency. All rights reserved.
          </p>
          <p style={{ color: "#94A3B8", fontSize: "clamp(0.64rem, 1.2vw, 0.74rem)", fontWeight: 600, letterSpacing: "0.01em" }}>
            The ROI Focused Marketing Partner ✦
          </p>
        </div>
      </div>

      <style jsx>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 7vw, 80px);
          align-items: start;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 1000px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }
        @media (max-width: 640px) {
          .form-row { grid-template-columns: 1fr; }
          .hide-sm { display: none; }
        }
      `}</style>
    </footer>
  );
}

function FormInput({
  label, type, id, placeholder, focused, onFocus, onBlur,
}: any) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label
        htmlFor={id}
        style={{
          fontSize: "clamp(0.68rem, 1.2vw, 0.76rem)",
          fontWeight: 700,
          color: focused ? "var(--color-primary)" : "var(--text-dim)",
          transition: "color 0.3s",
          paddingLeft: 2,
          letterSpacing: "0.01em",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{
          padding: "0 clamp(12px, 1.8vw, 16px)",
          height: "clamp(42px, 6vw, 52px)",
          borderRadius: "clamp(9px, 1.3vw, 13px)",
          background: "#F8FAFC",
          border: `1.5px solid ${focused ? "var(--color-primary)" : "rgba(226,232,240,0.9)"}`,
          color: "var(--text-main)",
          fontSize: "clamp(0.78rem, 1.4vw, 0.88rem)",
          outline: "none",
          transition: "all 0.3s ease",
          boxShadow: focused ? "0 0 0 3px rgba(124,58,237,0.07)" : "none",
          fontFamily: "var(--font-outfit), sans-serif",
          fontWeight: 500,
        }}
      />
    </div>
  );
}

function FooterLink({ text, href = "#" }: { text: string; href?: string }) {
  return (
    <motion.a
      href={href}
      whileHover={{ x: 4, color: "#2563EB" }}
      style={{
        fontSize: "clamp(0.72rem, 1.3vw, 0.82rem)",
        color: "#64748B",
        textDecoration: "none",
        fontWeight: 500,
        transition: "color 0.25s ease",
        letterSpacing: "0.01em",
        display: "inline-block",
      }}
    >
      {text}
    </motion.a>
  );
}

function SocialLink({ icon, color, label }: { icon: any; color: string; label: string }) {
  return (
    <motion.a
      href="#"
      aria-label={label}
      whileHover={{ y: -3, borderColor: color, color }}
      style={{
        width: 36,
        height: 36,
        borderRadius: "10px",
        border: "1px solid rgba(226,232,240,0.9)",
        background: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#64748B",
        transition: "all 0.3s ease",
        boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
      }}
    >
      {icon}
    </motion.a>
  );
}
