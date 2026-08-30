"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ChevronDown,
  Loader2,
  ArrowLeft,
  Copy,
  Check,
  Sparkles,
  Heart,
  ShieldCheck,
  TrendingUp,
  Video,
  Target,
} from "lucide-react";
import {
  TARGET_SKILLS,
  QUALIFICATION_OPTIONS,
  PASSING_YEARS,
  COUNTRY_CODES,
} from "./skills-data";
import { saveApplicationToRealtimeDb } from "@/app/lib/firebase";
import { triggerInternshipWhatsAppNotifications } from "@/app/lib/whatsapp";

interface FormData {
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  city: string;
  gender: string;
  isFemaleConfirmed: boolean;
  qualification: string;
  passingYear: string;
  skills: string[];
  aboutYourself: string;
  resumeUrl: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function InternshipFormClient() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    countryCode: "+91",
    phone: "",
    city: "",
    gender: "Female",
    isFemaleConfirmed: true,
    qualification: "",
    passingYear: "",
    skills: [],
    aboutYourself: "",
    resumeUrl: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [copiedId, setCopiedId] = useState(false);

  // Toggle skill selection
  const toggleSkill = (skillTitle: string) => {
    setFormData((prev) => {
      const exists = prev.skills.includes(skillTitle);
      const updated = exists
        ? prev.skills.filter((s) => s !== skillTitle)
        : [...prev.skills, skillTitle];
      return { ...prev, skills: updated };
    });

    if (errors.skills) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated.skills;
        return updated;
      });
    }
  };

  // Handle Input Changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
      if (errors[name]) {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated[name];
          return updated;
        });
      }
      return;
    }

    if (name === "phone") {
      const cleaned = value.replace(/\D/g, "");
      const selectedCountry = COUNTRY_CODES.find(
        (c) => c.code === formData.countryCode
      );
      const maxLen = selectedCountry ? selectedCountry.maxDigits : 10;
      const truncated = cleaned.slice(0, maxLen);

      setFormData((prev) => ({ ...prev, phone: truncated }));
      if (errors.phone) {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated.phone;
          return updated;
        });
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  // Country code change handler
  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCode = e.target.value;
    setFormData((prev) => ({
      ...prev,
      countryCode: newCode,
      phone: "",
    }));
    if (errors.phone) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated.phone;
        return updated;
      });
    }
  };

  // Form Validation (100% Client-Side)
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else {
      const selectedCountry = COUNTRY_CODES.find(
        (c) => c.code === formData.countryCode
      );
      const expectedDigits = selectedCountry ? selectedCountry.minDigits : 10;
      if (formData.phone.length !== expectedDigits) {
        newErrors.phone =
          formData.countryCode === "+91"
            ? "Must be exactly 10 digits"
            : `Must be ${expectedDigits} digits`;
      }
    }

    if (!formData.city.trim()) {
      newErrors.city = "City / Location is required";
    }

    if (formData.gender !== "Female") {
      newErrors.gender = "This internship drive is exclusively for female candidates";
    }

    if (!formData.isFemaleConfirmed) {
      newErrors.isFemaleConfirmed = "Please confirm that you are a female candidate applying for this drive";
    }

    if (!formData.qualification) {
      newErrors.qualification = "Please select your qualification";
    }

    if (!formData.passingYear) {
      newErrors.passingYear = "Please select passing year";
    }

    if (formData.skills.length === 0) {
      newErrors.skills = "Please tick at least 1 role/skill below";
    }

    if (!formData.aboutYourself.trim()) {
      newErrors.aboutYourself = "Brief introduction is required";
    } else if (formData.aboutYourself.trim().length < 15) {
      newErrors.aboutYourself = "Please write at least 15 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstErrorElement = document.querySelector(".has-field-error");
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const generatedId = `FOA-WOMEN-${new Date().getFullYear()}-${randomSuffix}`;
    const submissionTimestamp = new Date().toISOString();

    const applicationRecord = {
      applicationId: generatedId,
      submittedAt: submissionTimestamp,
      ...formData,
    };

    // 1. Save to Firebase Realtime Database
    try {
      await saveApplicationToRealtimeDb(applicationRecord);
    } catch (rtdbErr) {
      console.warn("Realtime DB save warning:", rtdbErr);
    }

    // 2. Trigger WhatsApp notifications to Candidate & all 3 Admin numbers
    triggerInternshipWhatsAppNotifications({
      candidatePhone: `${formData.countryCode}${formData.phone}`,
      candidateName: formData.fullName,
      applicationId: generatedId,
      candidateEmail: formData.email,
      city: formData.city,
    });

    // 3. Save to localStorage backup
    try {
      const existingApplications = JSON.parse(
        localStorage.getItem("foa_internship_applications") || "[]"
      );
      existingApplications.unshift(applicationRecord);
      localStorage.setItem(
        "foa_internship_applications",
        JSON.stringify(existingApplications)
      );
    } catch (storageError) {
      console.warn("Could not save to localStorage:", storageError);
    }

    setApplicationId(generatedId);
    setIsSubmitting(false);
    setSubmitSuccess(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Copy Application ID to clipboard
  const handleCopyId = () => {
    if (applicationId) {
      navigator.clipboard.writeText(applicationId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  // Reset form to submit another
  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      countryCode: "+91",
      phone: "",
      city: "",
      gender: "Female",
      isFemaleConfirmed: true,
      qualification: "",
      passingYear: "",
      skills: [],
      aboutYourself: "",
      resumeUrl: "",
    });
    setErrors({});
    setSubmitSuccess(false);
    setApplicationId("");
    setCopiedId(false);
  };

  // Skill Icon helper
  const getSkillIcon = (id: string) => {
    switch (id) {
      case "sales_consultant":
        return <TrendingUp size={18} color="#7C3AED" />;
      case "meta_ads_manager":
        return <Target size={18} color="#7C3AED" />;
      case "video_editing":
        return <Video size={18} color="#7C3AED" />;
      default:
        return <Check size={18} color="#7C3AED" />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F5F6F8", color: "#111827", display: "flex", flexDirection: "column", fontFamily: "var(--font-outfit), 'Inter', -apple-system, sans-serif" }}>
      {/* ─── Header Bar ─── */}
      <header style={{ position: "sticky", top: 0, zIndex: 40, backgroundColor: "rgba(255, 255, 255, 0.96)", backdropFilter: "blur(8px)", borderBottom: "1px solid #E5E7EB" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "inherit" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#7C3AED", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "13px" }}>
              FO
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#111827", lineHeight: 1.2 }}>First Option Agency</div>
              <div style={{ fontSize: "11px", color: "#7C3AED", fontWeight: 600 }}>Women’s Internship Portal</div>
            </div>
          </Link>

          <Link
            href="/"
            style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 600, color: "#7C3AED", textDecoration: "none", padding: "6px 12px", borderRadius: "6px", backgroundColor: "#F5F3FF" }}
          >
            <ArrowLeft size={14} />
            <span>Home</span>
          </Link>
        </div>
      </header>

      {/* ─── Main Form Card ─── */}
      <main style={{ flex: 1, padding: "16px 12px 36px 12px", maxWidth: "760px", width: "100%", margin: "0 auto" }}>
        {submitSuccess ? (
          /* ─── SUBMISSION CONFIRMATION RECEIPT ─── */
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", border: "1px solid #E5E7EB", padding: "32px 18px", boxShadow: "0 4px 16px rgba(0,0,0,0.04)", textAlign: "center", maxWidth: "520px", margin: "20px auto" }}>
            <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "#FDF2F8", border: "1px solid #FBCFE8", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px auto", color: "#DB2777" }}>
              <Heart size={30} strokeWidth={2.2} />
            </div>

            <div style={{ display: "inline-block", padding: "3px 10px", backgroundColor: "#FDF2F8", color: "#BE185D", borderRadius: "999px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "10px" }}>
              Women’s Drive • Application Received
            </div>

            <div style={{ fontSize: "20px", fontWeight: 700, color: "#111827", marginBottom: "8px" }}>
              Thank You, {formData.fullName}!
            </div>
            <div style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.5, marginBottom: "20px" }}>
              Your application has been successfully received. Our recruitment team will review your profile.
            </div>

            {/* Receipt Summary Card */}
            <div style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "12px", padding: "16px", textAlign: "left", marginBottom: "20px", fontSize: "13px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #E5E7EB", paddingBottom: "10px", marginBottom: "10px" }}>
                <span style={{ color: "#6B7280", fontWeight: 500 }}>Reference ID</span>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontFamily: "monospace", fontWeight: 700, color: "#7C3AED", backgroundColor: "#F5F3FF", padding: "2px 6px", borderRadius: "4px" }}>
                    {applicationId}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyId}
                    style={{ background: "none", border: "none", color: "#6B7280", cursor: "pointer", padding: "2px" }}
                    title="Copy ID"
                  >
                    {copiedId ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "#6B7280" }}>Candidate</span>
                <span style={{ fontWeight: 600, color: "#111827" }}>{formData.fullName} (Female)</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "#6B7280" }}>Email</span>
                <span style={{ fontWeight: 600, color: "#111827" }}>{formData.email}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "#6B7280" }}>Phone</span>
                <span style={{ fontWeight: 600, color: "#111827" }}>{formData.countryCode} {formData.phone}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "#6B7280" }}>Qualification</span>
                <span style={{ fontWeight: 600, color: "#111827", maxWidth: "200px", textAlign: "right", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {formData.qualification.split("(")[0]}
                </span>
              </div>

              <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: "8px", marginTop: "8px" }}>
                <span style={{ color: "#6B7280", display: "block", marginBottom: "6px" }}>Selected Role Tracks:</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {formData.skills.map((skill) => (
                    <span key={skill} style={{ fontSize: "11px", fontWeight: 600, backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", color: "#7C3AED", padding: "2px 8px", borderRadius: "4px" }}>
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Link
                href="/"
                style={{ display: "block", width: "100%", padding: "11px", borderRadius: "8px", backgroundColor: "#7C3AED", color: "#FFFFFF", fontSize: "14px", fontWeight: 700, textDecoration: "none", textAlign: "center" }}
              >
                Back to Homepage
              </Link>
              <button
                type="button"
                onClick={handleReset}
                style={{ width: "100%", padding: "11px", borderRadius: "8px", backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", color: "#374151", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
              >
                Submit Another Application
              </button>
            </div>
          </div>
        ) : (
          /* ─── CLEAN APPLICATION FORM ─── */
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "14px", border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.03)", overflow: "hidden" }}>
            {/* Form Title Banner */}
            <div style={{ padding: "18px 16px", borderBottom: "1px solid #E5E7EB", backgroundColor: "#FDF2F8" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "3px 9px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, backgroundColor: "#FCE7F3", color: "#BE185D", border: "1px solid #FBCFE8", marginBottom: "6px" }}>
                <Sparkles size={12} />
                <span>EXCLUSIVELY FOR FEMALE CANDIDATES / GIRLS</span>
              </div>
              <div style={{ fontSize: "19px", fontWeight: 700, color: "#111827", lineHeight: 1.25, letterSpacing: "-0.02em" }}>
                Women’s Internship Application Form
              </div>
              <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "3px", lineHeight: 1.4 }}>
                Please fill in your details and tick your interested role tracks below. Fields marked with <span style={{ color: "#EF4444", fontWeight: 700 }}>*</span> are required.
              </div>
            </div>

            {/* Form Elements */}
            <form onSubmit={handleSubmit} noValidate style={{ padding: "18px 16px", display: "flex", flexDirection: "column", gap: "20px" }}>
              
              {/* ════════ SECTION 1: PERSONAL DETAILS ════════ */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingBottom: "6px", borderBottom: "1px solid #F3F4F6", marginBottom: "12px" }}>
                  <div style={{ width: "20px", height: "20px", borderRadius: "5px", backgroundColor: "#FDF2F8", color: "#BE185D", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700 }}>
                    1
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>
                    Personal Details
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "12px" }}>
                  {/* Full Name */}
                  <div className={errors.fullName ? "has-field-error" : ""}>
                    <label htmlFor="fullName" style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "4px" }}>
                      Full Name <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Priya Sharma"
                      style={{ width: "100%", height: "40px", padding: "0 12px", fontSize: "14px", backgroundColor: "#FFFFFF", borderRadius: "8px", border: `1px solid ${errors.fullName ? "#EF4444" : "#E5E7EB"}`, color: "#111827", outline: "none" }}
                    />
                    {errors.fullName && (
                      <div style={{ fontSize: "11px", color: "#EF4444", marginTop: "3px", fontWeight: 500 }}>
                        {errors.fullName}
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div className={errors.email ? "has-field-error" : ""}>
                    <label htmlFor="email" style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "4px" }}>
                      Email Address <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. priya.sharma@example.com"
                      style={{ width: "100%", height: "40px", padding: "0 12px", fontSize: "14px", backgroundColor: "#FFFFFF", borderRadius: "8px", border: `1px solid ${errors.email ? "#EF4444" : "#E5E7EB"}`, color: "#111827", outline: "none" }}
                    />
                    {errors.email && (
                      <div style={{ fontSize: "11px", color: "#EF4444", marginTop: "3px", fontWeight: 500 }}>
                        {errors.email}
                      </div>
                    )}
                  </div>

                  {/* Phone with Default +91 */}
                  <div className={errors.phone ? "has-field-error" : ""}>
                    <label htmlFor="phone" style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "4px" }}>
                      Phone Number <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <div style={{ position: "relative", width: "90px", flexShrink: 0 }}>
                        <select
                          id="countryCode"
                          name="countryCode"
                          aria-label="Country Code"
                          value={formData.countryCode}
                          onChange={handleCountryCodeChange}
                          style={{ width: "100%", height: "40px", padding: "0 20px 0 8px", fontSize: "13px", backgroundColor: "#F9FAFB", borderRadius: "8px", border: "1px solid #E5E7EB", color: "#111827", fontWeight: 600, outline: "none", appearance: "none", cursor: "pointer" }}
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.flag} {c.code}
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={14} style={{ position: "absolute", right: "6px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#6B7280" }} />
                      </div>

                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        maxLength={formData.countryCode === "+91" ? 10 : 15}
                        placeholder={formData.countryCode === "+91" ? "10-digit mobile number" : "Phone number"}
                        style={{ flex: 1, height: "40px", padding: "0 12px", fontSize: "14px", backgroundColor: "#FFFFFF", borderRadius: "8px", border: `1px solid ${errors.phone ? "#EF4444" : "#E5E7EB"}`, color: "#111827", outline: "none" }}
                      />
                    </div>
                    {errors.phone ? (
                      <div style={{ fontSize: "11px", color: "#EF4444", marginTop: "3px", fontWeight: 500 }}>
                        {errors.phone}
                      </div>
                    ) : (
                      formData.countryCode === "+91" && (
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#6B7280", marginTop: "3px" }}>
                          <span>Enter 10-digit number</span>
                          <span style={{ color: formData.phone.length === 10 ? "#10B981" : "#6B7280", fontWeight: 600 }}>
                            {formData.phone.length}/10
                          </span>
                        </div>
                      )
                    )}
                  </div>

                  {/* City */}
                  <div className={errors.city ? "has-field-error" : ""}>
                    <label htmlFor="city" style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "4px" }}>
                      Current City / Location <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Mumbai, Maharashtra"
                      style={{ width: "100%", height: "40px", padding: "0 12px", fontSize: "14px", backgroundColor: "#FFFFFF", borderRadius: "8px", border: `1px solid ${errors.city ? "#EF4444" : "#E5E7EB"}`, color: "#111827", outline: "none" }}
                    />
                    {errors.city && (
                      <div style={{ fontSize: "11px", color: "#EF4444", marginTop: "3px", fontWeight: 500 }}>
                        {errors.city}
                      </div>
                    )}
                  </div>
                </div>

                {/* Female Confirmation */}
                <div style={{ marginTop: "12px", padding: "10px 12px", backgroundColor: "#FDF2F8", borderRadius: "8px", border: "1px solid #FCE7F3", display: "flex", alignItems: "center", gap: "10px" }} className={errors.isFemaleConfirmed ? "has-field-error" : ""}>
                  <input
                    type="checkbox"
                    id="isFemaleConfirmed"
                    name="isFemaleConfirmed"
                    checked={formData.isFemaleConfirmed}
                    onChange={handleInputChange}
                    style={{ width: "16px", height: "16px", accentColor: "#BE185D", cursor: "pointer" }}
                  />
                  <label htmlFor="isFemaleConfirmed" style={{ fontSize: "12px", color: "#831843", fontWeight: 600, cursor: "pointer", lineHeight: 1.4 }}>
                    I confirm that I am a female candidate / girl applying for this exclusive women’s internship opportunity. <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                </div>
                {errors.isFemaleConfirmed && (
                  <div style={{ fontSize: "11px", color: "#EF4444", marginTop: "3px", fontWeight: 500 }}>
                    {errors.isFemaleConfirmed}
                  </div>
                )}
              </div>

              {/* ════════ SECTION 2: QUALIFICATION & EDUCATION ════════ */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingBottom: "6px", borderBottom: "1px solid #F3F4F6", marginBottom: "12px" }}>
                  <div style={{ width: "20px", height: "20px", borderRadius: "5px", backgroundColor: "#FDF2F8", color: "#BE185D", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700 }}>
                    2
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>
                    Qualification (Min. 12th Completed)
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "12px" }}>
                  {/* Highest Qualification Dropdown */}
                  <div className={errors.qualification ? "has-field-error" : ""}>
                    <label htmlFor="qualification" style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "4px" }}>
                      Highest Qualification <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <select
                        id="qualification"
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleInputChange}
                        style={{ width: "100%", height: "40px", padding: "0 28px 0 10px", fontSize: "13px", backgroundColor: "#FFFFFF", borderRadius: "8px", border: `1px solid ${errors.qualification ? "#EF4444" : "#E5E7EB"}`, color: formData.qualification ? "#111827" : "#9CA3AF", outline: "none", appearance: "none", cursor: "pointer" }}
                      >
                        <option value="" disabled>Select qualification (min. 12th completed)...</option>
                        {QUALIFICATION_OPTIONS.map((q) => (
                          <option key={q} value={q} style={{ color: "#111827" }}>
                            {q}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={14} style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#6B7280" }} />
                    </div>
                    {errors.qualification && (
                      <div style={{ fontSize: "11px", color: "#EF4444", marginTop: "3px", fontWeight: 500 }}>
                        {errors.qualification}
                      </div>
                    )}
                  </div>

                  {/* Passing Year */}
                  <div className={errors.passingYear ? "has-field-error" : ""}>
                    <label htmlFor="passingYear" style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "4px" }}>
                      Passing / Graduation Year <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <select
                        id="passingYear"
                        name="passingYear"
                        value={formData.passingYear}
                        onChange={handleInputChange}
                        style={{ width: "100%", height: "40px", padding: "0 28px 0 10px", fontSize: "13px", backgroundColor: "#FFFFFF", borderRadius: "8px", border: `1px solid ${errors.passingYear ? "#EF4444" : "#E5E7EB"}`, color: formData.passingYear ? "#111827" : "#9CA3AF", outline: "none", appearance: "none", cursor: "pointer" }}
                      >
                        <option value="" disabled>Select passing year...</option>
                        {PASSING_YEARS.map((y) => (
                          <option key={y} value={y} style={{ color: "#111827" }}>
                            {y}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={14} style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#6B7280" }} />
                    </div>
                    {errors.passingYear && (
                      <div style={{ fontSize: "11px", color: "#EF4444", marginTop: "3px", fontWeight: 500 }}>
                        {errors.passingYear}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ════════ SECTION 3: SKILLS / ROLE SELECTION (3 TICK OPTIONS) ════════ */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingBottom: "6px", borderBottom: "1px solid #F3F4F6", marginBottom: "12px" }}>
                  <div style={{ width: "20px", height: "20px", borderRadius: "5px", backgroundColor: "#FDF2F8", color: "#BE185D", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700 }}>
                    3
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>
                    Select Internship Track(s) <span style={{ color: "#EF4444" }}>*</span>
                  </div>
                </div>

                <div className={errors.skills ? "has-field-error" : ""}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>
                    Tick the role(s) you are interested in applying for:
                  </label>

                  {/* 3 Interactive Tick Cards */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "10px" }}>
                    {TARGET_SKILLS.map((skill) => {
                      const isChecked = formData.skills.includes(skill.title);
                      return (
                        <div
                          key={skill.id}
                          onClick={() => toggleSkill(skill.title)}
                          style={{
                            padding: "14px 12px",
                            borderRadius: "10px",
                            border: `1.5px solid ${isChecked ? "#7C3AED" : "#E5E7EB"}`,
                            backgroundColor: isChecked ? "#F5F3FF" : "#FFFFFF",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            display: "flex",
                            flexDirection: "column",
                            gap: "6px",
                            boxShadow: isChecked ? "0 2px 8px rgba(124, 58, 237, 0.08)" : "none",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              {getSkillIcon(skill.id)}
                              <span style={{ fontSize: "14px", fontWeight: 700, color: isChecked ? "#7C3AED" : "#111827" }}>
                                {skill.title}
                              </span>
                            </div>

                            {/* Checkbox Tick Visual */}
                            <div
                              style={{
                                width: "20px",
                                height: "20px",
                                borderRadius: "6px",
                                border: `1.5px solid ${isChecked ? "#7C3AED" : "#D1D5DB"}`,
                                backgroundColor: isChecked ? "#7C3AED" : "#FFFFFF",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#FFFFFF",
                                transition: "all 0.2s ease",
                              }}
                            >
                              {isChecked && <Check size={14} strokeWidth={3} />}
                            </div>
                          </div>

                          <div style={{ fontSize: "11px", color: "#6B7280", lineHeight: 1.35 }}>
                            {skill.desc}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {errors.skills && (
                    <div style={{ fontSize: "11px", color: "#EF4444", marginTop: "6px", fontWeight: 500, display: "flex", alignItems: "center", gap: "4px" }}>
                      <AlertCircle size={12} />
                      <span>{errors.skills}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* ════════ SECTION 4: ABOUT YOURSELF ════════ */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingBottom: "6px", borderBottom: "1px solid #F3F4F6", marginBottom: "12px" }}>
                  <div style={{ width: "20px", height: "20px", borderRadius: "5px", backgroundColor: "#FDF2F8", color: "#BE185D", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700 }}>
                    4
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>
                    About Yourself & Introduction <span style={{ color: "#EF4444" }}>*</span>
                  </div>
                </div>

                {/* About Yourself Textarea */}
                <div className={errors.aboutYourself ? "has-field-error" : ""} style={{ marginBottom: "12px" }}>
                  <label htmlFor="aboutYourself" style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "4px" }}>
                    Tell us about yourself (Introduction, strengths & background)
                  </label>
                  <textarea
                    id="aboutYourself"
                    name="aboutYourself"
                    rows={4}
                    value={formData.aboutYourself}
                    onChange={handleInputChange}
                    placeholder="Briefly introduce yourself: your background, strengths, practical projects or reels you've created, and why you are excited to join us..."
                    style={{ width: "100%", padding: "10px 12px", fontSize: "14px", backgroundColor: "#FFFFFF", borderRadius: "8px", border: `1px solid ${errors.aboutYourself ? "#EF4444" : "#E5E7EB"}`, color: "#111827", outline: "none", resize: "vertical", lineHeight: 1.5 }}
                  />
                  {errors.aboutYourself ? (
                    <div style={{ fontSize: "11px", color: "#EF4444", marginTop: "3px", fontWeight: 500 }}>
                      {errors.aboutYourself}
                    </div>
                  ) : (
                    <div style={{ fontSize: "11px", color: "#6B7280", marginTop: "3px" }}>
                      Minimum 15 characters ({formData.aboutYourself.length} characters)
                    </div>
                  )}
                </div>

                {/* Resume / Portfolio Link */}
                <div>
                  <label htmlFor="resumeUrl" style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "4px" }}>
                    Resume / Drive / Video Portfolio Link <span style={{ fontSize: "11px", fontWeight: 400, color: "#6B7280" }}>(Optional)</span>
                  </label>
                  <input
                    type="url"
                    id="resumeUrl"
                    name="resumeUrl"
                    value={formData.resumeUrl}
                    onChange={handleInputChange}
                    placeholder="https://drive.google.com/file/... or portfolio link"
                    style={{ width: "100%", height: "40px", padding: "0 12px", fontSize: "14px", backgroundColor: "#FFFFFF", borderRadius: "8px", border: "1px solid #E5E7EB", color: "#111827", outline: "none" }}
                  />
                </div>
              </div>

              {/* ════════ SUBMIT ACTION ════════ */}
              <div style={{ paddingTop: "14px", borderTop: "1px solid #E5E7EB", display: "flex", flexDirection: "column", gap: "10px" }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ width: "100%", height: "44px", borderRadius: "8px", backgroundColor: isSubmitting ? "#A78BFA" : "#7C3AED", color: "#FFFFFF", fontSize: "14px", fontWeight: 700, border: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", cursor: isSubmitting ? "not-allowed" : "pointer", boxShadow: "0 1px 3px rgba(124, 58, 237, 0.2)" }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontSize: "11px", color: "#6B7280", textAlign: "center" }}>
                  <ShieldCheck size={13} color="#BE185D" />
                  <span>Exclusive Women’s Hiring Cohort • Safe & Equal Opportunity Recruitment.</span>
                </div>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* ─── Footer ─── */}
      <footer style={{ padding: "14px 12px", borderTop: "1px solid #E5E7EB", backgroundColor: "#FFFFFF", textAlign: "center", fontSize: "12px", color: "#6B7280" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "6px" }}>
          <div>© {new Date().getFullYear()} First Option Agency. All rights reserved.</div>
          <div style={{ color: "#BE185D", fontWeight: 600 }}>Women’s Empowerment & Internship Cell</div>
        </div>
      </footer>
    </div>
  );
}
