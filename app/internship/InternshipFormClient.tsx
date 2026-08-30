"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  AlertCircle,
  X,
  Plus,
  Search,
  ArrowRight,
  ChevronDown,
  Loader2,
  ArrowLeft,
  Copy,
  Check,
  Sparkles,
  Lock,
} from "lucide-react";
import {
  SKILL_CATEGORIES,
  QUALIFICATION_OPTIONS,
  PASSING_YEARS,
  COUNTRY_CODES,
} from "./skills-data";

interface FormData {
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  city: string;
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

  // Searchable Skills Combobox State
  const [skillSearch, setSkillSearch] = useState("");
  const [isSkillDropdownOpen, setIsSkillDropdownOpen] = useState(false);
  const skillDropdownRef = useRef<HTMLDivElement>(null);

  // Close skill dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        skillDropdownRef.current &&
        !skillDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSkillDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Input Changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Allow only numbers
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

    // Clear field error upon typing
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

  // Skill Management
  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed) return;

    if (!formData.skills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, trimmed],
      }));
    }
    setSkillSearch("");
    setIsSkillDropdownOpen(false);
    if (errors.skills) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated.skills;
        return updated;
      });
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (skillSearch.trim()) {
        addSkill(skillSearch);
      }
    }
  };

  // Filter skills for combobox
  const allFlattenedSkills = Array.from(
    new Set(SKILL_CATEGORIES.flatMap((c) => c.skills))
  );

  const filteredSkills = allFlattenedSkills.filter(
    (skill) =>
      skill.toLowerCase().includes(skillSearch.toLowerCase()) &&
      !formData.skills.some((s) => s.toLowerCase() === skill.toLowerCase())
  );

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

    if (!formData.qualification) {
      newErrors.qualification = "Please select your qualification";
    }

    if (!formData.passingYear) {
      newErrors.passingYear = "Please select passing year";
    }

    if (formData.skills.length === 0) {
      newErrors.skills = "Please search and add at least 1 skill";
    }

    if (!formData.aboutYourself.trim()) {
      newErrors.aboutYourself = "Brief introduction is required";
    } else if (formData.aboutYourself.trim().length < 15) {
      newErrors.aboutYourself = "Please write at least 15 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submit Handler (100% Client-Side)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstErrorElement = document.querySelector(".has-field-error");
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const generatedId = `FOA-INT-${new Date().getFullYear()}-${randomSuffix}`;

      try {
        const existingApplications = JSON.parse(
          localStorage.getItem("foa_internship_applications") || "[]"
        );
        const applicationData = {
          applicationId: generatedId,
          submittedAt: new Date().toISOString(),
          ...formData,
        };
        existingApplications.unshift(applicationData);
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
    }, 500);
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

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F5F6F8", color: "#111827", display: "flex", flexDirection: "column", fontFamily: "var(--font-outfit), 'Inter', -apple-system, sans-serif" }}>
      {/* ─── Header Bar ─── */}
      <header style={{ position: "sticky", top: 0, zIndex: 40, backgroundColor: "rgba(255, 255, 255, 0.96)", backdropFilter: "blur(8px)", borderBottom: "1px solid #E5E7EB" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "inherit" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#4F46E5", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "13px" }}>
              FO
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#111827", lineHeight: 1.2 }}>First Option Agency</div>
              <div style={{ fontSize: "11px", color: "#6B7280", fontWeight: 500 }}>Internship Portal</div>
            </div>
          </Link>

          <Link
            href="/"
            style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 600, color: "#4F46E5", textDecoration: "none", padding: "6px 12px", borderRadius: "6px", backgroundColor: "#EEF2FF" }}
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
            <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "#ECFDF5", border: "1px solid #A7F3D0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px auto", color: "#10B981" }}>
              <CheckCircle2 size={32} strokeWidth={2.2} />
            </div>

            <div style={{ display: "inline-block", padding: "3px 10px", backgroundColor: "#EEF2FF", color: "#4F46E5", borderRadius: "999px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "10px" }}>
              Application Submitted
            </div>

            <div style={{ fontSize: "20px", fontWeight: 700, color: "#111827", marginBottom: "8px" }}>
              Thank You, {formData.fullName}!
            </div>
            <div style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.5, marginBottom: "20px" }}>
              Your internship application has been successfully submitted. Our team will review your profile.
            </div>

            {/* Receipt Summary Card */}
            <div style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "12px", padding: "16px", textAlign: "left", marginBottom: "20px", fontSize: "13px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #E5E7EB", paddingBottom: "10px", marginBottom: "10px" }}>
                <span style={{ color: "#6B7280", fontWeight: 500 }}>Reference ID</span>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontFamily: "monospace", fontWeight: 700, color: "#4F46E5", backgroundColor: "#EEF2FF", padding: "2px 6px", borderRadius: "4px" }}>
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
                <span style={{ color: "#6B7280", display: "block", marginBottom: "6px" }}>Skills Added:</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {formData.skills.map((skill) => (
                    <span key={skill} style={{ fontSize: "11px", fontWeight: 600, backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", color: "#374151", padding: "2px 6px", borderRadius: "4px" }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Link
                href="/"
                style={{ display: "block", width: "100%", padding: "11px", borderRadius: "8px", backgroundColor: "#4F46E5", color: "#FFFFFF", fontSize: "14px", fontWeight: 700, textDecoration: "none", textAlign: "center" }}
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
            <div style={{ padding: "18px 16px", borderBottom: "1px solid #E5E7EB", backgroundColor: "#FAF5FF" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "3px 8px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, backgroundColor: "#EEF2FF", color: "#4F46E5", border: "1px solid #C7D2FE", marginBottom: "6px" }}>
                <Sparkles size={12} />
                <span>INTERNSHIP APPLICATION</span>
              </div>
              <div style={{ fontSize: "19px", fontWeight: 700, color: "#111827", lineHeight: 1.25, letterSpacing: "-0.02em" }}>
                Apply for Internship
              </div>
              <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "3px", lineHeight: 1.4 }}>
                Please fill in your details below. Fields marked with <span style={{ color: "#EF4444", fontWeight: 700 }}>*</span> are required.
              </div>
            </div>

            {/* Form Elements */}
            <form onSubmit={handleSubmit} noValidate style={{ padding: "18px 16px", display: "flex", flexDirection: "column", gap: "20px" }}>
              
              {/* ════════ SECTION 1: PERSONAL DETAILS ════════ */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingBottom: "6px", borderBottom: "1px solid #F3F4F6", marginBottom: "12px" }}>
                  <div style={{ width: "20px", height: "20px", borderRadius: "5px", backgroundColor: "#EEF2FF", color: "#4F46E5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700 }}>
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
                      placeholder="e.g. Rahul Sharma"
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
                      placeholder="e.g. rahul.sharma@example.com"
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
              </div>

              {/* ════════ SECTION 2: QUALIFICATION & EDUCATION ════════ */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingBottom: "6px", borderBottom: "1px solid #F3F4F6", marginBottom: "12px" }}>
                  <div style={{ width: "20px", height: "20px", borderRadius: "5px", backgroundColor: "#EEF2FF", color: "#4F46E5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700 }}>
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

              {/* ════════ SECTION 3: SKILLS (SEARCH & SELECT) ════════ */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingBottom: "6px", borderBottom: "1px solid #F3F4F6", marginBottom: "12px" }}>
                  <div style={{ width: "20px", height: "20px", borderRadius: "5px", backgroundColor: "#EEF2FF", color: "#4F46E5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700 }}>
                    3
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>
                    Skills <span style={{ color: "#EF4444" }}>*</span>
                  </div>
                </div>

                <div className={errors.skills ? "has-field-error" : ""}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "4px" }}>
                    Search & Add Skills (e.g. Graphic Design, HTML, JS, Next.js, Premiere Pro, Research)
                  </label>

                  {/* Selected Skill Badges */}
                  <div style={{ minHeight: "40px", padding: "6px", backgroundColor: "#F9FAFB", borderRadius: "8px", border: `1px solid ${errors.skills ? "#EF4444" : "#E5E7EB"}`, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "5px", marginBottom: "8px" }}>
                    {formData.skills.length === 0 ? (
                      <span style={{ fontSize: "12px", color: "#9CA3AF", padding: "2px 4px" }}>
                        Type in the search box below to search and select skills...
                      </span>
                    ) : (
                      formData.skills.map((skill) => (
                        <span
                          key={skill}
                          style={{ display: "inline-flex", alignItems: "center", gap: "4px", backgroundColor: "#FFFFFF", border: "1px solid #C7D2FE", color: "#4F46E5", fontSize: "12px", fontWeight: 600, padding: "2px 8px", borderRadius: "6px" }}
                        >
                          <span>{skill}</span>
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            style={{ background: "none", border: "none", color: "#9CA3AF", cursor: "pointer", display: "flex", alignItems: "center", padding: "0" }}
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))
                    )}
                  </div>

                  {/* Combobox Search Input */}
                  <div style={{ position: "relative" }} ref={skillDropdownRef}>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <div style={{ position: "relative", flex: 1 }}>
                        <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF", pointerEvents: "none" }} />
                        <input
                          type="text"
                          value={skillSearch}
                          onChange={(e) => {
                            setSkillSearch(e.target.value);
                            setIsSkillDropdownOpen(true);
                          }}
                          onFocus={() => setIsSkillDropdownOpen(true)}
                          onKeyDown={handleSkillKeyDown}
                          placeholder="Type skill name to search (e.g. Next.js, Premiere Pro, Research) or custom skill..."
                          style={{ width: "100%", height: "40px", padding: "0 10px 0 32px", fontSize: "13px", backgroundColor: "#FFFFFF", borderRadius: "8px", border: "1px solid #E5E7EB", color: "#111827", outline: "none" }}
                        />
                      </div>

                      {skillSearch.trim() && (
                        <button
                          type="button"
                          onClick={() => addSkill(skillSearch)}
                          style={{ padding: "0 12px", height: "40px", backgroundColor: "#4F46E5", color: "#FFFFFF", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px", cursor: "pointer", flexShrink: 0 }}
                        >
                          <Plus size={14} />
                          <span>Add</span>
                        </button>
                      )}
                    </div>

                    {/* Popover Dropdown Results */}
                    {isSkillDropdownOpen && (
                      <div style={{ position: "absolute", left: 0, right: 0, top: "calc(100% + 4px)", maxHeight: "200px", overflowY: "auto", backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "8px", boxShadow: "0 8px 24px rgba(0,0,0,0.1)", zIndex: 50, padding: "4px" }}>
                        {skillSearch.trim() &&
                          !allFlattenedSkills.some(
                            (s) => s.toLowerCase() === skillSearch.trim().toLowerCase()
                          ) && (
                            <button
                              type="button"
                              onClick={() => addSkill(skillSearch)}
                              style={{ width: "100%", padding: "7px 10px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#4F46E5", backgroundColor: "#EEF2FF", borderRadius: "6px", border: "none", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", marginBottom: "4px" }}
                            >
                              <span>+ Add &ldquo;{skillSearch.trim()}&rdquo; as custom skill</span>
                              <span style={{ fontSize: "10px", textTransform: "uppercase", backgroundColor: "#C7D2FE", padding: "1px 4px", borderRadius: "3px" }}>Custom</span>
                            </button>
                          )}

                        {filteredSkills.slice(0, 15).map((skill) => (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => addSkill(skill)}
                            style={{ width: "100%", padding: "7px 10px", textAlign: "left", fontSize: "13px", color: "#374151", backgroundColor: "transparent", border: "none", borderRadius: "6px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F3F4F6")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                          >
                            <span>{skill}</span>
                            <Plus size={12} color="#9CA3AF" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {errors.skills && (
                    <div style={{ fontSize: "11px", color: "#EF4444", marginTop: "3px", fontWeight: 500 }}>
                      {errors.skills}
                    </div>
                  )}
                </div>
              </div>

              {/* ════════ SECTION 4: ABOUT YOURSELF ════════ */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingBottom: "6px", borderBottom: "1px solid #F3F4F6", marginBottom: "12px" }}>
                  <div style={{ width: "20px", height: "20px", borderRadius: "5px", backgroundColor: "#EEF2FF", color: "#4F46E5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700 }}>
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
                    placeholder="Briefly introduce yourself: your background, skills, practical projects you've worked on, and what you are passionate about..."
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

                {/* Resume Link */}
                <div>
                  <label htmlFor="resumeUrl" style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "4px" }}>
                    Resume / Drive / Portfolio Link <span style={{ fontSize: "11px", fontWeight: 400, color: "#6B7280" }}>(Optional)</span>
                  </label>
                  <input
                    type="url"
                    id="resumeUrl"
                    name="resumeUrl"
                    value={formData.resumeUrl}
                    onChange={handleInputChange}
                    placeholder="https://drive.google.com/file/... or link"
                    style={{ width: "100%", height: "40px", padding: "0 12px", fontSize: "14px", backgroundColor: "#FFFFFF", borderRadius: "8px", border: "1px solid #E5E7EB", color: "#111827", outline: "none" }}
                  />
                </div>
              </div>

              {/* ════════ SUBMIT ACTION ════════ */}
              <div style={{ paddingTop: "14px", borderTop: "1px solid #E5E7EB", display: "flex", flexDirection: "column", gap: "10px" }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ width: "100%", height: "44px", borderRadius: "8px", backgroundColor: isSubmitting ? "#818CF8" : "#4F46E5", color: "#FFFFFF", fontSize: "14px", fontWeight: 700, border: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", cursor: isSubmitting ? "not-allowed" : "pointer", boxShadow: "0 1px 3px rgba(79, 70, 229, 0.2)" }}
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
                  <Lock size={12} color="#9CA3AF" />
                  <span>Your details are kept confidential and used solely for screening.</span>
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
          <div style={{ color: "#9CA3AF" }}>Internship Recruitment Portal</div>
        </div>
      </footer>
    </div>
  );
}
