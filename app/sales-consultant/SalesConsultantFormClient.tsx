"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Loader2,
  ArrowLeft,
  Copy,
  Check,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Briefcase,
  HelpCircle,
  FileCheck,
} from "lucide-react";
import { COUNTRY_CODES } from "../internship/skills-data";
import {
  saveSalesConsultantApplicationToRealtimeDb,
  SalesConsultantApplicationPayload,
} from "@/app/lib/firebase";
import {
  triggerSalesConsultantWhatsAppNotifications,
  PROGRAM_TITLES,
} from "@/app/lib/whatsapp";

interface FormData {
  fullName: string;
  countryCode: string;
  phone: string;
  city: string;
  email: string;
  age: string;
  // Sales Experience
  hasSalesExperience: string; // "Yes" | "No" | ""
  salesExperienceDetails: string;
  hasAgencyOrCommissionSales: string; // "Yes" | "No" | ""
  productsSoldBefore: string;
  // Quick Sales Test
  expensiveObjectionHandling: string;
  whyGoodAtSales: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function SalesConsultantFormClient() {
  const searchParams = useSearchParams();
  const statusParam = (searchParams.get("status") || "").toLowerCase().trim();
  const typeParam = (searchParams.get("type") || "").toLowerCase().trim();

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    countryCode: "+91",
    phone: "",
    city: "",
    email: "",
    age: "",
    hasSalesExperience: "",
    salesExperienceDetails: "",
    hasAgencyOrCommissionSales: "",
    productsSoldBefore: "",
    expensiveObjectionHandling: "",
    whyGoodAtSales: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [copiedId, setCopiedId] = useState(false);

  // Show submission confirmation if URL has status=submit (e.g. Meta Event Setup Tool / Direct URL tracking)
  useEffect(() => {
    if (statusParam === "submit") {
      setSubmitSuccess(true);
      if (!applicationId) {
        setApplicationId("FOA-SALES-SUBMITTED");
      }
    }
  }, [statusParam]);

  // Handle standard input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

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

    if (name === "age") {
      const cleaned = value.replace(/\D/g, "").slice(0, 2);
      setFormData((prev) => ({ ...prev, age: cleaned }));
      if (errors.age) {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated.age;
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

  // Country code handler
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

  // Form Validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // 1. Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }

    // 2. Phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Mobile / WhatsApp number is required";
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

    // 3. City
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    // 4. Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    // 5. Age
    if (!formData.age.trim()) {
      newErrors.age = "Age is required";
    } else {
      const ageNum = parseInt(formData.age, 10);
      if (isNaN(ageNum) || ageNum < 18 || ageNum > 70) {
        newErrors.age = "Please enter a valid age (18 to 70)";
      }
    }

    // 6. Has Sales Experience
    if (!formData.hasSalesExperience) {
      newErrors.hasSalesExperience = "Please select whether you have sales experience";
    }

    // 7. If yes, details
    if (formData.hasSalesExperience === "Yes" && !formData.salesExperienceDetails.trim()) {
      newErrors.salesExperienceDetails = "Please briefly mention your previous sales experience";
    }

    // 8. Agency / Commission experience
    if (!formData.hasAgencyOrCommissionSales) {
      newErrors.hasAgencyOrCommissionSales = "Please select Yes or No";
    }

    // 9. Products / Services sold
    if (!formData.productsSoldBefore.trim()) {
      newErrors.productsSoldBefore = "Please mention products/services you have sold";
    }

    // 10. Objection Handling
    if (!formData.expensiveObjectionHandling.trim()) {
      newErrors.expensiveObjectionHandling = "Please answer this question";
    } else if (formData.expensiveObjectionHandling.trim().length < 15) {
      newErrors.expensiveObjectionHandling = "Please write at least 15 characters";
    }

    // 11. Why good at sales
    if (!formData.whyGoodAtSales.trim()) {
      newErrors.whyGoodAtSales = "Please explain why you would be good at sales";
    } else if (formData.whyGoodAtSales.trim().length < 15) {
      newErrors.whyGoodAtSales = "Please write at least 15 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler (100% Free Application)
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
    const generatedId = `FOA-SALES-${new Date().getFullYear()}-${randomSuffix}`;
    const submissionTimestamp = new Date().toISOString();

    const applicationRecord: SalesConsultantApplicationPayload = {
      applicationId: generatedId,
      submittedAt: submissionTimestamp,
      fullName: formData.fullName,
      countryCode: formData.countryCode,
      phone: formData.phone,
      city: formData.city,
      email: formData.email,
      age: formData.age,
      programTitle: PROGRAM_TITLES.SALES,
      type: "sales-consultant",
      status: "submit",
      hasSalesExperience: formData.hasSalesExperience === "Yes",
      salesExperienceDetails: formData.salesExperienceDetails,
      hasAgencyOrCommissionSales: formData.hasAgencyOrCommissionSales === "Yes",
      productsSoldBefore: formData.productsSoldBefore,
      expensiveObjectionHandling: formData.expensiveObjectionHandling,
      whyGoodAtSales: formData.whyGoodAtSales,
    };

    // 1. Save directly to Firebase Realtime Database
    try {
      await saveSalesConsultantApplicationToRealtimeDb(applicationRecord);
    } catch (rtdbErr) {
      console.warn("Realtime DB save warning:", rtdbErr);
    }

    // 2. Trigger WhatsApp notifications to Candidate & Admins
    triggerSalesConsultantWhatsAppNotifications({
      candidatePhone: `${formData.countryCode}${formData.phone}`,
      candidateName: formData.fullName,
      applicationId: generatedId,
      candidateEmail: formData.email,
      city: formData.city,
      programTitle: PROGRAM_TITLES.SALES,
    });

    // 3. Save to localStorage backup
    try {
      const existing = JSON.parse(
        localStorage.getItem("foa_sales_applications") || "[]"
      );
      existing.unshift(applicationRecord);
      localStorage.setItem(
        "foa_sales_applications",
        JSON.stringify(existing)
      );
    } catch (storageErr) {
      console.warn("localStorage save warning:", storageErr);
    }

    setApplicationId(generatedId);
    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Update URL with status=submit and type=sales-consultant for Meta Pixel & Event Setup Tool tracking
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("type", "sales-consultant");
      url.searchParams.set("status", "submit");
      window.history.pushState({}, "", url.toString());

      // Fire Meta Pixel standard Lead event if pixel is initialized
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead", {
          content_name: "sales-consultant",
          status: "submit",
        });
      }
    } catch (err) {
      console.warn("URL update error:", err);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Copy Reference ID
  const handleCopyId = () => {
    if (applicationId) {
      navigator.clipboard.writeText(applicationId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      fullName: "",
      countryCode: "+91",
      phone: "",
      city: "",
      email: "",
      age: "",
      hasSalesExperience: "",
      salesExperienceDetails: "",
      hasAgencyOrCommissionSales: "",
      productsSoldBefore: "",
      expensiveObjectionHandling: "",
      whyGoodAtSales: "",
    });
    setErrors({});
    setSubmitSuccess(false);
    setApplicationId("");
    setCopiedId(false);

    // Clean up status and type query params from URL
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete("status");
      url.searchParams.delete("type");
      window.history.pushState({}, "", url.toString());
    } catch (e) {}

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F5F6F8",
        color: "#111827",
        display: "flex",
        flexDirection: "column",
        fontFamily: "var(--font-outfit), 'Inter', -apple-system, sans-serif",
      }}
    >
      {/* ─── Header ─── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          backgroundColor: "rgba(255, 255, 255, 0.96)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        <div
          style={{
            maxWidth: "780px",
            margin: "0 auto",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "8px",
                backgroundColor: "#7C3AED",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "14px",
              }}
            >
              FO
            </div>
            <div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "#111827", lineHeight: 1.2 }}>
                First Option Agency
              </div>
              <div style={{ fontSize: "11px", color: "#7C3AED", fontWeight: 600 }}>
                Careers • Sales Division
              </div>
            </div>
          </Link>

          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              fontWeight: 600,
              color: "#7C3AED",
              textDecoration: "none",
              padding: "6px 12px",
              borderRadius: "6px",
              backgroundColor: "#F5F3FF",
              border: "1px solid #EDE9FE",
            }}
          >
            <ArrowLeft size={14} />
            <span>Home</span>
          </Link>
        </div>
      </header>

      {/* ─── Main Content ─── */}
      <main
        style={{
          flex: 1,
          padding: "20px 14px 40px 14px",
          maxWidth: "780px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        {submitSuccess ? (
          /* ─── SUBMISSION RECEIPT (OPTIMIZED FOR MOBILE VIEWPORT) ─── */
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              border: "1px solid #E5E7EB",
              padding: "clamp(18px, 4vw, 28px) clamp(14px, 3.5vw, 24px)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              textAlign: "center",
              maxWidth: "520px",
              width: "100%",
              margin: "0 auto",
              maxHeight: "calc(100dvh - 40px)",
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {/* Header: Compact Icon & Title */}
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "#ECFDF5",
                border: "1.5px solid #A7F3D0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 10px auto",
                color: "#059669",
              }}
            >
              <CheckCircle2 size={26} strokeWidth={2.5} />
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "3px 10px",
                backgroundColor: "#ECFDF5",
                color: "#047857",
                borderRadius: "999px",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "8px",
                border: "1px solid #A7F3D0",
              }}
            >
              <FileCheck size={12} />
              <span>Application Received</span>
            </div>

            <div style={{ fontSize: "18px", fontWeight: 800, color: "#111827", marginBottom: "4px" }}>
              Thank You, {formData.fullName}!
            </div>
            <div style={{ fontSize: "12.5px", color: "#6B7280", lineHeight: 1.4, marginBottom: "14px", maxWidth: "380px", margin: "0 auto 14px auto" }}>
              Your Sales Consultant application is recorded. Our hiring team will review your profile shortly.
            </div>

            {/* Reference ID Pill */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#F5F3FF",
                border: "1px solid #DDD6FE",
                borderRadius: "10px",
                padding: "8px 12px",
                marginBottom: "14px",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <span style={{ color: "#6B7280", fontSize: "11px", display: "block", fontWeight: 600 }}>
                  REFERENCE ID
                </span>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontWeight: 800,
                    color: "#7C3AED",
                    fontSize: "14px",
                  }}
                >
                  {applicationId}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyId}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "6px",
                  color: "#374151",
                  padding: "4px 8px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
                title="Copy Reference ID"
              >
                {copiedId ? (
                  <>
                    <Check size={13} color="#10B981" />
                    <span style={{ color: "#10B981", fontWeight: 600 }}>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Compact Receipt Summary Card */}
            <div
              style={{
                backgroundColor: "#F9FAFB",
                border: "1px solid #E5E7EB",
                borderRadius: "10px",
                padding: "12px 14px",
                textAlign: "left",
                marginBottom: "16px",
                fontSize: "12.5px",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#6B7280" }}>Candidate</span>
                <span style={{ fontWeight: 600, color: "#111827" }}>
                  {formData.fullName} ({formData.age} yrs)
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#6B7280" }}>Contact</span>
                <span style={{ fontWeight: 600, color: "#111827" }}>
                  {formData.countryCode} {formData.phone}
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#6B7280" }}>Email</span>
                <span style={{ fontWeight: 600, color: "#111827", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {formData.email}
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#6B7280" }}>City</span>
                <span style={{ fontWeight: 600, color: "#111827" }}>{formData.city}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#6B7280" }}>Sales Exp.</span>
                <span style={{ fontWeight: 600, color: formData.hasSalesExperience === "Yes" ? "#059669" : "#6B7280" }}>
                  {formData.hasSalesExperience}
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#6B7280" }}>Commission Sales</span>
                <span style={{ fontWeight: 600, color: "#111827" }}>
                  {formData.hasAgencyOrCommissionSales}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Link
                href="/"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "11px",
                  borderRadius: "8px",
                  backgroundColor: "#7C3AED",
                  color: "#FFFFFF",
                  fontSize: "13.5px",
                  fontWeight: 700,
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                Back to Homepage
              </Link>
              <button
                type="button"
                onClick={handleReset}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  color: "#374151",
                  fontSize: "12.5px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Submit Another Application
              </button>
            </div>
          </div>
        ) : (
          /* ─── SALES CONSULTANT APPLICATION FORM ─── */
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "14px",
              border: "1px solid #E5E7EB",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
              overflow: "hidden",
            }}
          >
            {/* Title Banner */}
            <div
              style={{
                padding: "20px 18px",
                borderBottom: "1px solid #E5E7EB",
                backgroundColor: "#FAF5FF",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "3px 10px",
                  borderRadius: "999px",
                  fontSize: "11px",
                  fontWeight: 700,
                  backgroundColor: "#EDE9FE",
                  color: "#6D28D9",
                  border: "1px solid #DDD6FE",
                  marginBottom: "8px",
                }}
              >
                <Sparkles size={12} />
                <span>FREE APPLICATION • IMMEDIATE HIRING</span>
              </div>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#111827",
                  lineHeight: 1.25,
                  letterSpacing: "-0.02em",
                }}
              >
                Sales Consultant – Application Form
              </div>
              <div style={{ fontSize: "13px", color: "#6B7280", marginTop: "4px", lineHeight: 1.45 }}>
                Fill in your details below to apply for our high-growth Sales Consultant role. This form is 100% free to submit.
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              noValidate
              style={{
                padding: "20px 18px",
                display: "flex",
                flexDirection: "column",
                gap: "22px",
              }}
            >
              {/* ════════ SECTION 1: BASIC DETAILS ════════ */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    paddingBottom: "8px",
                    borderBottom: "1px solid #F3F4F6",
                    marginBottom: "14px",
                  }}
                >
                  <div
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "6px",
                      backgroundColor: "#EDE9FE",
                      color: "#6D28D9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: 700,
                    }}
                  >
                    1
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>
                    Basic Details
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "12px",
                  }}
                >
                  {/* 1. Full Name */}
                  <div className={errors.fullName ? "has-field-error" : ""}>
                    <label
                      htmlFor="fullName"
                      style={{
                        display: "block",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#374151",
                        marginBottom: "4px",
                      }}
                    >
                      1. Full Name <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Rahul Sharma"
                      style={{
                        width: "100%",
                        height: "40px",
                        padding: "0 12px",
                        fontSize: "14px",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "8px",
                        border: `1px solid ${errors.fullName ? "#EF4444" : "#E5E7EB"}`,
                        color: "#111827",
                        outline: "none",
                      }}
                    />
                    {errors.fullName && (
                      <div style={{ fontSize: "11px", color: "#EF4444", marginTop: "3px", fontWeight: 500 }}>
                        {errors.fullName}
                      </div>
                    )}
                  </div>

                  {/* 2. Mobile / WhatsApp */}
                  <div className={errors.phone ? "has-field-error" : ""}>
                    <label
                      htmlFor="phone"
                      style={{
                        display: "block",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#374151",
                        marginBottom: "4px",
                      }}
                    >
                      2. Mobile / WhatsApp Number <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <div style={{ position: "relative", width: "90px", flexShrink: 0 }}>
                        <select
                          id="countryCode"
                          name="countryCode"
                          aria-label="Country Code"
                          value={formData.countryCode}
                          onChange={handleCountryCodeChange}
                          style={{
                            width: "100%",
                            height: "40px",
                            padding: "0 20px 0 8px",
                            fontSize: "13px",
                            backgroundColor: "#F9FAFB",
                            borderRadius: "8px",
                            border: "1px solid #E5E7EB",
                            color: "#111827",
                            fontWeight: 600,
                            outline: "none",
                            appearance: "none",
                            cursor: "pointer",
                          }}
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.flag} {c.code}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={14}
                          style={{
                            position: "absolute",
                            right: "6px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            pointerEvents: "none",
                            color: "#6B7280",
                          }}
                        />
                      </div>

                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        maxLength={formData.countryCode === "+91" ? 10 : 15}
                        placeholder={formData.countryCode === "+91" ? "10-digit number" : "Phone number"}
                        style={{
                          flex: 1,
                          height: "40px",
                          padding: "0 12px",
                          fontSize: "14px",
                          backgroundColor: "#FFFFFF",
                          borderRadius: "8px",
                          border: `1px solid ${errors.phone ? "#EF4444" : "#E5E7EB"}`,
                          color: "#111827",
                          outline: "none",
                        }}
                      />
                    </div>
                    {errors.phone && (
                      <div style={{ fontSize: "11px", color: "#EF4444", marginTop: "3px", fontWeight: 500 }}>
                        {errors.phone}
                      </div>
                    )}
                  </div>

                  {/* 3. City */}
                  <div className={errors.city ? "has-field-error" : ""}>
                    <label
                      htmlFor="city"
                      style={{
                        display: "block",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#374151",
                        marginBottom: "4px",
                      }}
                    >
                      3. City <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Mumbai, Delhi, Bangalore"
                      style={{
                        width: "100%",
                        height: "40px",
                        padding: "0 12px",
                        fontSize: "14px",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "8px",
                        border: `1px solid ${errors.city ? "#EF4444" : "#E5E7EB"}`,
                        color: "#111827",
                        outline: "none",
                      }}
                    />
                    {errors.city && (
                      <div style={{ fontSize: "11px", color: "#EF4444", marginTop: "3px", fontWeight: 500 }}>
                        {errors.city}
                      </div>
                    )}
                  </div>

                  {/* 4. Email */}
                  <div className={errors.email ? "has-field-error" : ""}>
                    <label
                      htmlFor="email"
                      style={{
                        display: "block",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#374151",
                        marginBottom: "4px",
                      }}
                    >
                      4. Email <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. rahul.sharma@example.com"
                      style={{
                        width: "100%",
                        height: "40px",
                        padding: "0 12px",
                        fontSize: "14px",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "8px",
                        border: `1px solid ${errors.email ? "#EF4444" : "#E5E7EB"}`,
                        color: "#111827",
                        outline: "none",
                      }}
                    />
                    {errors.email && (
                      <div style={{ fontSize: "11px", color: "#EF4444", marginTop: "3px", fontWeight: 500 }}>
                        {errors.email}
                      </div>
                    )}
                  </div>

                  {/* 5. Age */}
                  <div className={errors.age ? "has-field-error" : ""}>
                    <label
                      htmlFor="age"
                      style={{
                        display: "block",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#374151",
                        marginBottom: "4px",
                      }}
                    >
                      5. Age <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="e.g. 24"
                      maxLength={2}
                      style={{
                        width: "100%",
                        height: "40px",
                        padding: "0 12px",
                        fontSize: "14px",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "8px",
                        border: `1px solid ${errors.age ? "#EF4444" : "#E5E7EB"}`,
                        color: "#111827",
                        outline: "none",
                      }}
                    />
                    {errors.age && (
                      <div style={{ fontSize: "11px", color: "#EF4444", marginTop: "3px", fontWeight: 500 }}>
                        {errors.age}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ════════ SECTION 2: SALES EXPERIENCE ════════ */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    paddingBottom: "8px",
                    borderBottom: "1px solid #F3F4F6",
                    marginBottom: "14px",
                  }}
                >
                  <div
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "6px",
                      backgroundColor: "#EDE9FE",
                      color: "#6D28D9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: 700,
                    }}
                  >
                    2
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>
                    Sales Experience
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {/* 6. Do you have sales experience? */}
                  <div className={errors.hasSalesExperience ? "has-field-error" : ""}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#374151",
                        marginBottom: "6px",
                      }}
                    >
                      6. Do you have sales experience? <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <div style={{ display: "flex", gap: "10px" }}>
                      {["Yes", "No"].map((opt) => {
                        const isSelected = formData.hasSalesExperience === opt;
                        return (
                          <div
                            key={opt}
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                hasSalesExperience: opt,
                              }))
                            }
                            style={{
                              flex: 1,
                              padding: "10px 14px",
                              borderRadius: "8px",
                              border: `1.5px solid ${isSelected ? "#7C3AED" : "#E5E7EB"}`,
                              backgroundColor: isSelected ? "#F5F3FF" : "#FFFFFF",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              transition: "all 0.15s ease",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "13px",
                                fontWeight: isSelected ? 700 : 500,
                                color: isSelected ? "#7C3AED" : "#374151",
                              }}
                            >
                              {opt}
                            </span>
                            <div
                              style={{
                                width: "18px",
                                height: "18px",
                                borderRadius: "50%",
                                border: `2px solid ${isSelected ? "#7C3AED" : "#D1D5DB"}`,
                                backgroundColor: isSelected ? "#7C3AED" : "#FFFFFF",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {isSelected && (
                                <div
                                  style={{
                                    width: "6px",
                                    height: "6px",
                                    borderRadius: "50%",
                                    backgroundColor: "#FFFFFF",
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {errors.hasSalesExperience && (
                      <div style={{ fontSize: "11px", color: "#EF4444", marginTop: "3px", fontWeight: 500 }}>
                        {errors.hasSalesExperience}
                      </div>
                    )}
                  </div>

                  {/* 7. If yes, briefly mention previous experience */}
                  <div className={errors.salesExperienceDetails ? "has-field-error" : ""}>
                    <label
                      htmlFor="salesExperienceDetails"
                      style={{
                        display: "block",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#374151",
                        marginBottom: "4px",
                      }}
                    >
                      7. If yes, briefly mention your previous sales experience{" "}
                      {formData.hasSalesExperience === "Yes" && <span style={{ color: "#EF4444" }}>*</span>}
                    </label>
                    <textarea
                      id="salesExperienceDetails"
                      name="salesExperienceDetails"
                      rows={3}
                      value={formData.salesExperienceDetails}
                      onChange={handleInputChange}
                      placeholder={
                        formData.hasSalesExperience === "Yes"
                          ? "e.g. Worked 1 year in B2B SaaS sales / Retail sales / Telecalling, closed 15+ deals monthly..."
                          : "Mention any relevant sales or client-handling experience, or write 'Fresher'..."
                      }
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        fontSize: "14px",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "8px",
                        border: `1px solid ${errors.salesExperienceDetails ? "#EF4444" : "#E5E7EB"}`,
                        color: "#111827",
                        outline: "none",
                        resize: "vertical",
                        lineHeight: 1.5,
                      }}
                    />
                    {errors.salesExperienceDetails && (
                      <div style={{ fontSize: "11px", color: "#EF4444", marginTop: "3px", fontWeight: 500 }}>
                        {errors.salesExperienceDetails}
                      </div>
                    )}
                  </div>

                  {/* 8. Worked in agency marketing / commission-based sales before? */}
                  <div className={errors.hasAgencyOrCommissionSales ? "has-field-error" : ""}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#374151",
                        marginBottom: "6px",
                      }}
                    >
                      8. Have you worked in agency marketing / commission-based sales before? <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <div style={{ display: "flex", gap: "10px" }}>
                      {["Yes", "No"].map((opt) => {
                        const isSelected = formData.hasAgencyOrCommissionSales === opt;
                        return (
                          <div
                            key={opt}
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                hasAgencyOrCommissionSales: opt,
                              }))
                            }
                            style={{
                              flex: 1,
                              padding: "10px 14px",
                              borderRadius: "8px",
                              border: `1.5px solid ${isSelected ? "#7C3AED" : "#E5E7EB"}`,
                              backgroundColor: isSelected ? "#F5F3FF" : "#FFFFFF",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              transition: "all 0.15s ease",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "13px",
                                fontWeight: isSelected ? 700 : 500,
                                color: isSelected ? "#7C3AED" : "#374151",
                              }}
                            >
                              {opt}
                            </span>
                            <div
                              style={{
                                width: "18px",
                                height: "18px",
                                borderRadius: "50%",
                                border: `2px solid ${isSelected ? "#7C3AED" : "#D1D5DB"}`,
                                backgroundColor: isSelected ? "#7C3AED" : "#FFFFFF",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {isSelected && (
                                <div
                                  style={{
                                    width: "6px",
                                    height: "6px",
                                    borderRadius: "50%",
                                    backgroundColor: "#FFFFFF",
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {errors.hasAgencyOrCommissionSales && (
                      <div style={{ fontSize: "11px", color: "#EF4444", marginTop: "3px", fontWeight: 500 }}>
                        {errors.hasAgencyOrCommissionSales}
                      </div>
                    )}
                  </div>

                  {/* 9. Products / services sold before */}
                  <div className={errors.productsSoldBefore ? "has-field-error" : ""}>
                    <label
                      htmlFor="productsSoldBefore"
                      style={{
                        display: "block",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#374151",
                        marginBottom: "4px",
                      }}
                    >
                      9. What type of products/services have you sold before? <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="productsSoldBefore"
                      name="productsSoldBefore"
                      value={formData.productsSoldBefore}
                      onChange={handleInputChange}
                      placeholder="e.g. Digital Marketing, Websites, Real Estate, Insurance, Software, Edu-Tech..."
                      style={{
                        width: "100%",
                        height: "40px",
                        padding: "0 12px",
                        fontSize: "14px",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "8px",
                        border: `1px solid ${errors.productsSoldBefore ? "#EF4444" : "#E5E7EB"}`,
                        color: "#111827",
                        outline: "none",
                      }}
                    />
                    {errors.productsSoldBefore && (
                      <div style={{ fontSize: "11px", color: "#EF4444", marginTop: "3px", fontWeight: 500 }}>
                        {errors.productsSoldBefore}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ════════ SECTION 3: QUICK SALES TEST ════════ */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    paddingBottom: "8px",
                    borderBottom: "1px solid #F3F4F6",
                    marginBottom: "14px",
                  }}
                >
                  <div
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "6px",
                      backgroundColor: "#EDE9FE",
                      color: "#6D28D9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: 700,
                    }}
                  >
                    3
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>
                    Quick Sales Test
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {/* 10. Objection Handling */}
                  <div className={errors.expensiveObjectionHandling ? "has-field-error" : ""}>
                    <label
                      htmlFor="expensiveObjectionHandling"
                      style={{
                        display: "block",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#374151",
                        marginBottom: "4px",
                      }}
                    >
                      10. If a customer says “Your product is too expensive,” how would you convince them? <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <textarea
                      id="expensiveObjectionHandling"
                      name="expensiveObjectionHandling"
                      rows={3}
                      value={formData.expensiveObjectionHandling}
                      onChange={handleInputChange}
                      placeholder="Explain your pitch or strategy: How do you shift focus from price to value, ROI, and long-term results?..."
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        fontSize: "14px",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "8px",
                        border: `1px solid ${errors.expensiveObjectionHandling ? "#EF4444" : "#E5E7EB"}`,
                        color: "#111827",
                        outline: "none",
                        resize: "vertical",
                        lineHeight: 1.5,
                      }}
                    />
                    {errors.expensiveObjectionHandling && (
                      <div style={{ fontSize: "11px", color: "#EF4444", marginTop: "3px", fontWeight: 500 }}>
                        {errors.expensiveObjectionHandling}
                      </div>
                    )}
                  </div>

                  {/* 11. Why Good at Sales */}
                  <div className={errors.whyGoodAtSales ? "has-field-error" : ""}>
                    <label
                      htmlFor="whyGoodAtSales"
                      style={{
                        display: "block",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#374151",
                        marginBottom: "4px",
                      }}
                    >
                      11. Why do you think you would be good at sales? <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <textarea
                      id="whyGoodAtSales"
                      name="whyGoodAtSales"
                      rows={3}
                      value={formData.whyGoodAtSales}
                      onChange={handleInputChange}
                      placeholder="Tell us about your drive, communication style, relationship-building ability, and hunger to close deals..."
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        fontSize: "14px",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "8px",
                        border: `1px solid ${errors.whyGoodAtSales ? "#EF4444" : "#E5E7EB"}`,
                        color: "#111827",
                        outline: "none",
                        resize: "vertical",
                        lineHeight: 1.5,
                      }}
                    />
                    {errors.whyGoodAtSales && (
                      <div style={{ fontSize: "11px", color: "#EF4444", marginTop: "3px", fontWeight: 500 }}>
                        {errors.whyGoodAtSales}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ════════ SUBMIT ACTION (100% FREE) ════════ */}
              <div
                style={{
                  paddingTop: "14px",
                  borderTop: "1px solid #E5E7EB",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: "100%",
                    height: "46px",
                    borderRadius: "8px",
                    backgroundColor: isSubmitting ? "#A78BFA" : "#7C3AED",
                    color: "#FFFFFF",
                    fontSize: "14px",
                    fontWeight: 700,
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    boxShadow: "0 2px 6px rgba(124, 58, 237, 0.25)",
                    transition: "all 0.15s ease",
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Sales Consultant Application</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    fontSize: "11px",
                    color: "#6B7280",
                    textAlign: "center",
                  }}
                >
                  <ShieldCheck size={14} color="#059669" />
                  <span>100% Free Application • No Fees Required • Instant Review</span>
                </div>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* ─── Footer ─── */}
      <footer
        style={{
          padding: "14px 16px",
          borderTop: "1px solid #E5E7EB",
          backgroundColor: "#FFFFFF",
          textAlign: "center",
          fontSize: "12px",
          color: "#6B7280",
        }}
      >
        <div
          style={{
            maxWidth: "780px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
          }}
        >
          <div>© {new Date().getFullYear()} First Option Agency. All rights reserved.</div>
          <div style={{ color: "#7C3AED", fontWeight: 600 }}>
            Sales &amp; Business Development Careers
          </div>
        </div>
      </footer>
    </div>
  );
}
