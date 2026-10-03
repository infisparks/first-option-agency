"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Copy,
  Check,
  Video,
  ShieldAlert,
  CalendarCheck,
  X,
  ArrowLeft,
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

// Standard 10-minute slots from 10:00 AM to 08:00 PM
const TIME_SLOT_DEFINITIONS = [
  { id: "10_00_AM", startHour: 10, startMin: 0, timeLabel: "10:00 AM", label: "10:00 AM - 10:10 AM" },
  { id: "10_15_AM", startHour: 10, startMin: 15, timeLabel: "10:15 AM", label: "10:15 AM - 10:25 AM" },
  { id: "10_30_AM", startHour: 10, startMin: 30, timeLabel: "10:30 AM", label: "10:30 AM - 10:40 AM" },
  { id: "10_45_AM", startHour: 10, startMin: 45, timeLabel: "10:45 AM", label: "10:45 AM - 10:55 AM" },
  { id: "11_00_AM", startHour: 11, startMin: 0, timeLabel: "11:00 AM", label: "11:00 AM - 11:10 AM" },
  { id: "11_15_AM", startHour: 11, startMin: 15, timeLabel: "11:15 AM", label: "11:15 AM - 11:25 AM" },
  { id: "11_30_AM", startHour: 11, startMin: 30, timeLabel: "11:30 AM", label: "11:30 AM - 11:40 AM" },
  { id: "11_45_AM", startHour: 11, startMin: 45, timeLabel: "11:45 AM", label: "11:45 AM - 11:55 AM" },
  { id: "12_00_PM", startHour: 12, startMin: 0, timeLabel: "12:00 PM", label: "12:00 PM - 12:10 PM" },
  { id: "12_15_PM", startHour: 12, startMin: 15, timeLabel: "12:15 PM", label: "12:15 PM - 12:25 PM" },
  { id: "12_30_PM", startHour: 12, startMin: 30, timeLabel: "12:30 PM", label: "12:30 PM - 12:40 PM" },
  { id: "12_45_PM", startHour: 12, startMin: 45, timeLabel: "12:45 PM", label: "12:45 PM - 12:55 PM" },
  { id: "02_00_PM", startHour: 14, startMin: 0, timeLabel: "02:00 PM", label: "02:00 PM - 02:10 PM" },
  { id: "02_15_PM", startHour: 14, startMin: 15, timeLabel: "02:15 PM", label: "02:15 PM - 02:25 PM" },
  { id: "02_30_PM", startHour: 14, startMin: 30, timeLabel: "02:30 PM", label: "02:30 PM - 02:40 PM" },
  { id: "02_45_PM", startHour: 14, startMin: 45, timeLabel: "02:45 PM", label: "02:45 PM - 02:55 PM" },
  { id: "03_00_PM", startHour: 15, startMin: 0, timeLabel: "03:00 PM", label: "03:00 PM - 03:10 PM" },
  { id: "03_15_PM", startHour: 15, startMin: 15, timeLabel: "03:15 PM", label: "03:15 PM - 03:25 PM" },
  { id: "03_30_PM", startHour: 15, startMin: 30, timeLabel: "03:30 PM", label: "03:30 PM - 03:40 PM" },
  { id: "03_45_PM", startHour: 15, startMin: 45, timeLabel: "03:45 PM", label: "03:45 PM - 03:55 PM" },
  { id: "04_00_PM", startHour: 16, startMin: 0, timeLabel: "04:00 PM", label: "04:00 PM - 04:10 PM" },
  { id: "04_15_PM", startHour: 16, startMin: 15, timeLabel: "04:15 PM", label: "04:15 PM - 04:25 PM" },
  { id: "04_30_PM", startHour: 16, startMin: 30, timeLabel: "04:30 PM", label: "04:30 PM - 04:40 PM" },
  { id: "04_45_PM", startHour: 16, startMin: 45, timeLabel: "04:45 PM", label: "04:45 PM - 04:55 PM" },
  { id: "05_00_PM", startHour: 17, startMin: 0, timeLabel: "05:00 PM", label: "05:00 PM - 05:10 PM" },
  { id: "05_15_PM", startHour: 17, startMin: 15, timeLabel: "05:15 PM", label: "05:15 PM - 05:25 PM" },
  { id: "05_30_PM", startHour: 17, startMin: 30, timeLabel: "05:30 PM", label: "05:30 PM - 05:40 PM" },
  { id: "05_45_PM", startHour: 17, startMin: 45, timeLabel: "05:45 PM", label: "05:45 PM - 05:55 PM" },
  { id: "06_00_PM", startHour: 18, startMin: 0, timeLabel: "06:00 PM", label: "06:00 PM - 06:10 PM" },
  { id: "06_15_PM", startHour: 18, startMin: 15, timeLabel: "06:15 PM", label: "06:15 PM - 06:25 PM" },
  { id: "06_30_PM", startHour: 18, startMin: 30, timeLabel: "06:30 PM", label: "06:30 PM - 06:40 PM" },
  { id: "06_45_PM", startHour: 18, startMin: 45, timeLabel: "06:45 PM", label: "06:45 PM - 06:55 PM" },
  { id: "07_00_PM", startHour: 19, startMin: 0, timeLabel: "07:00 PM", label: "07:00 PM - 07:10 PM" },
  { id: "07_15_PM", startHour: 19, startMin: 15, timeLabel: "07:15 PM", label: "07:15 PM - 07:25 PM" },
  { id: "07_30_PM", startHour: 19, startMin: 30, timeLabel: "07:30 PM", label: "07:30 PM - 07:40 PM" },
  { id: "07_45_PM", startHour: 19, startMin: 45, timeLabel: "07:45 PM", label: "07:45 PM - 07:55 PM" },
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
  // Form State
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [currentTechnology, setCurrentTechnology] = useState("");

  // Errors state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Calendar & Slot selection state
  const [selectedDateKey, setSelectedDateKey] = useState<string>("");
  const [selectedSlotTime, setSelectedSlotTime] = useState<string>("");
  const [bookedSlotsList, setBookedSlotsList] = useState<string[]>([]);
  const [loadingBookedSlots, setLoadingBookedSlots] = useState(false);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingBooking, setExistingBooking] = useState<InternshipApplicationPayload | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [copiedId, setCopiedId] = useState(false);

  // Refs for scrolling
  const activeDateRef = useRef<HTMLButtonElement | null>(null);
  const dateStripContainerRef = useRef<HTMLDivElement | null>(null);
  const hasInitializedEarliestRef = useRef<boolean>(false);

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

  // Helper to test if a slot on a specific date is available
  const isSlotAvailableOnDate = (
    slot: (typeof TIME_SLOT_DEFINITIONS)[0],
    dateKey: string,
    bookedList: string[]
  ) => {
    const dateObj = dateOptions.find((d) => d.dateKey === dateKey);
    const isToday = dateObj?.isToday;

    // Check RTDB booked slots
    const isBooked = bookedList.some(
      (b) =>
        b.toLowerCase().trim() === slot.label.toLowerCase().trim() ||
        b.toLowerCase().includes(slot.id.toLowerCase())
    );
    if (isBooked) return false;

    // Check 2-hour notice cutoff for today
    if (isToday) {
      const now = new Date();
      const cutoffTime = new Date(now.getTime() + 2 * 60 * 60 * 1000);
      const slotStartTime = new Date(now);
      slotStartTime.setHours(slot.startHour, slot.startMin, 0, 0);
      if (slotStartTime <= cutoffTime) {
        return false;
      }
    }

    return true;
  };

  // Cross-date check: If today has no unexpired slots (> now + 2h), start from Tomorrow!
  useEffect(() => {
    if (hasInitializedEarliestRef.current || dateOptions.length === 0) return;

    const now = new Date();
    const cutoffTime = new Date(now.getTime() + 2 * 60 * 60 * 1000);

    const todayHasOpenTime = TIME_SLOT_DEFINITIONS.some((slot) => {
      const slotStartTime = new Date(now);
      slotStartTime.setHours(slot.startHour, slot.startMin, 0, 0);
      return slotStartTime > cutoffTime;
    });

    if (todayHasOpenTime) {
      setSelectedDateKey(dateOptions[0].dateKey);
    } else if (dateOptions.length > 1) {
      setSelectedDateKey(dateOptions[1].dateKey);
    }
    hasInitializedEarliestRef.current = true;
  }, [dateOptions]);

  // Fetch booked slots whenever selected date changes
  useEffect(() => {
    if (!selectedDateKey) return;
    let isMounted = true;
    const selectedDateObj = dateOptions.find((d) => d.dateKey === selectedDateKey);
    const displayDate = selectedDateObj?.displayDate;

    const loadSlots = () => {
      fetchBookedMentorSlots(selectedDateKey, displayDate)
        .then((slots) => {
          if (!isMounted) return;
          setBookedSlotsList(slots);

          // Find the first available slot on this date
          let firstAvailable = "";
          for (const slot of TIME_SLOT_DEFINITIONS) {
            if (isSlotAvailableOnDate(slot, selectedDateKey, slots)) {
              firstAvailable = slot.label;
              break;
            }
          }

          // Auto-select first available slot
          setSelectedSlotTime((current) => {
            if (
              current &&
              isSlotAvailableOnDate(
                TIME_SLOT_DEFINITIONS.find((s) => s.label === current) || TIME_SLOT_DEFINITIONS[0],
                selectedDateKey,
                slots
              )
            ) {
              return current;
            }
            return firstAvailable;
          });
        })
        .catch((err) => console.warn("Error fetching slots:", err))
        .finally(() => {
          if (isMounted) setLoadingBookedSlots(false);
        });
    };

    setLoadingBookedSlots(true);
    loadSlots();

    const interval = setInterval(loadSlots, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [selectedDateKey, dateOptions]);

  // Auto-scroll the date strip to show active date
  useEffect(() => {
    if (activeDateRef.current && dateStripContainerRef.current) {
      const container = dateStripContainerRef.current;
      const element = activeDateRef.current;
      const scrollPos = element.offsetLeft - container.offsetLeft - 16;
      container.scrollTo({ left: Math.max(0, scrollPos), behavior: "smooth" });
    }
  }, [selectedDateKey]);

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

  // Validate form fields
  const validateForm = (): boolean => {
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
      newErrors.currentTechnology = "Please specify the technology you are working on";
    }

    if (!selectedSlotTime) {
      newErrors.slotTime = "Please select an available 10-minute slot";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit slot booking
  const handleConfirmBooking = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Duplicate check
    try {
      const existing = await checkExistingMentorBooking(phone);
      if (existing) {
        setExistingBooking(existing);
        setIsSubmitting(false);
        return;
      }
    } catch (e) {
      console.warn("Check existing booking error:", e);
    }

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
      email: `${phone.trim()}@mentorship.foa`,
      countryCode,
      phone: phone.trim(),
      city: "Online Mentorship",
      qualification: "10-Min Mentorship",
      passingYear: "2026",
      skills: [currentTechnology.trim()],
      currentTechnology: currentTechnology.trim(),
      aboutYourself: `10-Min 1-on-1 Mentorship Booking for ${currentTechnology.trim()}`,
      resumeUrl: "",
      submittedAt: submissionTimestamp,
      type: "10-min-slots",
      leadType: "10-min-slots",
      status: "submit",
      mentorName: "Mentor",
      slotDateKey: selectedDateKey,
      slotDate: formattedDate,
      slotTime: selectedSlotTime,
      slotDateTime: `${selectedDateKey} ${selectedSlotTime}`,
      programTitle: PROGRAM_TITLES.TEN_MIN_SLOTS,
    };

    try {
      const result = await bookMentorSlotInRealtimeDb(payload);

      if (!result.success) {
        if (result.error === "ALREADY_BOOKED" || (result as any).existingBooking) {
          setExistingBooking(
            (result as any).existingBooking || {
              fullName: fullName.trim(),
              phone: phone.trim(),
              countryCode,
              slotDate: formattedDate,
              slotTime: selectedSlotTime,
              mentorName: "Mentor",
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
            "This slot has just been booked. Please choose another available slot.",
        }));

        const updatedBooked = await fetchBookedMentorSlots(
          selectedDateKey,
          selectedDateObj?.displayDate
        );
        setBookedSlotsList(updatedBooked);
        setSelectedSlotTime("");
        setIsSubmitting(false);
        return;
      }

      // WhatsApp notification
      try {
        await triggerInternshipWhatsAppNotifications({
          candidatePhone: `${countryCode}${phone}`,
          candidateName: fullName.trim(),
          applicationId: genId,
          candidateEmail: `${phone.trim()}@mentorship.foa`,
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
    const title = encodeURIComponent("10-Min Mentorship Session (First Option Agency)");
    const details = encodeURIComponent(
      `1-on-1 Mentorship Session.\n\nStudent: ${fullName}\nTechnology: ${currentTechnology}\nBooking ID: ${applicationId}\n\nMeeting link will be shared on WhatsApp.`
    );
    const location = encodeURIComponent("Google Meet / WhatsApp Video Call");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  // Count total available slots on selected date
  const availableSlotsCount = useMemo(() => {
    if (!selectedDateKey) return 0;
    return TIME_SLOT_DEFINITIONS.filter((slot) =>
      isSlotAvailableOnDate(slot, selectedDateKey, bookedSlotsList)
    ).length;
  }, [selectedDateKey, bookedSlotsList]);

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
          backgroundColor: "#F8FAFC",
          display: "flex",
          flexDirection: "column",
          fontFamily: "var(--font-primary), Inter, system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Sticky Header */}
        <header
          style={{
            backgroundColor: "#FFFFFF",
            borderBottom: "1px solid #E5E7EB",
            position: "sticky",
            top: 0,
            zIndex: 50,
          }}
        >
          <div
            style={{
              maxWidth: "680px",
              margin: "0 auto",
              padding: "10px 16px",
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
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "14px",
                  boxShadow: "0 4px 10px rgba(124, 58, 237, 0.25)",
                }}
              >
                FOA
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>
                  First Option Agency
                </div>
                <div style={{ fontSize: "11px", color: "#7C3AED", fontWeight: 600 }}>
                  10-Min Mentorship Portal
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

        <main style={{ flex: 1, padding: "20px 14px 40px 14px", maxWidth: "560px", width: "100%", margin: "0 auto" }}>
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              border: "1px solid #E5E7EB",
              boxShadow: "0 4px 20px -2px rgba(124, 58, 237, 0.08)",
              padding: "26px 20px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                backgroundColor: "#ECFDF5",
                border: "2px solid #A7F3D0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 12px auto",
              }}
            >
              <CheckCircle2 size={30} color="#059669" />
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "3px 10px",
                borderRadius: "999px",
                background: "linear-gradient(135deg, #FAF5FF 0%, #EDE9FE 100%)",
                color: "#6D28D9",
                fontSize: "11px",
                fontWeight: 700,
                marginBottom: "8px",
                border: "1px solid #DDD6FE",
              }}
            >
              <Sparkles size={12} />
              <span>10-Minute Mentorship Confirmed</span>
            </div>

            <div style={{ fontSize: "19px", fontWeight: 800, color: "#111827", marginBottom: "4px" }}>
              Slot Booked Successfully!
            </div>
            <p style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.45, marginBottom: "18px" }}>
              Your 1-on-1 mentorship session has been reserved. A confirmation message has been sent to your WhatsApp number.
            </p>

            {/* Summary Box */}
            <div
              style={{
                backgroundColor: "#F9FAFB",
                border: "1px solid #E5E7EB",
                borderRadius: "12px",
                padding: "14px",
                textAlign: "left",
                marginBottom: "16px",
                fontSize: "13px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#6B7280" }}>Session Date</span>
                <span style={{ fontWeight: 600, color: "#111827" }}>📅 {formattedDate}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#6B7280" }}>Slot Time</span>
                <span style={{ fontWeight: 600, color: "#111827" }}>⏰ {selectedSlotTime} (10 Mins)</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#6B7280" }}>Technology</span>
                <span style={{ fontWeight: 600, color: "#111827" }}>💻 {currentTechnology}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#6B7280" }}>Candidate</span>
                <span style={{ fontWeight: 600, color: "#111827" }}>{fullName} ({countryCode} {phone})</span>
              </div>
            </div>

            {/* Reference ID Box */}
            <div
              style={{
                backgroundColor: "#FAF5FF",
                border: "1px dashed #DDD6FE",
                borderRadius: "8px",
                padding: "10px 14px",
                marginBottom: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "10.5px", color: "#6B7280", fontWeight: 600 }}>
                  BOOKING REFERENCE ID
                </div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#6D28D9", fontFamily: "monospace" }}>
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
                  padding: "5px 10px",
                  borderRadius: "6px",
                  background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
                  color: "#FFFFFF",
                  fontSize: "11.5px",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {copiedId ? <Check size={13} /> : <Copy size={13} />}
                {copiedId ? "Copied" : "Copy"}
              </button>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
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
                  padding: "11px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
                  color: "#FFFFFF",
                  fontSize: "13.5px",
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "0 4px 12px rgba(124, 58, 237, 0.25)",
                }}
              >
                <CalendarCheck size={16} />
                <span>Add to Google Calendar</span>
              </a>

              <a
                href={`https://wa.me/919958399157?text=${encodeURIComponent(
                  `Hi, I have booked a 10-min mentorship slot (ID: ${applicationId}) for ${formattedDate} at ${selectedSlotTime}. Tech: ${currentTechnology}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  width: "100%",
                  padding: "11px",
                  borderRadius: "8px",
                  backgroundColor: "#F3F4F6",
                  border: "1px solid #E5E7EB",
                  color: "#111827",
                  fontSize: "13.5px",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                <Phone size={16} color="#059669" />
                <span>WhatsApp Mentor Support</span>
              </a>

              <Link
                href="/"
                style={{
                  fontSize: "12.5px",
                  color: "#6B7280",
                  textDecoration: "none",
                  marginTop: "4px",
                }}
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // MAIN SINGLE-STEP FORM UI
  // ─────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F8FAFC",
        display: "flex",
        flexDirection: "column",
        fontFamily: "var(--font-primary), Inter, system-ui, -apple-system, sans-serif",
      }}
    >
      {/* ─── Responsive Styles ─── */}
      <style>{`
        .slot-grid-responsive {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
        }
        @media (min-width: 480px) {
          .slot-grid-responsive {
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
          }
        }
        @media (min-width: 640px) {
          .slot-grid-responsive {
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
          }
        }
        .form-container-card {
          padding: 16px 14px;
        }
        @media (min-width: 640px) {
          .form-container-card {
            padding: 20px 18px;
          }
        }
        .form-banner-responsive {
          padding: 16px 14px;
        }
        @media (min-width: 640px) {
          .form-banner-responsive {
            padding: 20px 18px;
          }
        }
      `}</style>

      {/* ─── Sticky Navbar ─── */}
      <header
        style={{
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
          position: "sticky",
          top: 0,
          zIndex: 50,
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <div
          style={{
            maxWidth: "680px",
            margin: "0 auto",
            padding: "10px 14px",
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
            }}
          >
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "13px",
                boxShadow: "0 3px 8px rgba(124, 58, 237, 0.25)",
              }}
            >
              FOA
            </div>
            <div>
              <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#111827" }}>
                First Option Agency
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "#7C3AED",
                  fontWeight: 600,
                }}
              >
                10-Min Mentorship Portal
              </div>
            </div>
          </Link>

          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "12.5px",
              fontWeight: 600,
              color: "#7C3AED",
              textDecoration: "none",
              padding: "5px 10px",
              borderRadius: "6px",
              backgroundColor: "#F5F3FF",
              border: "1px solid #EDE9FE",
            }}
          >
            <ArrowLeft size={13} />
            <span>Home</span>
          </Link>
        </div>
      </header>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* "ALREADY BOOKED" POPUP */}
      {/* ───────────────────────────────────────────────────────────── */}
      {existingBooking && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
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
              borderRadius: "16px",
              border: "1px solid #E5E7EB",
              maxWidth: "480px",
              width: "100%",
              maxHeight: "92vh",
              overflowY: "auto",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.2)",
              padding: "24px 18px",
              textAlign: "center",
              position: "relative",
            }}
          >
            <button
              onClick={() => setExistingBooking(null)}
              type="button"
              aria-label="Close popup"
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                backgroundColor: "#F3F4F6",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#6B7280",
              }}
            >
              <X size={15} />
            </button>

            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "#FEF2F2",
                border: "2px solid #FEE2E2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 10px auto",
              }}
            >
              <ShieldAlert size={24} color="#DC2626" />
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "3px 10px",
                borderRadius: "9999px",
                backgroundColor: "#FEF2F2",
                border: "1px solid #FECACA",
                color: "#991B1B",
                fontSize: "10.5px",
                fontWeight: 700,
                textTransform: "uppercase",
                marginBottom: "6px",
              }}
            >
              Single Booking Policy
            </div>

            <h2
              style={{
                fontSize: "17px",
                fontWeight: 700,
                color: "#111827",
                marginBottom: "4px",
              }}
            >
              Slot Already Reserved
            </h2>

            <p
              style={{
                fontSize: "12.5px",
                color: "#4B5563",
                lineHeight: 1.4,
                marginBottom: "14px",
              }}
            >
              A 1-on-1 mentorship session is already reserved under this contact number. Each candidate is entitled to 1 active session.
            </p>

            <div
              style={{
                backgroundColor: "#F9FAFB",
                border: "1px solid #E5E7EB",
                borderRadius: "10px",
                padding: "12px 14px",
                textAlign: "left",
                marginBottom: "14px",
                fontSize: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#6B7280" }}>Candidate:</span>
                <span style={{ fontWeight: 600, color: "#111827" }}>
                  {existingBooking.fullName || fullName || "Registered Candidate"}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#6B7280" }}>Phone:</span>
                <span style={{ fontWeight: 600, color: "#111827" }}>
                  {existingBooking.countryCode || "+91"} {existingBooking.phone || phone}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#6B7280" }}>Date & Time:</span>
                <span style={{ fontWeight: 700, color: "#111827" }}>
                  📅 {existingBooking.slotDate || existingBooking.slotDateKey || "Scheduled"} • ⏰ {existingBooking.slotTime || "10 Mins"}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#6B7280" }}>Tech:</span>
                <span style={{ fontWeight: 600, color: "#111827" }}>
                  💻 {existingBooking.currentTechnology || existingBooking.skills?.[0] || currentTechnology || "Tech Guidance"}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <a
                href={`https://wa.me/919920042456?text=${encodeURIComponent(
                  `Hello First Option Agency,\n\nI have an existing 1-on-1 mentorship booking (ID: ${
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
                  padding: "10px 14px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
                  color: "#FFFFFF",
                  fontSize: "13px",
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "0 3px 10px rgba(124, 58, 237, 0.25)",
                }}
              >
                <Phone size={14} />
                WhatsApp Support
              </a>

              <button
                type="button"
                onClick={() => setExistingBooking(null)}
                style={{
                  width: "100%",
                  padding: "9px 14px",
                  borderRadius: "8px",
                  backgroundColor: "#F3F4F6",
                  border: "1px solid #E5E7EB",
                  color: "#374151",
                  fontSize: "12px",
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

      {/* ─── Main Content ─── */}
      <main
        style={{
          flex: 1,
          padding: "14px 10px 36px 10px",
          maxWidth: "680px",
          width: "100%",
          margin: "0 auto",
        }}
      >
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
          <div className="form-banner-responsive" style={{ borderBottom: "1px solid #EDE9FE", background: "linear-gradient(135deg, #FAF5FF 0%, #F5F3FF 50%, #EDE9FE 100%)" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "3px 10px",
                borderRadius: "999px",
                fontSize: "10.5px",
                fontWeight: 800,
                backgroundColor: "#FFFFFF",
                color: "#6D28D9",
                border: "1px solid #DDD6FE",
                boxShadow: "0 1px 4px rgba(124, 58, 237, 0.08)",
                marginBottom: "6px",
              }}
            >
              <Sparkles size={11} color="#7C3AED" />
              <span>1-ON-1 TECHNICAL MENTORSHIP SESSION</span>
            </div>

            <div
              style={{
                fontSize: "18.5px",
                fontWeight: 800,
                color: "#111827",
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
              }}
            >
              10-Minute Mentorship Booking Form
            </div>

            <div style={{ fontSize: "12.5px", color: "#6B7280", marginTop: "4px", lineHeight: 1.4 }}>
              Please fill in your details and select your preferred 10-minute session slot below. Fields marked with * are required.
            </div>
          </div>

          {/* Form Body */}
          <form
            onSubmit={handleConfirmBooking}
            noValidate
            className="form-container-card"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
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
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "6px",
                    background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: 800,
                    boxShadow: "0 2px 5px rgba(124, 58, 237, 0.25)",
                  }}
                >
                  1
                </div>
                <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#111827" }}>
                  Personal Details
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
                {/* Full Name */}
                <div>
                  <label
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
                    placeholder="e.g. Rahul Sharma"
                    style={{
                      width: "100%",
                      height: "38px",
                      padding: "0 12px",
                      borderRadius: "8px",
                      border: `1px solid ${errors.fullName ? "#EF4444" : "#E5E7EB"}`,
                      fontSize: "13.5px",
                      color: "#111827",
                      outline: "none",
                      backgroundColor: "#FFFFFF",
                    }}
                  />
                  {errors.fullName && (
                    <div style={{ fontSize: "11px", color: "#EF4444", marginTop: "3px" }}>
                      {errors.fullName}
                    </div>
                  )}
                </div>

                {/* WhatsApp Phone Number */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: "4px",
                    }}
                  >
                    Phone Number <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      style={{
                        height: "38px",
                        padding: "0 6px",
                        borderRadius: "8px",
                        border: "1px solid #E5E7EB",
                        fontSize: "12.5px",
                        color: "#111827",
                        backgroundColor: "#F9FAFB",
                        outline: "none",
                        width: "86px",
                        cursor: "pointer",
                        flexShrink: 0,
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
                      placeholder="10-digit mobile number"
                      style={{
                        flex: 1,
                        minWidth: 0,
                        height: "38px",
                        padding: "0 12px",
                        borderRadius: "8px",
                        border: `1px solid ${errors.phone ? "#EF4444" : "#E5E7EB"}`,
                        fontSize: "13.5px",
                        color: "#111827",
                        outline: "none",
                        backgroundColor: "#FFFFFF",
                      }}
                    />
                  </div>
                  {errors.phone ? (
                    <div style={{ fontSize: "11px", color: "#EF4444", marginTop: "3px" }}>
                      {errors.phone}
                    </div>
                  ) : (
                    <div style={{ fontSize: "11px", color: "#6B7280", marginTop: "3px" }}>
                      Meeting link & session confirmation will be shared on this WhatsApp number.
                    </div>
                  )}
                </div>

                {/* Current Technology */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: "4px",
                    }}
                  >
                    Current Technology / Stack <span style={{ color: "#EF4444" }}>*</span>
                  </label>
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
                    placeholder="e.g. Next.js, React, Node.js, Python, MERN, Flutter, Figma..."
                    style={{
                      width: "100%",
                      height: "38px",
                      padding: "0 12px",
                      borderRadius: "8px",
                      border: `1px solid ${errors.currentTechnology ? "#EF4444" : "#E5E7EB"}`,
                      fontSize: "13.5px",
                      color: "#111827",
                      outline: "none",
                      backgroundColor: "#FFFFFF",
                    }}
                  />
                  {errors.currentTechnology && (
                    <div style={{ fontSize: "11px", color: "#EF4444", marginTop: "3px" }}>
                      {errors.currentTechnology}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ════════ SECTION 2: SELECT DATE ════════ */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: "8px",
                  borderBottom: "1px solid #F3F4F6",
                  marginBottom: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "6px",
                      background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: 800,
                      boxShadow: "0 2px 5px rgba(124, 58, 237, 0.25)",
                    }}
                  >
                    2
                  </div>
                  <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#111827" }}>
                    Select Date
                  </div>
                </div>
                <span style={{ fontSize: "11px", color: "#6B7280" }}>14 Days Available</span>
              </div>

              {/* Horizontal Scrollable Day Selector */}
              <div
                ref={dateStripContainerRef}
                style={{
                  display: "flex",
                  gap: "6px",
                  overflowX: "auto",
                  paddingBottom: "4px",
                  WebkitOverflowScrolling: "touch",
                  scrollbarWidth: "none",
                }}
              >
                {dateOptions.map((item) => {
                  const isSelected = selectedDateKey === item.dateKey;
                  return (
                    <button
                      key={item.dateKey}
                      ref={isSelected ? activeDateRef : null}
                      type="button"
                      onClick={() => {
                        setSelectedDateKey(item.dateKey);
                        setSelectedSlotTime("");
                        if (errors.slotTime) {
                          setErrors((prev) => {
                            const u = { ...prev };
                            delete u.slotTime;
                            return u;
                          });
                        }
                      }}
                      style={{
                        flex: "0 0 60px",
                        padding: "6px 2px",
                        borderRadius: "8px",
                        border: isSelected ? "1.5px solid #6D28D9" : "1px solid #E5E7EB",
                        background: isSelected
                          ? "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)"
                          : "#FFFFFF",
                        color: isSelected ? "#FFFFFF" : "#111827",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "1px",
                        cursor: "pointer",
                        boxShadow: isSelected ? "0 3px 10px rgba(124, 58, 237, 0.25)" : "none",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "9.5px",
                          fontWeight: 600,
                          opacity: isSelected ? 0.9 : 0.6,
                        }}
                      >
                        {item.isToday ? "Today" : item.isTomorrow ? "Tmrw" : item.dayOfWeek}
                      </span>
                      <span style={{ fontSize: "14px", fontWeight: 800, lineHeight: 1.1 }}>
                        {item.dayNumber}
                      </span>
                      <span
                        style={{
                          fontSize: "8.5px",
                          fontWeight: 600,
                          opacity: isSelected ? 0.9 : 0.6,
                          textTransform: "uppercase",
                        }}
                      >
                        {item.monthName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ════════ SECTION 3: SELECT TIME (FLAWLESS 3-4 COL RESPONSIVE GRID) ════════ */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: "8px",
                  borderBottom: "1px solid #F3F4F6",
                  marginBottom: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "6px",
                      background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: 800,
                      boxShadow: "0 2px 5px rgba(124, 58, 237, 0.25)",
                    }}
                  >
                    3
                  </div>
                  <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#111827" }}>
                    Select Time (10-Min Slot)
                  </div>
                </div>

                {loadingBookedSlots ? (
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "#7C3AED", fontWeight: 600 }}>
                    <Loader2 size={11} className="animate-spin" />
                    <span>Syncing...</span>
                  </div>
                ) : (
                  <span style={{ fontSize: "11px", fontWeight: 600, color: "#059669" }}>
                    {availableSlotsCount} Slots Open
                  </span>
                )}
              </div>

              {errors.slotTime && (
                <div
                  style={{
                    backgroundColor: "#FEF2F2",
                    border: "1px solid #FCA5A5",
                    borderRadius: "8px",
                    padding: "7px 10px",
                    color: "#DC2626",
                    fontSize: "11.5px",
                    marginBottom: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <AlertCircle size={13} />
                  <span>{errors.slotTime}</span>
                </div>
              )}

              {/* Time chips grid with 3-4 columns on mobile */}
              <div
                className="slot-grid-responsive"
                style={{
                  maxHeight: "200px",
                  overflowY: "auto",
                  paddingRight: "2px",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {TIME_SLOT_DEFINITIONS.map((slot) => {
                  const isAvailable = isSlotAvailableOnDate(slot, selectedDateKey, bookedSlotsList);
                  const isSelected = selectedSlotTime === slot.label;

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
                        height: "36px",
                        padding: "0 4px",
                        borderRadius: "7px",
                        border: isSelected
                          ? "1.5px solid #6D28D9"
                          : !isAvailable
                          ? "1px solid #F3F4F6"
                          : "1px solid #E5E7EB",
                        background: isSelected
                          ? "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)"
                          : !isAvailable
                          ? "#F9FAFB"
                          : "#FFFFFF",
                        color: isSelected
                          ? "#FFFFFF"
                          : !isAvailable
                          ? "#9CA3AF"
                          : "#111827",
                        cursor: isAvailable ? "pointer" : "not-allowed",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: isSelected ? 800 : isAvailable ? 600 : 500,
                        textDecoration: !isAvailable ? "line-through" : "none",
                        boxShadow: isSelected
                          ? "0 3px 10px rgba(124, 58, 237, 0.28)"
                          : "none",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {slot.timeLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ════════ SELECTED SLOT PREMIUM SPLASH CONFIRMATION BANNER ════════ */}
            {selectedSlotTime && (
              <div
                style={{
                  position: "relative",
                  background: "linear-gradient(135deg, #FAF5FF 0%, #F5F3FF 50%, #EDE9FE 100%)",
                  border: "1.5px solid #DDD6FE",
                  borderRadius: "12px",
                  padding: "12px 14px",
                  boxShadow: "0 4px 16px -3px rgba(124, 58, 237, 0.14)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "7px",
                  overflow: "hidden",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "5px",
                        background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 5px rgba(124, 58, 237, 0.25)",
                      }}
                    >
                      <Sparkles size={11} />
                    </div>
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 800,
                        color: "#6D28D9",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                      }}
                    >
                      Selected Slot
                    </span>
                  </div>

                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "3px",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#059669",
                      backgroundColor: "#ECFDF5",
                      border: "1px solid #A7F3D0",
                      padding: "2px 7px",
                      borderRadius: "999px",
                    }}
                  >
                    <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#10B981" }} />
                    100% Free
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      fontSize: "12.5px",
                      fontWeight: 700,
                      color: "#111827",
                      backgroundColor: "#FFFFFF",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      border: "1px solid #E5E7EB",
                    }}
                  >
                    <CalendarIcon size={13} color="#7C3AED" />
                    <span>{dateOptions.find((d) => d.dateKey === selectedDateKey)?.displayDate}</span>
                  </div>

                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      fontSize: "12.5px",
                      fontWeight: 700,
                      color: "#6D28D9",
                      backgroundColor: "#FFFFFF",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      border: "1px solid #DDD6FE",
                    }}
                  >
                    <Clock size={13} color="#7C3AED" />
                    <span>{selectedSlotTime}</span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "10.5px",
                    color: "#6B7280",
                    borderTop: "1px dashed #DDD6FE",
                    paddingTop: "5px",
                  }}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "3px" }}>
                    <Video size={11} color="#7C3AED" /> 1-on-1 Live Video Call
                  </span>
                  <span>•</span>
                  <span>10-Minute Technical Review</span>
                </div>
              </div>
            )}

            {/* ════════ SUBMIT BUTTON ════════ */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                height: "42px",
                borderRadius: "8px",
                background: isSubmitting
                  ? "#9CA3AF"
                  : "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
                color: "#FFFFFF",
                fontSize: "13.5px",
                fontWeight: 700,
                border: "none",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                transition: "all 0.15s ease",
                boxShadow: isSubmitting ? "none" : "0 3px 12px rgba(124, 58, 237, 0.25)",
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  <span>Booking Slot...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={15} />
                  <span>Confirm & Book 10-Min Mentorship Slot</span>
                </>
              )}
            </button>

            {/* Privacy & Trust Note */}
            <div style={{ textAlign: "center", fontSize: "10.5px", color: "#6B7280" }}>
              🔒 Instant WhatsApp confirmation & Google Meet link dispatched upon booking.
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
