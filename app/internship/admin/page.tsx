"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import {
  ref,
  get,
} from "firebase/database";
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
  ShieldCheck,
} from "lucide-react";

interface ApplicationRecord {
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
}

export default function InternshipAdminPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Applications data state
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Listen to Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        // Verify Admin UID
        const isAdmin = user.uid === ADMIN_UID;
        setIsAdminUser(isAdmin);
        if (isAdmin) {
          fetchApplications();
        }
      } else {
        setIsAdminUser(false);
        setApplications([]);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch applications from Firebase Realtime Database
  const fetchApplications = async () => {
    setDataLoading(true);
    try {
      // 1. Fetch directly from Firebase Realtime Database
      const rtdbRef = ref(rtdb, "internship_applications");
      const rtdbSnapshot = await get(rtdbRef);

      if (rtdbSnapshot.exists()) {
        const val = rtdbSnapshot.val();
        const list: ApplicationRecord[] = Object.values(val);
        list.sort((a, b) => (b.submittedAt || "").localeCompare(a.submittedAt || ""));
        setApplications(list);
        setDataLoading(false);
        return;
      }

      // 2. Fallback to localStorage backup if database is empty
      const localSaved = JSON.parse(
        localStorage.getItem("foa_internship_applications") || "[]"
      );
      setApplications(localSaved);
    } catch (err: any) {
      console.warn("Realtime Database fetch note:", err?.message);
      const localSaved = JSON.parse(
        localStorage.getItem("foa_internship_applications") || "[]"
      );
      setApplications(localSaved);
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
    setApplications([]);
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (applications.length === 0) return;
    const headers = [
      "Application ID",
      "Full Name",
      "Email",
      "Phone",
      "City",
      "Qualification",
      "Passing Year",
      "Skills",
      "Introduction",
      "Resume Link",
      "Submitted At",
    ];

    const rows = applications.map((app) => [
      `"${app.applicationId || ""}"`,
      `"${app.fullName || ""}"`,
      `"${app.email || ""}"`,
      `"${app.countryCode || "+91"} ${app.phone || ""}"`,
      `"${app.city || ""}"`,
      `"${app.qualification || ""}"`,
      `"${app.passingYear || ""}"`,
      `"${(app.skills || []).join(", ")}"`,
      `"${(app.aboutYourself || "").replace(/"/g, '""')}"`,
      `"${app.resumeUrl || ""}"`,
      `"${app.submittedAt || ""}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `internship_applications_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered applications based on search
  const filteredApps = applications.filter((app) => {
    const q = searchTerm.toLowerCase();
    return (
      app.fullName?.toLowerCase().includes(q) ||
      app.email?.toLowerCase().includes(q) ||
      app.phone?.includes(q) ||
      app.city?.toLowerCase().includes(q) ||
      app.skills?.some((s) => s.toLowerCase().includes(q)) ||
      app.applicationId?.toLowerCase().includes(q)
    );
  });

  if (authLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#F5F6F8" }}>
        <Loader2 size={32} className="animate-spin text-[#7C3AED]" />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F5F6F8", color: "#111827", display: "flex", flexDirection: "column", fontFamily: "var(--font-outfit), 'Inter', sans-serif" }}>
      {/* Top Header */}
      <header style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #E5E7EB", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#7C3AED", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
            FO
          </div>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>First Option Agency</div>
            <div style={{ fontSize: "11px", color: "#7C3AED", fontWeight: 600 }}>Internship Admin Portal</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Link
            href="/internship"
            style={{ fontSize: "12px", color: "#6B7280", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}
          >
            <ArrowLeft size={14} />
            <span>Public Form</span>
          </Link>
          {currentUser && (
            <button
              onClick={handleLogout}
              style={{ fontSize: "12px", color: "#EF4444", backgroundColor: "#FEF2F2", border: "1px solid #FCA5A5", padding: "4px 10px", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontWeight: 600 }}
            >
              <LogOut size={13} />
              <span>Sign Out</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: "24px 16px", maxWidth: "1100px", width: "100%", margin: "0 auto" }}>
        {!currentUser ? (
          /* ─── ADMIN LOGIN CARD (Shown when user is NOT logged in) ─── */
          <div style={{ maxWidth: "420px", margin: "40px auto", backgroundColor: "#FFFFFF", borderRadius: "16px", border: "1px solid #E5E7EB", padding: "30px 24px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: "#F5F3FF", color: "#7C3AED", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px auto" }}>
              <Lock size={24} />
            </div>

            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div style={{ fontSize: "18px", fontWeight: 700, color: "#111827" }}>Admin Authentication</div>
              <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "4px" }}>
                Sign in with your Admin account to view internship submissions.
              </div>
            </div>

            {loginError && (
              <div style={{ padding: "10px", backgroundColor: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: "8px", color: "#991B1B", fontSize: "12px", marginBottom: "14px", display: "flex", alignItems: "center", gap: "6px" }}>
                <ShieldAlert size={15} color="#EF4444" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "5px" }}>
                  Admin Email
                </label>
                <div style={{ position: "relative" }}>
                  <Mail size={15} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter admin email"
                    required
                    style={{ width: "100%", height: "40px", padding: "0 10px 0 32px", fontSize: "13px", backgroundColor: "#FFFFFF", borderRadius: "8px", border: "1px solid #E5E7EB", color: "#111827", outline: "none" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "5px" }}>
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <KeyRound size={15} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    style={{ width: "100%", height: "40px", padding: "0 10px 0 32px", fontSize: "13px", backgroundColor: "#FFFFFF", borderRadius: "8px", border: "1px solid #E5E7EB", color: "#111827", outline: "none" }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                style={{ width: "100%", height: "42px", borderRadius: "8px", backgroundColor: loginLoading ? "#A78BFA" : "#7C3AED", color: "#FFFFFF", fontSize: "13px", fontWeight: 700, border: "none", cursor: loginLoading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "6px" }}
              >
                {loginLoading ? <Loader2 size={16} className="animate-spin" /> : "Sign In to Admin Dashboard"}
              </button>
            </form>
          </div>
        ) : !isAdminUser ? (
          /* ─── UNAUTHORIZED USER VIEW ─── */
          <div style={{ maxWidth: "440px", margin: "40px auto", backgroundColor: "#FFFFFF", borderRadius: "16px", border: "1px solid #FCA5A5", padding: "30px 24px", textAlign: "center" }}>
            <ShieldAlert size={40} color="#EF4444" style={{ margin: "0 auto 12px auto" }} />
            <div style={{ fontSize: "18px", fontWeight: 700, color: "#991B1B", marginBottom: "6px" }}>Access Restricted</div>
            <div style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.5, marginBottom: "18px" }}>
              You are logged in as <strong>{currentUser.email}</strong>, but your UID does not have admin permissions to access internship records.
            </div>
            <button
              onClick={handleLogout}
              style={{ padding: "8px 18px", backgroundColor: "#7C3AED", color: "#FFFFFF", border: "none", borderRadius: "6px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
            >
              Sign Out & Switch Account
            </button>
          </div>
        ) : (
          /* ─── ADMIN DASHBOARD (Automatically shown if already logged in) ─── */
          <div>
            {/* Dashboard Header Bar */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "20px" }}>
              <div>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "#111827", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span>Internship Applications ({filteredApps.length})</span>
                  <span style={{ fontSize: "11px", fontWeight: 600, backgroundColor: "#ECFDF5", color: "#059669", border: "1px solid #A7F3D0", padding: "2px 8px", borderRadius: "999px", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    <ShieldCheck size={12} />
                    Verified Admin
                  </span>
                </div>
                <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>
                  Logged in as: <strong style={{ color: "#7C3AED" }}>{currentUser.email}</strong>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                <div style={{ position: "relative" }}>
                  <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search name, skill, phone..."
                    style={{ height: "36px", padding: "0 10px 0 30px", fontSize: "12px", borderRadius: "6px", border: "1px solid #E5E7EB", backgroundColor: "#FFFFFF", outline: "none", width: "220px" }}
                  />
                </div>

                <button
                  onClick={fetchApplications}
                  style={{ height: "36px", padding: "0 10px", borderRadius: "6px", border: "1px solid #E5E7EB", backgroundColor: "#FFFFFF", fontSize: "12px", color: "#374151", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}
                  title="Refresh"
                >
                  <RefreshCw size={13} className={dataLoading ? "animate-spin" : ""} />
                  <span>Refresh</span>
                </button>

                <button
                  onClick={handleExportCSV}
                  disabled={applications.length === 0}
                  style={{ height: "36px", padding: "0 12px", borderRadius: "6px", border: "none", backgroundColor: "#7C3AED", color: "#FFFFFF", fontSize: "12px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}
                >
                  <Download size={13} />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Applications List */}
            {dataLoading ? (
              <div style={{ padding: "60px 0", textAlign: "center", color: "#6B7280" }}>
                <Loader2 size={24} className="animate-spin" style={{ margin: "0 auto 8px auto", color: "#7C3AED" }} />
                <div style={{ fontSize: "13px" }}>Loading applications from Firebase Realtime Database...</div>
              </div>
            ) : filteredApps.length === 0 ? (
              <div style={{ backgroundColor: "#FFFFFF", borderRadius: "12px", border: "1px solid #E5E7EB", padding: "40px 20px", textAlign: "center", color: "#6B7280" }}>
                <Users size={32} style={{ margin: "0 auto 10px auto", color: "#9CA3AF" }} />
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>No Applications Found</div>
                <div style={{ fontSize: "12px", marginTop: "4px" }}>
                  {searchTerm ? "No candidates match your search filter." : "New applications submitted via the public form will appear here in real time."}
                </div>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px" }}>
                {filteredApps.map((app) => (
                  <div
                    key={app.applicationId}
                    style={{ backgroundColor: "#FFFFFF", borderRadius: "12px", border: "1px solid #E5E7EB", padding: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}
                  >
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "8px", borderBottom: "1px solid #F3F4F6", paddingBottom: "10px", marginBottom: "10px" }}>
                      <div>
                        <span style={{ fontFamily: "monospace", fontSize: "11px", fontWeight: 700, color: "#7C3AED", backgroundColor: "#F5F3FF", padding: "2px 6px", borderRadius: "4px", marginRight: "8px" }}>
                          {app.applicationId}
                        </span>
                        <span style={{ fontSize: "15px", fontWeight: 700, color: "#111827" }}>
                          {app.fullName}
                        </span>
                        <span style={{ fontSize: "12px", color: "#BE185D", backgroundColor: "#FDF2F8", padding: "2px 6px", borderRadius: "4px", marginLeft: "6px", fontWeight: 600 }}>
                          Female
                        </span>
                      </div>

                      <div style={{ fontSize: "11px", color: "#9CA3AF", display: "flex", alignItems: "center", gap: "4px" }}>
                        <Calendar size={12} />
                        <span>{app.submittedAt ? new Date(app.submittedAt).toLocaleString() : "Recent"}</span>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "10px", fontSize: "12px", marginBottom: "10px" }}>
                      <div>
                        <span style={{ color: "#6B7280" }}>Contact: </span>
                        <a href={`tel:${app.phone}`} style={{ color: "#7C3AED", fontWeight: 600, textDecoration: "none" }}>
                          {app.countryCode || "+91"} {app.phone}
                        </a>
                      </div>

                      <div>
                        <span style={{ color: "#6B7280" }}>Email: </span>
                        <a href={`mailto:${app.email}`} style={{ color: "#7C3AED", fontWeight: 600, textDecoration: "none" }}>
                          {app.email}
                        </a>
                      </div>

                      <div>
                        <span style={{ color: "#6B7280" }}>City: </span>
                        <strong style={{ color: "#111827" }}>{app.city}</strong>
                      </div>

                      <div>
                        <span style={{ color: "#6B7280" }}>Qualification: </span>
                        <strong style={{ color: "#111827" }}>{app.qualification} ({app.passingYear})</strong>
                      </div>
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 600, color: "#6B7280", display: "block", marginBottom: "4px" }}>Skills:</span>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                        {(app.skills || []).map((skill) => (
                          <span key={skill} style={{ fontSize: "11px", fontWeight: 600, backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB", color: "#374151", padding: "1px 6px", borderRadius: "4px" }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {app.aboutYourself && (
                      <div style={{ backgroundColor: "#F9FAFB", padding: "8px 10px", borderRadius: "6px", fontSize: "12px", color: "#4B5563", lineHeight: 1.4, marginBottom: "8px" }}>
                        <strong style={{ color: "#111827" }}>Intro: </strong>
                        {app.aboutYourself}
                      </div>
                    )}

                    {app.resumeUrl && (
                      <a
                        href={app.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{ fontSize: "12px", color: "#7C3AED", textDecoration: "none", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "4px" }}
                      >
                        <ExternalLink size={12} />
                        <span>View Attached Resume / Link</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
