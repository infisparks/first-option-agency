"use client";

import React, { useState, useEffect } from "react";
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
  ShieldCheck,
  TrendingUp,
  Video,
  Target,
  CreditCard,
  Lock,
  Receipt,
  FileCheck,
} from "lucide-react";
import {
  TARGET_SKILLS,
  QUALIFICATION_OPTIONS,
  PASSING_YEARS,
  COUNTRY_CODES,
} from "./skills-data";
import { saveApplicationToRealtimeDb, InternshipApplicationPayload } from "@/app/lib/firebase";
import { triggerInternshipWhatsAppNotifications } from "@/app/lib/whatsapp";

interface FormData {
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  city: string;
  gender: string;
  qualification: string;
  passingYear: string;
  skills: string[];
  aboutYourself: string;
  resumeUrl: string;
}

interface FormErrors {
  [key: string]: string;
}

interface PaymentInfo {
  paymentId: string;
  orderId?: string;
  amount: number;
  date: string;
}

// Helper to dynamically load Razorpay Checkout script
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && (window as any).Razorpay) {
      return resolve(true);
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function InternshipFormClient() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    countryCode: "+91",
    phone: "",
    city: "",
    gender: "",
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
  const [paymentError, setPaymentError] = useState<string>("");
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);

  // Preload Razorpay checkout script on mount
  useEffect(() => {
    loadRazorpayScript();
  }, []);

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

    if (!formData.gender) {
      newErrors.gender = "Please select your gender";
    }

    if (!formData.qualification) {
      newErrors.qualification = "Please select your qualification";
    }

    if (!formData.passingYear) {
      newErrors.passingYear = "Please select passing year";
    }

    if (formData.skills.length === 0) {
      newErrors.skills = "Please select at least 1 internship role track";
    }

    if (!formData.aboutYourself.trim()) {
      newErrors.aboutYourself = "Brief introduction is required";
    } else if (formData.aboutYourself.trim().length < 15) {
      newErrors.aboutYourself = "Please write at least 15 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submit Handler with Razorpay ₹5000 Payment Requirement
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError("");

    if (!validateForm()) {
      const firstErrorElement = document.querySelector(".has-field-error");
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded || !(window as any).Razorpay) {
      setIsSubmitting(false);
      setPaymentError("Could not initialize Razorpay gateway. Please check your internet connection and try again.");
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const generatedId = `FOA-INT-${new Date().getFullYear()}-${randomSuffix}`;
    const amountInRupees = 5000;
    const amountInPaise = amountInRupees * 100; // 500000 paise

    // Configure Razorpay Checkout Options
    const options = {
      key: "rzp_live_TXvv4nCnkVjFWm",
      amount: amountInPaise,
      currency: "INR",
      name: "First Option Agency",
      description: "Internship Registration & Application Fee (₹5,000)",
      image: "/meta-logo.webp",
      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: `${formData.countryCode}${formData.phone}`,
      },
      notes: {
        applicationId: generatedId,
        candidateName: formData.fullName,
        candidateEmail: formData.email,
        candidatePhone: `${formData.countryCode}${formData.phone}`,
        city: formData.city,
        skills: formData.skills.join(", "),
      },
      theme: {
        color: "#7C3AED",
        backdrop_color: "#111827",
      },
      handler: async function (response: any) {
        // Payment Succeeded! Proceed to finalize and submit application
        const paymentId = response.razorpay_payment_id || `pay_${Date.now()}`;
        const orderId = response.razorpay_order_id || "";
        const submissionTimestamp = new Date().toISOString();

        const applicationRecord: InternshipApplicationPayload = {
          applicationId: generatedId,
          submittedAt: submissionTimestamp,
          fullName: formData.fullName,
          email: formData.email,
          countryCode: formData.countryCode,
          phone: formData.phone,
          city: formData.city,
          gender: formData.gender,
          qualification: formData.qualification,
          passingYear: formData.passingYear,
          skills: formData.skills,
          aboutYourself: formData.aboutYourself,
          resumeUrl: formData.resumeUrl,
          paymentStatus: "Paid",
          amountPaid: amountInRupees,
          paymentId: paymentId,
          orderId: orderId,
          paidAt: submissionTimestamp,
        };

        // 1. Save directly to Firebase Realtime Database
        try {
          await saveApplicationToRealtimeDb(applicationRecord);
        } catch (rtdbErr) {
          console.warn("Realtime DB save warning:", rtdbErr);
        }

        // 2. Trigger WhatsApp notifications to Candidate & Admins
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

        setPaymentInfo({
          paymentId,
          orderId,
          amount: amountInRupees,
          date: new Date().toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
          }),
        });
        setApplicationId(generatedId);
        setIsSubmitting(false);
        setSubmitSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      modal: {
        ondismiss: function () {
          setIsSubmitting(false);
          setPaymentError("Payment window was closed. Your application has NOT been submitted yet. Please complete the ₹5,000 fee payment to submit.");
        },
      },
    };

    try {
      const rzpInstance = new (window as any).Razorpay(options);
      rzpInstance.on("payment.failed", function (response: any) {
        setIsSubmitting(false);
        setPaymentError(
          response?.error?.description ||
            "Payment failed or declined by your bank. Please try again with another payment method."
        );
      });
      rzpInstance.open();
    } catch (err: any) {
      setIsSubmitting(false);
      setPaymentError(err?.message || "Failed to open Razorpay payment window.");
    }
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
      gender: "",
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
    setPaymentError("");
    setPaymentInfo(null);
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
      {/* ─── Header Bar ─── */}
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
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#111827",
                  lineHeight: 1.2,
                }}
              >
                First Option Agency
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "#7C3AED",
                  fontWeight: 600,
                }}
              >
                Internship Program 2026
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
          /* ─── SUBMISSION & PAYMENT CONFIRMATION RECEIPT ─── */
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              border: "1px solid #E5E7EB",
              padding: "32px 20px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              textAlign: "center",
              maxWidth: "560px",
              margin: "16px auto",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: "#ECFDF5",
                border: "1px solid #A7F3D0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px auto",
                color: "#059669",
              }}
            >
              <CheckCircle2 size={34} strokeWidth={2.5} />
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "4px 12px",
                backgroundColor: "#ECFDF5",
                color: "#047857",
                borderRadius: "999px",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "12px",
                border: "1px solid #A7F3D0",
              }}
            >
              <FileCheck size={13} />
              <span>Application Submitted & Payment Confirmed</span>
            </div>

            <div
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#111827",
                marginBottom: "6px",
              }}
            >
              Thank You, {formData.fullName}!
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "#6B7280",
                lineHeight: 1.5,
                marginBottom: "22px",
              }}
            >
              Your ₹5,000 payment was successfully verified and your internship
              application has been registered. Our talent onboarding team will
              reach out to you shortly.
            </div>

            {/* Payment & Application Receipt Card */}
            <div
              style={{
                backgroundColor: "#F9FAFB",
                border: "1px solid #E5E7EB",
                borderRadius: "12px",
                padding: "18px",
                textAlign: "left",
                marginBottom: "20px",
                fontSize: "13px",
              }}
            >
              {/* Reference ID Row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #E5E7EB",
                  paddingBottom: "12px",
                  marginBottom: "12px",
                }}
              >
                <div>
                  <span style={{ color: "#6B7280", fontSize: "12px", display: "block" }}>
                    Application Reference ID
                  </span>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontWeight: 700,
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

              {/* Payment Box */}
              <div
                style={{
                  backgroundColor: "#ECFDF5",
                  border: "1px solid #A7F3D0",
                  borderRadius: "8px",
                  padding: "10px 12px",
                  marginBottom: "14px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "4px",
                  }}
                >
                  <span style={{ fontSize: "12px", color: "#065F46", fontWeight: 600 }}>
                    Payment Status:
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      backgroundColor: "#059669",
                      color: "#FFFFFF",
                      padding: "2px 8px",
                      borderRadius: "999px",
                    }}
                  >
                    PAID (₹5,000 INR)
                  </span>
                </div>
                {paymentInfo?.paymentId && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "11px",
                      color: "#047857",
                      fontFamily: "monospace",
                    }}
                  >
                    <span>Razorpay ID:</span>
                    <span>{paymentInfo.paymentId}</span>
                  </div>
                )}
                {paymentInfo?.date && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "11px",
                      color: "#047857",
                      marginTop: "2px",
                    }}
                  >
                    <span>Timestamp:</span>
                    <span>{paymentInfo.date}</span>
                  </div>
                )}
              </div>

              {/* Candidate Details */}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "#6B7280" }}>Candidate</span>
                <span style={{ fontWeight: 600, color: "#111827" }}>
                  {formData.fullName} ({formData.gender || "Applicant"})
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "#6B7280" }}>Email</span>
                <span style={{ fontWeight: 600, color: "#111827" }}>{formData.email}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "#6B7280" }}>Phone</span>
                <span style={{ fontWeight: 600, color: "#111827" }}>
                  {formData.countryCode} {formData.phone}
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "#6B7280" }}>Location</span>
                <span style={{ fontWeight: 600, color: "#111827" }}>{formData.city}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "#6B7280" }}>Qualification</span>
                <span
                  style={{
                    fontWeight: 600,
                    color: "#111827",
                    maxWidth: "200px",
                    textAlign: "right",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {formData.qualification.split("(")[0]} ({formData.passingYear})
                </span>
              </div>

              <div
                style={{
                  borderTop: "1px solid #E5E7EB",
                  paddingTop: "10px",
                  marginTop: "10px",
                }}
              >
                <span
                  style={{
                    color: "#6B7280",
                    display: "block",
                    fontSize: "12px",
                    marginBottom: "6px",
                  }}
                >
                  Enrolled Tracks:
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {formData.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #E5E7EB",
                        color: "#7C3AED",
                        padding: "2px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link
                href="/"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  backgroundColor: "#7C3AED",
                  color: "#FFFFFF",
                  fontSize: "14px",
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
                  padding: "11px",
                  borderRadius: "8px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  color: "#374151",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Submit Another Application
              </button>
            </div>
          </div>
        ) : (
          /* ─── APPLICATION FORM & PAYMENT FLOW ─── */
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "14px",
              border: "1px solid #E5E7EB",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
              overflow: "hidden",
            }}
          >
            {/* Form Title Banner */}
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
                <span>INTERNSHIP DRIVE 2026 • OPEN FOR ALL CANDIDATES</span>
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
                Internship Application & Registration Form
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "#6B7280",
                  marginTop: "4px",
                  lineHeight: 1.45,
                }}
              >
                Fill out the application details below. After filling the form, an enrollment &amp; registration fee of <strong>₹5,000</strong> is required via Razorpay to submit your application.
              </div>
            </div>

            {/* Error Banner */}
            {paymentError && (
              <div
                style={{
                  margin: "16px 16px 0 16px",
                  padding: "12px 14px",
                  backgroundColor: "#FEF2F2",
                  border: "1px solid #FCA5A5",
                  borderRadius: "8px",
                  color: "#991B1B",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                }}
              >
                <AlertCircle size={16} color="#EF4444" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span>{paymentError}</span>
              </div>
            )}

            {/* Form Elements */}
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
              {/* ════════ SECTION 1: PERSONAL DETAILS ════════ */}
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
                    Personal Details
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "12px",
                  }}
                >
                  {/* Full Name */}
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
                      Full Name <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Rahul Sharma / Priya Verma"
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

                  {/* Email */}
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
                      Email Address <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. yourname@gmail.com"
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

                  {/* Phone with Country Code */}
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
                      Phone / WhatsApp Number <span style={{ color: "#EF4444" }}>*</span>
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
                        placeholder={formData.countryCode === "+91" ? "10-digit mobile number" : "Phone number"}
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
                    {errors.phone ? (
                      <div style={{ fontSize: "11px", color: "#EF4444", marginTop: "3px", fontWeight: 500 }}>
                        {errors.phone}
                      </div>
                    ) : (
                      formData.countryCode === "+91" && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "11px",
                            color: "#6B7280",
                            marginTop: "3px",
                          }}
                        >
                          <span>Enter 10-digit number</span>
                          <span
                            style={{
                              color: formData.phone.length === 10 ? "#10B981" : "#6B7280",
                              fontWeight: 600,
                            }}
                          >
                            {formData.phone.length}/10
                          </span>
                        </div>
                      )
                    )}
                  </div>

                  {/* City */}
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
                      Current City / Location <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Mumbai, Bangalore, Pune"
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

                  {/* Gender Selection */}
                  <div className={errors.gender ? "has-field-error" : ""}>
                    <label
                      htmlFor="gender"
                      style={{
                        display: "block",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#374151",
                        marginBottom: "4px",
                      }}
                    >
                      Gender <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        style={{
                          width: "100%",
                          height: "40px",
                          padding: "0 28px 0 10px",
                          fontSize: "13px",
                          backgroundColor: "#FFFFFF",
                          borderRadius: "8px",
                          border: `1px solid ${errors.gender ? "#EF4444" : "#E5E7EB"}`,
                          color: formData.gender ? "#111827" : "#9CA3AF",
                          outline: "none",
                          appearance: "none",
                          cursor: "pointer",
                        }}
                      >
                        <option value="" disabled>Select Gender...</option>
                        <option value="Male" style={{ color: "#111827" }}>Male</option>
                        <option value="Female" style={{ color: "#111827" }}>Female</option>
                        <option value="Other" style={{ color: "#111827" }}>Other</option>
                        <option value="Prefer not to say" style={{ color: "#111827" }}>Prefer not to say</option>
                      </select>
                      <ChevronDown
                        size={14}
                        style={{
                          position: "absolute",
                          right: "8px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          pointerEvents: "none",
                          color: "#6B7280",
                        }}
                      />
                    </div>
                    {errors.gender && (
                      <div style={{ fontSize: "11px", color: "#EF4444", marginTop: "3px", fontWeight: 500 }}>
                        {errors.gender}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ════════ SECTION 2: QUALIFICATION & EDUCATION ════════ */}
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
                    Qualification & Education
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "12px",
                  }}
                >
                  {/* Highest Qualification */}
                  <div className={errors.qualification ? "has-field-error" : ""}>
                    <label
                      htmlFor="qualification"
                      style={{
                        display: "block",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#374151",
                        marginBottom: "4px",
                      }}
                    >
                      Highest Qualification <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <select
                        id="qualification"
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleInputChange}
                        style={{
                          width: "100%",
                          height: "40px",
                          padding: "0 28px 0 10px",
                          fontSize: "13px",
                          backgroundColor: "#FFFFFF",
                          borderRadius: "8px",
                          border: `1px solid ${errors.qualification ? "#EF4444" : "#E5E7EB"}`,
                          color: formData.qualification ? "#111827" : "#9CA3AF",
                          outline: "none",
                          appearance: "none",
                          cursor: "pointer",
                        }}
                      >
                        <option value="" disabled>Select qualification...</option>
                        {QUALIFICATION_OPTIONS.map((q) => (
                          <option key={q} value={q} style={{ color: "#111827" }}>
                            {q}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={14}
                        style={{
                          position: "absolute",
                          right: "8px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          pointerEvents: "none",
                          color: "#6B7280",
                        }}
                      />
                    </div>
                    {errors.qualification && (
                      <div style={{ fontSize: "11px", color: "#EF4444", marginTop: "3px", fontWeight: 500 }}>
                        {errors.qualification}
                      </div>
                    )}
                  </div>

                  {/* Passing Year */}
                  <div className={errors.passingYear ? "has-field-error" : ""}>
                    <label
                      htmlFor="passingYear"
                      style={{
                        display: "block",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#374151",
                        marginBottom: "4px",
                      }}
                    >
                      Passing / Graduation Year <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <select
                        id="passingYear"
                        name="passingYear"
                        value={formData.passingYear}
                        onChange={handleInputChange}
                        style={{
                          width: "100%",
                          height: "40px",
                          padding: "0 28px 0 10px",
                          fontSize: "13px",
                          backgroundColor: "#FFFFFF",
                          borderRadius: "8px",
                          border: `1px solid ${errors.passingYear ? "#EF4444" : "#E5E7EB"}`,
                          color: formData.passingYear ? "#111827" : "#9CA3AF",
                          outline: "none",
                          appearance: "none",
                          cursor: "pointer",
                        }}
                      >
                        <option value="" disabled>Select passing year...</option>
                        {PASSING_YEARS.map((y) => (
                          <option key={y} value={y} style={{ color: "#111827" }}>
                            {y}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={14}
                        style={{
                          position: "absolute",
                          right: "8px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          pointerEvents: "none",
                          color: "#6B7280",
                        }}
                      />
                    </div>
                    {errors.passingYear && (
                      <div style={{ fontSize: "11px", color: "#EF4444", marginTop: "3px", fontWeight: 500 }}>
                        {errors.passingYear}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ════════ SECTION 3: SKILLS / ROLE SELECTION ════════ */}
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
                    Select Internship Track(s) <span style={{ color: "#EF4444" }}>*</span>
                  </div>
                </div>

                <div className={errors.skills ? "has-field-error" : ""}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: "8px",
                    }}
                  >
                    Select the role(s) you want to be trained and evaluated in:
                  </label>

                  {/* 3 Interactive Cards */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
                      gap: "10px",
                    }}
                  >
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
                            boxShadow: isChecked
                              ? "0 2px 8px rgba(124, 58, 237, 0.08)"
                              : "none",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              {getSkillIcon(skill.id)}
                              <span
                                style={{
                                  fontSize: "14px",
                                  fontWeight: 700,
                                  color: isChecked ? "#7C3AED" : "#111827",
                                }}
                              >
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
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#EF4444",
                        marginTop: "6px",
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <AlertCircle size={12} />
                      <span>{errors.skills}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* ════════ SECTION 4: ABOUT YOURSELF ════════ */}
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
                    4
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>
                    About Yourself & Introduction <span style={{ color: "#EF4444" }}>*</span>
                  </div>
                </div>

                {/* About Yourself Textarea */}
                <div className={errors.aboutYourself ? "has-field-error" : ""} style={{ marginBottom: "12px" }}>
                  <label
                    htmlFor="aboutYourself"
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: "4px",
                    }}
                  >
                    Tell us about yourself (Background, experience, and goals)
                  </label>
                  <textarea
                    id="aboutYourself"
                    name="aboutYourself"
                    rows={4}
                    value={formData.aboutYourself}
                    onChange={handleInputChange}
                    placeholder="Briefly introduce yourself: your practical skills, tools you know, projects or content you've created, and why you are excited to join this program..."
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      fontSize: "14px",
                      backgroundColor: "#FFFFFF",
                      borderRadius: "8px",
                      border: `1px solid ${errors.aboutYourself ? "#EF4444" : "#E5E7EB"}`,
                      color: "#111827",
                      outline: "none",
                      resize: "vertical",
                      lineHeight: 1.5,
                    }}
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

                {/* Resume Link */}
                <div>
                  <label
                    htmlFor="resumeUrl"
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: "4px",
                    }}
                  >
                    Resume / Drive / Portfolio Link <span style={{ fontSize: "11px", fontWeight: 400, color: "#6B7280" }}>(Optional)</span>
                  </label>
                  <input
                    type="url"
                    id="resumeUrl"
                    name="resumeUrl"
                    value={formData.resumeUrl}
                    onChange={handleInputChange}
                    placeholder="https://drive.google.com/file/... or website/portfolio link"
                    style={{
                      width: "100%",
                      height: "40px",
                      padding: "0 12px",
                      fontSize: "14px",
                      backgroundColor: "#FFFFFF",
                      borderRadius: "8px",
                      border: "1px solid #E5E7EB",
                      color: "#111827",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              {/* ════════ SECTION 5: PAYMENT SUMMARY CARD (₹5,000) ════════ */}
              <div
                style={{
                  backgroundColor: "#F9FAFB",
                  borderRadius: "12px",
                  border: "1px solid #E5E7EB",
                  padding: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "8px",
                    borderBottom: "1px solid #E5E7EB",
                    paddingBottom: "12px",
                    marginBottom: "12px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        backgroundColor: "#EDE9FE",
                        color: "#7C3AED",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Receipt size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>
                        Internship Enrollment &amp; Registration Fee
                      </div>
                      <div style={{ fontSize: "11px", color: "#6B7280" }}>
                        Mandatory one-time registration fee required to submit application
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "20px", fontWeight: 800, color: "#7C3AED" }}>
                      ₹5,000
                    </div>
                    <div style={{ fontSize: "11px", color: "#059669", fontWeight: 600 }}>
                      All inclusive • Live Agency Projects
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "8px",
                    fontSize: "12px",
                    color: "#4B5563",
                    marginBottom: "12px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Check size={14} color="#10B981" />
                    <span>Hands-on Live Client Projects</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Check size={14} color="#10B981" />
                    <span>Industry Mentorship &amp; Guidance</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Check size={14} color="#10B981" />
                    <span>Performance-based Stipend &amp; PPO</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Check size={14} color="#10B981" />
                    <span>Official Experience Certificate</span>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    border: "1px solid #E5E7EB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "11px",
                    color: "#6B7280",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Lock size={13} color="#059669" />
                    <span>100% Encrypted &amp; Secured via <strong>Razorpay</strong></span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span>UPI • Credit/Debit Cards • NetBanking</span>
                  </div>
                </div>
              </div>

              {/* ════════ SUBMIT ACTION WITH RAZORPAY ════════ */}
              <div
                style={{
                  paddingTop: "10px",
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
                      <span>Processing Payment &amp; Application...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard size={17} />
                      <span>Pay ₹5,000 &amp; Submit Application</span>
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
                  <ShieldCheck size={14} color="#7C3AED" />
                  <span>
                    Your application is only submitted once payment of ₹5,000 is completed.
                  </span>
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
            Talent &amp; Career Development Division
          </div>
        </div>
      </footer>
    </div>
  );
}
