"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronUp,
  ChevronDown,
  ArrowRight,
  Check,
  CheckCircle2,
  Sparkles,
  Smartphone,
  Globe,
  Layers,
  Cpu,
  User,
  Phone,
  Mail,
  Building,
  Search
} from "lucide-react";

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  buttonText?: string;
}

const CATEGORIES = [
  "Healthcare & Medical",
  "E-commerce",
  "Real Estate",
  "Taxi & Ride-Hailing",
  "Food Delivery",
  "Grocery Delivery",
  "Salon & Beauty",
  "Education (EdTech)",
  "Travel & Tourism",
  "Fitness & Wellness",
  "Logistics & Delivery",
  "Booking & Appointment",
  "Restaurant & Hospitality",
  "Other / Custom Industry",
];

const TIMELINES = [
  { id: "immediate", label: "Immediately (Within 7 Days)", key: "A" },
  { id: "1-3-weeks", label: "In 1–3 Weeks", key: "B" },
  { id: "2-3-months", label: "In 2–3 Months", key: "C" },
  { id: "exploring", label: "Just Exploring / Planning", key: "D" },
];

const ROLES = [
  { id: "founder", label: "Founder / Owner", key: "A" },
  { id: "partner", label: "Partner / Co-Founder", key: "B" },
  { id: "marketing", label: "Marketing Head", key: "C" },
  { id: "team", label: "Team Member / Project Manager", key: "D" },
];

const PROJECT_TYPES = [
  { id: "mobile_app", label: "Mobile App (iOS / Android)", key: "A", icon: <Smartphone size={16} /> },
  { id: "website", label: "Website / Web Application", key: "B", icon: <Globe size={16} /> },
  { id: "both", label: "Both App & Web Platform", key: "C", icon: <Layers size={16} /> },
  { id: "automation", label: "Custom CRM / ERP / AI Automation", key: "D", icon: <Cpu size={16} /> },
];

export default function BookDemoModal({ isOpen, onClose }: BookDemoModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5; // 1: Type, 2: Category, 3: Timeline, 4: Role, 5: Contact details

  // Form State
  const [projectType, setProjectType] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [timeline, setTimeline] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [categorySearch, setCategorySearch] = useState<string>("");

  // Contact Info
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setTimeout(() => {
        setSubmitted(false);
        setCurrentStep(1);
      }, 300);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen || submitted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      // Enter to advance if current step is answered
      if (e.key === "Enter" && !e.shiftKey) {
        if (canGoNext()) {
          goNext();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentStep, projectType, category, timeline, role, submitted]);

  const canGoNext = () => {
    if (currentStep === 1) return !!projectType;
    if (currentStep === 2) return !!category;
    if (currentStep === 3) return !!timeline;
    if (currentStep === 4) return !!role;
    if (currentStep === 5) return fullName.trim().length > 1 && phone.trim().length > 5;
    return false;
  };

  const goNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else if (currentStep === totalSteps) {
      handleSubmit();
    }
  };

  const goPrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!canGoNext()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const filteredCategories = CATEGORIES.filter((cat) =>
    cat.toLowerCase().includes(categorySearch.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            background: "rgba(3, 7, 18, 0.78)",
            backdropFilter: "blur(12px)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "580px",
              background: "#0D1527",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "24px",
              boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px rgba(37, 99, 235, 0.12)",
              color: "#FFFFFF",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              maxHeight: "90vh",
            }}
          >
            {/* ── Modal Header ── */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 24px 16px 24px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    color: "#E2E8F0",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Let&apos;s Understand Your Business Before We Grow It
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close survey"
                style={{
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "none",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#94A3B8",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#FFFFFF";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.14)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#94A3B8";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* ── Progress Bar ── */}
            {!submitted && (
              <div
                style={{
                  width: "100%",
                  height: "3px",
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  position: "relative",
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  transition={{ duration: 0.3 }}
                  style={{
                    height: "100%",
                    background: "linear-gradient(90deg, #F97316, #FB923C)",
                    boxShadow: "0 0 10px rgba(249, 115, 22, 0.6)",
                  }}
                />
              </div>
            )}

            {/* ── Survey Content Body ── */}
            <div
              style={{
                padding: "24px 24px 20px 24px",
                overflowY: "auto",
                flexGrow: 1,
              }}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  /* ── Success Screen ── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      textAlign: "center",
                      padding: "28px 12px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 68,
                        height: 68,
                        borderRadius: "50%",
                        background: "rgba(16, 185, 129, 0.15)",
                        border: "2px solid #10B981",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#10B981",
                        marginBottom: 18,
                      }}
                    >
                      <CheckCircle2 size={36} />
                    </div>

                    <h3
                      style={{
                        fontSize: "1.4rem",
                        fontWeight: 800,
                        color: "#FFFFFF",
                        marginBottom: 10,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Thank You, {fullName || "Founder"}!
                    </h3>

                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "#94A3B8",
                        lineHeight: 1.6,
                        maxWidth: 420,
                        marginBottom: 24,
                      }}
                    >
                      Your response has been received. Our leadership team will review your project details and connect with you on WhatsApp within 30 minutes.
                    </p>

                    <a
                      href={`https://wa.me/918329494445?text=${encodeURIComponent(
                        `Hi First Option Agency! I just submitted my project requirements (${projectType || "App/Web"} - ${category || "General"}). Looking forward to connecting!`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                        color: "#FFFFFF",
                        padding: "14px 28px",
                        borderRadius: "12px",
                        fontWeight: 700,
                        fontSize: "0.92rem",
                        textDecoration: "none",
                        boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)",
                      }}
                    >
                      Chat on WhatsApp Now
                      <ArrowRight size={18} />
                    </a>
                  </motion.div>
                ) : (
                  /* ── Survey Questions ── */
                  <div key={currentStep}>
                    {/* STEP 1: App, Website or Both */}
                    {currentStep === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div style={{ marginBottom: 20 }}>
                          <span
                            style={{
                              color: "#F97316",
                              fontWeight: 800,
                              fontSize: "1.05rem",
                              marginRight: 8,
                            }}
                          >
                            1 &rarr;
                          </span>
                          <span
                            style={{
                              fontSize: "1.05rem",
                              fontWeight: 700,
                              color: "#F1F5F9",
                              lineHeight: 1.4,
                            }}
                          >
                            What do you need to build or scale? *
                          </span>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                          {PROJECT_TYPES.map((item) => {
                            const isSelected = projectType === item.label;
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                  setProjectType(item.label);
                                }}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  padding: "14px 16px",
                                  backgroundColor: isSelected ? "rgba(249, 115, 22, 0.12)" : "rgba(255, 255, 255, 0.04)",
                                  border: `1.5px solid ${isSelected ? "#F97316" : "rgba(255, 255, 255, 0.08)"}`,
                                  borderRadius: "12px",
                                  color: "#FFFFFF",
                                  cursor: "pointer",
                                  textAlign: "left",
                                  transition: "all 0.2s ease",
                                }}
                              >
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                  <span style={{ color: isSelected ? "#F97316" : "#94A3B8" }}>
                                    {item.icon}
                                  </span>
                                  <span style={{ fontSize: "0.92rem", fontWeight: 600 }}>
                                    {item.label}
                                  </span>
                                </div>
                                <span
                                  style={{
                                    width: 26,
                                    height: 26,
                                    borderRadius: "50%",
                                    border: `1px solid ${isSelected ? "#F97316" : "rgba(255, 255, 255, 0.18)"}`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "0.72rem",
                                    fontWeight: 700,
                                    color: isSelected ? "#F97316" : "#94A3B8",
                                    backgroundColor: isSelected ? "rgba(249, 115, 22, 0.2)" : "transparent",
                                  }}
                                >
                                  {isSelected ? <Check size={14} /> : item.key}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: Category */}
                    {currentStep === 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div style={{ marginBottom: 16 }}>
                          <span
                            style={{
                              color: "#F97316",
                              fontWeight: 800,
                              fontSize: "1.05rem",
                              marginRight: 8,
                            }}
                          >
                            2 &rarr;
                          </span>
                          <span
                            style={{
                              fontSize: "1.05rem",
                              fontWeight: 700,
                              color: "#F1F5F9",
                              lineHeight: 1.4,
                            }}
                          >
                            What category does your project / mobile app belong to? *
                          </span>
                        </div>

                        {/* Search Input */}
                        <div
                          style={{
                            position: "relative",
                            marginBottom: 12,
                          }}
                        >
                          <Search
                            size={16}
                            style={{
                              position: "absolute",
                              left: 12,
                              top: "50%",
                              transform: "translateY(-50%)",
                              color: "#64748B",
                            }}
                          />
                          <input
                            type="text"
                            placeholder="Type to filter category..."
                            value={categorySearch}
                            onChange={(e) => setCategorySearch(e.target.value)}
                            style={{
                              width: "100%",
                              padding: "10px 14px 10px 38px",
                              borderRadius: "10px",
                              backgroundColor: "rgba(255, 255, 255, 0.05)",
                              border: "1px solid rgba(255, 255, 255, 0.1)",
                              color: "#FFFFFF",
                              fontSize: "0.85rem",
                              outline: "none",
                            }}
                          />
                        </div>

                        {/* Category List */}
                        <div
                          style={{
                            maxHeight: "260px",
                            overflowY: "auto",
                            display: "grid",
                            gridTemplateColumns: "1fr",
                            gap: 6,
                            paddingRight: 4,
                          }}
                        >
                          {filteredCategories.map((cat, idx) => {
                            const isSelected = category === cat;
                            return (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setCategory(cat)}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  padding: "10px 14px",
                                  backgroundColor: isSelected ? "rgba(249, 115, 22, 0.14)" : "rgba(255, 255, 255, 0.03)",
                                  border: `1px solid ${isSelected ? "#F97316" : "rgba(255, 255, 255, 0.06)"}`,
                                  borderRadius: "10px",
                                  color: isSelected ? "#FFFFFF" : "#CBD5E1",
                                  cursor: "pointer",
                                  fontSize: "0.86rem",
                                  fontWeight: isSelected ? 700 : 500,
                                  textAlign: "left",
                                  transition: "all 0.15s ease",
                                }}
                              >
                                <span>{cat}</span>
                                {isSelected && (
                                  <span style={{ color: "#F97316" }}>
                                    <Check size={16} />
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: Timeline */}
                    {currentStep === 3 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div style={{ marginBottom: 20 }}>
                          <span
                            style={{
                              color: "#F97316",
                              fontWeight: 800,
                              fontSize: "1.05rem",
                              marginRight: 8,
                            }}
                          >
                            3 &rarr;
                          </span>
                          <span
                            style={{
                              fontSize: "1.05rem",
                              fontWeight: 700,
                              color: "#F1F5F9",
                              lineHeight: 1.4,
                            }}
                          >
                            When are you planning to launch or start? *
                          </span>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                          {TIMELINES.map((item) => {
                            const isSelected = timeline === item.label;
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => setTimeline(item.label)}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  padding: "14px 16px",
                                  backgroundColor: isSelected ? "rgba(249, 115, 22, 0.12)" : "rgba(255, 255, 255, 0.04)",
                                  border: `1.5px solid ${isSelected ? "#F97316" : "rgba(255, 255, 255, 0.08)"}`,
                                  borderRadius: "12px",
                                  color: "#FFFFFF",
                                  cursor: "pointer",
                                  textAlign: "left",
                                  transition: "all 0.2s ease",
                                }}
                              >
                                <span style={{ fontSize: "0.92rem", fontWeight: 600 }}>
                                  {item.label}
                                </span>
                                <span
                                  style={{
                                    width: 26,
                                    height: 26,
                                    borderRadius: "50%",
                                    border: `1px solid ${isSelected ? "#F97316" : "rgba(255, 255, 255, 0.18)"}`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "0.72rem",
                                    fontWeight: 700,
                                    color: isSelected ? "#F97316" : "#94A3B8",
                                    backgroundColor: isSelected ? "rgba(249, 115, 22, 0.2)" : "transparent",
                                  }}
                                >
                                  {isSelected ? <Check size={14} /> : item.key}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 4: Role (Matching User Screenshot) */}
                    {currentStep === 4 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div style={{ marginBottom: 20 }}>
                          <span
                            style={{
                              color: "#F97316",
                              fontWeight: 800,
                              fontSize: "1.05rem",
                              marginRight: 8,
                            }}
                          >
                            4 &rarr;
                          </span>
                          <span
                            style={{
                              fontSize: "1.05rem",
                              fontWeight: 700,
                              color: "#F1F5F9",
                              lineHeight: 1.4,
                            }}
                          >
                            What is your role in the business? *
                          </span>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                          {ROLES.map((item) => {
                            const isSelected = role === item.label;
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => setRole(item.label)}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  padding: "14px 16px",
                                  backgroundColor: isSelected ? "rgba(249, 115, 22, 0.12)" : "rgba(255, 255, 255, 0.04)",
                                  border: `1.5px solid ${isSelected ? "#F97316" : "rgba(255, 255, 255, 0.08)"}`,
                                  borderRadius: "12px",
                                  color: "#FFFFFF",
                                  cursor: "pointer",
                                  textAlign: "left",
                                  transition: "all 0.2s ease",
                                }}
                              >
                                <span style={{ fontSize: "0.92rem", fontWeight: 600 }}>
                                  {item.label}
                                </span>
                                <span
                                  style={{
                                    width: 26,
                                    height: 26,
                                    borderRadius: "50%",
                                    border: `1px solid ${isSelected ? "#F97316" : "rgba(255, 255, 255, 0.18)"}`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "0.72rem",
                                    fontWeight: 700,
                                    color: isSelected ? "#F97316" : "#94A3B8",
                                    backgroundColor: isSelected ? "rgba(249, 115, 22, 0.2)" : "transparent",
                                  }}
                                >
                                  {isSelected ? <Check size={14} /> : item.key}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 5: Contact Details */}
                    {currentStep === 5 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div style={{ marginBottom: 16 }}>
                          <span
                            style={{
                              color: "#F97316",
                              fontWeight: 800,
                              fontSize: "1.05rem",
                              marginRight: 8,
                            }}
                          >
                            5 &rarr;
                          </span>
                          <span
                            style={{
                              fontSize: "1.05rem",
                              fontWeight: 700,
                              color: "#F1F5F9",
                              lineHeight: 1.4,
                            }}
                          >
                            Where should we send your growth blueprint? *
                          </span>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                          <div>
                            <label style={{ fontSize: "0.76rem", color: "#94A3B8", fontWeight: 600, display: "block", marginBottom: 6 }}>
                              Your Full Name *
                            </label>
                            <div style={{ position: "relative" }}>
                              <User size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#64748B" }} />
                              <input
                                type="text"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="e.g. Rahul Sharma"
                                style={{
                                  width: "100%",
                                  padding: "11px 14px 11px 38px",
                                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                                  border: "1px solid rgba(255, 255, 255, 0.12)",
                                  borderRadius: "10px",
                                  color: "#FFFFFF",
                                  fontSize: "0.9rem",
                                  outline: "none",
                                }}
                              />
                            </div>
                          </div>

                          <div>
                            <label style={{ fontSize: "0.76rem", color: "#94A3B8", fontWeight: 600, display: "block", marginBottom: 6 }}>
                              WhatsApp / Phone Number *
                            </label>
                            <div style={{ position: "relative" }}>
                              <Phone size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#64748B" }} />
                              <input
                                type="tel"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+91 98765 43210"
                                style={{
                                  width: "100%",
                                  padding: "11px 14px 11px 38px",
                                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                                  border: "1px solid rgba(255, 255, 255, 0.12)",
                                  borderRadius: "10px",
                                  color: "#FFFFFF",
                                  fontSize: "0.9rem",
                                  outline: "none",
                                }}
                              />
                            </div>
                          </div>

                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                            <div>
                              <label style={{ fontSize: "0.76rem", color: "#94A3B8", fontWeight: 600, display: "block", marginBottom: 6 }}>
                                Email Address
                              </label>
                              <div style={{ position: "relative" }}>
                                <Mail size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#64748B" }} />
                                <input
                                  type="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  placeholder="you@company.com"
                                  style={{
                                    width: "100%",
                                    padding: "11px 14px 11px 38px",
                                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                                    border: "1px solid rgba(255, 255, 255, 0.12)",
                                    borderRadius: "10px",
                                    color: "#FFFFFF",
                                    fontSize: "0.85rem",
                                    outline: "none",
                                  }}
                                />
                              </div>
                            </div>

                            <div>
                              <label style={{ fontSize: "0.76rem", color: "#94A3B8", fontWeight: 600, display: "block", marginBottom: 6 }}>
                                Company / Brand Name
                              </label>
                              <div style={{ position: "relative" }}>
                                <Building size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#64748B" }} />
                                <input
                                  type="text"
                                  value={company}
                                  onChange={(e) => setCompany(e.target.value)}
                                  placeholder="Your Brand"
                                  style={{
                                    width: "100%",
                                    padding: "11px 14px 11px 38px",
                                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                                    border: "1px solid rgba(255, 255, 255, 0.12)",
                                    borderRadius: "10px",
                                    color: "#FFFFFF",
                                    fontSize: "0.85rem",
                                    outline: "none",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </form>
                      </motion.div>
                    )}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Modal Footer Controls (Matching Screenshot with OK > & Nav Arrows) ── */}
            {!submitted && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 24px 18px 24px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                  backgroundColor: "rgba(10, 16, 31, 0.6)",
                }}
              >
                {/* OK / Continue Button */}
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canGoNext() || isSubmitting}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "10px 22px",
                    backgroundColor: canGoNext() ? "#F97316" : "rgba(249, 115, 22, 0.35)",
                    border: "none",
                    borderRadius: "10px",
                    color: "#FFFFFF",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    cursor: canGoNext() ? "pointer" : "not-allowed",
                    transition: "all 0.2s ease",
                    boxShadow: canGoNext() ? "0 4px 14px rgba(249, 115, 22, 0.35)" : "none",
                  }}
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : currentStep === totalSteps ? (
                    <>
                      Submit Strategy Request
                      <Sparkles size={16} />
                    </>
                  ) : (
                    <>
                      OK &gt;
                    </>
                  )}
                </button>

                {/* Step indicator and Up/Down Arrows */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: "0.75rem", color: "#64748B", marginRight: 4 }}>
                    {currentStep} of {totalSteps}
                  </span>
                  <button
                    type="button"
                    onClick={goPrev}
                    disabled={currentStep === 1}
                    aria-label="Previous step"
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "8px",
                      backgroundColor: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: currentStep === 1 ? "#475569" : "#F97316",
                      cursor: currentStep === 1 ? "not-allowed" : "pointer",
                    }}
                  >
                    <ChevronUp size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={!canGoNext() || currentStep === totalSteps}
                    aria-label="Next step"
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "8px",
                      backgroundColor: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: !canGoNext() || currentStep === totalSteps ? "#475569" : "#F97316",
                      cursor: !canGoNext() || currentStep === totalSteps ? "not-allowed" : "pointer",
                    }}
                  >
                    <ChevronDown size={16} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
