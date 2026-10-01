"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Code2,
  Mail,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  Video,
  ShieldCheck,
  ShieldAlert,
  CalendarCheck,
  Laptop,
  X,
} from "lucide-react";
import { COUNTRY_CODES } from "./skills-data";
import {
  bookMentorSlotInRealtimeDb,
  fetchBookedMentorSlots,
  checkExistingMentorBooking,
  InternshipApplicationPayload,
} from "@/app/lib/firebase";
import {
  triggerInternshipWhatsAppNotifications,
  PROGRAM_TITLES,
} from "@/app/lib/whatsapp";

// Popular tech stack quick tags
const POPULAR_TECH_STACKS = [
  "Next.js / React",
  "HTML / CSS / JS",
  "MERN Stack",
  "Node.js / Express",
  "Python / Django",
  "Figma / UI-UX",
  "Flutter / Mobile",
  "Video Editing",
  "Performance Marketing",
  "AI / GenAI Tools",
];

// Standard 10-minute slots from 10:00 AM to 08:00 PM
const TIME_SLOT_DEFINITIONS = [
  { id: "10_00_AM", startHour: 10, startMin: 0, label: "10:00 AM - 10:10 AM" },
  { id: "10_15_AM", startHour: 10, startMin: 15, label: "10:15 AM - 10:25 AM" },
  { id: "10_30_AM", startHour: 10, startMin: 30, label: "10:30 AM - 10:40 AM" },
  { id: "10_45_AM", startHour: 10, startMin: 45, label: "10:45 AM - 10:55 AM" },
  { id: "11_00_AM", startHour: 11, startMin: 0, label: "11:00 AM - 11:10 AM" },
  { id: "11_15_AM", startHour: 11, startMin: 15, label: "11:15 AM - 11:25 AM" },
  { id: "11_30_AM", startHour: 11, startMin: 30, label: "11:30 AM - 11:40 AM" },
  { id: "11_45_AM", startHour: 11, startMin: 45, label: "11:45 AM - 11:55 AM" },
  { id: "12_00_PM", startHour: 12, startMin: 0, label: "12:00 PM - 12:10 PM" },
  { id: "12_15_PM", startHour: 12, startMin: 15, label: "12:15 PM - 12:25 PM" },
  { id: "12_30_PM", startHour: 12, startMin: 30, label: "12:30 PM - 12:40 PM" },
  { id: "12_45_PM", startHour: 12, startMin: 45, label: "12:45 PM - 12:55 PM" },
  { id: "02_00_PM", startHour: 14, startMin: 0, label: "02:00 PM - 02:10 PM" },
  { id: "02_15_PM", startHour: 14, startMin: 15, label: "02:15 PM - 02:25 PM" },
  { id: "02_30_PM", startHour: 14, startMin: 30, label: "02:30 PM - 02:40 PM" },
  { id: "02_45_PM", startHour: 14, startMin: 45, label: "02:45 PM - 02:55 PM" },
  { id: "03_00_PM", startHour: 15, startMin: 0, label: "03:00 PM - 03:10 PM" },
  { id: "03_15_PM", startHour: 15, startMin: 15, label: "03:15 PM - 03:25 PM" },
  { id: "03_30_PM", startHour: 15, startMin: 30, label: "03:30 PM - 03:40 PM" },
  { id: "03_45_PM", startHour: 15, startMin: 45, label: "03:45 PM - 03:55 PM" },
  { id: "04_00_PM", startHour: 16, startMin: 0, label: "04:00 PM - 04:10 PM" },
  { id: "04_15_PM", startHour: 16, startMin: 15, label: "04:15 PM - 04:25 PM" },
  { id: "04_30_PM", startHour: 16, startMin: 30, label: "04:30 PM - 04:40 PM" },
  { id: "04_45_PM", startHour: 16, startMin: 45, label: "04:45 PM - 04:55 PM" },
  { id: "05_00_PM", startHour: 17, startMin: 0, label: "05:00 PM - 05:10 PM" },
  { id: "05_15_PM", startHour: 17, startMin: 15, label: "05:15 PM - 05:25 PM" },
  { id: "05_30_PM", startHour: 17, startMin: 30, label: "05:30 PM - 05:40 PM" },
  { id: "05_45_PM", startHour: 17, startMin: 45, label: "05:45 PM - 05:55 PM" },
  { id: "06_00_PM", startHour: 18, startMin: 0, label: "06:00 PM - 06:10 PM" },
  { id: "06_15_PM", startHour: 18, startMin: 15, label: "06:15 PM - 06:25 PM" },
  { id: "06_30_PM", startHour: 18, startMin: 30, label: "06:30 PM - 06:40 PM" },
  { id: "06_45_PM", startHour: 18, startMin: 45, label: "06:45 PM - 06:55 PM" },
  { id: "07_00_PM", startHour: 19, startMin: 0, label: "07:00 PM - 07:10 PM" },
  { id: "07_15_PM", startHour: 19, startMin: 15, label: "07:15 PM - 07:25 PM" },
  { id: "07_30_PM", startHour: 19, startMin: 30, label: "07:30 PM - 07:40 PM" },
  { id: "07_45_PM", startHour: 19, startMin: 45, label: "07:45 PM - 07:55 PM" },
];

interface DateOption {
  dateKey: string; // "YYYY-MM-DD"
  displayDate: string; // "Wed, 01 Oct"
  dayOfWeek: string; // "Wed"
  dayNumber: string; // "01"
  monthName: string; // "Oct"
  isToday: boolean;
  isTomorrow: boolean;
  dateObj: Date;
}

export default function TenMinSlotBookingForm() {
  // Form Info State
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [currentTechnology, setCurrentTechnology] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  // Step state: 1 = Student Info, 2 = Calendar & Slot Selector
  const [step, setStep] = useState<1 | 2>(1);

  // Errors state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Calendar & Slot selection state
  const [selectedDateKey, setSelectedDateKey] = useState<string>("");
  const [selectedSlotTime, setSelectedSlotTime] = useState<string>("");
  const [bookedSlotsList, setBookedSlotsList] = useState<string[]>([]);
  const [loadingBookedSlots, setLoadingBookedSlots] = useState(false);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkingExisting, setCheckingExisting] = useState(false);
  const [existingBooking, setExistingBooking] = useState<InternshipApplicationPayload | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [copiedId, setCopiedId] = useState(false);

  // Generate 14 available dates starting from Today
  const dateOptions: DateOption[] = useMemo(() => {
    const dates: DateOption[] = [];
    const now = new Date();

    for (let i = 0; i < 14; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);

      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const dateKey = `${year}-${month}-${day}`;

      const dayOfWeek = d.toLocaleDateString("en-US", { weekday: "short" });
      const monthName = d.toLocaleDateString("en-US", { month: "short" });
      const displayDate = d.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });

      dates.push({
        dateKey,
        displayDate,
        dayOfWeek,
        dayNumber: day,
        monthName,
        isToday: i === 0,
        isTomorrow: i === 1,
        dateObj: d,
      });
    }
    return dates;
  }, []);

  // Initialize selected date to today
  useEffect(() => {
    if (dateOptions.length > 0 && !selectedDateKey) {
      setSelectedDateKey(dateOptions[0].dateKey);
    }
  }, [dateOptions, selectedDateKey]);

  // Fetch booked slots whenever selected date changes (polling every 5 seconds for live updates)
  useEffect(() => {
    if (!selectedDateKey) return;
    let isMounted = true;
    const selectedDateObj = dateOptions.find((d) => d.dateKey === selectedDateKey);
    const displayDate = selectedDateObj?.displayDate;

    const loadSlots = () => {
      fetchBookedMentorSlots(selectedDateKey, displayDate)
        .then((slots) => {
          if (isMounted) {
            setBookedSlotsList(slots);
          }
        })
        .catch((err) => console.warn("Error fetching slots:", err))
        .finally(() => {
          if (isMounted) setLoadingBookedSlots(false);
        });
    };

    setLoadingBookedSlots(true);
    loadSlots();

    // Poll every 5s so when another candidate books, it instantly updates on screen
    const interval = setInterval(loadSlots, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [selectedDateKey, dateOptions]);

  // Clean phone input
  const handlePhoneChange = (val: string) => {
    const cleaned = val.replace(/\D/g, "");
    const selectedCountry = COUNTRY_CODES.find((c) => c.code === countryCode);
    const maxLen = selectedCountry ? selectedCountry.maxDigits : 10;
    setPhone(cleaned.slice(0, maxLen));
    if (errors.phone) {
      setErrors((prev) => {
        const u = { ...prev };
        delete u.phone;
        return u;
      });
    }
  };

  // Validate Step 1 (Student Info)
  const validateStep1 = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }

    if (!phone.trim()) {
      newErrors.phone = "WhatsApp contact number is required";
    } else {
      const selectedCountry = COUNTRY_CODES.find((c) => c.code === countryCode);
      const expectedDigits = selectedCountry ? selectedCountry.minDigits : 10;
      if (phone.length !== expectedDigits) {
        newErrors.phone =
          countryCode === "+91"
            ? "Must be exactly 10 digits"
            : `Must be ${expectedDigits} digits`;
      }
    }

    if (!currentTechnology.trim()) {
      newErrors.currentTechnology = "Please specify the technology you are currently working on";
    }

    if (email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedToSlot = async () => {
    if (validateStep1()) {
      setCheckingExisting(true);
      try {
        const existing = await checkExistingMentorBooking(phone);
        if (existing) {
          setExistingBooking(existing);
          setCheckingExisting(false);
          return;
        }
      } catch (e) {
        console.warn("Check existing booking error:", e);
      } finally {
        setCheckingExisting(false);
      }

      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Check if a time slot is disabled
  // Rule 1: Slots in past or within 2-hour notice window for Today appear as "Booked"
  // Rule 2: Already booked slots in Firebase Realtime DB appear as "Booked"
  const getSlotStatus = (slot: (typeof TIME_SLOT_DEFINITIONS)[0]) => {
    const selectedDateObj = dateOptions.find((d) => d.dateKey === selectedDateKey);
    const isToday = selectedDateObj?.isToday;

    // Check if slot is already booked in RTDB
    const isBookedInDb = bookedSlotsList.some(
      (b) =>
        b.toLowerCase().trim() === slot.label.toLowerCase().trim() ||
        b.toLowerCase().includes(slot.id.toLowerCase())
    );

    if (isBookedInDb) {
      return { isAvailable: false, reason: "booked", badge: "Booked" };
    }

    if (isToday) {
      const now = new Date();
      // Current time + 2 hours in milliseconds
      const cutoffTime = new Date(now.getTime() + 2 * 60 * 60 * 1000);

      const slotStartTime = new Date(now);
      slotStartTime.setHours(slot.startHour, slot.startMin, 0, 0);

      if (slotStartTime <= cutoffTime) {
        return { isAvailable: false, reason: "booked", badge: "Booked" };
      }
    }

    return { isAvailable: true, reason: "", badge: "Available" };
  };

  // Submit slot booking
  const handleConfirmBooking = async () => {
    if (!validateStep1()) {
      setStep(1);
      return;
    }

    if (!selectedSlotTime) {
      setErrors((prev) => ({
        ...prev,
        slotTime: "Please select an available 10-minute slot",
      }));
      return;
    }

    setIsSubmitting(true);
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const genId = `FOA-SLOT-${new Date().getFullYear()}-${randomSuffix}`;
    const submissionTimestamp = new Date().toISOString();

    const selectedDateObj = dateOptions.find((d) => d.dateKey === selectedDateKey);
    const formattedDate = selectedDateObj
      ? selectedDateObj.displayDate
      : selectedDateKey;

    const payload: InternshipApplicationPayload & { slotDateKey?: string } = {
      applicationId: genId,
      fullName: fullName.trim(),
      email: email.trim() || `${phone.trim()}@mentorship.foa`,
      countryCode,
      phone: phone.trim(),
      city: "Online Mentorship",
      qualification: "10-Min Mentorship",
      passingYear: "2026",
      skills: [currentTechnology.trim()],
      currentTechnology: currentTechnology.trim(),
      aboutYourself: `10-Min 1-on-1 Mentorship Booking with Faiz Sir for ${currentTechnology.trim()}${
        notes.trim() ? `. Notes: ${notes.trim()}` : ""
      }`,
      resumeUrl: "",
      submittedAt: submissionTimestamp,
      type: "10-min-slots",
      leadType: "10-min-slots",
      status: "submit",
      mentorName: "Faiz Sir",
      slotDateKey: selectedDateKey,
      slotDate: formattedDate,
      slotTime: selectedSlotTime,
      slotDateTime: `${selectedDateKey} ${selectedSlotTime}`,
      programTitle: PROGRAM_TITLES.TEN_MIN_SLOTS,
    };

    try {
      // 1. Save to Firebase RTDB with atomic collision & duplicate booking check
      const result = await bookMentorSlotInRealtimeDb(payload);

      if (!result.success) {
        // Handle repeat candidate booking with big professional popup
        if (result.error === "ALREADY_BOOKED" || (result as any).existingBooking) {
          setExistingBooking(
            (result as any).existingBooking || {
              fullName: fullName.trim(),
              phone: phone.trim(),
              countryCode,
              slotDate: formattedDate,
              slotTime: selectedSlotTime,
              mentorName: "Faiz Sir",
              currentTechnology: currentTechnology.trim(),
              applicationId: "EXISTING-RESERVED",
            }
          );
          setIsSubmitting(false);
          return;
        }

        setErrors((prev) => ({
          ...prev,
          slotTime:
            result.error ||
            "This slot has just been booked by another candidate. Please choose another available slot.",
        }));

        // Refresh slots immediately to show latest status
        const updatedBooked = await fetchBookedMentorSlots(
          selectedDateKey,
          selectedDateObj?.displayDate
        );
        setBookedSlotsList(updatedBooked);
        setSelectedSlotTime("");
        setIsSubmitting(false);
        return;
      }

      // 2. Trigger WhatsApp notification to candidate & admin team
      try {
        await triggerInternshipWhatsAppNotifications({
          candidatePhone: `${countryCode}${phone}`,
          candidateName: fullName.trim(),
          applicationId: genId,
          candidateEmail: email.trim(),
          city: "Online (10-Min Slot)",
          programTitle: PROGRAM_TITLES.TEN_MIN_SLOTS,
          mode: "10-min-slots",
        });
      } catch (waErr) {
        console.warn("WhatsApp dispatch warning:", waErr);
      }

      setApplicationId(genId);
      setSubmitSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Slot booking submission error:", err);
      alert("Failed to book slot. Please try again or reach out on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyApplicationId = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(applicationId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2500);
    }
  };

  // Google Calendar Link generator
  const getGoogleCalendarUrl = () => {
    if (!selectedDateKey || !selectedSlotTime) return "#";
    const title = encodeURIComponent("10-Min Mentorship Session with Faiz Sir (First Option Agency)");
    const details = encodeURIComponent(
      `1-on-1 Mentorship Session with Mentor Faiz Sir.\n\nStudent: ${fullName}\nTechnology: ${currentTechnology}\nBooking ID: ${applicationId}\n\nMeeting link will be shared on WhatsApp.`
    );
    const location = encodeURIComponent("Google Meet / WhatsApp Video Call");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  // ─────────────────────────────────────────────────────────────
  // SUCCESS SCREEN
  // ─────────────────────────────────────────────────────────────
  if (submitSuccess) {
    const selectedDateObj = dateOptions.find((d) => d.dateKey === selectedDateKey);
    const formattedDate = selectedDateObj ? selectedDateObj.displayDate : selectedDateKey;

    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#F5F6F8",
          padding: "24px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: "520px",
            width: "100%",
            backgroundColor: "#FFFFFF",
            borderRadius: "16px",
            border: "1px solid #E5E7EB",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)",
            padding: "28px 24px",
            textAlign: "center",
          }}
        >
          {/* Green Checkmark */}
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              backgroundColor: "#ECFDF5",
              border: "2px solid #10B981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px auto",
            }}
          >
            <CheckCircle2 size={36} color="#059669" />
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 12px",
              borderRadius: "9999px",
              backgroundColor: "#FAF5FF",
              border: "1px solid #DDD6FE",
              color: "#7C3AED",
              fontSize: "12px",
              fontWeight: 600,
              marginBottom: "8px",
            }}
          >
            <Sparkles size={13} />
            Slot Confirmed
          </div>

          <h2
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#111827",
              marginBottom: "8px",
            }}
          >
            10-Minute Mentorship Booked!
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "#6B7280",
              lineHeight: 1.5,
              marginBottom: "20px",
            }}
          >
            Your 1-on-1 guidance slot with <strong>Mentor Faiz Sir</strong> has been locked. A WhatsApp confirmation has been dispatched.
          </p>

          {/* Booking Summary Box */}
          <div
            style={{
              backgroundColor: "#F9FAFB",
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              padding: "16px",
              textAlign: "left",
              marginBottom: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "13px", color: "#6B7280" }}>Mentor:</span>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#7C3AED" }}>Faiz Sir</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "13px", color: "#6B7280" }}>Date:</span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>
                📅 {formattedDate}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "13px", color: "#6B7280" }}>Slot Time:</span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>
                ⏰ {selectedSlotTime} (10 Mins)
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "13px", color: "#6B7280" }}>Technology:</span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>
                💻 {currentTechnology}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "13px", color: "#6B7280" }}>Candidate:</span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>
                {fullName} ({countryCode} {phone})
              </span>
            </div>
          </div>

          {/* Booking ID with Copy */}
          <div
            style={{
              backgroundColor: "#FAF5FF",
              border: "1px dashed #C4B5FD",
              borderRadius: "10px",
              padding: "12px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "11px", color: "#6B7280", fontWeight: 500 }}>
                BOOKING REFERENCE ID
              </div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#6D28D9" }}>
                {applicationId}
              </div>
            </div>
            <button
              onClick={copyApplicationId}
              type="button"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                padding: "6px 12px",
                borderRadius: "6px",
                backgroundColor: "#7C3AED",
                color: "#FFFFFF",
                fontSize: "12px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
              }}
            >
              {copiedId ? <Check size={14} /> : <Copy size={14} />}
              {copiedId ? "Copied" : "Copy"}
            </button>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                backgroundColor: "#7C3AED",
                color: "#FFFFFF",
                fontSize: "14px",
                fontWeight: 600,
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
            >
              <CalendarCheck size={16} />
              Add to Google Calendar
            </a>

            <a
              href={`https://wa.me/919958399157?text=${encodeURIComponent(
                `Hi Faiz Sir, I have booked a 10-min mentorship slot (ID: ${applicationId}) for ${formattedDate} at ${selectedSlotTime}. Tech: ${currentTechnology}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                backgroundColor: "#F3F4F6",
                border: "1px solid #E5E7EB",
                color: "#111827",
                fontSize: "14px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              <Phone size={16} color="#059669" />
              Chat with Mentor on WhatsApp
            </a>

            <Link
              href="/"
              style={{
                fontSize: "13px",
                color: "#6B7280",
                textDecoration: "none",
                marginTop: "6px",
              }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // MAIN FORM UI
  // ─────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F5F6F8",
        padding: "24px 16px 48px 16px",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        position: "relative",
      }}
    >
      {/* ───────────────────────────────────────────────────────────── */}
      {/* BIG PROFESSIONAL "ALREADY BOOKED" PERMISSION DENIED POPUP */}
      {/* ───────────────────────────────────────────────────────────── */}
      {existingBooking && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(15, 23, 42, 0.72)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setExistingBooking(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              border: "1px solid #E5E7EB",
              maxWidth: "520px",
              width: "100%",
              maxHeight: "92vh",
              overflowY: "auto",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              padding: "28px 24px",
              textAlign: "center",
              position: "relative",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setExistingBooking(null)}
              type="button"
              aria-label="Close popup"
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "#F3F4F6",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#6B7280",
                transition: "background-color 0.2s",
              }}
            >
              <X size={18} />
            </button>

            {/* Permission Denied / Security Icon */}
            <div
              style={{
                width: "68px",
                height: "68px",
                borderRadius: "50%",
                backgroundColor: "#FEF2F2",
                border: "4px solid #FEE2E2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px auto",
              }}
            >
              <ShieldAlert size={34} color="#DC2626" />
            </div>

            {/* Top Status Tag */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 12px",
                borderRadius: "9999px",
                backgroundColor: "#FEF2F2",
                border: "1px solid #FECACA",
                color: "#991B1B",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.03em",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}
            >
              Permission Denied • Single Booking Policy
            </div>

            {/* Modal Heading */}
            <h2
              style={{
                fontSize: "22px",
                fontWeight: 800,
                color: "#111827",
                marginBottom: "8px",
                lineHeight: "1.3",
              }}
            >
              Mentorship Slot Already Booked!
            </h2>

            <p
              style={{
                fontSize: "14px",
                color: "#4B5563",
                lineHeight: "1.5",
                marginBottom: "20px",
              }}
            >
              A 1-on-1 mentorship session with <strong>Mentor Faiz Sir</strong> is already reserved under your contact number. Candidates are limited to 1 active session.
            </p>

            {/* Verified Existing Booking Details Card */}
            <div
              style={{
                backgroundColor: "#F9FAFB",
                border: "1px solid #E5E7EB",
                borderRadius: "14px",
                padding: "16px 18px",
                textAlign: "left",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: "10px",
                  marginBottom: "12px",
                  borderBottom: "1px dashed #E5E7EB",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <CalendarCheck size={16} color="#7C3AED" />
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#7C3AED", textTransform: "uppercase" }}>
                    Your Scheduled Session
                  </span>
                </div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#059669",
                    backgroundColor: "#ECFDF5",
                    padding: "2px 8px",
                    borderRadius: "9999px",
                    border: "1px solid #A7F3D0",
                  }}
                >
                  Confirmed
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", color: "#6B7280" }}>Candidate Name:</span>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>
                    {existingBooking.fullName || fullName || "Registered Candidate"}
                  </span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", color: "#6B7280" }}>Contact Number:</span>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>
                    {existingBooking.countryCode || "+91"} {existingBooking.phone || phone}
                  </span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", color: "#6B7280" }}>Assigned Mentor:</span>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#7C3AED" }}>
                    Faiz Sir (Director & Tech Lead)
                  </span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", color: "#6B7280" }}>Date & Time:</span>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>
                    📅 {existingBooking.slotDate || existingBooking.slotDateKey || "Scheduled"} • ⏰ {existingBooking.slotTime || "10 Mins"}
                  </span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", color: "#6B7280" }}>Technology / Stack:</span>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>
                    💻 {existingBooking.currentTechnology || existingBooking.skills?.[0] || currentTechnology || "Tech Guidance"}
                  </span>
                </div>

                {existingBooking.applicationId && (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "13px", color: "#6B7280" }}>Booking ID:</span>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#6D28D9", fontFamily: "monospace" }}>
                      {existingBooking.applicationId}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Policy Info Notice */}
            <div
              style={{
                backgroundColor: "#FFFBEB",
                border: "1px solid #FDE68A",
                borderRadius: "10px",
                padding: "12px",
                fontSize: "12px",
                color: "#92400E",
                textAlign: "left",
                lineHeight: "1.5",
                marginBottom: "20px",
              }}
            >
              <strong>Why is this restricted?</strong> To ensure fair access for every student, each applicant is allowed 1 free 1-on-1 mentorship session. To change your slot or ask queries, please contact Faiz Sir directly on WhatsApp.
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <a
                href={`https://wa.me/919920042456?text=${encodeURIComponent(
                  `Hello Faiz Sir / First Option Agency,\n\nI have an existing 1-on-1 mentorship booking (ID: ${
                    existingBooking.applicationId || "FOA-SLOT"
                  }).\n\n📅 Date: ${existingBooking.slotDate || existingBooking.slotDateKey || "Scheduled"}\n⏰ Time: ${
                    existingBooking.slotTime || "Scheduled Time"
                  }\n👤 Candidate: ${existingBooking.fullName || fullName}\n📱 Phone: ${
                    existingBooking.countryCode || "+91"
                  } ${existingBooking.phone || phone}\n💻 Tech: ${
                    existingBooking.currentTechnology || existingBooking.skills?.[0] || currentTechnology
                  }\n\nI would like to inquire about my meeting / request rescheduling.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: "10px",
                  backgroundColor: "#7C3AED",
                  color: "#FFFFFF",
                  fontSize: "14px",
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "0 4px 12px rgba(124, 58, 237, 0.25)",
                }}
              >
                <Phone size={16} />
                Connect with Faiz Sir on WhatsApp
              </a>

              <button
                type="button"
                onClick={() => setExistingBooking(null)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  backgroundColor: "#F3F4F6",
                  border: "1px solid #E5E7EB",
                  color: "#374151",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Dismiss & Back to Form
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: "560px", margin: "0 auto" }}>
        {/* Top Header Card */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "16px",
            border: "1px solid #E5E7EB",
            padding: "24px 20px",
            marginBottom: "16px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 12px",
              borderRadius: "9999px",
              backgroundColor: "#FAF5FF",
              border: "1px solid #DDD6FE",
              color: "#7C3AED",
              fontSize: "12px",
              fontWeight: 600,
              marginBottom: "12px",
            }}
          >
            <Sparkles size={13} />
            1-ON-1 MENTORSHIP SESSION
          </div>

          <h1
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#111827",
              lineHeight: 1.3,
              marginBottom: "8px",
            }}
          >
            Book a 10-Minute Mentorship Slot with Faiz Sir
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "#6B7280",
              lineHeight: 1.5,
              marginBottom: "16px",
            }}
          >
            Get direct 1-on-1 technical review, portfolio audit, doubt clearance, and career guidance tailored to your current tech stack.
          </p>

          {/* Quick Value Props */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
              paddingTop: "12px",
              borderTop: "1px solid #F3F4F6",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#374151" }}>
              <Clock size={15} color="#7C3AED" />
              <span>10-Minute Focused Call</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#374151" }}>
              <Video size={15} color="#7C3AED" />
              <span>Direct with Faiz Sir</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#374151" }}>
              <CalendarIcon size={15} color="#7C3AED" />
              <span>Real-time Live Calendar</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#374151" }}>
              <ShieldCheck size={15} color="#059669" />
              <span>100% Free for Students</span>
            </div>
          </div>
        </div>

        {/* Step Indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#FFFFFF",
            borderRadius: "12px",
            border: "1px solid #E5E7EB",
            padding: "12px 16px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: step === 1 ? "#7C3AED" : "#111827",
              fontWeight: step === 1 ? 700 : 500,
              fontSize: "13px",
            }}
          >
            <span
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                backgroundColor: step === 1 ? "#7C3AED" : "#E5E7EB",
                color: step === 1 ? "#FFFFFF" : "#6B7280",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              1
            </span>
            <span>Your Info</span>
          </div>

          <ArrowRight size={14} color="#9CA3AF" />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: step === 2 ? "#7C3AED" : "#6B7280",
              fontWeight: step === 2 ? 700 : 500,
              fontSize: "13px",
            }}
          >
            <span
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                backgroundColor: step === 2 ? "#7C3AED" : "#E5E7EB",
                color: step === 2 ? "#FFFFFF" : "#6B7280",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              2
            </span>
            <span>Select 10-Min Slot</span>
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────── */}
        {/* STEP 1: STUDENT DETAILS */}
        {/* ───────────────────────────────────────────────────────────── */}
        {step === 1 && (
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              border: "1px solid #E5E7EB",
              padding: "24px 20px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
            }}
          >
            <h2
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#111827",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <User size={18} color="#7C3AED" />
              Student Information
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Full Name */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: "6px",
                  }}
                >
                  Full Name <span style={{ color: "#DC2626" }}>*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) {
                      setErrors((prev) => {
                        const u = { ...prev };
                        delete u.fullName;
                        return u;
                      });
                    }
                  }}
                  placeholder="Enter your full name (e.g. Rahul Sharma)"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: `1px solid ${errors.fullName ? "#EF4444" : "#E5E7EB"}`,
                    fontSize: "14px",
                    color: "#111827",
                    outline: "none",
                    backgroundColor: "#FFFFFF",
                  }}
                />
                {errors.fullName && (
                  <div style={{ fontSize: "12px", color: "#DC2626", marginTop: "4px" }}>
                    {errors.fullName}
                  </div>
                )}
              </div>

              {/* WhatsApp Number */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: "6px",
                  }}
                >
                  WhatsApp Contact Number <span style={{ color: "#DC2626" }}>*</span>
                </label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    style={{
                      padding: "10px 10px",
                      borderRadius: "8px",
                      border: "1px solid #E5E7EB",
                      fontSize: "14px",
                      color: "#111827",
                      backgroundColor: "#F9FAFB",
                      outline: "none",
                      width: "100px",
                    }}
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} ({c.country})
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="10-digit WhatsApp number"
                    style={{
                      flex: 1,
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: `1px solid ${errors.phone ? "#EF4444" : "#E5E7EB"}`,
                      fontSize: "14px",
                      color: "#111827",
                      outline: "none",
                      backgroundColor: "#FFFFFF",
                    }}
                  />
                </div>
                {errors.phone ? (
                  <div style={{ fontSize: "12px", color: "#DC2626", marginTop: "4px" }}>
                    {errors.phone}
                  </div>
                ) : (
                  <div style={{ fontSize: "11px", color: "#6B7280", marginTop: "4px" }}>
                    Faiz Sir will share the Google Meet / Call link on this WhatsApp number.
                  </div>
                )}
              </div>

              {/* Current Technology Working On */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: "6px",
                  }}
                >
                  Current Technology / Tech Stack Working On <span style={{ color: "#DC2626" }}>*</span>
                </label>

                {/* Popular Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "8px" }}>
                  {POPULAR_TECH_STACKS.map((tech) => {
                    const isSelected = currentTechnology === tech;
                    return (
                      <button
                        key={tech}
                        type="button"
                        onClick={() => {
                          setCurrentTechnology(tech);
                          if (errors.currentTechnology) {
                            setErrors((prev) => {
                              const u = { ...prev };
                              delete u.currentTechnology;
                              return u;
                            });
                          }
                        }}
                        style={{
                          padding: "6px 10px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: 500,
                          border: isSelected ? "1px solid #7C3AED" : "1px solid #E5E7EB",
                          backgroundColor: isSelected ? "#FAF5FF" : "#F9FAFB",
                          color: isSelected ? "#7C3AED" : "#4B5563",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        {tech}
                      </button>
                    );
                  })}
                </div>

                <input
                  type="text"
                  value={currentTechnology}
                  onChange={(e) => {
                    setCurrentTechnology(e.target.value);
                    if (errors.currentTechnology) {
                      setErrors((prev) => {
                        const u = { ...prev };
                        delete u.currentTechnology;
                        return u;
                      });
                    }
                  }}
                  placeholder="Or type here (e.g. Next.js, React, Node.js, Python, Figma)"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: `1px solid ${errors.currentTechnology ? "#EF4444" : "#E5E7EB"}`,
                    fontSize: "14px",
                    color: "#111827",
                    outline: "none",
                    backgroundColor: "#FFFFFF",
                  }}
                />
                {errors.currentTechnology && (
                  <div style={{ fontSize: "12px", color: "#DC2626", marginTop: "4px" }}>
                    {errors.currentTechnology}
                  </div>
                )}
              </div>

              {/* Email (Optional) */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: "6px",
                  }}
                >
                  Email Address <span style={{ fontSize: "11px", color: "#6B7280" }}>(Optional - for Calendar Invite)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address (e.g. rahul@gmail.com)"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: `1px solid ${errors.email ? "#EF4444" : "#E5E7EB"}`,
                    fontSize: "14px",
                    color: "#111827",
                    outline: "none",
                    backgroundColor: "#FFFFFF",
                  }}
                />
                {errors.email && (
                  <div style={{ fontSize: "12px", color: "#DC2626", marginTop: "4px" }}>
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Specific Question / Topic (Optional) */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: "6px",
                  }}
                >
                  What would you like to discuss with Faiz Sir? <span style={{ fontSize: "11px", color: "#6B7280" }}>(Optional)</span>
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g., Code review of my Next.js project, career roadmap, portfolio feedback..."
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid #E5E7EB",
                    fontSize: "14px",
                    color: "#111827",
                    outline: "none",
                    backgroundColor: "#FFFFFF",
                    resize: "none",
                  }}
                />
              </div>

              {/* Continue to Slot Selection CTA */}
              <button
                type="button"
                disabled={checkingExisting}
                onClick={handleProceedToSlot}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  width: "100%",
                  padding: "14px",
                  borderRadius: "10px",
                  backgroundColor: checkingExisting ? "#9CA3AF" : "#7C3AED",
                  color: "#FFFFFF",
                  fontSize: "15px",
                  fontWeight: 600,
                  border: "none",
                  cursor: checkingExisting ? "not-allowed" : "pointer",
                  marginTop: "8px",
                  transition: "background-color 0.2s",
                }}
              >
                {checkingExisting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Checking availability...</span>
                  </>
                ) : (
                  <>
                    <span>Continue to Select 10-Min Slot</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────── */}
        {/* STEP 2: CALENDAR & 10-MINUTE TIME SLOT PICKER */}
        {/* ───────────────────────────────────────────────────────────── */}
        {step === 2 && (
          <div>
            {/* Back Button & Header */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                border: "1px solid #E5E7EB",
                padding: "20px 20px",
                marginBottom: "16px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                }}
              >
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    backgroundColor: "transparent",
                    border: "none",
                    color: "#6B7280",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  <ArrowLeft size={16} />
                  Back to Details
                </button>

                <div style={{ fontSize: "12px", color: "#6B7280" }}>
                  Candidate: <strong>{fullName}</strong> ({currentTechnology})
                </div>
              </div>

              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#111827",
                  marginBottom: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <CalendarIcon size={18} color="#7C3AED" />
                Step 1: Choose Date
              </h2>

              {/* Horizontal Scrollable Day Selector */}
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  overflowX: "auto",
                  paddingBottom: "8px",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {dateOptions.map((item) => {
                  const isSelected = selectedDateKey === item.dateKey;
                  return (
                    <button
                      key={item.dateKey}
                      type="button"
                      onClick={() => {
                        setSelectedDateKey(item.dateKey);
                        setSelectedSlotTime(""); // reset slot on date change
                        if (errors.slotTime) {
                          setErrors((prev) => {
                            const u = { ...prev };
                            delete u.slotTime;
                            return u;
                          });
                        }
                      }}
                      style={{
                        flex: "0 0 76px",
                        padding: "10px 6px",
                        borderRadius: "10px",
                        border: isSelected ? "2px solid #7C3AED" : "1px solid #E5E7EB",
                        backgroundColor: isSelected ? "#7C3AED" : "#FFFFFF",
                        color: isSelected ? "#FFFFFF" : "#111827",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "2px",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 500,
                          opacity: isSelected ? 0.9 : 0.6,
                        }}
                      >
                        {item.isToday ? "Today" : item.isTomorrow ? "Tomorrow" : item.dayOfWeek}
                      </span>
                      <span style={{ fontSize: "16px", fontWeight: 700 }}>
                        {item.dayNumber}
                      </span>
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 500,
                          opacity: isSelected ? 0.9 : 0.6,
                        }}
                      >
                        {item.monthName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slot Picker Card */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                border: "1px solid #E5E7EB",
                padding: "24px 20px",
                marginBottom: "16px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#111827",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "2px",
                    }}
                  >
                    <Clock size={18} color="#7C3AED" />
                    Step 2: Pick 10-Minute Slot
                  </h2>
                  <p style={{ fontSize: "12px", color: "#6B7280" }}>
                    Select an available 10-minute guidance slot with Mentor Faiz Sir.
                  </p>
                </div>

                {loadingBookedSlots && (
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#7C3AED" }}>
                    <Loader2 size={13} className="animate-spin" />
                    <span>Syncing...</span>
                  </div>
                )}
              </div>

              {errors.slotTime && (
                <div
                  style={{
                    backgroundColor: "#FEF2F2",
                    border: "1px solid #FCA5A5",
                    borderRadius: "8px",
                    padding: "10px 12px",
                    color: "#DC2626",
                    fontSize: "13px",
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <AlertCircle size={16} />
                  <span>{errors.slotTime}</span>
                </div>
              )}

              {/* Slot Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                  gap: "8px",
                  maxHeight: "360px",
                  overflowY: "auto",
                  paddingRight: "4px",
                }}
              >
                {TIME_SLOT_DEFINITIONS.map((slot) => {
                  const status = getSlotStatus(slot);
                  const isSelected = selectedSlotTime === slot.label;
                  const isAvailable = status.isAvailable;

                  return (
                    <button
                      key={slot.id}
                      type="button"
                      disabled={!isAvailable}
                      onClick={() => {
                        if (isAvailable) {
                          setSelectedSlotTime(slot.label);
                          if (errors.slotTime) {
                            setErrors((prev) => {
                              const u = { ...prev };
                              delete u.slotTime;
                              return u;
                            });
                          }
                        }
                      }}
                      style={{
                        padding: "10px 8px",
                        borderRadius: "8px",
                        border: isSelected
                          ? "2px solid #7C3AED"
                          : !isAvailable
                          ? "1px solid #E5E7EB"
                          : "1px solid #E5E7EB",
                        backgroundColor: isSelected
                          ? "#FAF5FF"
                          : !isAvailable
                          ? "#F9FAFB"
                          : "#FFFFFF",
                        color: isSelected
                          ? "#7C3AED"
                          : !isAvailable
                          ? "#9CA3AF"
                          : "#111827",
                        cursor: isAvailable ? "pointer" : "not-allowed",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "4px",
                        opacity: !isAvailable ? 0.7 : 1,
                        transition: "all 0.15s ease",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: isSelected ? 700 : 600,
                          textDecoration: !isAvailable ? "line-through" : "none",
                        }}
                      >
                        {slot.label}
                      </span>
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 600,
                          padding: "2px 6px",
                          borderRadius: "4px",
                          backgroundColor: isSelected
                            ? "#7C3AED"
                            : !isAvailable
                            ? "#FEE2E2"
                            : "#ECFDF5",
                          color: isSelected
                            ? "#FFFFFF"
                            : !isAvailable
                            ? "#DC2626"
                            : "#059669",
                        }}
                      >
                        {isSelected ? "Selected" : !isAvailable ? "Booked" : "Available"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Summary & Confirmation Box */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                border: "1px solid #E5E7EB",
                padding: "20px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
              }}
            >
              {selectedSlotTime ? (
                <div
                  style={{
                    backgroundColor: "#FAF5FF",
                    border: "1px solid #DDD6FE",
                    borderRadius: "10px",
                    padding: "14px",
                    marginBottom: "16px",
                  }}
                >
                  <div style={{ fontSize: "12px", color: "#6B7280", marginBottom: "4px" }}>
                    SELECTED BOOKING DETAILS
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#111827", marginBottom: "2px" }}>
                    📅 {dateOptions.find((d) => d.dateKey === selectedDateKey)?.displayDate} at ⏰ {selectedSlotTime}
                  </div>
                  <div style={{ fontSize: "12px", color: "#7C3AED", fontWeight: 600 }}>
                    Mentor: Faiz Sir • Duration: 10 Minutes • Tech: {currentTechnology}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    fontSize: "13px",
                    color: "#6B7280",
                    textAlign: "center",
                    marginBottom: "16px",
                  }}
                >
                  👈 Please select an available slot above to confirm your session.
                </div>
              )}

              <button
                type="button"
                disabled={!selectedSlotTime || isSubmitting}
                onClick={handleConfirmBooking}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  width: "100%",
                  padding: "14px",
                  borderRadius: "10px",
                  backgroundColor: selectedSlotTime && !isSubmitting ? "#7C3AED" : "#9CA3AF",
                  color: "#FFFFFF",
                  fontSize: "15px",
                  fontWeight: 600,
                  border: "none",
                  cursor: selectedSlotTime && !isSubmitting ? "pointer" : "not-allowed",
                  transition: "background-color 0.2s",
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Booking Your 10-Min Slot...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={18} />
                    <span>Confirm & Book 10-Min Slot with Faiz Sir</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
