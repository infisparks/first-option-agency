"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { ref, get } from "firebase/database";
import { auth, rtdb, ADMIN_UID } from "@/app/lib/firebase";
import {
  Lock,
  Mail,
  KeyRound,
  Loader2,
  LogOut,
  Users,
  Search,
  Download,
  Calendar,
  ExternalLink,
  ShieldAlert,
  ArrowLeft,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  BadgeIndianRupee,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Heart,
  Globe,
} from "lucide-react";

// Types
interface InternshipRecord {
  applicationId: string;
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  city: string;
  gender?: string;
  qualification: string;
  passingYear: string;
  skills: string[];
  aboutYourself: string;
  resumeUrl?: string;
  submittedAt: string;
  leadType?: "women" | "common" | "amount" | string;
  paymentStatus?: "Paid" | "Free" | "Unpaid" | "Pending" | string;
  paymentId?: string;
  amountPaid?: number | string;
  orderId?: string;
  paidAt?: string;
}

interface SalesRecord {
  applicationId: string;
  fullName: string;
  phone: string;
  countryCode: string;
  city: string;
  email: string;
  age: string;
  hasSalesExperience: boolean;
  salesExperienceDetails?: string;
  hasAgencyOrCommissionSales: boolean;
  productsSoldBefore: string;
  expensiveObjectionHandling: string;
  whyGoodAtSales: string;
  submittedAt: string;
}

interface UnifiedAdminProps {
  initialTab?: "internship" | "sales";
}

// Helper: Determine Lead Type
// If leadType is missing (all existing/old data), treat as "women"
export const getInternshipLeadType = (app: InternshipRecord): "women" | "common" | "amount" => {
  if (app.leadType === "amount" || app.paymentStatus === "Paid" || Boolean(app.paymentId)) {
    return "amount";
  }
  if (app.leadType === "common") {
    return "common";
  }
  // Default assumption: If leadType is "women" OR undefined/empty, it's a Women form lead
  return "women";
};

export default function UnifiedAdminClient({ initialTab = "internship" }: UnifiedAdminProps) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<"internship" | "sales">(
    tabParam === "sales" || initialTab === "sales" ? "sales" : "internship"
  );

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Data states
  const [internships, setInternships] = useState<InternshipRecord[]>([]);
  const [salesApps, setSalesApps] = useState<SalesRecord[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  // Search & Filter states
  const [internshipSearch, setInternshipSearch] = useState("");
  const [internshipTypeFilter, setInternshipTypeFilter] = useState<"ALL" | "WOMEN" | "COMMON" | "AMOUNT">("ALL");

  const [salesSearch, setSalesSearch] = useState("");
  const [salesFilter, setSalesFilter] = useState<"ALL" | "EXPERIENCED" | "AGENCY">("ALL");

  // Sync tab from query param if changed
  useEffect(() => {
    if (tabParam === "sales") {
      setActiveTab("sales");
    } else if (tabParam === "internship") {
      setActiveTab("internship");
    }
  }, [tabParam]);

  // Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        const isAdmin = user.uid === ADMIN_UID;
        setIsAdminUser(isAdmin);
        if (isAdmin) {
          fetchAllData();
        }
      } else {
        setIsAdminUser(false);
        setInternships([]);
        setSalesApps([]);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch both Internship & Sales data in parallel
  const fetchAllData = async () => {
    setDataLoading(true);
    try {
      const internshipRef = ref(rtdb, "internship_applications");
      const salesRef = ref(rtdb, "sales_consultant_applications");

      const [internshipSnap, salesSnap] = await Promise.allSettled([
        get(internshipRef),
        get(salesRef),
      ]);

      if (internshipSnap.status === "fulfilled" && internshipSnap.value.exists()) {
        const val = internshipSnap.value.val();
        const list: InternshipRecord[] = Object.values(val);
        list.sort((a, b) => (b.submittedAt || "").localeCompare(a.submittedAt || ""));
        setInternships(list);
      } else {
        const localSaved = JSON.parse(
          localStorage.getItem("foa_internship_applications") || "[]"
        );
        setInternships(localSaved);
      }

      if (salesSnap.status === "fulfilled" && salesSnap.value.exists()) {
        const val = salesSnap.value.val();
        const list: SalesRecord[] = Object.values(val);
        list.sort((a, b) => (b.submittedAt || "").localeCompare(a.submittedAt || ""));
        setSalesApps(list);
      } else {
        const localSaved = JSON.parse(
          localStorage.getItem("foa_sales_applications") || "[]"
        );
        setSalesApps(localSaved);
      }
    } catch (err: any) {
      console.warn("Unified Admin fetch note:", err?.message);
    } finally {
      setDataLoading(false);
    }
  };

  // Login Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user.uid !== ADMIN_UID) {
        setLoginError("Access Restricted: This account does not have Admin privileges.");
      }
    } catch (err: any) {
      console.error(err);
      setLoginError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  // Logout Handler
  const handleLogout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    setIsAdminUser(false);
    setInternships([]);
    setSalesApps([]);
  };

  // Export Internship CSV
  const handleExportInternshipCSV = () => {
    if (internships.length === 0) return;
    const headers = [
      "Application ID",
      "Lead Source Type",
      "Full Name",
      "Gender",
      "Email",
      "Phone",
      "City",
      "Qualification",
      "Passing Year",
      "Skills",
      "Payment Status",
      "Amount Paid (INR)",
      "Payment ID",
      "Order ID",
      "Submitted At",
      "Introduction",
      "Resume Link",
    ];

    const rows = internships.map((app) => {
      const lType = getInternshipLeadType(app);
      const isPaid = lType === "amount";
      const leadLabel =
        lType === "women"
          ? "Women Drive (Free)"
          : lType === "common"
          ? "Common Free"
          : "Common + Amount (₹5,000)";

      return [
        `"${app.applicationId || ""}"`,
        `"${leadLabel}"`,
        `"${app.fullName || ""}"`,
        `"${app.gender || (lType === "women" ? "Female" : "Not specified")}"`,
        `"${app.email || ""}"`,
        `"${app.countryCode || "+91"} ${app.phone || ""}"`,
        `"${app.city || ""}"`,
        `"${app.qualification || ""}"`,
        `"${app.passingYear || ""}"`,
        `"${(app.skills || []).join(", ")}"`,
        `"${isPaid ? "Paid" : "Free (No Payment)"}"`,
        `"${isPaid ? String(app.amountPaid || "5000") : "0"}"`,
        `"${isPaid ? (app.paymentId || "Verified") : "N/A"}"`,
        `"${app.orderId || "N/A"}"`,
        `"${app.paidAt || app.submittedAt || ""}"`,
        `"${(app.aboutYourself || "").replace(/"/g, '""')}"`,
        `"${app.resumeUrl || ""}"`,
      ];
    });

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `internship_applications_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Sales CSV
  const handleExportSalesCSV = () => {
    if (salesApps.length === 0) return;
    const headers = [
      "Application ID",
      "Full Name",
      "Age",
      "Email",
      "Phone",
      "City",
      "Has Sales Experience",
      "Sales Experience Details",
      "Agency / Commission Experience",
      "Products / Services Sold Before",
      "Objection Handling (Too Expensive)",
      "Why Good At Sales",
      "Submitted At",
    ];

    const rows = salesApps.map((app) => [
      `"${app.applicationId || ""}"`,
      `"${app.fullName || ""}"`,
      `"${app.age || ""}"`,
      `"${app.email || ""}"`,
      `"${app.countryCode || "+91"} ${app.phone || ""}"`,
      `"${app.city || ""}"`,
      `"${app.hasSalesExperience ? "Yes" : "No"}"`,
      `"${(app.salesExperienceDetails || "").replace(/"/g, '""')}"`,
      `"${app.hasAgencyOrCommissionSales ? "Yes" : "No"}"`,
      `"${(app.productsSoldBefore || "").replace(/"/g, '""')}"`,
      `"${(app.expensiveObjectionHandling || "").replace(/"/g, '""')}"`,
      `"${(app.whyGoodAtSales || "").replace(/"/g, '""')}"`,
      `"${app.submittedAt || ""}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `sales_consultant_applications_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Internship Metrics
  const totalInternships = internships.length;
  const womenCount = internships.filter((a) => getInternshipLeadType(a) === "women").length;
  const commonCount = internships.filter((a) => getInternshipLeadType(a) === "common").length;
  const amountCount = internships.filter((a) => getInternshipLeadType(a) === "amount").length;
  const totalRevenue = amountCount * 5000;

  // Filtered Internships
  const filteredInternships = internships.filter((app) => {
    const lType = getInternshipLeadType(app);
    if (internshipTypeFilter === "WOMEN" && lType !== "women") return false;
    if (internshipTypeFilter === "COMMON" && lType !== "common") return false;
    if (internshipTypeFilter === "AMOUNT" && lType !== "amount") return false;

    const q = internshipSearch.toLowerCase();
    return (
      app.fullName?.toLowerCase().includes(q) ||
      app.email?.toLowerCase().includes(q) ||
      app.phone?.includes(q) ||
      app.city?.toLowerCase().includes(q) ||
      app.skills?.some((s) => s.toLowerCase().includes(q)) ||
      app.applicationId?.toLowerCase().includes(q) ||
      app.paymentId?.toLowerCase().includes(q)
    );
  });

  // Sales Metrics
  const totalSales = salesApps.length;
  const experiencedSales = salesApps.filter((a) => a.hasSalesExperience).length;
  const agencySales = salesApps.filter((a) => a.hasAgencyOrCommissionSales).length;

  // Filtered Sales
  const filteredSales = salesApps.filter((app) => {
    if (salesFilter === "EXPERIENCED" && !app.hasSalesExperience) return false;
    if (salesFilter === "AGENCY" && !app.hasAgencyOrCommissionSales) return false;

    const q = salesSearch.toLowerCase();
    return (
      app.fullName?.toLowerCase().includes(q) ||
      app.email?.toLowerCase().includes(q) ||
      app.phone?.includes(q) ||
      app.city?.toLowerCase().includes(q) ||
      app.applicationId?.toLowerCase().includes(q) ||
      app.productsSoldBefore?.toLowerCase().includes(q)
    );
  });

  if (authLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F5F6F8",
        }}
      >
        <Loader2 size={32} className="animate-spin text-[#7C3AED]" />
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F5F6F8",
        color: "#111827",
        display: "flex",
        flexDirection: "column",
        fontFamily: "var(--font-outfit), 'Inter', sans-serif",
      }}
    >
      {/* ─── Unified Header ─── */}
      <header
        style={{
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
            <div style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>
              First Option Agency
            </div>
            <div style={{ fontSize: "11px", color: "#7C3AED", fontWeight: 600 }}>
              Master Admin Portal
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Link
            href={activeTab === "internship" ? "/internship" : "/sales-consultant"}
            style={{
              fontSize: "12px",
              color: "#6B7280",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "5px 10px",
              borderRadius: "6px",
              backgroundColor: "#F9FAFB",
              border: "1px solid #E5E7EB",
            }}
          >
            <ArrowLeft size={14} />
            <span>Public Form</span>
          </Link>

          {currentUser && (
            <button
              onClick={handleLogout}
              style={{
                fontSize: "12px",
                color: "#EF4444",
                backgroundColor: "#FEF2F2",
                border: "1px solid #FCA5A5",
                padding: "5px 10px",
                borderRadius: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontWeight: 600,
              }}
            >
              <LogOut size={13} />
              <span>Sign Out</span>
            </button>
          )}
        </div>
      </header>

      {/* ─── Main Workspace ─── */}
      <main
        style={{
          flex: 1,
          padding: "20px 16px 48px 16px",
          maxWidth: "1160px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        {!currentUser ? (
          /* ─── SINGLE ADMIN LOGIN FORM ─── */
          <div
            style={{
              maxWidth: "420px",
              margin: "40px auto",
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              border: "1px solid #E5E7EB",
              padding: "30px 24px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                backgroundColor: "#F5F3FF",
                color: "#7C3AED",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px auto",
              }}
            >
              <Lock size={24} />
            </div>

            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div style={{ fontSize: "18px", fontWeight: 700, color: "#111827" }}>
                Master Admin Sign In
              </div>
              <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "4px" }}>
                Sign in to manage Internship Leads (Women / Common / Paid) &amp; Sales Applications.
              </div>
            </div>

            {loginError && (
              <div
                style={{
                  padding: "10px",
                  backgroundColor: "#FEF2F2",
                  border: "1px solid #FCA5A5",
                  borderRadius: "8px",
                  color: "#991B1B",
                  fontSize: "12px",
                  marginBottom: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <ShieldAlert size={15} color="#EF4444" />
                <span>{loginError}</span>
              </div>
            )}

            <form
              onSubmit={handleLogin}
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: "5px",
                  }}
                >
                  Admin Email
                </label>
                <div style={{ position: "relative" }}>
                  <Mail
                    size={15}
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#9CA3AF",
                    }}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter admin email"
                    required
                    style={{
                      width: "100%",
                      height: "40px",
                      padding: "0 10px 0 32px",
                      fontSize: "13px",
                      backgroundColor: "#FFFFFF",
                      borderRadius: "8px",
                      border: "1px solid #E5E7EB",
                      color: "#111827",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: "5px",
                  }}
                >
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <KeyRound
                    size={15}
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#9CA3AF",
                    }}
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    style={{
                      width: "100%",
                      height: "40px",
                      padding: "0 10px 0 32px",
                      fontSize: "13px",
                      backgroundColor: "#FFFFFF",
                      borderRadius: "8px",
                      border: "1px solid #E5E7EB",
                      color: "#111827",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                style={{
                  width: "100%",
                  height: "42px",
                  borderRadius: "8px",
                  backgroundColor: loginLoading ? "#A78BFA" : "#7C3AED",
                  color: "#FFFFFF",
                  fontSize: "13px",
                  fontWeight: 700,
                  border: "none",
                  cursor: loginLoading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  marginTop: "6px",
                }}
              >
                {loginLoading ? <Loader2 size={16} className="animate-spin" /> : "Sign In to Master Admin"}
              </button>
            </form>
          </div>
        ) : !isAdminUser ? (
          /* ─── ACCESS RESTRICTED ─── */
          <div
            style={{
              maxWidth: "440px",
              margin: "40px auto",
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              border: "1px solid #FCA5A5",
              padding: "30px 24px",
              textAlign: "center",
            }}
          >
            <ShieldAlert size={40} color="#EF4444" style={{ margin: "0 auto 12px auto" }} />
            <div style={{ fontSize: "18px", fontWeight: 700, color: "#991B1B", marginBottom: "6px" }}>
              Access Restricted
            </div>
            <div style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.5, marginBottom: "18px" }}>
              You are logged in as <strong>{currentUser.email}</strong>, but do not have admin permissions.
            </div>
            <button
              onClick={handleLogout}
              style={{
                padding: "8px 18px",
                backgroundColor: "#7C3AED",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Sign Out &amp; Switch Account
            </button>
          </div>
        ) : (
          /* ─── UNIFIED LOGGED IN DASHBOARD ─── */
          <div>
            {/* ═══ MASTER SWITCH TABS ═══ */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "14px",
                border: "1px solid #E5E7EB",
                padding: "6px",
                marginBottom: "20px",
                display: "flex",
                gap: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
              }}
            >
              <button
                type="button"
                onClick={() => setActiveTab("internship")}
                style={{
                  flex: 1,
                  padding: "10px 16px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: "none",
                  backgroundColor: activeTab === "internship" ? "#7C3AED" : "transparent",
                  color: activeTab === "internship" ? "#FFFFFF" : "#4B5563",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.15s ease",
                  boxShadow:
                    activeTab === "internship" ? "0 2px 8px rgba(124, 58, 237, 0.25)" : "none",
                }}
              >
                <GraduationCap size={18} />
                <span>Internship Applications</span>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "2px 7px",
                    borderRadius: "999px",
                    backgroundColor: activeTab === "internship" ? "rgba(255,255,255,0.25)" : "#F3F4F6",
                    color: activeTab === "internship" ? "#FFFFFF" : "#6B7280",
                  }}
                >
                  {totalInternships}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("sales")}
                style={{
                  flex: 1,
                  padding: "10px 16px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: "none",
                  backgroundColor: activeTab === "sales" ? "#7C3AED" : "transparent",
                  color: activeTab === "sales" ? "#FFFFFF" : "#4B5563",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.15s ease",
                  boxShadow:
                    activeTab === "sales" ? "0 2px 8px rgba(124, 58, 237, 0.25)" : "none",
                }}
              >
                <Briefcase size={18} />
                <span>Sales Consultant Applications</span>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "2px 7px",
                    borderRadius: "999px",
                    backgroundColor: activeTab === "sales" ? "rgba(255,255,255,0.25)" : "#F3F4F6",
                    color: activeTab === "sales" ? "#FFFFFF" : "#6B7280",
                  }}
                >
                  {totalSales}
                </span>
              </button>
            </div>

            {/* ═══════════════════════════════════════════════
                 TAB 1: INTERNSHIP APPLICATIONS
               ═══════════════════════════════════════════════ */}
            {activeTab === "internship" && (
              <div>
                {/* 4 Multi-Lead Stat Overview Cards */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "12px",
                    marginBottom: "16px",
                  }}
                >
                  {/* Total Applicants */}
                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "12px",
                      padding: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "12px", color: "#6B7280", fontWeight: 500 }}>
                        Total Applicants
                      </div>
                      <div style={{ fontSize: "22px", fontWeight: 800, color: "#111827", marginTop: "2px" }}>
                        {totalInternships}
                      </div>
                    </div>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        backgroundColor: "#F5F3FF",
                        color: "#7C3AED",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Users size={20} />
                    </div>
                  </div>

                  {/* Women Drive Leads */}
                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #FBCFE8",
                      borderRadius: "12px",
                      padding: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "12px", color: "#BE185D", fontWeight: 600 }}>
                        🌸 Women Drive Leads
                      </div>
                      <div style={{ fontSize: "22px", fontWeight: 800, color: "#BE185D", marginTop: "2px" }}>
                        {womenCount}
                      </div>
                    </div>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        backgroundColor: "#FDF2F8",
                        color: "#BE185D",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Heart size={20} />
                    </div>
                  </div>

                  {/* Common Free Leads */}
                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #BFDBFE",
                      borderRadius: "12px",
                      padding: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "12px", color: "#1D4ED8", fontWeight: 600 }}>
                        🌐 Common Free Leads
                      </div>
                      <div style={{ fontSize: "22px", fontWeight: 800, color: "#1D4ED8", marginTop: "2px" }}>
                        {commonCount}
                      </div>
                    </div>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        backgroundColor: "#EFF6FF",
                        color: "#1D4ED8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Globe size={20} />
                    </div>
                  </div>

                  {/* Common + Amount (₹5k Paid) */}
                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #A7F3D0",
                      borderRadius: "12px",
                      padding: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "12px", color: "#065F46", fontWeight: 600 }}>
                        💳 Paid Leads (₹5k)
                      </div>
                      <div style={{ fontSize: "22px", fontWeight: 800, color: "#059669", marginTop: "2px" }}>
                        {amountCount}
                      </div>
                    </div>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        backgroundColor: "#ECFDF5",
                        color: "#059669",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <BadgeIndianRupee size={20} />
                    </div>
                  </div>
                </div>

                {/* Filter & Search Bar */}
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "12px",
                    border: "1px solid #E5E7EB",
                    padding: "14px 16px",
                    marginBottom: "16px",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    <button
                      type="button"
                      onClick={() => setInternshipTypeFilter("ALL")}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        border: internshipTypeFilter === "ALL" ? "1px solid #7C3AED" : "1px solid #E5E7EB",
                        backgroundColor: internshipTypeFilter === "ALL" ? "#F5F3FF" : "#FFFFFF",
                        color: internshipTypeFilter === "ALL" ? "#7C3AED" : "#4B5563",
                      }}
                    >
                      All Leads ({totalInternships})
                    </button>

                    <button
                      type="button"
                      onClick={() => setInternshipTypeFilter("WOMEN")}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        border: internshipTypeFilter === "WOMEN" ? "1px solid #BE185D" : "1px solid #E5E7EB",
                        backgroundColor: internshipTypeFilter === "WOMEN" ? "#FDF2F8" : "#FFFFFF",
                        color: internshipTypeFilter === "WOMEN" ? "#BE185D" : "#4B5563",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Heart size={13} color="#BE185D" />
                      <span>Women Leads ({womenCount})</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setInternshipTypeFilter("COMMON")}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        border: internshipTypeFilter === "COMMON" ? "1px solid #1D4ED8" : "1px solid #E5E7EB",
                        backgroundColor: internshipTypeFilter === "COMMON" ? "#EFF6FF" : "#FFFFFF",
                        color: internshipTypeFilter === "COMMON" ? "#1D4ED8" : "#4B5563",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Globe size={13} color="#1D4ED8" />
                      <span>Common Free ({commonCount})</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setInternshipTypeFilter("AMOUNT")}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        border: internshipTypeFilter === "AMOUNT" ? "1px solid #059669" : "1px solid #E5E7EB",
                        backgroundColor: internshipTypeFilter === "AMOUNT" ? "#ECFDF5" : "#FFFFFF",
                        color: internshipTypeFilter === "AMOUNT" ? "#047857" : "#4B5563",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <CheckCircle2 size={13} color="#059669" />
                      <span>Paid Leads ({amountCount})</span>
                    </button>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                    <div style={{ position: "relative" }}>
                      <Search
                        size={14}
                        style={{
                          position: "absolute",
                          left: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#9CA3AF",
                        }}
                      />
                      <input
                        type="text"
                        value={internshipSearch}
                        onChange={(e) => setInternshipSearch(e.target.value)}
                        placeholder="Search name, phone, email..."
                        style={{
                          height: "36px",
                          padding: "0 10px 0 30px",
                          fontSize: "12px",
                          borderRadius: "6px",
                          border: "1px solid #E5E7EB",
                          backgroundColor: "#FFFFFF",
                          outline: "none",
                          width: "220px",
                        }}
                      />
                    </div>

                    <button
                      onClick={fetchAllData}
                      style={{
                        height: "36px",
                        padding: "0 10px",
                        borderRadius: "6px",
                        border: "1px solid #E5E7EB",
                        backgroundColor: "#FFFFFF",
                        fontSize: "12px",
                        color: "#374151",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                      title="Refresh"
                    >
                      <RefreshCw size={13} className={dataLoading ? "animate-spin" : ""} />
                      <span>Refresh</span>
                    </button>

                    <button
                      onClick={handleExportInternshipCSV}
                      disabled={internships.length === 0}
                      style={{
                        height: "36px",
                        padding: "0 12px",
                        borderRadius: "6px",
                        border: "none",
                        backgroundColor: "#7C3AED",
                        color: "#FFFFFF",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Download size={13} />
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>

                {/* Internship List */}
                {dataLoading ? (
                  <div style={{ padding: "60px 0", textAlign: "center", color: "#6B7280" }}>
                    <Loader2 size={24} className="animate-spin" style={{ margin: "0 auto 8px auto", color: "#7C3AED" }} />
                    <div style={{ fontSize: "13px" }}>Loading internship records...</div>
                  </div>
                ) : filteredInternships.length === 0 ? (
                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "12px",
                      border: "1px solid #E5E7EB",
                      padding: "40px 20px",
                      textAlign: "center",
                      color: "#6B7280",
                    }}
                  >
                    <Users size={32} style={{ margin: "0 auto 10px auto", color: "#9CA3AF" }} />
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>
                      No Internship Applications Found
                    </div>
                    <div style={{ fontSize: "12px", marginTop: "4px" }}>
                      {internshipSearch || internshipTypeFilter !== "ALL"
                        ? "No records match your filter."
                        : "Submissions will appear here in real time."}
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px" }}>
                    {filteredInternships.map((app) => {
                      const lType = getInternshipLeadType(app);
                      const isPaid = lType === "amount";

                      return (
                        <div
                          key={app.applicationId}
                          style={{
                            backgroundColor: "#FFFFFF",
                            borderRadius: "12px",
                            border:
                              lType === "women"
                                ? "1px solid #FBCFE8"
                                : lType === "common"
                                ? "1px solid #BFDBFE"
                                : "1px solid #A7F3D0",
                            padding: "16px",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              gap: "8px",
                              borderBottom: "1px solid #F3F4F6",
                              paddingBottom: "10px",
                              marginBottom: "10px",
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                              <span
                                style={{
                                  fontFamily: "monospace",
                                  fontSize: "11px",
                                  fontWeight: 700,
                                  color: "#7C3AED",
                                  backgroundColor: "#F5F3FF",
                                  padding: "2px 8px",
                                  borderRadius: "4px",
                                }}
                              >
                                {app.applicationId}
                              </span>

                              <span style={{ fontSize: "16px", fontWeight: 700, color: "#111827" }}>
                                {app.fullName}
                              </span>

                              {/* Lead Source Badge */}
                              {lType === "women" ? (
                                <span
                                  style={{
                                    fontSize: "11px",
                                    fontWeight: 700,
                                    backgroundColor: "#FDF2F8",
                                    color: "#BE185D",
                                    border: "1px solid #FBCFE8",
                                    padding: "2px 8px",
                                    borderRadius: "999px",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "3px",
                                  }}
                                >
                                  <Heart size={11} />
                                  <span>Women Drive</span>
                                </span>
                              ) : lType === "common" ? (
                                <span
                                  style={{
                                    fontSize: "11px",
                                    fontWeight: 700,
                                    backgroundColor: "#EFF6FF",
                                    color: "#1D4ED8",
                                    border: "1px solid #BFDBFE",
                                    padding: "2px 8px",
                                    borderRadius: "999px",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "3px",
                                  }}
                                >
                                  <Globe size={11} />
                                  <span>Common Free</span>
                                </span>
                              ) : (
                                <span
                                  style={{
                                    fontSize: "11px",
                                    fontWeight: 700,
                                    backgroundColor: "#ECFDF5",
                                    color: "#047857",
                                    border: "1px solid #A7F3D0",
                                    padding: "2px 8px",
                                    borderRadius: "999px",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "3px",
                                  }}
                                >
                                  <CheckCircle2 size={11} />
                                  <span>Common + Paid (₹5k)</span>
                                </span>
                              )}

                              {/* Gender Display */}
                              <span
                                style={{
                                  fontSize: "11px",
                                  color: "#4B5563",
                                  backgroundColor: "#F3F4F6",
                                  padding: "2px 7px",
                                  borderRadius: "4px",
                                  fontWeight: 600,
                                }}
                              >
                                {app.gender || (lType === "women" ? "Female" : "Applicant")}
                              </span>

                              {/* Payment Status Display */}
                              {isPaid ? (
                                <span
                                  style={{
                                    fontSize: "11px",
                                    fontWeight: 700,
                                    backgroundColor: "#ECFDF5",
                                    color: "#047857",
                                    border: "1px solid #A7F3D0",
                                    padding: "2px 8px",
                                    borderRadius: "999px",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "4px",
                                  }}
                                >
                                  <CheckCircle2 size={12} color="#059669" />
                                  <span>Paid (₹{app.amountPaid || "5,000"})</span>
                                </span>
                              ) : (
                                <span
                                  style={{
                                    fontSize: "11px",
                                    fontWeight: 600,
                                    backgroundColor: "#F9FAFB",
                                    color: "#6B7280",
                                    border: "1px solid #E5E7EB",
                                    padding: "2px 7px",
                                    borderRadius: "999px",
                                  }}
                                >
                                  Free Form
                                </span>
                              )}
                            </div>

                            <div
                              style={{
                                fontSize: "11px",
                                color: "#9CA3AF",
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <Calendar size={12} />
                              <span>{app.submittedAt ? new Date(app.submittedAt).toLocaleString() : "Recent"}</span>
                            </div>
                          </div>

                          {/* Payment details if paid */}
                          {isPaid && app.paymentId && (
                            <div
                              style={{
                                backgroundColor: "#F0FDF4",
                                border: "1px solid #DCFCE7",
                                borderRadius: "6px",
                                padding: "6px 10px",
                                fontSize: "11px",
                                color: "#166534",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                                gap: "6px",
                                marginBottom: "10px",
                              }}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <CreditCard size={13} color="#16A34A" />
                                <span>
                                  <strong>Razorpay Payment ID:</strong>{" "}
                                  <code style={{ fontFamily: "monospace", fontWeight: 700 }}>{app.paymentId}</code>
                                </span>
                              </div>
                              {app.paidAt && (
                                <span style={{ color: "#15803D" }}>
                                  Paid on: {new Date(app.paidAt).toLocaleString()}
                                </span>
                              )}
                            </div>
                          )}

                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                              gap: "10px",
                              fontSize: "12px",
                              marginBottom: "10px",
                            }}
                          >
                            <div>
                              <span style={{ color: "#6B7280" }}>Contact: </span>
                              <a
                                href={`tel:${app.phone}`}
                                style={{ color: "#7C3AED", fontWeight: 600, textDecoration: "none" }}
                              >
                                {app.countryCode || "+91"} {app.phone}
                              </a>
                            </div>

                            <div>
                              <span style={{ color: "#6B7280" }}>Email: </span>
                              <a
                                href={`mailto:${app.email}`}
                                style={{ color: "#7C3AED", fontWeight: 600, textDecoration: "none" }}
                              >
                                {app.email}
                              </a>
                            </div>

                            <div>
                              <span style={{ color: "#6B7280" }}>City: </span>
                              <strong style={{ color: "#111827" }}>{app.city}</strong>
                            </div>

                            <div>
                              <span style={{ color: "#6B7280" }}>Qualification: </span>
                              <strong style={{ color: "#111827" }}>
                                {app.qualification} ({app.passingYear})
                              </strong>
                            </div>
                          </div>

                          <div style={{ marginBottom: "10px" }}>
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: 600,
                                color: "#6B7280",
                                display: "block",
                                marginBottom: "4px",
                              }}
                            >
                              Tracks:
                            </span>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                              {(app.skills || []).map((skill) => (
                                <span
                                  key={skill}
                                  style={{
                                    fontSize: "11px",
                                    fontWeight: 600,
                                    backgroundColor: "#F9FAFB",
                                    border: "1px solid #E5E7EB",
                                    color: "#374151",
                                    padding: "1px 7px",
                                    borderRadius: "4px",
                                  }}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>

                          {app.aboutYourself && (
                            <div
                              style={{
                                backgroundColor: "#F9FAFB",
                                padding: "8px 10px",
                                borderRadius: "6px",
                                fontSize: "12px",
                                color: "#4B5563",
                                lineHeight: 1.4,
                                marginBottom: "8px",
                              }}
                            >
                              <strong style={{ color: "#111827" }}>Intro: </strong>
                              {app.aboutYourself}
                            </div>
                          )}

                          {app.resumeUrl && (
                            <a
                              href={app.resumeUrl}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                fontSize: "12px",
                                color: "#7C3AED",
                                textDecoration: "none",
                                fontWeight: 600,
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <ExternalLink size={12} />
                              <span>View Attached Resume / Portfolio</span>
                            </a>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ═══════════════════════════════════════════════
                 TAB 2: SALES CONSULTANT APPLICATIONS
               ═══════════════════════════════════════════════ */}
            {activeTab === "sales" && (
              <div>
                {/* Sales Stats Overview */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "12px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "12px",
                      padding: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "12px", color: "#6B7280", fontWeight: 500 }}>
                        Total Sales Candidates
                      </div>
                      <div style={{ fontSize: "22px", fontWeight: 800, color: "#111827", marginTop: "2px" }}>
                        {totalSales}
                      </div>
                    </div>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        backgroundColor: "#F5F3FF",
                        color: "#7C3AED",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Users size={20} />
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "12px",
                      padding: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "12px", color: "#065F46", fontWeight: 600 }}>
                        Prior Sales Experience
                      </div>
                      <div style={{ fontSize: "22px", fontWeight: 800, color: "#059669", marginTop: "2px" }}>
                        {experiencedSales}
                      </div>
                    </div>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        backgroundColor: "#ECFDF5",
                        color: "#059669",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <TrendingUp size={20} />
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "12px",
                      padding: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "12px", color: "#6B7280", fontWeight: 500 }}>
                        Agency / Commission Exp.
                      </div>
                      <div style={{ fontSize: "22px", fontWeight: 800, color: "#7C3AED", marginTop: "2px" }}>
                        {agencySales}
                      </div>
                    </div>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        backgroundColor: "#EDE9FE",
                        color: "#7C3AED",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Briefcase size={20} />
                    </div>
                  </div>
                </div>

                {/* Sales Filter & Search */}
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "12px",
                    border: "1px solid #E5E7EB",
                    padding: "14px 16px",
                    marginBottom: "16px",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    <button
                      type="button"
                      onClick={() => setSalesFilter("ALL")}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        border: salesFilter === "ALL" ? "1px solid #7C3AED" : "1px solid #E5E7EB",
                        backgroundColor: salesFilter === "ALL" ? "#F5F3FF" : "#FFFFFF",
                        color: salesFilter === "ALL" ? "#7C3AED" : "#4B5563",
                      }}
                    >
                      All ({totalSales})
                    </button>

                    <button
                      type="button"
                      onClick={() => setSalesFilter("EXPERIENCED")}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        border: salesFilter === "EXPERIENCED" ? "1px solid #059669" : "1px solid #E5E7EB",
                        backgroundColor: salesFilter === "EXPERIENCED" ? "#ECFDF5" : "#FFFFFF",
                        color: salesFilter === "EXPERIENCED" ? "#047857" : "#4B5563",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <CheckCircle2 size={13} color="#059669" />
                      <span>Has Sales Exp ({experiencedSales})</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSalesFilter("AGENCY")}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        border: salesFilter === "AGENCY" ? "1px solid #7C3AED" : "1px solid #E5E7EB",
                        backgroundColor: salesFilter === "AGENCY" ? "#F5F3FF" : "#FFFFFF",
                        color: salesFilter === "AGENCY" ? "#7C3AED" : "#4B5563",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Briefcase size={13} color="#7C3AED" />
                      <span>Agency Exp ({agencySales})</span>
                    </button>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                    <div style={{ position: "relative" }}>
                      <Search
                        size={14}
                        style={{
                          position: "absolute",
                          left: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#9CA3AF",
                        }}
                      />
                      <input
                        type="text"
                        value={salesSearch}
                        onChange={(e) => setSalesSearch(e.target.value)}
                        placeholder="Search name, phone, city..."
                        style={{
                          height: "36px",
                          padding: "0 10px 0 30px",
                          fontSize: "12px",
                          borderRadius: "6px",
                          border: "1px solid #E5E7EB",
                          backgroundColor: "#FFFFFF",
                          outline: "none",
                          width: "220px",
                        }}
                      />
                    </div>

                    <button
                      onClick={fetchAllData}
                      style={{
                        height: "36px",
                        padding: "0 10px",
                        borderRadius: "6px",
                        border: "1px solid #E5E7EB",
                        backgroundColor: "#FFFFFF",
                        fontSize: "12px",
                        color: "#374151",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                      title="Refresh"
                    >
                      <RefreshCw size={13} className={dataLoading ? "animate-spin" : ""} />
                      <span>Refresh</span>
                    </button>

                    <button
                      onClick={handleExportSalesCSV}
                      disabled={salesApps.length === 0}
                      style={{
                        height: "36px",
                        padding: "0 12px",
                        borderRadius: "6px",
                        border: "none",
                        backgroundColor: "#7C3AED",
                        color: "#FFFFFF",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Download size={13} />
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>

                {/* Sales List */}
                {dataLoading ? (
                  <div style={{ padding: "60px 0", textAlign: "center", color: "#6B7280" }}>
                    <Loader2 size={24} className="animate-spin" style={{ margin: "0 auto 8px auto", color: "#7C3AED" }} />
                    <div style={{ fontSize: "13px" }}>Loading sales applications...</div>
                  </div>
                ) : filteredSales.length === 0 ? (
                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "12px",
                      border: "1px solid #E5E7EB",
                      padding: "40px 20px",
                      textAlign: "center",
                      color: "#6B7280",
                    }}
                  >
                    <Users size={32} style={{ margin: "0 auto 10px auto", color: "#9CA3AF" }} />
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>
                      No Sales Applications Found
                    </div>
                    <div style={{ fontSize: "12px", marginTop: "4px" }}>
                      {salesSearch ? "No candidates match your filter." : "Submissions will appear here in real time."}
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px" }}>
                    {filteredSales.map((app) => (
                      <div
                        key={app.applicationId}
                        style={{
                          backgroundColor: "#FFFFFF",
                          borderRadius: "12px",
                          border: "1px solid #E5E7EB",
                          padding: "16px",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            gap: "8px",
                            borderBottom: "1px solid #F3F4F6",
                            paddingBottom: "10px",
                            marginBottom: "10px",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                            <span
                              style={{
                                fontFamily: "monospace",
                                fontSize: "11px",
                                fontWeight: 700,
                                color: "#7C3AED",
                                backgroundColor: "#F5F3FF",
                                padding: "2px 8px",
                                borderRadius: "4px",
                              }}
                            >
                              {app.applicationId}
                            </span>

                            <span style={{ fontSize: "16px", fontWeight: 700, color: "#111827" }}>
                              {app.fullName}
                            </span>

                            <span
                              style={{
                                fontSize: "11px",
                                color: "#4B5563",
                                backgroundColor: "#F3F4F6",
                                padding: "2px 7px",
                                borderRadius: "4px",
                                fontWeight: 600,
                              }}
                            >
                              Age: {app.age}
                            </span>

                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: 600,
                                backgroundColor: app.hasSalesExperience ? "#ECFDF5" : "#F3F4F6",
                                color: app.hasSalesExperience ? "#047857" : "#4B5563",
                                border: `1px solid ${app.hasSalesExperience ? "#A7F3D0" : "#E5E7EB"}`,
                                padding: "2px 8px",
                                borderRadius: "999px",
                              }}
                            >
                              Sales Exp: {app.hasSalesExperience ? "Yes" : "No"}
                            </span>

                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: 600,
                                backgroundColor: app.hasAgencyOrCommissionSales ? "#F5F3FF" : "#F3F4F6",
                                color: app.hasAgencyOrCommissionSales ? "#6D28D9" : "#4B5563",
                                border: `1px solid ${app.hasAgencyOrCommissionSales ? "#DDD6FE" : "#E5E7EB"}`,
                                padding: "2px 8px",
                                borderRadius: "999px",
                              }}
                            >
                              Agency/Commission: {app.hasAgencyOrCommissionSales ? "Yes" : "No"}
                            </span>
                          </div>

                          <div
                            style={{
                              fontSize: "11px",
                              color: "#9CA3AF",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <Calendar size={12} />
                            <span>{app.submittedAt ? new Date(app.submittedAt).toLocaleString() : "Recent"}</span>
                          </div>
                        </div>

                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                            gap: "10px",
                            fontSize: "12px",
                            marginBottom: "12px",
                          }}
                        >
                          <div>
                            <span style={{ color: "#6B7280" }}>Contact: </span>
                            <a
                              href={`tel:${app.phone}`}
                              style={{ color: "#7C3AED", fontWeight: 600, textDecoration: "none" }}
                            >
                              {app.countryCode || "+91"} {app.phone}
                            </a>
                          </div>

                          <div>
                            <span style={{ color: "#6B7280" }}>Email: </span>
                            <a
                              href={`mailto:${app.email}`}
                              style={{ color: "#7C3AED", fontWeight: 600, textDecoration: "none" }}
                            >
                              {app.email}
                            </a>
                          </div>

                          <div>
                            <span style={{ color: "#6B7280" }}>City: </span>
                            <strong style={{ color: "#111827" }}>{app.city}</strong>
                          </div>
                        </div>

                        {app.salesExperienceDetails && (
                          <div
                            style={{
                              backgroundColor: "#F9FAFB",
                              border: "1px solid #E5E7EB",
                              padding: "8px 12px",
                              borderRadius: "6px",
                              fontSize: "12px",
                              color: "#374151",
                              lineHeight: 1.4,
                              marginBottom: "8px",
                            }}
                          >
                            <strong style={{ color: "#111827" }}>Previous Sales Experience: </strong>
                            {app.salesExperienceDetails}
                          </div>
                        )}

                        <div
                          style={{
                            backgroundColor: "#F9FAFB",
                            border: "1px solid #E5E7EB",
                            padding: "8px 12px",
                            borderRadius: "6px",
                            fontSize: "12px",
                            color: "#374151",
                            lineHeight: 1.4,
                            marginBottom: "8px",
                          }}
                        >
                          <strong style={{ color: "#111827" }}>Products / Services Sold: </strong>
                          {app.productsSoldBefore}
                        </div>

                        <div
                          style={{
                            backgroundColor: "#FAF5FF",
                            border: "1px solid #EDE9FE",
                            borderRadius: "8px",
                            padding: "10px 12px",
                            marginTop: "8px",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "11px",
                              fontWeight: 700,
                              color: "#6D28D9",
                              textTransform: "uppercase",
                              letterSpacing: "0.04em",
                              marginBottom: "6px",
                            }}
                          >
                            Quick Sales Test Answers:
                          </div>

                          <div style={{ fontSize: "12px", color: "#374151", marginBottom: "6px", lineHeight: 1.45 }}>
                            <strong style={{ color: "#7C3AED" }}>
                              Q: “Your product is too expensive” pitch:
                            </strong>{" "}
                            {app.expensiveObjectionHandling}
                          </div>

                          <div style={{ fontSize: "12px", color: "#374151", lineHeight: 1.45 }}>
                            <strong style={{ color: "#7C3AED" }}>
                              Q: Why good at sales:
                            </strong>{" "}
                            {app.whyGoodAtSales}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
